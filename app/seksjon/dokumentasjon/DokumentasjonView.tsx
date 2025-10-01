import { FileObject, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { use, useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { loader } from "~/routes/$soknadId.dokumentasjon";
import {
  hentMaksFilStørrelseMB,
  hentTillatteFiltyperString,
  hentTillatteFiltyperTekst,
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  TILLATTE_FILTYPER,
} from "~/utils/dokument.utils";

type OpplastingFeil = {
  filNavn: string;
  typeFeil: "FIL_FOR_STOR" | "UGYLDIG_FORMAT" | "TEKNISK_FEIL";
};

export function DokumentasjonView() {
  const { soknadId } = useParams();

  const loaderData = useLoaderData<typeof loader>();

  const [filer, setFiler] = useState<FileObject[]>([]);
  const [feilmeldinger, setFeilmeldinger] = useState<OpplastingFeil[]>([]);
  const [lasterOppState, setLasterOppState] = useState<string[]>([]);

  console.log(loaderData);

  // Todo,
  // Håntere sletting
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
            return;
          }

          await response.json();
        })
      );
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

  async function slettFil(filnavn: string) {
    try {
      const response = await fetch(`/api/dokument/slett/${soknadId}/1014.1`, {
        method: "POST",
      });

      if (!response.ok) {
        return;
      }

      setFiler(filer.filter((f) => f.file.name !== filnavn));

      await response.json();
    } catch (error) {
      setFeilmeldinger(feilmeldinger.filter((err) => err.filNavn !== filnavn));
      console.error(error);
    } finally {
    }
  }

  return (
    <div className="innhold">
      <h2>Dokumenter</h2>
      <VStack gap="20">
        <VStack gap="6">
          <form method="post" encType="multipart/form-data">
            <FileUploadDropzone
              label="Last opp dokument"
              description={`Maks filstørrelse er ${hentMaksFilStørrelseMB()} MB, og tillatte filtyper er ${hentTillatteFiltyperTekst()}.`}
              fileLimit={{ max: MAX_ANTALL_FILER, current: filer.length }}
              accept={hentTillatteFiltyperString()}
              onSelect={(filer) => lastOppfiler(filer)}
            />
          </form>
          {filer.map((file) => (
            <FileUploadItem
              key={file.file.name}
              file={file.file}
              status={lasterOppState.includes(file.file.name) ? "uploading" : "idle"}
              error={hentFilFeilmelding(file.file.name)}
              button={{
                action: "delete",
                onClick: () => slettFil(file.file.name),
              }}
            />
          ))}
        </VStack>
      </VStack>
    </div>
  );
}
