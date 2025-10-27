import { Dokumentasjonskrav, DokumentasjonView } from "~/seksjon/dokumentasjon/DokumentasjonView";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";

type Seksjon = {
  seksjonId: string;
  data: string;
};

type SeksjonsResponseType = {
  versjon: number;
  seksjon?: object;
  dokumentasjonskrav?: Dokumentasjonskrav[];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentAlleSeksjoner(request, params.soknadId);

  if (response.status !== 200) {
    return [] as SeksjonsResponseType[];
  }

  const seksjoner: Seksjon[] = await response.json();
  const dokumentasjonskrav: SeksjonsResponseType[] = seksjoner
    .map((seksjon: Seksjon) => JSON.parse(seksjon.data))
    .filter((seksjon: SeksjonsResponseType) => seksjon.dokumentasjonskrav);
  return dokumentasjonskrav;
}

export default function DokumentasjonRoute() {
  const loaderData = useLoaderData<typeof loader>();
  console.log("loaderData", loaderData);
  return <DokumentasjonView />;
}
