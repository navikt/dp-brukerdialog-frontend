import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentOppsummering } from "~/models/hent-oppsummering.server";
import OppsummeringView from "~/seksjon/oppsummering/OppsummeringView";
import { hentPersonalia } from "~/models/hent-personalia.server";

type OppsummeringSeksjon = {
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
      seksjonId: "personalia",
      data: JSON.stringify(personalia),
    },
  ];
  return oppsummering;
}

export async function action({ params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const nesteSeksjonId = "kvittering";

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function Oppsummering() {
  return <OppsummeringView />;
}
