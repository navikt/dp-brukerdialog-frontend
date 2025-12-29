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

  const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);

  if (dokumentasjonskravResponse.ok) {
    const dokumentasjonskrav = (await dokumentasjonskravResponse.json()).flatMap(
      (dokumentasjonskrav: string) => JSON.parse(dokumentasjonskrav)
    );

    return {
      dokumentasjonskrav,
    };
  }

  return {
    dokumentasjonskrav: null,
  };
}

export default function EttersendingRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const dokumentasjonskrav = loaderData?.dokumentasjonskrav || [];

  const dokumentasjonSomSkalSendesAvDeg = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  return (
    <DokumentasjonskravProvider dokumentasjonskrav={dokumentasjonSomSkalSendesAvDeg || []}>
      <EttersendingView />
    </DokumentasjonskravProvider>
  );
}
