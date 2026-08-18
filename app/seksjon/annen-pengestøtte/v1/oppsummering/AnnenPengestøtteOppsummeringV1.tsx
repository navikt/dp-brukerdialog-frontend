import { FormSummary } from "@navikt/ds-react";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  lagPengestøtteFraAndreEøsLandKomponenter,
  lagPengestøtteFraAndreEøsLandModalKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter,
  lagPengestøtteFraNorgeKomponenter,
  lagPengestøtteFraNorgeModalKomponenter,
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
  mottarDuPengestøtteFraAndreEnnNav,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { KomponentType } from "~/components/Komponent.types";
import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import { lagPengestøtteFraTidligereArbeidsgiverModalKomponenter } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";

export function AnnenPengestøtteOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useVersjonertTranslation("annen-pengestøtte", 1);

  if (!seksjonSvarene) return null;

  const data = seksjonSvarene as AnnenPengestøtteResponse;

  const pengestøtteFraAndreEøsLandKomponenter = lagPengestøtteFraAndreEøsLandKomponenter(t);
  const pengestøtteFraAndreEøsLandModalKomponenter =
    lagPengestøtteFraAndreEøsLandModalKomponenter(t);
  const pengestøtteFraNorgeKomponenter = lagPengestøtteFraNorgeKomponenter(t);
  const pengestøtteFraNorgeModalKomponenter = lagPengestøtteFraNorgeModalKomponenter(t);
  const mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter =
    lagMottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter(t);
  const pengestøtteFraTidligereArbeidsgiverModalKomponenter =
    lagPengestøtteFraTidligereArbeidsgiverModalKomponenter(t);

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
        <FormSummary.Heading level="2">{t("side.overskrift")}</FormSummary.Heading>
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
              t("oppsummering.ubesvart")
            }
          />
        </FormSummary.Answer>
        {data[mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver] === "ja" &&
          data.pengestøtteFraTidligereArbeidsgiver?.map((pengestøtte, index) => (
            <FormSummary.Answer>
              <FormSummary.Label>
                {" "}
                {t("oppsummering.tidligereArbeidsgiverNr", { nr: index + 1 })}
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
            svar={data[mottarDuPengestøtteFraAndreEnnNav] ?? t("oppsummering.ubesvart")}
          />
        </FormSummary.Answer>
        {data[mottarDuPengestøtteFraAndreEnnNav] === "ja" &&
          data.pengestøtteFraNorge?.map((pengestøtte, index) => (
            <FormSummary.Answer>
              <FormSummary.Label> {t("oppsummering.norgeNr", { nr: index + 1 })}</FormSummary.Label>
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
            svar={
              data[harMottattEllerSøktOmPengestøtteFraAndreEøsLand] ?? t("oppsummering.ubesvart")
            }
          />
        </FormSummary.Answer>

        {data[harMottattEllerSøktOmPengestøtteFraAndreEøsLand] === "ja" &&
          data.pengestøtteFraAndreEøsLand?.map((pengestøtte, index) => (
            <FormSummary.Answer>
              <FormSummary.Label> {t("oppsummering.eøsNr", { nr: index + 1 })}</FormSummary.Label>
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
        seksjonnavn={t("side.overskrift")}
      />
    </FormSummary>
  );
}
