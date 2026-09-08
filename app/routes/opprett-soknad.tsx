import { LoaderFunctionArgs, redirect } from "react-router";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import { OpprettSøknadView } from "~/seksjon/opprett-søknad/OpprettSøknadView";
import { pdfGrunnlag } from "../seksjon/opprett-søknad/opprett-søknad.komponenter";
import { Personalia } from "./$soknadId.personalia";
import { Route } from "./+types/opprett-soknad";

const SEKSJON_ID = "startside";
const NESTE_SEKSJON_ID = "personalia";

export type OpprettSøknadSide = {
  personalia: Personalia | null;
};

export async function loader({ request }: LoaderFunctionArgs): Promise<OpprettSøknadSide> {
  const personaliaResponse = await hentPersonalia(request);

  return {
    personalia: personaliaResponse.ok ? await personaliaResponse.json() : null,
  };
}

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
