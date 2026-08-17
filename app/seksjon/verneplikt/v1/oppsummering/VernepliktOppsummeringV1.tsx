import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { lagVernepliktKomponenter } from "~/seksjon/verneplikt/v1/verneplikt.komponenter";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";

export function VernepliktOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useVersjonertTranslation("verneplikt", 1);

  if (!seksjonSvarene) return null;

  const vernepliktKomponenter = lagVernepliktKomponenter(t);
  const vernepliktSvar = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{t("side.overskrift")}</FormSummary.Heading>
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
        })}
      </FormSummary.Answers>
      <FormSummaryFooter
        seksjonsUrl={seksjonsUrl}
        redigerbar={redigerbar}
        seksjonnavn={t("side.overskrift")}
      />
    </FormSummary>
  );
}
