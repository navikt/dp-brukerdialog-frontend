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

export type Fil = {
  filnavn: string;
  urn: string;
  tidspunkt: string;
  storrelse: number;
  filsti: string;
};

type OpplastingFeil = {
  filNavn: string;
  typeFeil: "FIL_FOR_STOR" | "UGYLDIG_FORMAT" | "TEKNISK_FEIL";
};

export function DokumentasjonView() {
  const { soknadId } = useParams();
  const [feilmeldinger, setFeilmeldinger] = useState<OpplastingFeil[]>([]);
  const [lasterOppState, setLasterOppState] = useState<string[]>([]);
  const [filer, setFiler] = useState<FileObject[]>([]);
  const [filerLastetOpp, setFilerLastetOpp] = useState<Fil[]>([]);

  // Todo,
  // Håndtere retry ved feil
  // Finn ut hvordan vi skal hente dokumentkravId
  async function lastOppfiler(filer: FileObject[]) {
    setFiler(filer);
    setLasterOppState(filer.map((f) => f.file.name));
    setFeilmeldinger([]);

    let harFeil = false;

    filer.forEach((fileObj) => {
      const fileName = fileObj.file.name.toLowerCase();
      const erGyldigFormat = TILLATTE_FILTYPER.some((format) => fileName.endsWith(format));

      if (!erGyldigFormat) {
        setFeilmeldinger((prev) => [
          ...prev.filter((err) => err.filNavn !== fileObj.file.name),
          { filNavn: fileObj.file.name, typeFeil: "UGYLDIG_FORMAT" },
        ]);
        harFeil = true;
        return;
      }

      if (fileObj.file.size > MAX_FIL_STØRRELSE) {
        setFeilmeldinger((prev) => [
          ...prev.filter((err) => err.filNavn !== fileObj.file.name),
          { filNavn: fileObj.file.name, typeFeil: "FIL_FOR_STOR" },
        ]);
        harFeil = true;
      }
    });

    if (harFeil) {
      setLasterOppState([]);
      return;
    }

    try {
      const opplastedeFiler: Fil[] = (
        await Promise.all(
          filer.map(async (fileObj) => {
            const formData = new FormData();
            formData.append("file", fileObj.file);

            const response = await fetch(`/api/dokument/last-opp/${soknadId}/1014.1`, {
              method: "POST",
              body: formData,
            });

            if (!response.ok) {
              setFeilmeldinger((prev) => [
                ...prev.filter((err) => err.filNavn !== fileObj.file.name),
                { filNavn: fileObj.file.name, typeFeil: "TEKNISK_FEIL" },
              ]);

              return undefined;
            }

            return await response.json();
          })
        )
      )
        .flat()
        .filter(Boolean);

      setFilerLastetOpp(opplastedeFiler);
    } catch (error) {
      console.error(error);
    } finally {
      setLasterOppState([]);
    }
  }

  function hentFilFeilmelding(filnavn: string) {
    const harEnFeil = feilmeldinger.find((err) => err.filNavn === filnavn)?.typeFeil;

    if (!harEnFeil) {
      return undefined;
    }

    switch (harEnFeil) {
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

      setFilerLastetOpp((prev) => prev.filter((fil) => fil.filsti !== filsti));

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
              fileLimit={{ max: MAX_ANTALL_FILER, current: filer.length }}
              accept={hentTillatteFiltyperString()}
              onSelect={(filer) => lastOppfiler(filer)}
            />
          </form>
        </VStack>
        <VStack gap="4" className="mt-8">
          {filerLastetOpp?.map((fil) => (
            <FileUploadItem
              key={fil.filsti}
              file={{ name: fil.filnavn, size: fil.storrelse }}
              status={lasterOppState.includes(fil.filsti) ? "uploading" : "idle"}
              translations={{ uploading: "Laster opp..." }}
              error={hentFilFeilmelding(fil.filsti)}
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
