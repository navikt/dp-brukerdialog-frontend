import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  arbeidsforholdModalSkiftTurnusRotasjonSpørsmål,
  arbeidsforholdModalSpørsmål,
  ArbeidsforholdResponse,
  arbeidsforholdKomponenter,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harIkkeJobbetDeSiste36Månedene,
  hvordanHarDuJobbet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import { arbeidsforholdModalJegHarSagtOppSelvKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import { arbeidsforholdModalJegHarFåttAvskjedKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import { arbeidsforholdModalKontraktenErUgåttKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUgått";
import { arbeidsforholdModalArbeidstidenErRedusertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { arbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import { arbeidsforholdModalJegErPermittertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";

export default function ArbeidsforholdOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const data = seksjonSvarene as ArbeidsforholdResponse;

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  const hvordanHarDuJobbetSpørsmål = finnSpørsmål(arbeidsforholdKomponenter, hvordanHarDuJobbet);

  const harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneSpørsmål =
    finnSpørsmål(
      arbeidsforholdKomponenter,
      harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
    );

  const alleArbeidsforholdModalSpørsmål = arbeidsforholdModalSpørsmål
    .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter)
    .concat(arbeidsforholdModalJegHarSagtOppSelvKomponenter)
    .concat(arbeidsforholdModalJegHarFåttAvskjedKomponenter)
    .concat(arbeidsforholdModalKontraktenErUgåttKomponenter)
    .concat(arbeidsforholdModalArbeidstidenErRedusertKomponenter)
    .concat(arbeidsforholdModalArbeidsgiverErKonkursKomponenter)
    .concat(arbeidsforholdModalJegErPermittertKomponenter)
    .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter)
    .concat(arbeidsforholdModalSkiftTurnusRotasjonSpørsmål);

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
      <FormSummaryFooter seksjonsUrl={seksjonsUrl} redigerbar={redigerbar} />
    </FormSummary>
  );
}
