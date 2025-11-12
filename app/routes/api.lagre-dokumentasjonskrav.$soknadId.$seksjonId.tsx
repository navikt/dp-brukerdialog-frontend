import { parseFormData } from "@remix-run/form-data-parser";
import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { lagreDokumentasjonskrav } from "~/models/lagre-dokumentasjonskrav.server";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const søknadId = params.soknadId as string;
  const seksjonId = params.seksjonId as string;
  const formData = await parseFormData(request);
  const oppdatertDokumentasjonskrav = formData.get("oppdatertDokumentasjonskrav") as string;

  return await lagreDokumentasjonskrav(request, søknadId, seksjonId, oppdatertDokumentasjonskrav);
}
