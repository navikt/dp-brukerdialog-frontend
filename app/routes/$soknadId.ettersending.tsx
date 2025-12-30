import { LoaderFunctionArgs, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { DokumentasjonskravProvider } from "~/seksjon/dokumentasjon/dokumentasjonskrav.context";
import { dokumentkravSvarSenderSenere } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { EttersendingView } from "~/seksjon/ettersending/EttersendingView";

export type EttersendingSeksjon = {
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

export async function loader({ request, params }: LoaderFunctionArgs<EttersendingSeksjon>) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentDokumentasjonskrav(request, params.soknadId);
  if (!response.ok) {
    return { dokumentasjonskrav: null };
  }

  const data = await response.json();
  const dokumentasjonskrav = data.flatMap((krav: string) => JSON.parse(krav));

  return { dokumentasjonskrav };
}

export default function EttersendingRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const dokumentasjonskrav = loaderData?.dokumentasjonskrav || [];

  return (
    <DokumentasjonskravProvider dokumentasjonskrav={dokumentasjonskrav || []}>
      <EttersendingView />
    </DokumentasjonskravProvider>
  );
}
