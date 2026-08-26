import { LoaderFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import KvitteringView from "~/seksjon/kvittering/KvitteringView";
import {
  ArbeidssøkerStatus,
  hentArbeidssøkerStatus,
} from "~/models/hent-arbeidssøkerStatus.server";

export type KvitteringSeksjon = {
  seksjoner: [] | null;
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
  arbeidssøkerStatus: ArbeidssøkerStatus;
};

export async function loader({ request, params }: LoaderFunctionArgs<KvitteringSeksjon>) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const alleSeksjonerResponse = await hentAlleSeksjoner(request, params.soknadId);
  const arbeidssøkerStatus = await hentArbeidssøkerStatus(request);

  if (alleSeksjonerResponse.ok) {
    const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);

    if (!dokumentasjonskravResponse.ok) {
      return {
        seksjoner: await alleSeksjonerResponse.json(),
        dokumentasjonskrav: null,
        arbeidssøkerStatus: arbeidssøkerStatus,
      };
    }

    const dokumentasjonskravJson = await dokumentasjonskravResponse.json();
    const dokumentasjonskrav = dokumentasjonskravJson.flatMap((dokumentasjonskrav: string) =>
      JSON.parse(dokumentasjonskrav)
    );

    return {
      seksjoner: await alleSeksjonerResponse.json(),
      arbeidssøkerStatus: arbeidssøkerStatus,
      dokumentasjonskrav: dokumentasjonskrav,
    };
  }

  return {
    seksjoner: null,
    dokumentasjonskrav: null,
    arbeidssøkerStatus,
  };
}

export default function KvitteringSide() {
  return <KvitteringView />;
}
