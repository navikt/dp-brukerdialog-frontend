import { LoaderFunctionArgs, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { DokumentasjonskravProvider } from "~/seksjon/dokumentasjon/dokumentasjonskrav.context";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { DokumentasjonView } from "~/seksjon/dokumentasjon/DokumentasjonView";

export type DokumentasjonskravSeksjon = {
  dokumentasjonskrav?: Dokumentasjonskrav[];
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<DokumentasjonskravSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);

  if (!dokumentasjonskravResponse.ok) {
    return { dokumentasjonskrav: [] };
  }

  const dokumentasjonskravData = await dokumentasjonskravResponse.json();
  const dokumentasjonskrav: Dokumentasjonskrav[] = JSON.parse(dokumentasjonskravData);

  return { dokumentasjonskrav: dokumentasjonskrav };
}

export default function DokumentasjonRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <DokumentasjonskravProvider dokumentasjonskrav={loaderData.dokumentasjonskrav || []}>
      <DokumentasjonView />
    </DokumentasjonskravProvider>
  );
}
