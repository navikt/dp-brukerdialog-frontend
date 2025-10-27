import { DokumentasjonView } from "~/seksjon/dokumentasjon/DokumentasjonView";
import { LoaderFunctionArgs, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";
import { DokumentasjonskravType } from "~/seksjon/dokumentasjon/Dokumentasjonskrav";

type Seksjon = {
  seksjonId: string;
  data: string;
};

type SeksjonsResponseType = {
  versjon: number;
  seksjon?: object;
  dokumentasjonskrav?: DokumentasjonskravType[];
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
  return <DokumentasjonView />;
}
