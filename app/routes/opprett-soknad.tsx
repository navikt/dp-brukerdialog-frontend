import { redirect } from "react-router";
import {
  ArbeidssøkerStatus,
  hentArbeidssøkerStatus,
} from "~/models/hent-arbeidssøkerStatus.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import { OpprettSøknadView } from "~/seksjon/opprett-søknad/OpprettSøknadView";
import { pdfGrunnlag } from "../seksjon/opprett-søknad/opprett-søknad.komponenter";
import { Route } from "./+types/opprett-soknad";

const SEKSJON_ID = "startside";
const NESTE_SEKSJON_ID = "personalia";

type LoaderData = {
  arbeidssøkerStatus: ArbeidssøkerStatus;
};

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderData | Response> {
  const arbeidssøkerStatus = await hentArbeidssøkerStatus(request);

  if (arbeidssøkerStatus === "REGISTRERT") {
    return redirect("/opprett-soknad");
  }

  return { arbeidssøkerStatus };
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
