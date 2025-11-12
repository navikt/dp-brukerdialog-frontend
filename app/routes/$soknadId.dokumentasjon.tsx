import { LoaderFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { DokumentasjonView } from "~/seksjon/dokumentasjon/DokumentasjonView";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentDokumentasjonskrav(request, params.soknadId);

  if (!response.ok) {
    return [] as Dokumentasjonskrav[];
  }

  const data = await response.json();
  const dokumentasjonskrav: Dokumentasjonskrav[] = JSON.parse(data);

  return dokumentasjonskrav;
}

export default function DokumentasjonRoute() {
  return <DokumentasjonView />;
}
