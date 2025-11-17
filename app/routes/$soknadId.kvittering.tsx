import invariant from "tiny-invariant";
import KvitteringView from "~/seksjon/kvittering/KvitteringView";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentAlleSeksjoner(request, params.soknadId);

  if (response.ok) {
    return await response.json();
  }

  return null;
}

export default function Kvittering() {
  const loaderData = useLoaderData<typeof loader>();

  if (!loaderData) {
    return null;
  }

  return <KvitteringView />;
}
