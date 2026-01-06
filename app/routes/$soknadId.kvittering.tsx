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

export async function loader({ request, params }: LoaderFunctionArgs<KvitteringSeksjon>) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const alleSeksjonerResponse = await hentAlleSeksjoner(request, params.soknadId);

  if (alleSeksjonerResponse.ok) {
    const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);
    const dokumentasjonskravJson = await dokumentasjonskravResponse.json();
    const dokumentasjonskrav = dokumentasjonskravJson.flatMap((dokumentasjonskrav: string) =>
      JSON.parse(dokumentasjonskrav)
    );

    return {
      seksjoner: await alleSeksjonerResponse.json(),
      dokumentasjonskrav: dokumentasjonskrav,
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
