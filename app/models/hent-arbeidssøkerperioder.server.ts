import { getEnv } from "~/utils/env.utils";
import { hentArbeidssøkerregisteretOboToken } from "~/utils/auth.utils.server";

type brukerTypeResponse = "UKJENT_VERDI" | "UDEFINERT" | "VEILEDER" | "SYSTEM" | "SLUTTBRUKER";

export interface IArbeidssokerperioder {
  periodeId: string;
  startet: IArbeidssoekkerMetaResponse;
  avsluttet: IArbeidssoekkerMetaResponse | null;
}

interface IArbeidssoekkerMetaResponse {
  tidspunkt: string;
  utfoertAv: { type: brukerTypeResponse };
  kilde: string;
  aarsak: string;
}

export async function hentArbeidssøkerperioder(request: Request) {
  const url = `${getEnv("ARBEIDSSOKERREGISTERET_URL")}/api/v1/arbeidssoekerperioder`;
  const onBehalfOfToken = await hentArbeidssøkerregisteretOboToken(request);

  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
  });
}
