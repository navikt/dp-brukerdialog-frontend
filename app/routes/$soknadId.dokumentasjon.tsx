import { LoaderFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { DokumentasjonView } from "~/seksjon/dokumentasjon/DokumentasjonView";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);

  if (!dokumentasjonskravResponse.ok) {
    return [] as Dokumentasjonskrav[];
  }

  const dokumentasjonskravData = await dokumentasjonskravResponse.json();
  console.log("Dokumentasjonskrav data:", dokumentasjonskravData);
  const dokumentasjonskrav: Dokumentasjonskrav[] = JSON.parse(dokumentasjonskravData);

  return dokumentasjonskrav;
}

export default function DokumentasjonRoute() {
  return <DokumentasjonView />;
}
