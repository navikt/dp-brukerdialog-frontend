import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav as hentDokumentasjonskraver } from "~/models/hent-dokumentasjonskrav.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { dokumentkravSvarSenderSenere } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";
import { EttersendingerProvider } from "~/seksjon/ettersending/ettersending.context";
import { EttersendingView } from "~/seksjon/ettersending/EttersendingView";

export type Ettersending = {
  søknadId: string;
  dokumentasjonskraver: Dokumentasjonskrav[];
  ettersendinger: Dokumentasjonskrav[];
};

export async function loader({ request, params }: LoaderFunctionArgs<Ettersending>) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentDokumentasjonskraver(request, params.soknadId);

  if (!response.ok) {
    return { søknadId: params.soknadId, dokumentasjonskraver: [], ettersendinger: [] };
  }

  const dokumentasjonskravJson = await response.json();
  const dokumentasjonskraver = dokumentasjonskravJson.flatMap((krav: string) => JSON.parse(krav));
  const ettersendinger = dokumentasjonskraver.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  if (ettersendinger.length === 0) {
    return redirect(`/soknad/${params.soknadId}/kvittering`);
  }

  return {
    søknadId: params.soknadId,
    dokumentasjonskraver: dokumentasjonskraver || [],
    ettersendinger: ettersendinger || [],
  };
}

export default function EttersendingRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <EttersendingerProvider
      dokumentasjonskraver={loaderData.dokumentasjonskraver}
      ettersendinger={loaderData.ettersendinger}
      søknadId={loaderData.søknadId}
    >
      <EttersendingView />
    </EttersendingerProvider>
  );
}
