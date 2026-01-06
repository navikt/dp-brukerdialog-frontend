import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { dokumentkravSvarSenderSenere } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { EttersendingProvider } from "~/seksjon/ettersending/ettersending.context";
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

  const dokumentkravJson = await response.json();
  const dokumentasjonskrav = dokumentkravJson.flatMap((krav: string) => JSON.parse(krav));

  if (dokumentasjonskrav.length === 0) {
    return redirect(`/soknad/${params.soknadId}/kvittering`);
  }

  return { dokumentasjonskrav };
}

export default function EttersendingRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const dokumentasjonskrav = loaderData?.dokumentasjonskrav || [];
  const ettersendinger = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  return (
    <EttersendingProvider dokumentasjonskrav={dokumentasjonskrav} ettersendinger={ettersendinger}>
      <EttersendingView />
    </EttersendingProvider>
  );
}
