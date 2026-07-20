import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import type { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { lagVernepliktKomponenter } from "~/seksjon/verneplikt/v1/verneplikt.komponenter";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";

export function VernepliktOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useTranslation("verneplikt");

  const vernepliktKomponenter = useMemo(() => lagVernepliktKomponenter(t), [t]);

  if (!seksjonSvarene) return null;

  const vernepliktSvar = Object.entries(seksjonSvarene);
  const seksjonNavn = t("side.overskrift");

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{seksjonNavn}</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!vernepliktSvar.length && <div>{t("oppsummering.ingenSvar")}</div>}

        {vernepliktKomponenter.map((spørsmål) => {
          const svar = vernepliktSvar.find((svar) => svar[0] === spørsmål.id);

          if (svar && !erInformasjonsFelt(spørsmål)) {
            return (
              <FormSummary.Answer key={spørsmål.id}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                <OppsummeringsSvar spørsmål={spørsmål} svar={svar[1]} />
              </FormSummary.Answer>
            );
          }

          return null;
        })}
      </FormSummary.Answers>
      <FormSummaryFooter
        seksjonsUrl={seksjonsUrl}
        redigerbar={redigerbar}
        seksjonnavn={seksjonNavn}
      />
    </FormSummary>
  );
}
