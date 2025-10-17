import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentOppsummering } from "~/models/hent-oppsummering.server";
import OppsummeringView from "~/seksjon/oppsummering/OppsummeringView";

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
