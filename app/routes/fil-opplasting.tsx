import { VStack } from "@navikt/ds-react";
import { FileObject, FileUploadDropzone, FileUploadItem } from "@navikt/ds-react/FileUpload";
import { FileUpload, parseFormData } from "@remix-run/form-data-parser";
import { useState } from "react";
import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { SoknadIkon } from "~/components/illustrasjon/soknadIkon";
import { fileStorage, getStorageKey } from "~/models/fil-opplasting.server";

export async function action({ request, params }: ActionFunctionArgs) {
  async function uploadHandler(fileUpload: FileUpload) {
    invariant(params.id, "Søknad ID er påkrevd");

    if (fileUpload.fieldName === "avatar" && fileUpload.type.startsWith("image/")) {
      let storageKey = getStorageKey(params.id);

      // FileUpload objects are not meant to stick around for very long (they are
      // streaming data from the request.body); store them as soon as possible.
      await fileStorage.set(storageKey, fileUpload);

      // Return a File for the FormData object. This is a LazyFile that knows how
      // to access the file's content if needed (using e.g. file.stream()) but
      // waits until it is requested to actually read anything.
      return fileStorage.get(storageKey);
    }
  }

  const formData = await parseFormData(request, uploadHandler);
}

export default function UserPage() {
  const [filer, setFiler] = useState<FileObject[]>([]);
  const [lasterOpp, setLasterOpp] = useState(false);

  // Todo:
  // Eksempel:  const fileResponse = await saveDokumenkravFile(file, uuid, dokumentkrav.id);
  // 1. Her trenger jeg å sende med selve filen, søknadId og dokumentkravId
  // 2. saveDokumenkravFile skal kalle et endpoint som lagrer

  // Her er er funksjonen som skal ta i mot filen
  // export async function saveDokumenkravFile(file: File, uuid: string, dokumentkravId: string) {
  //   const requestData = new FormData();
  //   requestData.append("file", file);

  //   // Do NOT specify content-type here, it gets browser generated with the correct boundary by default
  //   return fetch(api(`/documentation/${uuid}/${dokumentkravId}/file/save`), {
  //     method: "POST",
  //     headers: {
  //       accept: "application/json",
  //     },
  //     body: requestData,
  //   });
  // }

  // Når opplasting er vellykket,

  function lastOppfil(newFiles: FileObject[]) {
    console.log("last opp fil");
    setLasterOpp(true);

    setTimeout(() => {
      setLasterOpp(false);
    }, 1000); // 1000 ms = 1 sekund

    console.log(newFiles);
    setFiler(newFiles);
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="soknad-header">
        <SoknadIkon />
        <h1>Søknad om dagpenger</h1>
      </div>
      <div>
        <h1>Fil opplasting</h1>
        {/* <form
          method="post"
          // The form's enctype must be set to "multipart/form-data" for file uploads
          encType="multipart/form-data"
        >
          <input type="file" name="avatar" accept="image/*" />
          <button>Submit</button>
        </form> */}

        <VStack gap="space-24">
          <FileUploadDropzone
            label="Last opp dokument"
            fileLimit={{ max: 5, current: filer.length }}
            // multiple={false}
            accept={".png, .jpg, .jpeg, .pdf"}
            onSelect={(newFiles) => lastOppfil(newFiles)}
          />
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
        </VStack>
      </div>
    </main>
  );
}
