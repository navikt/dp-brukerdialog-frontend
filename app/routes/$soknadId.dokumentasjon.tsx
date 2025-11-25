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

  const response = await hentDokumentasjonskrav(request, params.soknadId);

  if (!response.ok) {
    return redirect(`/${params.soknadId}/oppsummering`);
  }

  const data = await response.json();

  if (data === null) {
    return redirect(`/${params.soknadId}/oppsummering`);
  }

  const dokumentasjonskrav = data.flatMap((krav: string) => JSON.parse(krav));

  return { dokumentasjonskrav };
}

export default function DokumentasjonRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <DokumentasjonskravProvider dokumentasjonskrav={loaderData.dokumentasjonskrav || []}>
      <DokumentasjonView />
    </DokumentasjonskravProvider>
  );
}
