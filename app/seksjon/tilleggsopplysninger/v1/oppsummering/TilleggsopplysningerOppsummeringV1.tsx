import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import type { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { lagTilleggsopplysningerKomponenter } from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.komponenter";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";

export function TilleggsopplysningerOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useTranslation("tilleggsopplysninger");

  const tilleggsopplysningerKomponenter = useMemo(() => lagTilleggsopplysningerKomponenter(t), [t]);

  if (!seksjonSvarene) return null;

  const tilleggsopplysningerSvar = Object.entries(seksjonSvarene);
  const seksjonNavn = t("side.overskrift");

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{seksjonNavn}</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!tilleggsopplysningerSvar.length && <div>{t("oppsummering.ingenSvar")}</div>}

        {tilleggsopplysningerKomponenter.map((spørsmål) => {
          const svar = tilleggsopplysningerSvar.find((svar) => svar[0] === spørsmål.id);

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
