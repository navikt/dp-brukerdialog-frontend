import { redirect } from "react-router";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import { OpprettSøknadView } from "~/seksjon/opprett-søknad/OpprettSøknadView";
import { Route } from "./+types/opprett-soknad";
import { pdfGrunnlag } from "../seksjon/opprett-søknad/opprett-soknad.komponenter";

const SEKSJON_ID = "startside";
const NESTE_SEKSJON_ID = "personalia";

export async function action({ request }: Route.ActionArgs) {
  const opprettSøknadResponse = await opprettSoknad(request);

  if (!opprettSøknadResponse.ok) {
    return {
      error: "Feil ved opprettelse av søknad",
    };
  }

  const soknadId = await opprettSøknadResponse.text();
  const formData = await request.formData();
  const pdfGrunnlagVerdi = formData.get(pdfGrunnlag);

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      versjon: 1,
    }),
    pdfGrunnlag: pdfGrunnlagVerdi,
  };

  const lagreSeksjonResponse = await lagreSeksjon(
    request,
    soknadId,
    SEKSJON_ID,
    putSeksjonRequestBody
  );

  if (!lagreSeksjonResponse.ok) {
    console.error("Klarte ikke lagre pdfGrunnlag for startside. SøknadId:", soknadId);
  }

  return redirect(`/${soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function OpprettSoknadSide() {
  return <OpprettSøknadView />;
}
