import { BodyLong, Box, FileObject, Heading, List, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { useState } from "react";
import { useParams } from "react-router";
import {
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst,
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  TILLATTE_FILTYPER,
} from "~/utils/dokument.utils";

export type DokumentkravFil = {
  filnavn: string;
  urn: string;
  tidspunkt: string;
  storrelse: number;
  filsti: string;
  status: MellomlagringStatus;
  feil?: FeilType;
};

type MellomlagringStatus = "LASTER_OPP" | "LASTET_OPP" | "IDLE";
type FeilType = "FIL_FOR_STOR" | "UGYLDIG_FORMAT" | "TEKNISK_FEIL";

export function DokumentasjonView() {
  const { soknadId } = useParams();
  const [dokumentkravFiler, setDokumentkravFiler] = useState<DokumentkravFil[]>([]);

  // Todo,
  // Håndtere retry ved feil
  // Finn ut hvordan vi skal hente dokumentkravId
  function setDokumentkravFilStatus(fil: File): DokumentkravFil {
    const filnavn = fil.name.toLowerCase();
    const erGyldigFormat = TILLATTE_FILTYPER.some((format) => filnavn.endsWith(format));

    const dokumentkravFil: DokumentkravFil = {
      filnavn: filnavn,
      urn: "",
      tidspunkt: "",
      storrelse: fil.size,
      filsti: "",
      feil: undefined,
      status: "LASTER_OPP",
    };

    if (!erGyldigFormat) {
      return { ...dokumentkravFil, feil: "UGYLDIG_FORMAT", status: "IDLE" };
    }

    if (fil.size > MAX_FIL_STØRRELSE) {
      return { ...dokumentkravFil, feil: "FIL_FOR_STOR", status: "IDLE" };
    }

    return dokumentkravFil;
  }

  async function lastOppfiler(filer: FileObject[]) {
    const nyeFiler: DokumentkravFil[] = filer
      .filter((fil) => !dokumentkravFiler.some((f) => f.filnavn === fil.file.name.toLowerCase()))
      .map((fil) => setDokumentkravFilStatus(fil.file));

    setDokumentkravFiler((prev) => [...prev, ...nyeFiler]);

    try {
      const mellomlagreFilerResponse = await Promise.all(
        filer.map(async (fileObj) => {
          const formData = new FormData();
          formData.append("file", fileObj.file);

          const mellomlagreEnFilResponse = await fetch(
            `/api/dokument/last-opp/${soknadId}/1014.1`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!mellomlagreEnFilResponse.ok) {
            const filMedTekniskFeil: DokumentkravFil = {
              filnavn: fileObj.file.name.toLowerCase(),
              urn: "",
              tidspunkt: "",
              storrelse: fileObj.file.size,
              filsti: "",
              feil: "TEKNISK_FEIL",
              status: "IDLE",
            };

            return filMedTekniskFeil;
          }

          const mellomlagretFil: DokumentkravFil[] = await mellomlagreEnFilResponse.json();

          return {
            ...mellomlagretFil[0], // Mellomlagring returnerer en liste med en fil
            status: "LASTET_OPP",
            feil: undefined,
          };
        })
      );

      setDokumentkravFiler((prev) =>
        prev.map((filer) => {
          const oppdatertFil = mellomlagreFilerResponse.find(
            (fil) => fil.filnavn === filer.filnavn
          );

          if (!oppdatertFil) return filer;

          return {
            ...filer,
            ...oppdatertFil,
            status: oppdatertFil.feil ? oppdatertFil.status : "LASTET_OPP",
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  function hentFilFeilmelding(feilType: FeilType) {
    switch (feilType) {
      case "FIL_FOR_STOR":
        return `Filstørrelsen overskrider ${hentMaksFilStørrelseMB()} MB.`;
      case "UGYLDIG_FORMAT":
        return "Ugyldig filformat.";
      case "TEKNISK_FEIL":
        return "Det oppstod en teknisk feil.";
      default:
        return "Ukjent feil.";
    }
  }

  async function slettEnFil(filsti: string) {
    try {
      const formData = new FormData();
      formData.append("filsti", filsti);

      const response = await fetch(`/api/dokument/slett/${soknadId}/1014.1`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return;
      }

      setDokumentkravFiler((prev) => prev.filter((fil) => fil.filsti !== filsti));

      return await response.json();
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  return (
    <div className="innhold">
      <h2>Dokumentasjon</h2>
      <BodyLong spacing>
        Du må laste opp dokumentasjon som bekrefter opplysningene i søknaden. Du får raskere svar på
        søknaden din hvis vi har all dokumentasjonen når vi starter behandlingen. Du kan bruke
        filformatene PDF, JPG og PNG.
      </BodyLong>
      <BodyLong>Slik bruker du bilder som dokumentasjon i søknaden:</BodyLong>
      <BodyLong spacing>
        <List as="ol">
          <List.Item>Bruk et kamera med god oppløsning.</List.Item>
          <List.Item>Pass på at det er godt lys.</List.Item>
          <List.Item>Legg dokumentet på et bord eller gulv med kontrast til dokumentet.</List.Item>
        </List>
      </BodyLong>

      <Heading size="small" level="3">
        Dokumenter du skal sende inn
      </Heading>

      <Box padding="space-16" background="surface-subtle" borderRadius="large" className="mt-4">
        <VStack gap="8">
          <form method="post" encType="multipart/form-data">
            <FileUploadDropzone
              label="Last opp dokument"
              description={`Maks filstørrelse er ${hentMaksFilStørrelseMB()} MB, og tillatte filtyper er ${hentTillatteFiltyperTekst()}.`}
              fileLimit={{ max: MAX_ANTALL_FILER, current: dokumentkravFiler.length }}
              accept={hentTillatteFiltyperString()}
              onSelect={(filer) => lastOppfiler(filer)}
            />
          </form>
        </VStack>
        <VStack gap="4" className="mt-8">
          {dokumentkravFiler?.map((fil, _index) => (
            <FileUploadItem
              key={_index}
              file={{ name: fil.filnavn, size: fil.storrelse }}
              status={fil.status === "LASTER_OPP" ? "uploading" : "idle"}
              translations={{ uploading: "Laster opp..." }}
              error={fil.feil ? hentFilFeilmelding(fil.feil) : undefined}
              button={{
                action: "delete",
                onClick: () => slettEnFil(fil.filsti),
              }}
            />
          ))}
        </VStack>
      </Box>
    </div>
  );
}
