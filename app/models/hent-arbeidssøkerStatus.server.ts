import { getEnv } from "~/utils/env.utils";
import { hentArbeidssøkerregisteretOboToken } from "~/utils/auth.utils.server";

type BrukerTypeResponse = "UKJENT_VERDI" | "UDEFINERT" | "VEILEDER" | "SYSTEM" | "SLUTTBRUKER";
export type ArbeidssøkerStatus = "IKKE_REGISTRERT" | "REGISTRERT" | "FEIL";

export type Arbeidssøkerperioder = {
  periodeId: string;
  startet: ArbeidssøkkerMetaResponse;
  avsluttet: ArbeidssøkkerMetaResponse | null;
};

type ArbeidssøkkerMetaResponse = {
  tidspunkt: string;
  utfoertAv: { type: BrukerTypeResponse };
  kilde: string;
  aarsak: string;
};

export async function hentArbeidssøkerStatus(request: Request): Promise<ArbeidssøkerStatus> {
  const url = `${getEnv("ARBEIDSSOKERREGISTERET_URL")}/api/v1/arbeidssoekerperioder`;
  const onBehalfOfToken = await hentArbeidssøkerregisteretOboToken(request);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });

  if (!response.ok) {
    return "FEIL";
  }

  const perioder: Arbeidssøkerperioder[] = await response.json();
  return perioder.some((periode) => periode.avsluttet === null) ? "REGISTRERT" : "IKKE_REGISTRERT";
}
