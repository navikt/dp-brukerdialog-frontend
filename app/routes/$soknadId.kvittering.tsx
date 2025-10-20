import invariant from "tiny-invariant";
import KvitteringView from "~/seksjon/kvittering/KvitteringView";
import { LoaderFunctionArgs } from "react-router";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  return null;
}

export default function Kvittering() {
  return <KvitteringView />;
}
