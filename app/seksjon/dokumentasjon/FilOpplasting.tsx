import { Box, FileObject, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { useEffect } from "react";
import { useParams } from "react-router";
import {
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst,
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  TILLATTE_FILFORMAT,
} from "~/utils/dokument.utils";
import { Dokumentasjonskrav } from "./DokumentasjonskravKomponent";

export type DokumentkravFil = {
  id: string;
  filnavn: string;
  urn?: string;
  tidspunkt?: string;
  storrelse?: number;
  filsti?: string;
  lasterOpp?: boolean;
  file?: File;
  feil?: LastOppFeil;
};

export enum LastOppFeil {
  FIL_FOR_STOR = "FIL_FOR_STOR",
  UGYLDIG_FORMAT = "UGYLDIG_FORMAT",
  TEKNISK_FEIL = "TEKNISK_FEIL",
  DUPLIKAT_FIL = "DUPLIKAT_FIL",
  UKJENT_FEIL = "UKJENT_FEIL",
}

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
  dokumentkravFiler: DokumentkravFil[];
  setDokumentkravFiler: React.Dispatch<React.SetStateAction<DokumentkravFil[]>>;
  setDokumentasjonskravIdSomSkalLagres: (dokumentasjonskravIdSomSkalLagres: string | null) => void;
  setAntallFilerMedFeil: (dokumentkravetHarValideringsfeil: number) => void;
  setIngenFilerErLastetOppForDokumentkravet: (
    ingenFilerErLastetOppForDokumentkravet: boolean
  ) => void;
}

export function FilOpplasting({
  dokumentasjonskrav,
  dokumentkravFiler,
  setDokumentkravFiler,
  setDokumentasjonskravIdSomSkalLagres,
  setAntallFilerMedFeil,
  setIngenFilerErLastetOppForDokumentkravet,
}: IProps) {
  const { soknadId } = useParams();

  useEffect(() => {
    setAntallFilerMedFeil(
      dokumentkravFiler.filter((dokumentkravFil) => dokumentkravFil.feil !== undefined).length
    );
  }, [dokumentkravFiler.length]);

  useEffect(() => {
    setIngenFilerErLastetOppForDokumentkravet(dokumentkravFiler.length === 0);
  }, [dokumentkravFiler.length]);

  async function lastOppfiler(filer: FileObject[]) {
    const filerMedFeil: DokumentkravFil[] = [];
    const filerKlarTilOpplasting: DokumentkravFil[] = [];

    filer.forEach((fil: FileObject) => {
      const erGyldigFormat = TILLATTE_FILFORMAT.some((format) => fil.file.name.endsWith(format));
      const erDuplikat = dokumentkravFiler.some(
        (f) => f.filnavn === fil.file.name && f.storrelse === fil.file.size
      );

      if (!erGyldigFormat) {
        filerMedFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: LastOppFeil.UGYLDIG_FORMAT,
        });
      } else if (erDuplikat) {
        filerMedFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: LastOppFeil.DUPLIKAT_FIL,
        });
      } else if (fil.file.size > MAX_FIL_STØRRELSE) {
        filerMedFeil.push({
          id: crypto.randomUUID(),
          filnavn: fil.file.name,
          feil: LastOppFeil.FIL_FOR_STOR,
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

    setDokumentkravFiler((prev) => [...prev, ...filerMedFeil, ...filerKlarTilOpplasting]);

    if (filerKlarTilOpplasting.length > 0) {
      const responser = await Promise.all(
        filerKlarTilOpplasting.map(async (fil) => {
          if (!fil.file) {
            console.error("Mangler fil data");
            return;
          }

          const formData = new FormData();
          formData.append("file", fil.file);

          const url = `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.id}/last-opp-fil`;
          const respons = await fetch(url, { method: "POST", body: formData });

          if (!respons.ok) {
            return {
              filnavn: fil.file.name,
              storrelse: fil.file.size,
              lasterOpp: false,
              feil: LastOppFeil.TEKNISK_FEIL,
              id: fil.id,
              file: fil.file,
            };
          }

          const filer = await respons.json();

          return {
            ...filer[0], // Mellomlagring returnerer en liste
            lasterOpp: false,
            feil: undefined,
            id: fil.id,
            file: fil.file,
          };
        })
      );

      setDokumentkravFiler((prev) =>
        prev.map((fil) => ({ ...fil, ...responser.find((respons) => respons.id === fil.id) }))
      );
    }
  }

  async function slettEnFil(fil: DokumentkravFil) {
    if (fil.feil || !fil.filsti) {
      setDokumentkravFiler((prev) => prev.filter((f) => f.id !== fil.id));
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

    setDokumentkravFiler((prev) => prev.filter((f) => f.filsti !== fil.filsti));
    setDokumentasjonskravIdSomSkalLagres(dokumentasjonskrav.id);

    return await response.text();
  }

  function hentFilFeilmelding(feilType: LastOppFeil) {
    switch (feilType) {
      case LastOppFeil.FIL_FOR_STOR:
        return `Kunne ikke laste opp filen. Filstørrelsen overskrider ${hentMaksFilStørrelseMB()} MB`;
      case LastOppFeil.UGYLDIG_FORMAT:
        return "Kunne ikke laste opp filen. Ugyldig filformat";
      case LastOppFeil.TEKNISK_FEIL:
        return "Kunne ikke laste opp filen. Det oppstod en teknisk feil";
      case LastOppFeil.DUPLIKAT_FIL:
        return "Kunne ikke laste opp filen. Filen er duplikat";
      case LastOppFeil.UKJENT_FEIL:
        return "Kunne ikke laste opp filen. Det oppstod en ukjent feil";
      default:
        return "Kunne ikke laste opp filen. Det oppstod en ukjent feil";
    }
  }

  return (
    <Box.New borderRadius="large" background="sunken" className="mt-4">
      <VStack gap="8">
        <form method="post" encType="multipart/form-data">
          <FileUploadDropzone
            className="mt-4 fileUpload"
            label="Last opp dokument"
            description={`Maks filstørrelse er ${hentMaksFilStørrelseMB()} MB, og tillatte filtyper er ${hentTillatteFiltyperTekst()}.`}
            fileLimit={{ max: MAX_ANTALL_FILER, current: dokumentkravFiler.length }}
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
      </VStack>
    </Box.New>
  );
}
