import { FormSummary } from "@navikt/ds-react";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalKomponenter,
  pengestøtteFraAndreEøsLandKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverKomponenter,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeModalKomponenter,
  pengestøtteFraNorgeKomponenter,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";

export default function AnnenPengestøtteOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const data = seksjonSvarene as AnnenPengestøtteResponse;

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  const mottattEllerSøktOmPengestøtteFraAndreEøsLand = finnSpørsmål(
    pengestøtteFraAndreEøsLandKomponenter,
    harMottattEllerSøktOmPengestøtteFraAndreEøsLand
  );

  const mottarPengestøtteFraNorge = finnSpørsmål(
    pengestøtteFraNorgeKomponenter,
    mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav
  );

  const mottaLønnEllerAndreGoderFraTidligereArbeidsgiver = finnSpørsmål(
    fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverKomponenter,
    fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver
  );

  const hvaDuFårBeholdeFraTidligereArbeidsgiverSpørsmål = finnSpørsmål(
    fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverKomponenter,
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
                  {Object.entries(pengestøtte).map((enPengestøtte) => {
                    const spørsmål = finnSpørsmål(
                      pengestøtteFraAndreEøsLandModalKomponenter,
                      enPengestøtte[0]
                    );
                    if (
                      spørsmål &&
                      !erInformasjonsFelt(spørsmål) &&
                      (!spørsmål.visHvis || spørsmål.visHvis(pengestøtte))
                    ) {
                      return (
                        <FormSummary.Answer key={enPengestøtte[0]}>
                          <FormSummary.Label>{spørsmål?.label}</FormSummary.Label>
                          <OppsummeringsSvar spørsmål={spørsmål!} svar={enPengestøtte[1]} />
                        </FormSummary.Answer>
                      );
                    }
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
                  {Object.entries(pengestøtte).map((enPengestøtte) => {
                    const spørsmål = finnSpørsmål(
                      pengestøtteFraNorgeModalKomponenter,
                      enPengestøtte[0]
                    );
                    if (
                      spørsmål &&
                      !erInformasjonsFelt(spørsmål) &&
                      (!spørsmål.visHvis || spørsmål.visHvis(pengestøtte))
                    ) {
                      return (
                        <FormSummary.Answer key={enPengestøtte[0]}>
                          <FormSummary.Label>{spørsmål?.label}</FormSummary.Label>
                          <OppsummeringsSvar spørsmål={spørsmål!} svar={enPengestøtte[1]} />
                        </FormSummary.Answer>
                      );
                    }
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
      <FormSummaryFooter seksjonsUrl={seksjonsUrl} redigerbar={redigerbar} />
    </FormSummary>
  );
}
