import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav as hentDokumentasjonskravene } from "~/models/hent-dokumentasjonskrav.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { dokumentkravSvarSenderSenere } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { EttersendingProvider } from "~/seksjon/ettersending/ettersending.context";
import { EttersendingView } from "~/seksjon/ettersending/EttersendingView";

export type Ettersending = {
  søknadId: string;
  dokumentasjonskravene: Dokumentasjonskrav[];
  ettersendingene: Dokumentasjonskrav[];
};

export async function loader({ request, params }: LoaderFunctionArgs<Ettersending>) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentDokumentasjonskravene(request, params.soknadId);

  if (!response.ok) {
    return { søknadId: params.soknadId, dokumentasjonskravene: [], ettersendingene: [] };
  }

  const dokumentasjonskraveneJson = await response.json();
  const dokumentasjonskravene = dokumentasjonskraveneJson.flatMap((krav: string) =>
    JSON.parse(krav)
  );
  const ettersendingene = dokumentasjonskravene.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  if (ettersendingene.length === 0) {
    return redirect(`/soknad/${params.soknadId}/kvittering`);
  }

  return {
    søknadId: params.soknadId,
    dokumentasjonskravene: dokumentasjonskravene || [],
    ettersendingene: ettersendingene || [],
  };
}

export default function EttersendingSide() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <EttersendingProvider
      dokumentasjonskravene={loaderData.dokumentasjonskravene}
      ettersendingene={loaderData.ettersendingene}
      søknadId={loaderData.søknadId}
    >
      <EttersendingView />
    </EttersendingProvider>
  );
}
