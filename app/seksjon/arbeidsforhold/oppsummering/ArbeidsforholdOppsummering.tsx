import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  arbeidsforholdModalSkiftTurnusRotasjonSpørsmål,
  arbeidsforholdModalSpørsmål,
  ArbeidsforholdResponse,
  arbeidsforholdSpørsmål,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harIkkeJobbetDeSiste36Månedene,
  hvordanHarDuJobbet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegErOppsagt";
import { arbeidsforholdModalJegHarSagtOppSelvSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegHarSagtOpp";
import { arbeidsforholdModalJegHarFåttAvskjedSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.avskjediget";
import { arbeidsforholdModalKontraktenErUgåttSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.kontraktenErUgått";
import { arbeidsforholdModalArbeidstidenErRedusertSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.arbeidstidenErRedusert";
import { arbeidsforholdModalArbeidsgiverErKonkursSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.konkurs";
import { arbeidsforholdModalJegErPermittertSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.permittert";
import { arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.ikkeEndret";
import { SeksjonProps, erInformasjonsFelt } from "~/utils/oppsummering.utils";

export default function ArbeidsforholdOppsummering({ seksjonsData, seksjonsUrl }: SeksjonProps) {
  if (!seksjonsData) return <></>;

  const data: ArbeidsforholdResponse = JSON.parse(seksjonsData);

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  const hvordanHarDuJobbetSpørsmål = finnSpørsmål(arbeidsforholdSpørsmål, hvordanHarDuJobbet);

  const harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneSpørsmål =
    finnSpørsmål(
      arbeidsforholdSpørsmål,
      harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
    );

  const alleArbeidsforholdModalSpørsmål = arbeidsforholdModalSpørsmål
    .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål)
    .concat(arbeidsforholdModalJegHarSagtOppSelvSpørsmål)
    .concat(arbeidsforholdModalJegHarFåttAvskjedSpørsmål)
    .concat(arbeidsforholdModalKontraktenErUgåttSpørsmål)
    .concat(arbeidsforholdModalArbeidstidenErRedusertSpørsmål)
    .concat(arbeidsforholdModalArbeidsgiverErKonkursSpørsmål)
    .concat(arbeidsforholdModalJegErPermittertSpørsmål)
    .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål)
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
      <FormSummary.Footer>
        <FormSummary.EditLink href={seksjonsUrl} />
      </FormSummary.Footer>
    </FormSummary>
  );
}
