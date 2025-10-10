import { BodyLong, Box, FileObject, Heading, List, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst,
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  TILLATTE_FILTYPER as TILLATTE_FILFORMAT,
} from "~/utils/dokument.utils";

export type DokumentkravFil = {
  id: string;
  filnavn: string;
  urn?: string;
  tidspunkt?: string;
  storrelse?: number;
  filsti?: string;
  status: MellomlagringStatus;
  feil?: FeilType;
};

type MellomlagringStatus = "LASTER_OPP" | "LASTET_OPP" | "IDLE";
type FeilType = "FIL_FOR_STOR" | "UGYLDIG_FORMAT" | "TEKNISK_FEIL" | "DUPLIKAT_FIL" | "UKJENT_FEIL";

type FilMedFeil = {
  id: string;
  filnavn: string;
  feil: FeilType;
};

type Fil = {
  file: File;
  id: string;
};

export function DokumentasjonView() {
  const { soknadId } = useParams();
  const [dokumentkravFiler, setDokumentkravFiler] = useState<DokumentkravFil[]>([]);

  async function lastOppfiler(filer: FileObject[]) {
    const filerMedFeil: FilMedFeil[] = [];
    const filerKlarTilOpplasting: Fil[] = [];

    filer.forEach((filObj) => {
      const fil = filObj.file;
      const erDuplikat = dokumentkravFiler.some((f) => f.filnavn === fil.name);
      const erGyldigFormat = TILLATTE_FILFORMAT.some((format) => fil.name.endsWith(format));

      if (erDuplikat) {
        filerMedFeil.push({ id: crypto.randomUUID(), filnavn: fil.name, feil: "DUPLIKAT_FIL" });
      } else if (!erGyldigFormat) {
        filerMedFeil.push({ id: crypto.randomUUID(), filnavn: fil.name, feil: "UGYLDIG_FORMAT" });
      } else if (fil.size > MAX_FIL_STØRRELSE) {
        filerMedFeil.push({ id: crypto.randomUUID(), filnavn: fil.name, feil: "FIL_FOR_STOR" });
      } else {
        filerKlarTilOpplasting.push({ file: fil, id: crypto.randomUUID() });
      }
    });

    const feilDokumenter: DokumentkravFil[] = filerMedFeil.map((fil) => ({
      id: fil.id,
      filnavn: fil.filnavn,
      status: "IDLE",
      feil: fil.feil,
    }));

    const opplastingsDokumenter: DokumentkravFil[] = filerKlarTilOpplasting.map((fil) => ({
      id: fil.id,
      filnavn: fil.file.name,
      storrelse: fil.file.size,
      status: "LASTER_OPP",
    }));

    setDokumentkravFiler((prev) => [...prev, ...feilDokumenter, ...opplastingsDokumenter]);

    if (filerKlarTilOpplasting.length === 0) return;

    try {
      const responser = await Promise.all(
        filerKlarTilOpplasting.map(async (fil) => {
          const formData = new FormData();
          formData.append("file", fil.file);

          const url = `/api/dokument/last-opp/${soknadId}/1014.1`;
          const respons = await fetch(url, { method: "POST", body: formData });

          if (!respons.ok) {
            return {
              filnavn: fil.file.name,
              storrelse: fil.file.size,
              status: "IDLE",
              feil: "TEKNISK_FEIL",
              id: fil.id,
            };
          }

          const filer = await respons.json();

          return {
            ...filer[0],
            status: "LASTET_OPP",
            feil: undefined,
            id: fil.id,
          };
        })
      );

      setDokumentkravFiler((prev) =>
        prev.map((fil) => ({ ...fil, ...responser.find((r) => r.id === fil.id) }))
      );
    } catch (error) {
      console.error(error);
    }
  }

  function hentFilFeilmelding(feilType: FeilType) {
    switch (feilType) {
      case "FIL_FOR_STOR":
        return `Filstørrelsen overskrider ${hentMaksFilStørrelseMB()} MB`;
      case "UGYLDIG_FORMAT":
        return "Ugyldig filformat";
      case "TEKNISK_FEIL":
        return "Det oppstod en teknisk feil";
      case "DUPLIKAT_FIL":
        return "Filene er duplikater";
      case "UKJENT_FEIL":
        return "Det oppstod en ukjent feil";
      default:
        return "Det oppstod en ukjent feil";
    }
  }

  async function slettEnFil(fil: DokumentkravFil) {
    if (fil.feil) {
      setDokumentkravFiler((prev) => prev.filter((f) => !(f.filnavn === fil.filnavn && f.feil)));
      return;
    }

    if (!fil.filsti) {
      console.log("Ingen filsti for fil, kan ikke slette");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("filsti", fil.filsti);

      const response = await fetch(`/api/dokument/slett/${soknadId}/1014.1`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        return;
      }

      setDokumentkravFiler((prev) => prev.filter((f) => f.filsti !== fil.filsti));

      return await response.text();
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
          {dokumentkravFiler?.map((fil) => (
            <FileUploadItem
              key={fil.id}
              file={{ name: fil.filnavn, size: fil.storrelse }}
              status={fil.status === "LASTER_OPP" ? "uploading" : "idle"}
              translations={{ uploading: "Laster opp..." }}
              error={fil.feil ? hentFilFeilmelding(fil.feil) : undefined}
              button={{
                action: "delete",
                onClick: () => slettEnFil(fil),
              }}
            />
          ))}
        </VStack>
      </Box>
    </div>
  );
}
