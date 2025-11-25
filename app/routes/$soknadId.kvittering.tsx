import { LoaderFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import KvitteringView from "~/seksjon/kvittering/KvitteringView";

export type KvitteringSeksjon = {
  seksjoner: [] | null;
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const seksjonerResponse = await hentAlleSeksjoner(request, params.soknadId);
  const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);

  if (seksjonerResponse.ok && dokumentasjonskravResponse.ok) {
    const dokumentasjonskravData = await dokumentasjonskravResponse.json();

    return {
      seksjoner: await seksjonerResponse.json(),
      dokumentasjonskrav: dokumentasjonskravData.flatMap((krav: string) => JSON.parse(krav)),
    };
  }

  return {
    seksjoner: null,
    dokumentasjonskrav: null,
  };
}

export default function Kvittering() {
  return <KvitteringView />;
}
