import { FormSummary } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { KomponentType } from "~/components/Komponent.types";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import {
  ArbeidsforholdResponse,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harIkkeJobbetDeSiste36Månedene,
  hvordanHarDuJobbet,
  lagArbeidsforholdKomponenter,
  lagArbeidsforholdModalKomponenter,
  lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter,
} from "../arbeidsforhold.komponenter";
import { lagArbeidsforholdModalArbeidstidenErRedusertKomponenter } from "../arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { lagArbeidsforholdModalJegHarFåttAvskjedKomponenter } from "../arbeidsforhold.komponenter.avskjediget";
import { lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "../arbeidsforhold.komponenter.ikkeEndret";
import { lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "../arbeidsforhold.komponenter.jegErOppsagt";
import { lagArbeidsforholdModalJegHarSagtOppSelvKomponenter } from "../arbeidsforhold.komponenter.jegHarSagtOpp";
import { lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "../arbeidsforhold.komponenter.konkurs";
import { lagArbeidsforholdModalKontraktenErUtgåttKomponenter } from "../arbeidsforhold.komponenter.kontraktenErUtgått";
import { lagArbeidsforholdModalJegErPermittertKomponenter } from "../arbeidsforhold.komponenter.permittert";

export function ArbeidsforholdOppsummeringV4({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useTranslation("arbeidsforhold/v4");

  if (!seksjonSvarene) return null;

  const data = seksjonSvarene as ArbeidsforholdResponse;
  const arbeidsforholdKomponenter = lagArbeidsforholdKomponenter(t);

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  const hvordanHarDuJobbetSpørsmål = finnSpørsmål(arbeidsforholdKomponenter, hvordanHarDuJobbet);

  const harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneSpørsmål =
    finnSpørsmål(
      arbeidsforholdKomponenter,
      harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
    );

  const alleArbeidsforholdModalSpørsmål = lagArbeidsforholdModalKomponenter(t)
    .concat(lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter(t))
    .concat(lagArbeidsforholdModalJegHarSagtOppSelvKomponenter(t))
    .concat(lagArbeidsforholdModalJegHarFåttAvskjedKomponenter(t))
    .concat(lagArbeidsforholdModalKontraktenErUtgåttKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidstidenErRedusertKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter(t))
    .concat(lagArbeidsforholdModalJegErPermittertKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter(t))
    .concat(lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter(t));

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{t("oppsummering.overskrift")}</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>{hvordanHarDuJobbetSpørsmål?.label}</FormSummary.Label>
          <OppsummeringsSvar
            spørsmål={hvordanHarDuJobbetSpørsmål!}
            svar={data[hvordanHarDuJobbet] ?? t("oppsummering.ubesvart")}
          />
        </FormSummary.Answer>
        {data[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene && (
          <FormSummary.Answer>
            <FormSummary.Label>
              {
                harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneSpørsmål?.label
              }
            </FormSummary.Label>
            <OppsummeringsSvar
              spørsmål={
                harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneSpørsmål!
              }
              svar={
                data[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] ??
                t("oppsummering.ubesvart")
              }
            />
          </FormSummary.Answer>
        )}

        {data.registrerteArbeidsforhold?.map((arbeidsforholdModalSvar, index) => (
          <FormSummary.Answer key={index}>
            <FormSummary.Label>
              {" "}
              {t("oppsummering.arbeidsforhold", { nummer: index + 1 })}
            </FormSummary.Label>
            <FormSummary.Value>
              <FormSummary.Answers>
                {Object.entries(arbeidsforholdModalSvar).map((arbeidsforholdModalSvar) => {
                  const spørsmål = finnSpørsmål(
                    alleArbeidsforholdModalSpørsmål,
                    arbeidsforholdModalSvar[0]
                  );
                  if (spørsmål && !erInformasjonsFelt(spørsmål))
                    return (
                      <FormSummary.Answer key={arbeidsforholdModalSvar[0]}>
                        <FormSummary.Label>{spørsmål?.label}</FormSummary.Label>
                        <OppsummeringsSvar spørsmål={spørsmål!} svar={arbeidsforholdModalSvar[1]} />
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
        seksjonnavn={t("oppsummering.overskrift")}
      />
    </FormSummary>
  );
}
