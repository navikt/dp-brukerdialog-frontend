import { LoaderFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import KvitteringView from "~/seksjon/kvittering/KvitteringView";
import {
  hentArbeidssøkerperioder,
  IArbeidssokerperioder,
} from "~/models/hent-arbeidssøkerperioder.server";

export type KvitteringSeksjon = {
  seksjoner: [] | null;
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
  erRegistrertArbeidssøker: boolean | null | "ERROR";
};

async function hentArbeidssøkerStatus(request: Request) {
  const arbeidssøkerregisterResponse = await hentArbeidssøkerperioder(request);

  if (arbeidssøkerregisterResponse.ok) {
    const data: IArbeidssokerperioder[] = await arbeidssøkerregisterResponse.json();
    return data.some((periode) => periode.avsluttet === null);
  } else {
    return "ERROR";
  }
}

export async function loader({ request, params }: LoaderFunctionArgs<KvitteringSeksjon>) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const alleSeksjonerResponse = await hentAlleSeksjoner(request, params.soknadId);

  if (alleSeksjonerResponse.ok) {
    const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);

    return {
      seksjoner: await alleSeksjonerResponse.json(),
      dokumentasjonskrav: dokumentasjonskravResponse.ok
        ? (await dokumentasjonskravResponse.json()).flatMap((dokumentasjonskrav: string) =>
            JSON.parse(dokumentasjonskrav)
          )
        : undefined,
      erRegistrertArbeidssøker: await hentArbeidssøkerStatus(request),
    };
  }

  return {
    seksjoner: null,
    dokumentasjonskrav: null,
    erRegistrertArbeidssøker: null,
  };
}

export default function Kvittering() {
  return <KvitteringView />;
}
