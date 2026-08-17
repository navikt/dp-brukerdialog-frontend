import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { lagUtdanningKomponenter } from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";

export function UtdanningOppsummeringV1({ seksjonSvarene, seksjonsUrl, redigerbar }: SeksjonProps) {
  const { t } = useVersjonertTranslation("utdanning", 1);

  if (!seksjonSvarene) return null;

  const utdanningKomponenter = lagUtdanningKomponenter(t);
  const utdanningSvar = Object.entries(seksjonSvarene);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{t("side.overskrift")}</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!utdanningSvar.length && <div>{t("oppsummering.ingenSvar")}</div>}
        {utdanningKomponenter.map((spørsmål) => {
          const svar = utdanningSvar.find((svar) => svar[0] === spørsmål.id);
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
