import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  lagEgenNæringEgenNæringsvirksomhetKomponenter,
  lagEgenNæringEgetGårdsbrukKomponenter,
  lagLeggTilGårdsbrukKomponenter,
  lagLeggTilNæringsvirksomhetKomponenter,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";

import { KomponentType } from "~/components/Komponent.types";
import { SeksjonSvar as EgenNæringSeksjon } from "~/routes/$soknadId.egen-naring";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { useTranslation } from "react-i18next";

export function EgenNæringOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useTranslation("egen-næring/v1");

  if (!seksjonSvarene) return null;

  const egenNæringEgenNæringsvirksomhetKomponenter =
    lagEgenNæringEgenNæringsvirksomhetKomponenter(t);
  const egenNæringEgetGårdsbrukKomponenter = lagEgenNæringEgetGårdsbrukKomponenter(t);
  const leggTilNæringsvirksomhetKomponenter = lagLeggTilNæringsvirksomhetKomponenter(t);
  const leggTilGårdsbrukKomponenter = lagLeggTilGårdsbrukKomponenter(t);

  const egenNæringSvar = seksjonSvarene as EgenNæringSeksjon;

  const driverDuEgenNæringsvirksomhetSpørsmål = egenNæringEgenNæringsvirksomhetKomponenter.find(
    (s) => s.id === driverDuEgenNæringsvirksomhet
  );

  const driverDuEgenGårdsbrukSpørsmål = egenNæringEgetGårdsbrukKomponenter.find(
    (s) => s.id === driverDuEgetGårdsbruk
  );

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{t("side.overskrift")}</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>{driverDuEgenNæringsvirksomhetSpørsmål?.label}</FormSummary.Label>
          {driverDuEgenNæringsvirksomhetSpørsmål ? (
            <OppsummeringsSvar
              spørsmål={driverDuEgenNæringsvirksomhetSpørsmål}
              svar={egenNæringSvar[driverDuEgenNæringsvirksomhet] ?? t("oppsummering.ikkeBesvart")}
            />
          ) : (
            t("oppsummering.ikkeBesvart")
          )}
        </FormSummary.Answer>
        {egenNæringSvar[driverDuEgenNæringsvirksomhet] === "ja" &&
          egenNæringSvar["næringsvirksomheter"]?.map((næringsvirksomhet, index) => (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>
                {t("næringsvirksomhet.oppsummering.nr", { nr: index + 1 })}
              </FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(næringsvirksomhet).map((arbeidsforholdModalSvar) => {
                    const spørsmål = finnSpørsmål(
                      leggTilNæringsvirksomhetKomponenter,
                      arbeidsforholdModalSvar[0]
                    );
                    if (spørsmål && !erInformasjonsFelt(spørsmål))
                      return (
                        <FormSummary.Answer key={arbeidsforholdModalSvar[0]}>
                          <FormSummary.Label>{spørsmål?.label}</FormSummary.Label>
                          <OppsummeringsSvar
                            spørsmål={spørsmål!}
                            svar={arbeidsforholdModalSvar[1]}
                          />
                        </FormSummary.Answer>
                      );
                  })}
                </FormSummary.Answers>
              </FormSummary.Value>
            </FormSummary.Answer>
          ))}

        <FormSummary.Answer>
          <FormSummary.Label>{driverDuEgenGårdsbrukSpørsmål?.label}</FormSummary.Label>
          {driverDuEgenGårdsbrukSpørsmål ? (
            <OppsummeringsSvar
              spørsmål={driverDuEgenGårdsbrukSpørsmål}
              svar={egenNæringSvar[driverDuEgetGårdsbruk] ?? t("oppsummering.ikkeBesvart")}
            />
          ) : (
            t("oppsummering.ikkeBesvart")
          )}
        </FormSummary.Answer>
        {egenNæringSvar[driverDuEgetGårdsbruk] === "ja" &&
          egenNæringSvar["gårdsbruk"]?.map((gårdsbruk, index) => (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>
                {t("gårdsbruk.oppsummering.nr", { nr: index + 1 })}
              </FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(gårdsbruk).map((arbeidsforholdModalSvar) => {
                    const spørsmål = finnSpørsmål(
                      leggTilGårdsbrukKomponenter,
                      arbeidsforholdModalSvar[0]
                    );
                    if (spørsmål && !erInformasjonsFelt(spørsmål))
                      return (
                        <FormSummary.Answer key={arbeidsforholdModalSvar[0]}>
                          <FormSummary.Label>{spørsmål?.label}</FormSummary.Label>
                          <OppsummeringsSvar
                            spørsmål={spørsmål!}
                            svar={arbeidsforholdModalSvar[1]}
                          />
                        </FormSummary.Answer>
                      );
                  })}
                </FormSummary.Answers>
              </FormSummary.Value>
            </FormSummary.Answer>
          ))}
      </FormSummary.Answers>
      <FormSummaryFooter
        seksjonsUrl={seksjonsUrl}
        redigerbar={redigerbar}
        seksjonnavn={t("side.overskrift")}
      />
    </FormSummary>
  );
}
