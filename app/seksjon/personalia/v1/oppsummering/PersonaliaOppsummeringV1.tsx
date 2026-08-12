import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  etternavnFraPdl,
  fornavnFraPdl,
  fødselsnummerFraPdl,
  kontonummerFraKontoregister,
  landFraPdl,
  mellomnavnFraPdl,
  lagPersonaliaBostedslandKomponenter,
  postnummerFraPdl,
  poststedFraPdl,
} from "../personalia.komponenter";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";

export function PersonaliaOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useVersjonertTranslation("personalia", 1);
  const seksjonSvar = Object.entries(seksjonSvarene);
  const personaliaBostedslandKomponenter = lagPersonaliaBostedslandKomponenter(t);

  function finnRegisterverdi(key: string, registerverdier: [string, string][]) {
    return registerverdier.find((verdi) => verdi[0] === key)?.[1];
  }

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{t("side.overskrift")}</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>{t("oppsummering.navn")}</FormSummary.Label>
          <FormSummary.Value>
            {`${finnRegisterverdi(fornavnFraPdl, seksjonSvar)} `}
            {`${finnRegisterverdi(mellomnavnFraPdl, seksjonSvar)} `}
            {finnRegisterverdi(etternavnFraPdl, seksjonSvar)}
          </FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>{t("oppsummering.fodselsnummer")}</FormSummary.Label>
          <FormSummary.Value>
            {finnRegisterverdi(fødselsnummerFraPdl, seksjonSvar)}
          </FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>{t("oppsummering.alder")}</FormSummary.Label>
          <FormSummary.Value>{finnRegisterverdi(alderFraPdl, seksjonSvar)}</FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>{t("oppsummering.folkeregistrertAdresse")}</FormSummary.Label>
          <FormSummary.Value>
            {finnRegisterverdi(adresselinje1FraPdl, seksjonSvar)}{" "}
            {finnRegisterverdi(adresselinje1FraPdl, seksjonSvar) && <br />}
            {finnRegisterverdi(adresselinje2FraPdl, seksjonSvar)}{" "}
            {finnRegisterverdi(adresselinje2FraPdl, seksjonSvar) && <br />}
            {finnRegisterverdi(adresselinje3FraPdl, seksjonSvar)}{" "}
            {finnRegisterverdi(adresselinje3FraPdl, seksjonSvar) && <br />}
            {finnRegisterverdi(postnummerFraPdl, seksjonSvar)}{" "}
            {finnRegisterverdi(poststedFraPdl, seksjonSvar)}
            {finnRegisterverdi(landFraPdl, seksjonSvar) && <br />}
            {finnRegisterverdi(landFraPdl, seksjonSvar)}
          </FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>{t("oppsummering.kontonummer")}</FormSummary.Label>
          <FormSummary.Value>
            {finnRegisterverdi(kontonummerFraKontoregister, seksjonSvar) ||
              t("oppsummering.manglerKontonummer")}
          </FormSummary.Value>
        </FormSummary.Answer>
        {!seksjonSvar.length && <div>{t("oppsummering.ingenSvar")}</div>}

        {seksjonSvar.map(([key, value]) => {
          const spørsmål = personaliaBostedslandKomponenter.find((s) => s.id === key);
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
