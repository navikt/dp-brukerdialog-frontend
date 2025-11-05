import { parseFormData } from "@remix-run/form-data-parser";
import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { normaliserFormData } from "~/utils/action.utils.server";

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const søknadId = params.soknadId as string;
  const seksjonId = params.seksjonId as string;
  const formData = await parseFormData(request);
  const seksjonsData = JSON.parse(formData.get("seksjonsdata") as string);

  const putSeksjonRequestBody = {
    seksjonsvar: JSON.stringify({
      seksjon: normaliserFormData(seksjonsData),
      versjon: Number(1),
    }),
    pdfGrunnlag: "{}",
  };

  return await lagreSeksjon(request, søknadId, seksjonId, putSeksjonRequestBody);
}
