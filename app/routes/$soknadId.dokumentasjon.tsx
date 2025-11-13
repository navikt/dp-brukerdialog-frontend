import { LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { DokumentasjonskravProvider } from "~/seksjon/dokumentasjon/dokumentasjonskrav.context";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { DokumentasjonView } from "~/seksjon/dokumentasjon/DokumentasjonView";

export type DokumentasjonskravSeksjon = {
  dokumentasjonskrav: Dokumentasjonskrav[];
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<DokumentasjonskravSeksjon | Response> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);

  if (!dokumentasjonskravResponse.ok) {
    console.log("ingenting");
    return redirect(`/${params.soknadId}/oppsummering`);
  }

  const dokumentasjonskravData = await dokumentasjonskravResponse.json();

  // Sjekk FØRST om data er gyldig
  // Todo: finn ut hva backend returnerer. Her kan frontend lagre feil info til backend også

  console.log(`🔥 dokumentasjonskravData :`, dokumentasjonskravData);
  if (
    !dokumentasjonskravData ||
    dokumentasjonskravData.length === 0 ||
    dokumentasjonskravData[0] === null
  ) {
    return redirect(`/${params.soknadId}/oppsummering`);
  }

  const dokumentasjonskrav: Dokumentasjonskrav[] = JSON.parse(dokumentasjonskravData[0]);

  if (dokumentasjonskrav.length === 0) {
    return redirect(`/${params.soknadId}/oppsummering`);
  }

  return { dokumentasjonskrav: dokumentasjonskrav };
}

export default function DokumentasjonRoute() {
  const loaderData = useLoaderData<typeof loader>();

  console.log(`🔥 loaderData :`, loaderData);

  return (
    <DokumentasjonskravProvider dokumentasjonskrav={loaderData.dokumentasjonskrav || []}>
      <DokumentasjonView />
    </DokumentasjonskravProvider>
  );
}
