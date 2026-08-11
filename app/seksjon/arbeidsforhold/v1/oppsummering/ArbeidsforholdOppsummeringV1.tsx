import { FormSummary } from "@navikt/ds-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { KomponentType } from "~/components/Komponent.types";
import {
  lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  lagArbeidsforholdModalKomponenter,
  ArbeidsforholdResponse,
  lagArbeidsforholdKomponenter,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harIkkeJobbetDeSiste36Månedene,
  hvordanHarDuJobbet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import { lagArbeidsforholdModalJegHarSagtOppSelvKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import { lagArbeidsforholdModalJegHarFåttAvskjedKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import { lagArbeidsforholdModalKontraktenErUtgåttKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
import { lagArbeidsforholdModalArbeidstidenErRedusertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import { lagArbeidsforholdModalJegErPermittertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";

export function ArbeidsforholdOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useTranslation("arbeidsforhold");
  if (!seksjonSvarene) return null;

  const data = seksjonSvarene as ArbeidsforholdResponse;

  const arbeidsforholdKomponenter = useMemo(() => lagArbeidsforholdKomponenter(t), [t]);

  const alleArbeidsforholdModalSpørsmål = useMemo(
    () =>
      lagArbeidsforholdModalKomponenter(t)
        .concat(lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter(t))
        .concat(lagArbeidsforholdModalJegHarSagtOppSelvKomponenter(t))
        .concat(lagArbeidsforholdModalJegHarFåttAvskjedKomponenter(t))
        .concat(lagArbeidsforholdModalKontraktenErUtgåttKomponenter(t))
        .concat(lagArbeidsforholdModalArbeidstidenErRedusertKomponenter(t))
        .concat(lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter(t))
        .concat(lagArbeidsforholdModalJegErPermittertKomponenter(t))
        .concat(lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter(t))
        .concat(lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter(t)),
    [t]
  );

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  const hvordanHarDuJobbetSpørsmål = finnSpørsmål(arbeidsforholdKomponenter, hvordanHarDuJobbet);

  const harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneSpørsmål =
    finnSpørsmål(
      arbeidsforholdKomponenter,
      harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
    );

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Arbeidsforhold</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>{hvordanHarDuJobbetSpørsmål?.label}</FormSummary.Label>
          <OppsummeringsSvar
            spørsmål={hvordanHarDuJobbetSpørsmål!}
            svar={data[hvordanHarDuJobbet] ?? "Ubesvart"}
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
                "Ubesvart"
              }
            />
          </FormSummary.Answer>
        )}

        {data.registrerteArbeidsforhold?.map((arbeidsforholdModalSvar, index) => (
          <FormSummary.Answer>
            <FormSummary.Label> {`Arbeidsforhold ${index + 1}`}</FormSummary.Label>
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
        seksjonnavn="Arbeidsforhold"
      />
    </FormSummary>
  );
}
