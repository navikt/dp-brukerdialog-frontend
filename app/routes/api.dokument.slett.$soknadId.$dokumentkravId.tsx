import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.dokumentkravId, "Dokumentkrav ID er påkrevd");

  // Her kommer sletting av dokument
}
