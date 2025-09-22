import { Alert, FileObject, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { useState } from "react";
import { useActionData, useParams } from "react-router";
import { action } from "~/routes/$soknadId.utdanning";

export function DokumentasjonView() {
  const actionData = useActionData<typeof action>();
  const { soknadId } = useParams();

  const [filer, setFiler] = useState<FileObject[]>([]);
  const [filOpplastingsFeil, setFilOpplastingsFeil] = useState<Record<string, string>>({});
  const [opplastere, setOpplastere] = useState<string[]>([]);

  // Todo,
  // Sette typer av filer vi tillater
  // Sette begrensninger for total filstørrelse
  // Sette totalt 5 filer
  // Her sette vi totalt, ikke per enkelt fil

  // F.eks fra Søknadsdialog
  // export const ALLOWED_FILE_FORMATS = ["image/png", "image/jpg", "image/jpeg", "application/pdf"];
  // export const MAX_TOTAL_DOKUMENTKRAV_FILE_SIZE = 52428800;

  async function lastOppfiler(filer: FileObject[]) {
    setFiler(filer);
    setOpplastere(filer.map((f) => f.file.name));
    setFilOpplastingsFeil({});

    try {
      await Promise.all(
        filer.map(async (fileObj) => {
          const formData = new FormData();
          formData.append("file", fileObj.file);

          const response = await fetch(`/api/dokument/${soknadId}/1014.1`, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            setFilOpplastingsFeil((prev) => ({
              ...prev,
              [fileObj.file.name]: response.statusText || "Feil ved opplasting",
            }));

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

  return (
    <div className="innhold">
      <h2>Dokumenter</h2>
      <VStack gap="20">
        <VStack gap="6">
          <form method="post" encType="multipart/form-data">
            <FileUploadDropzone
              label="Last opp dokument"
              fileLimit={{ max: 5, current: filer.length }}
              accept={".png, .jpg, .jpeg, .pdf"}
              onSelect={(newFiles) => lastOppfiler(newFiles)}
            />
          </form>
          {filer.map((file) => (
            <FileUploadItem
              key={file.file.name}
              file={file.file}
              status={opplastere.includes(file.file.name) ? "uploading" : "idle"}
              error={filOpplastingsFeil[file.file.name]}
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
