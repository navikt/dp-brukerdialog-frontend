import { Box, ErrorMessage, FileObject, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { useParams } from "react-router";
import {
  Dokumentasjonskrav,
  DokumentasjonskravFeilType,
  DokumentkravFil,
  FilOpplastingFeilType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { useDokumentasjonskravContext } from "~/seksjon/dokumentasjon/dokumentasjonskrav.context";
import { dokumentkravSvarSendNå } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import {
  hentFilFeilmelding,
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst,
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  TILLATTE_FILFORMAT,
} from "~/utils/dokument.utils";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function FilOpplasting({ dokumentasjonskrav }: IProps) {
  const { soknadId } = useParams();
  const { oppdaterEtDokumentasjonskrav } = useDokumentasjonskravContext();

  const dokumentkravFiler = dokumentasjonskrav.filer || [];
  const antallFeil = dokumentkravFiler.filter((fil) => fil.feil).length;

  async function lastOppfiler(filer: FileObject[]) {
    const filerMedFeil: DokumentkravFil[] = [];
    const filerKlarTilOpplasting: DokumentkravFil[] = [];

    filer.forEach((fil: FileObject) => {
      const erGyldigFormat = TILLATTE_FILFORMAT.some((format) => fil.file.name.endsWith(format));
      const erDuplikat = dokumentkravFiler?.some(
        (f) => f.filnavn === fil.file.name && f.storrelse === fil.file.size
      );

      if (!erGyldigFormat) {
        filerMedFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: FilOpplastingFeilType.UGYLDIG_FORMAT,
        });
      } else if (erDuplikat) {
        filerMedFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: FilOpplastingFeilType.DUPLIKAT_FIL,
        });
      } else if (fil.file.size > MAX_FIL_STØRRELSE) {
        filerMedFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: FilOpplastingFeilType.FIL_FOR_STOR,
        });
      } else {
        filerKlarTilOpplasting.push({
          id: crypto.randomUUID(),
          file: fil.file,
          filnavn: fil.file.name,
          lasterOpp: true,
        });
      }
    });

    oppdaterEtDokumentasjonskrav({
      ...dokumentasjonskrav,
      filer: [...dokumentkravFiler, ...filerKlarTilOpplasting, ...filerMedFeil],
      feil: filerMedFeil.length > 0 ? DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL : undefined,
    });

    if (filerKlarTilOpplasting.length > 0) {
      const responser = await Promise.all(
        filerKlarTilOpplasting.map(async (fil) => {
          if (!fil.file) {
            console.error("Mangler fil data");
            return;
          }

          const formData = new FormData();
          formData.append("fil", fil.file);

          const url = `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.id}/last-opp-fil`;
          const respons = await fetch(url, { method: "POST", body: formData });

          if (!respons.ok) {
            return {
              filnavn: fil.file.name,
              storrelse: fil.file.size,
              lasterOpp: false,
              feil: FilOpplastingFeilType.TEKNISK_FEIL,
              id: fil.id,
            };
          }

          const filer = await respons.json();

          return {
            ...filer[0], // Mellomlagring returnerer en liste
            lasterOpp: false,
            feil: undefined,
            id: fil.id,
          };
        })
      );

      const oppdaterteFiler = [...dokumentkravFiler, ...filerKlarTilOpplasting, ...filerMedFeil];

      oppdaterEtDokumentasjonskrav({
        ...dokumentasjonskrav,
        filer: oppdaterteFiler.map((fil) => ({
          ...fil,
          ...responser.find((respons) => respons?.id === fil.id),
        })),
        begrunnelse: undefined,
        svar: dokumentkravSvarSendNå,
      });
    }
  }

  async function slettEnFil(fil: DokumentkravFil) {
    if (fil.feil || !fil.filsti) {
      const oppdaterteFiler = dokumentkravFiler.filter((f) => f.id !== fil.id);

      oppdaterEtDokumentasjonskrav({
        ...dokumentasjonskrav,
        filer: oppdaterteFiler.length > 0 ? oppdaterteFiler : undefined,
        feil: oppdaterteFiler.some((fil) => fil.feil)
          ? DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL
          : undefined,
      });

      return;
    }

    const formData = new FormData();
    formData.append("filsti", fil.filsti);

    const response = await fetch(
      `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.id}/slett-fil`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      return;
    }

    const oppdaterteFiler = dokumentkravFiler.filter((f) => f.filsti !== fil.filsti);

    oppdaterEtDokumentasjonskrav({
      ...dokumentasjonskrav,
      filer: oppdaterteFiler.length > 0 ? oppdaterteFiler : undefined,
      feil: oppdaterteFiler.some((fil) => fil.feil)
        ? DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL
        : undefined,
    });

    return await response.text();
  }

  return (
    <Box.New borderRadius="large" background="sunken">
      <VStack gap="4">
        <form method="post" encType="multipart/form-data">
          <FileUploadDropzone
            className="mt-4 fileUpload"
            label="Last opp dokument"
            description={`Maks filstørrelse er ${hentMaksFilStørrelseMB()} MB, og tillatte filtyper er ${hentTillatteFiltyperTekst()}.`}
            fileLimit={{ max: MAX_ANTALL_FILER, current: dokumentasjonskrav.filer?.length ?? 0 }}
            accept={hentTillatteFiltyperString()}
            onSelect={(filer) => lastOppfiler(filer)}
          />
        </form>
      </VStack>
      <VStack gap="4" className="mt-8">
        {dokumentkravFiler?.map((fil) => (
          <FileUploadItem
            key={fil.id}
            file={fil.file instanceof File ? fil.file : { name: fil.filnavn, size: fil.storrelse }}
            status={fil.lasterOpp ? "uploading" : "idle"}
            translations={{ uploading: "Laster opp..." }}
            error={fil.feil ? hentFilFeilmelding(fil.feil) : undefined}
            button={{
              action: "delete",
              onClick: () => slettEnFil(fil),
            }}
          />
        ))}
        {dokumentasjonskrav.feil === DokumentasjonskravFeilType.FIL_OPPLASTING_FEIL &&
          antallFeil > 0 && (
            <ErrorMessage>
              Du må rette feilen{antallFeil > 1 ? "e" : ""} over før dokumentasjon kan sendes inn.
            </ErrorMessage>
          )}

        {dokumentasjonskrav.feil === DokumentasjonskravFeilType.MANGLER_FILER &&
          dokumentkravFiler.length === 0 && (
            <ErrorMessage>
              Du må laste opp minst en fil før dokumentasjonen kan sendes inn.
            </ErrorMessage>
          )}
      </VStack>
    </Box.New>
  );
}
