import invariant from "tiny-invariant";
import KvitteringView from "~/seksjon/kvittering/KvitteringView";
import { LoaderFunctionArgs } from "react-router";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
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

export default function Kvittering() {
  return <KvitteringView />;
}
