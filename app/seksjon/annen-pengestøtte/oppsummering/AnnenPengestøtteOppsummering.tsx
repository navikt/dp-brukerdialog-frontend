import { FormSummary } from "@navikt/ds-react";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalSpørsmål,
  pengestøtteFraAndreEøsLandSpørsmål,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte-eøs.spørsmål";
import {
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeModalSpørsmål,
  pengestøtteFraNorgeSpørsmål,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte-norge.spørsmål";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";

export default function AnnenPengestøtteOppsummering({ seksjonsData, seksjonsUrl }: SeksjonProps) {
  if (!seksjonsData) return <></>;

  const data: AnnenPengestøtteResponse = JSON.parse(seksjonsData);

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  const mottattEllerSøktOmPengestøtteFraAndreEøsLand = finnSpørsmål(
    pengestøtteFraAndreEøsLandSpørsmål,
    harMottattEllerSøktOmPengestøtteFraAndreEøsLand
  );

  const mottarPengestøtteFraNorge = finnSpørsmål(
    pengestøtteFraNorgeSpørsmål,
    mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav
  );

  const mottaLønnEllerAndreGoderFraTidligereArbeidsgiver = finnSpørsmål(
    fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
    fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver
  );

  const hvaDuFårBeholdeFraTidligereArbeidsgiverSpørsmål = finnSpørsmål(
    fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
    skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver
  );

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Annen pengestøtte</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>
            {mottattEllerSøktOmPengestøtteFraAndreEøsLand?.label}
          </FormSummary.Label>
          <OppsummeringsSvar
            spørsmål={mottattEllerSøktOmPengestøtteFraAndreEøsLand!}
            svar={data[harMottattEllerSøktOmPengestøtteFraAndreEøsLand] ?? "Ubesvart"}
          />
        </FormSummary.Answer>

        {data[harMottattEllerSøktOmPengestøtteFraAndreEøsLand] === "ja" &&
          data.pengestøtteFraAndreEøsLand?.map((pengestøtte, index) => (
            <FormSummary.Answer>
              <FormSummary.Label> {`Pengestøtte fra EØS-land ${index + 1}`}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(pengestøtte).map((støtte) => {
                    const aktivSpørsmål = finnSpørsmål(
                      pengestøtteFraAndreEøsLandModalSpørsmål,
                      støtte[0]
                    );
                    return (
                      <FormSummary.Answer key={støtte[0]}>
                        <FormSummary.Label>{aktivSpørsmål?.label}</FormSummary.Label>
                        <OppsummeringsSvar spørsmål={aktivSpørsmål!} svar={støtte[1]} />
                      </FormSummary.Answer>
                    );
                  })}
                </FormSummary.Answers>
              </FormSummary.Value>
            </FormSummary.Answer>
          ))}
        <FormSummary.Answer>
          <FormSummary.Label>{mottarPengestøtteFraNorge?.label}</FormSummary.Label>
          <OppsummeringsSvar
            spørsmål={mottarPengestøtteFraNorge!}
            svar={data[mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav] ?? "Ubesvart"}
          />
        </FormSummary.Answer>
        {data[mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav] === "ja" &&
          data.pengestøtteFraNorge?.map((pengestøtte, index) => (
            <FormSummary.Answer>
              <FormSummary.Label> {`Pengestøtte fra Norge ${index + 1}`}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(pengestøtte).map((støtte) => {
                    const aktivSpørsmål = finnSpørsmål(pengestøtteFraNorgeModalSpørsmål, støtte[0]);
                    return (
                      <FormSummary.Answer key={støtte[0]}>
                        <FormSummary.Label>{aktivSpørsmål?.label}</FormSummary.Label>
                        <OppsummeringsSvar spørsmål={aktivSpørsmål!} svar={støtte[1]} />
                      </FormSummary.Answer>
                    );
                  })}
                </FormSummary.Answers>
              </FormSummary.Value>
            </FormSummary.Answer>
          ))}
        <FormSummary.Answer>
          <FormSummary.Label>
            {mottaLønnEllerAndreGoderFraTidligereArbeidsgiver?.label}
          </FormSummary.Label>
          <OppsummeringsSvar
            spørsmål={mottaLønnEllerAndreGoderFraTidligereArbeidsgiver!}
            svar={
              data[fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver] ?? "Ubesvart"
            }
          />
        </FormSummary.Answer>
        {data[fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver] === "ja" && (
          <FormSummary.Answer>
            <FormSummary.Label>
              {hvaDuFårBeholdeFraTidligereArbeidsgiverSpørsmål?.label}
            </FormSummary.Label>
            <FormSummary.Value>
              {data[skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver]}
            </FormSummary.Value>
          </FormSummary.Answer>
        )}
      </FormSummary.Answers>
      <FormSummary.Footer>
        <FormSummary.EditLink href={seksjonsUrl} />
      </FormSummary.Footer>
    </FormSummary>
  );
}
