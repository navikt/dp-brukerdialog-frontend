import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";
import OppsummeringView from "~/seksjon/oppsummering/OppsummeringView";
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

  const response = await hentAlleSeksjoner(request, params.soknadId);

  if (response.status === 200) {
    oppsummering = await response.json();
    oppsummering = oppsummering.map((seksjon: any) => ({
      seksjonsUrl: `/${params.soknadId}/${seksjon.seksjonId}`,
      seksjonId: seksjon.seksjonId,
      data: seksjon.data,
    }));
  }

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
