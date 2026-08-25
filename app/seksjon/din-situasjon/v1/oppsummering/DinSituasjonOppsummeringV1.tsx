import { FormSummary } from "@navikt/ds-react";
import { lagDinSituasjonKomponenter } from "~/seksjon/din-situasjon/v1/din-situasjon.komponenter";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import { useTranslation } from "react-i18next";

export function DinSituasjonOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useTranslation("din-situasjon/v1");

  if (!seksjonSvarene) return null;

  const oversattDinSituasjonKomponenter = lagDinSituasjonKomponenter(t);
  const dinSituasjonEntries = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{t("side.overskrift")}</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!dinSituasjonEntries.length && <div>{t("oppsummering.ingenSvar")}</div>}

        {dinSituasjonEntries.map(([key, value]) => {
          const spørsmål = oversattDinSituasjonKomponenter.find((s) => s.id === key);

          if (spørsmål && !erInformasjonsFelt(spørsmål)) {
            return (
              <FormSummary.Answer key={key}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                <OppsummeringsSvar spørsmål={spørsmål} svar={value} />
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
