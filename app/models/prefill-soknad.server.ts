import { hentSoknadOrkestratorOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import {
  lagreSøknadPersonalia,
  PutSøknadPersonaliaRequestBody,
} from "~/models/lagre-søknad-personalia.server";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  bostedsland,
  etternavnFraPdl,
  fornavnFraPdl,
  kontonummerFraKontoregister,
  landFraPdl,
  landkodeFraPdl,
  mellomnavnFraPdl,
  postnummerFraPdl,
  poststedFraPdl,
} from "~/seksjon/personalia/v1/personalia.komponenter";
import {
  dokumentkravSvarSendNå,
  dokumentkravSvarSenderSenere,
  hvaErGrunnenTilAtDuSenderDokumentetSenere,
  velgHvaDuVilGjøre,
} from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.komponenter";

type OrkestratorSoknad = {
  søknadId: string;
  status: string;
  innsendtTimestamp?: string;
  oppdatertTidspunkt?: string;
};

export type SeksjonFraBackend = {
  seksjonId: string;
  data: string;
};

type SeksjonDetaljerFraBackend = {
  seksjon: unknown;
  dokumentasjonskrav: unknown;
};

type PrefillSeksjonPayload = {
  versjon?: number;
  seksjonId?: string;
  seksjonsvar?: Record<string, unknown>;
  seksjon?: Record<string, unknown>;
};

type Dokumentkrav = {
  svar?: string;
  begrunnelse?: string;
  filer?: unknown[] | null;
  bundle?: unknown;
  skjemaSvar?: Record<string, unknown>;
};

async function hentMineSøknader(request: Request): Promise<OrkestratorSoknad[]> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/mine-soknader`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Klarte ikke hente søkerens søknader");
  }

  return (await response.json()) as OrkestratorSoknad[];
}

function erInnsendtSøknad(status: string) {
  return status === "INNSENDT" || status === "JOURNALFØRT";
}

function erPåbegyntSøknad(status: string) {
  return status === "PÅBEGYNT";
}

function finnSorteringstidspunkt(søknad: OrkestratorSoknad): number {
  const kandidat = søknad.innsendtTimestamp ?? søknad.oppdatertTidspunkt;
  return kandidat ? new Date(kandidat).getTime() : 0;
}

function normaliserSeksjonData(seksjon: SeksjonFraBackend): string | null {
  try {
    const parsed = JSON.parse(seksjon.data) as PrefillSeksjonPayload | Record<string, unknown>;
    const payload = parsed as PrefillSeksjonPayload;
    const seksjonsvar =
      payload.seksjonsvar ?? payload.seksjon ?? (typeof parsed === "object" ? parsed : null);

    if (!seksjonsvar || typeof seksjonsvar !== "object") {
      return null;
    }

    return JSON.stringify({
      seksjonId: seksjon.seksjonId,
      versjon: typeof payload.versjon === "number" ? payload.versjon : 1,
      seksjonsvar,
    });
  } catch {
    return seksjon.data;
  }
}

function hentSeksjonsvarFraSeksjonData(data: string): Record<string, unknown> | null {
  try {
    const parsed = JSON.parse(data) as PrefillSeksjonPayload | Record<string, unknown>;
    const payload = parsed as PrefillSeksjonPayload;
    const seksjonsvar =
      payload.seksjonsvar ?? payload.seksjon ?? (typeof parsed === "object" ? parsed : null);

    if (!seksjonsvar || typeof seksjonsvar !== "object") {
      return null;
    }

    return seksjonsvar as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function hentKandidaterForPrefill(request: Request): Promise<string[]> {
  const søknader = await hentMineSøknader(request);

  const kandidater = søknader
    .filter((søknad) => erInnsendtSøknad(søknad.status) || erPåbegyntSøknad(søknad.status))
    .sort((a, b) => {
      const scoreA = erInnsendtSøknad(a.status) ? 0 : 1;
      const scoreB = erInnsendtSøknad(b.status) ? 0 : 1;

      if (scoreA !== scoreB) {
        return scoreA - scoreB;
      }

      return finnSorteringstidspunkt(b) - finnSorteringstidspunkt(a);
    });

  return kandidater.map((kandidat) => kandidat.søknadId);
}

export async function hentSistInnsendteSøknadSomHarSeksjoner(
  request: Request
): Promise<string | null> {
  const kandidatSøknadIder = await hentKandidaterForPrefill(request);

  for (const kandidatSøknadId of kandidatSøknadIder) {
    const seksjoner = await hentAlleSeksjoner(request, kandidatSøknadId);
    if (seksjoner.length > 0) {
      return kandidatSøknadId;
    }
  }

  return null;
}

export async function hentAlleSeksjoner(
  request: Request,
  søknadId: string
): Promise<SeksjonFraBackend[]> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${søknadId}`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Klarte ikke hente seksjoner fra forrige søknad");
  }

  return (await response.json()) as SeksjonFraBackend[];
}

