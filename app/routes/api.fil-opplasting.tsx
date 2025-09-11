import { LoaderFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { fileStorage, getStorageKey } from "~/models/fil-opplasting.server";

export async function loader({ params }: LoaderFunctionArgs) {
  invariant(params.id, "Søknad ID er påkrevd");
  const storageKey = getStorageKey(params.id);
  const file = await fileStorage.get(storageKey);

  if (!file) {
    throw new Response("User avatar not found", {
      status: 404,
    });
  }

  return new Response(file.stream(), {
    headers: {
      "Content-Type": file.type,
      "Content-Disposition": `attachment; filename=${file.name}`,
    },
  });
}
