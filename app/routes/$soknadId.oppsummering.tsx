import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentOppsummering } from "~/models/hent-oppsummering.server";
import OppsummeringView from "~/seksjon/oppsummering/OppsummeringView";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { sendSøknad } from "~/models/send-søknad.server";

type OppsummeringSeksjon = {
  seksjonsUrl: string;
  seksjonId: string;
  data: string;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<OppsummeringSeksjon[] | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  let oppsummering = undefined;

  const response = await hentOppsummering(request, params.soknadId);

  if (response.status === 200) {
    oppsummering = await response.json();
    oppsummering = oppsummering.map((seksjon: any) => ({
      seksjonsUrl: `/${params.soknadId}/${seksjon.seksjonId}`,
      seksjonId: seksjon.seksjonId,
      data: seksjon.data,
    }));
  }

  const personaliaResponse = await hentPersonalia(request);
  if (personaliaResponse.status !== 200) {
    console.error("Feil ved henting av personalia");
    return oppsummering;
  }

  const personaliaResponseJson = await personaliaResponse.json();
  const { fornavn, mellomnavn, etternavn, ident, folkeregistrertAdresse } =
    personaliaResponseJson.person;
  const personalia = {
    navn: fornavn + (mellomnavn ? ` ${mellomnavn}` : "") + ` ${etternavn}`,
    personnummer: ident,
    folkeregistrertAdresse: folkeregistrertAdresse.adresselinje1,
    folkeregistrertPostnummer: folkeregistrertAdresse.postnummer,
    folkeregistrertPoststed: folkeregistrertAdresse.poststed,
  };

  oppsummering = [
    ...oppsummering,
    {
      seksjonsUrl: `/${params.soknadId}/personalia`,
      seksjonId: "personalia",
      data: JSON.stringify(personalia),
    },
  ];
  return oppsummering;
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const nesteSeksjonId = "kvittering";

  const response = await sendSøknad(request, params.soknadId);

  if (response.status === 200) {
    return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
  } else {
    return {
      error: "Noe gikk galt ved innsending av søknaden.",
    };
  }
}

export default function Oppsummering() {
  return <OppsummeringView />;
}
