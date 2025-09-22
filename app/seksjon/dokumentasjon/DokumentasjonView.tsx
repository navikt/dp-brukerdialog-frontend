import { Alert, FileObject, VStack } from "@navikt/ds-react";
import { FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { useState } from "react";
import { useActionData, useParams } from "react-router";
import { action } from "~/routes/$soknadId.utdanning";

export function DokumentasjonView() {
  const actionData = useActionData<typeof action>();
  const { soknadId } = useParams();

  const [filer, setFiler] = useState<FileObject[]>([]);
  const [lasterOpp, setLasterOpp] = useState(false);

  async function lastOppfil(newFiles: FileObject[]) {
    //Todo:
    // Håndter flere filer
    // Håndter feil
    // Håndter loading state
    // Sette max filstørrelse
    // Sette max antall filer

    const file = newFiles[0]?.file;
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`/api/dokument/${soknadId}/1014.1`, {
      method: "POST",
      body: formData,
    });

    console.log(await response.json());

    setTimeout(() => {
      setLasterOpp(false);
    }, 1000);

    setFiler(newFiles);
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
              onSelect={(newFiles) => lastOppfil(newFiles)}
            />
          </form>
          {filer.map((file) => (
            <FileUploadItem
              key={file.file.name}
              file={file.file}
              status={lasterOpp ? "uploading" : "idle"}
              button={{
                action: "delete",
                onClick: () => setFiler([]),
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
