import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentOppsummering } from "~/models/hent-oppsummering.server";
import OppsummeringView from "~/seksjon/oppsummering/OppsummeringView";

type OppsummeringSeksjon = {
  seksjonId: string;
  data: string;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<OppsummeringSeksjon[] | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentOppsummering(request, params.soknadId);

  if (response.status !== 200) {
    return undefined;
  }

  return await response.json();
}

export async function action({ params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  console.log("Søknad fullført");
  const nesteSeksjonId = "kvittering";

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function Oppsummering() {
  return <OppsummeringView />;
}
