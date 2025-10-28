import { parseFormData } from "@remix-run/form-data-parser";
import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const søknadId = params.soknadId as string;
  const seksjonId = params.seksjonId as string;
  const formData = await parseFormData(request);
  const seksjonsdata = JSON.parse(formData.get("seksjonsdata") as string);

  return await lagreSeksjon(request, søknadId, seksjonId, seksjonsdata);
}