async function hentSeksjonDetaljer(
  request: Request,
  søknadId: string,
  seksjonId: string
): Promise<SeksjonDetaljerFraBackend | null> {
  const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${søknadId}/${seksjonId}`;
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as SeksjonDetaljerFraBackend;
}

function formaterDokumentasjonskravForLagring(dokumentasjonskrav: unknown): string | null {
  if (dokumentasjonskrav == null) {
    return null;
  }

  let parsed: unknown;
  try {
    parsed =
      typeof dokumentasjonskrav === "string"
        ? (JSON.parse(dokumentasjonskrav) as unknown)
        : dokumentasjonskrav;
  } catch {
    return null;
  }

  if (!Array.isArray(parsed)) {
    return JSON.stringify(parsed);
  }

  const sanitiserteKrav = parsed.map((krav) => {
    if (!krav || typeof krav !== "object") {
      return krav;
    }

    const dokumentkrav = krav as Dokumentkrav;
    const harFiler = Array.isArray(dokumentkrav.filer) && dokumentkrav.filer.length > 0;

    if (dokumentkrav.svar === dokumentkravSvarSendNå && harFiler) {
      const begrunnelse =
        dokumentkrav.begrunnelse ??
        "Prefylt fra tidligere søknad. Last opp dokument på nytt eller velg et annet svar.";

      return {
        ...dokumentkrav,
        svar: dokumentkravSvarSenderSenere,
        begrunnelse,
        filer: undefined,
        bundle: undefined,
        skjemaSvar: {
          [velgHvaDuVilGjøre]: dokumentkravSvarSenderSenere,
          [hvaErGrunnenTilAtDuSenderDokumentetSenere]: begrunnelse,
        },
      };
    }

    return dokumentkrav;
  });

  return JSON.stringify(sanitiserteKrav);
}

export async function prefillSeksjoner(
  request: Request,
  kildeSøknadId: string,
  nySøknadId: string,
  seksjoner: SeksjonFraBackend[]
) {
  const seksjonerSomKanPrefilles = seksjoner.filter((seksjon) => seksjon.seksjonId !== "personalia");
  const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);

  const seksjonerMedDetaljerResultater = await Promise.allSettled(
    seksjonerSomKanPrefilles.map(async (seksjon) => {
      const normalisertSeksjonData = normaliserSeksjonData(seksjon);
      if (!normalisertSeksjonData) {
        return null;
      }

      const seksjonDetaljer = await hentSeksjonDetaljer(request, kildeSøknadId, seksjon.seksjonId);
      const dokumentasjonskrav = formaterDokumentasjonskravForLagring(
        seksjonDetaljer?.dokumentasjonskrav
      );

      return {
        seksjon,
        normalisertSeksjonData,
        dokumentasjonskrav,
      };
    })
  );

  const seksjonerMedDetaljer = seksjonerMedDetaljerResultater.reduce<
    Array<{
      seksjon: SeksjonFraBackend;
      normalisertSeksjonData: string;
      dokumentasjonskrav: string | null;
    }>
  >((akkumulator, resultat) => {
    if (resultat.status === "fulfilled" && resultat.value) {
      akkumulator.push(resultat.value);
    }

    return akkumulator;
  }, []);

  const antallPrefylteSeksjonerResultater = await Promise.allSettled(
    seksjonerMedDetaljer.map(async ({ seksjon, normalisertSeksjonData, dokumentasjonskrav }) => {
      const url = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/seksjon/${nySøknadId}/${seksjon.seksjonId}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${onBehalfOfToken}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          seksjon: normalisertSeksjonData,
          dokumentasjonskrav: dokumentasjonskrav,
          pdfGrunnlag: JSON.stringify({ navn: seksjon.seksjonId, spørsmål: [] }),
        }),
      });

      return response.ok ? 1 : 0;
    })
  );

  return antallPrefylteSeksjonerResultater.reduce((antall, resultat) => {
    if (resultat.status !== "fulfilled") {
      return antall;
    }

    return antall + resultat.value;
  }, 0);
}

export async function prefillPersonaliaFraForrigeSøknad(
  request: Request,
  nySøknadId: string,
  seksjoner: SeksjonFraBackend[]
) {
  const personaliaSeksjon = seksjoner.find((seksjon) => seksjon.seksjonId === "personalia");
  if (!personaliaSeksjon) {
    return false;
  }

  const normalisertPersonaliaData = normaliserSeksjonData(personaliaSeksjon);
  const personaliaSeksjonsvar = hentSeksjonsvarFraSeksjonData(personaliaSeksjon.data);

  if (!normalisertPersonaliaData || !personaliaSeksjonsvar) {
    return false;
  }

  const lagrePersonaliaSeksjonResponse = await lagreSeksjon(request, nySøknadId, "personalia", {
    seksjon: normalisertPersonaliaData,
    dokumentasjonskrav: null,
    pdfGrunnlag: JSON.stringify({ navn: "personalia", spørsmål: [] }),
  });

  if (!lagrePersonaliaSeksjonResponse.ok) {
    return false;
  }

  const putSøknadPersonaliaRequestBody: PutSøknadPersonaliaRequestBody = {
    fornavn: String(personaliaSeksjonsvar[fornavnFraPdl] ?? "Ukjent fornavn"),
    mellomnavn: personaliaSeksjonsvar[mellomnavnFraPdl]?.toString(),
    etternavn: String(personaliaSeksjonsvar[etternavnFraPdl] ?? "Ukjent etternavn"),
    alder: String(personaliaSeksjonsvar[alderFraPdl] ?? "0"),
    adresselinje1: personaliaSeksjonsvar[adresselinje1FraPdl]?.toString(),
    adresselinje2: personaliaSeksjonsvar[adresselinje2FraPdl]?.toString(),
    adresselinje3: personaliaSeksjonsvar[adresselinje3FraPdl]?.toString(),
    postnummer: personaliaSeksjonsvar[postnummerFraPdl]?.toString(),
    poststed: personaliaSeksjonsvar[poststedFraPdl]?.toString(),
    landkode: (personaliaSeksjonsvar[landkodeFraPdl] ?? personaliaSeksjonsvar[bostedsland])?.toString(),
    land: personaliaSeksjonsvar[landFraPdl]?.toString(),
    kontonummer: personaliaSeksjonsvar[kontonummerFraKontoregister]?.toString(),
  };

  const lagreSøknadPersonaliaResponse = await lagreSøknadPersonalia(
    request,
    nySøknadId,
    putSøknadPersonaliaRequestBody
  );

  return lagreSøknadPersonaliaResponse.ok;
}
