import { FormSummary } from "@navikt/ds-react";
import { useMemo } from "react";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  lagPengestøtteFraAndreEøsLandKomponenter,
  lagPengestøtteFraAndreEøsLandModalKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
  lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter,
  mottarDuPengestøtteFraAndreEnnNav,
  lagPengestøtteFraNorgeKomponenter,
  lagPengestøtteFraNorgeModalKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import { lagPengestøtteFraTidligereArbeidsgiverModalKomponenter } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";

export function AnnenPengestøtteOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useVersjonertTranslation("annen-pengestotte", 1);
  if (!seksjonSvarene) return null;

  const data = seksjonSvarene as AnnenPengestøtteResponse;

  const pengestøtteFraAndreEøsLandKomponenter = useMemo(
    () => lagPengestøtteFraAndreEøsLandKomponenter(t),
    [t]
  );

  const pengestøtteFraAndreEøsLandModalKomponenter = useMemo(
    () => lagPengestøtteFraAndreEøsLandModalKomponenter(t),
    [t]
  );

  const mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter = useMemo(
    () => lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter(t),
    [t]
  );

  const pengestøtteFraNorgeKomponenter = useMemo(() => lagPengestøtteFraNorgeKomponenter(t), [t]);

  const pengestøtteFraNorgeModalKomponenter = useMemo(
    () => lagPengestøtteFraNorgeModalKomponenter(t),
    [t]
  );

  const pengestøtteFraTidligereArbeidsgiverModalKomponenter = useMemo(
    () => lagPengestøtteFraTidligereArbeidsgiverModalKomponenter(t),
    [t]
  );

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  const mottattEllerSøktOmPengestøtteFraAndreEøsLand = finnSpørsmål(
    pengestøtteFraAndreEøsLandKomponenter,
    harMottattEllerSøktOmPengestøtteFraAndreEøsLand
  );

  const mottarPengestøtteFraNorge = finnSpørsmål(
    pengestøtteFraNorgeKomponenter,
    mottarDuPengestøtteFraAndreEnnNav
  );

  const mottaLønnEllerAndreGoderFraTidligereArbeidsgiver = finnSpørsmål(
    mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter,
    mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver
  );

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Annen pengestøtte</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>
            {mottaLønnEllerAndreGoderFraTidligereArbeidsgiver?.label}
          </FormSummary.Label>
          <OppsummeringsSvar
            spørsmål={mottaLønnEllerAndreGoderFraTidligereArbeidsgiver!}
            svar={
              data[mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver] ??
              "Ubesvart"
            }
          />
        </FormSummary.Answer>
        {data[mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver] === "ja" &&
          data.pengestøtteFraTidligereArbeidsgiver?.map((pengestøtte, index) => (
            <FormSummary.Answer>
              <FormSummary.Label>
                {" "}
                {`Utbetalinger eller økonomiske goder fra tidligere arbeidsgiver ${index + 1}`}
              </FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(pengestøtte).map((enPengestøtte) => {
                    const spørsmål = finnSpørsmål(
                      pengestøtteFraTidligereArbeidsgiverModalKomponenter,
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
            svar={data[mottarDuPengestøtteFraAndreEnnNav] ?? "Ubesvart"}
          />
        </FormSummary.Answer>
        {data[mottarDuPengestøtteFraAndreEnnNav] === "ja" &&
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
      </FormSummary.Answers>
      <FormSummaryFooter
        seksjonsUrl={seksjonsUrl}
        redigerbar={redigerbar}
        seksjonnavn="Annen pengestøtte"
      />
    </FormSummary>
  );
}
