import { Alert, BodyLong, Button, HStack, Link, VStack } from "@navikt/ds-react";
import type { TFunction } from "i18next";
import type { KomponentType } from "~/components/Komponent.types";
import { getEnv } from "~/utils/env.utils";

export function lagArbeidssøkerFeilmelding(t: TFunction): KomponentType[] {
  return [
    {
      id: "tekniskFeil",
      type: "forklarendeTekst",
      description: (
        <Alert variant="warning" className="mb-8">
          {t("tekniskFeil.beskjed")}
        </Alert>
      ),
    },
  ];
}

export function lagArbeidssøkerKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: "krav.overskrift",
      type: "forklarendeTekst",
      description: (
        <VStack gap="space-16" className="mt-32">
          <BodyLong>
            <strong>{t("informasjon.overskrift")}</strong>
            <br />
            {t("informasjon.beskrivelse")}
          </BodyLong>
          <HStack gap="space-16" align="center">
            <Button
              as="a"
              href={getEnv("ARBEIDSSOKERREGISTRERING_URL") || t("handlinger.registrerUrl")}
              variant="primary"
              onClick={() => {
                sessionStorage.setItem("kommerFraDagpenger", "true");
              }}
            >
              {t("handlinger.registrer")}
            </Button>

            <Button as="a" href={t("handlinger.avbrytUrl")} variant="secondary">
              {t("handlinger.avbryt")}
            </Button>
          </HStack>

          <BodyLong>
            <Link href={`${getEnv("BASE_PATH")}${t("soknad.lenkeUrl")}`}>
              {t("soknad.lenketekst")}
            </Link>
            {t("soknad.beskrivelse")}
          </BodyLong>
        </VStack>
      ),
    },
  ];
}
