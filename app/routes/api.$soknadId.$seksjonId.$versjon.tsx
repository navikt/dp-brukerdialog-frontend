import { parseFormData } from "@remix-run/form-data-parser";
import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.seksjonId, "Seksjon ID er påkrevd");
  invariant(params.versjon, "Versjon er påkrevd");

  const formData = await parseFormData(request);
  const pdfGrunnlag = formData.get("pdfGrunnlag") as string;

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: params.seksjonId,
      versjon: params.versjon,
    }),
    pdfGrunnlag: pdfGrunnlag,
  };

  return await lagreSeksjon(request, params.soknadId, params.seksjonId, putSeksjonRequestBody);
}
