import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { dokumentkravSvarSenderSenere } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { EttersendingProvider } from "~/seksjon/ettersending/ettersending.context";
import { EttersendingView } from "~/seksjon/ettersending/EttersendingView";

export type Ettersending = {
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
  ettersending: Dokumentasjonskrav[] | null;
};

export async function loader({ request, params }: LoaderFunctionArgs<Ettersending>) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentDokumentasjonskrav(request, params.soknadId);

  if (!response.ok) {
    return { dokumentasjonskrav: null, ettersending: null };
  }

  const dokumentkravJson = await response.json();
  const dokumentasjonskrav = dokumentkravJson.flatMap((krav: string) => JSON.parse(krav));
  const ettersending = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  if (ettersending.length === 0) {
    return redirect(`/soknad/${params.soknadId}/kvittering`);
  }

  return { dokumentasjonskrav: dokumentasjonskrav || [], ettersending: ettersending || [] };
}

export default function EttersendingRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <EttersendingProvider
      dokumentasjonskrav={loaderData?.dokumentasjonskrav}
      ettersending={loaderData?.ettersending}
    >
      <EttersendingView />
    </EttersendingProvider>
  );
}
