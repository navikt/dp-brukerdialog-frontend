import { Alert, FileObject, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { useState } from "react";
import { useActionData, useParams } from "react-router";
import { action } from "~/routes/$soknadId.utdanning";
import {
  hentMaksFilStørrelseMB,
  MAX_ANTALL_FILER,
  MAX_FIL_STØRRELSE,
  TILATT_FIL_TYPER,
} from "~/utils/dokument.utils";

type FilOpplastingError = {
  filNavn: string;
  typeFeil: "FIL_FOR_STOR" | "TEKSNISK_FEIL";
};

export function DokumentasjonView() {
  const actionData = useActionData<typeof action>();
  const { soknadId } = useParams();

  const [filer, setFiler] = useState<FileObject[]>([]);
  const [filOpplastingsFeil, setFilOpplastingsFeil] = useState<FilOpplastingError[]>([]);
  const [opplastere, setOpplastere] = useState<string[]>([]);

  // Todo,
  // Håntere sletting
  // Håndtere retry ved feil
  // Finn ut hvordan vi skal hente dokumentkravId
  // Sette begrensning på antall filer
  // Finn ut filstørreslse begrensning, om det er totalt eller per fil

  // F.eks fra Søknadsdialog
  // export const ALLOWED_FILE_FORMATS = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];
  // export const MAX_TOTAL_DOKUMENTKRAV_FILE_SIZE = 52428800;

  async function lastOppfiler(filer: FileObject[]) {
    setFiler(filer);
    setOpplastere(filer.map((f) => f.file.name));
    setFilOpplastingsFeil([]);

    let harFeil = false;

    filer.forEach((fileObj) => {
      if (fileObj.file.size > MAX_FIL_STØRRELSE) {
        setFilOpplastingsFeil((prev) => [
          ...prev.filter((err) => err.filNavn !== fileObj.file.name),
          { filNavn: fileObj.file.name, typeFeil: "FIL_FOR_STOR" },
        ]);
        harFeil = true;
      }
    });

    if (harFeil) {
      setOpplastere([]); // Ikke last opp filer med feil
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
            setFilOpplastingsFeil((prev) => [
              ...prev.filter((err) => err.filNavn !== fileObj.file.name),
              { filNavn: fileObj.file.name, typeFeil: "TEKSNISK_FEIL" },
            ]);
            return;
          }

          await response.json();
        })
      );
    } catch (error) {
      console.error(error);
    } finally {
      setOpplastere([]);
    }
  }

  function hentFilFeilmelding(filnavn: string) {
    const harEnFeil = filOpplastingsFeil.find((err) => err.filNavn === filnavn)?.typeFeil;

    if (!harEnFeil) {
      return undefined;
    }

    switch (harEnFeil) {
      case "FIL_FOR_STOR":
        return `Filstørrelsen overskrider ${hentMaksFilStørrelseMB()} MB.`;
      case "TEKSNISK_FEIL":
        return "Det oppstod en teknisk feil.";
      default:
        return "Ukjent feil.";
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
              fileLimit={{ max: MAX_ANTALL_FILER, current: filer.length }}
              accept={TILATT_FIL_TYPER}
              onSelect={(filer) => lastOppfiler(filer)}
            />
          </form>
          {filer.map((file) => (
            <FileUploadItem
              key={file.file.name}
              file={file.file}
              status={opplastere.includes(file.file.name) ? "uploading" : "idle"}
              error={hentFilFeilmelding(file.file.name)}
              button={{
                action: "delete",
                onClick: () => setFiler(filer.filter((f) => f.file.name !== file.file.name)),
              }}
            />
          ))}

          {actionData && (
            <Alert variant="error" className="mt-4">
              {actionData.error}
            </Alert>
          )}
        </VStack>
      </VStack>
    </div>
  );
}
