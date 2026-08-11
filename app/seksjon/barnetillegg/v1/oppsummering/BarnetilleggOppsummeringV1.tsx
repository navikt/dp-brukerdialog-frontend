import { FormSummary } from "@navikt/ds-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { SeksjonSvar } from "~/routes/$soknadId.barnetillegg";
import {
  lagBarnetilleggKomponenter,
  lagLeggTilBarnManueltSpørsmål,
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  forsørgerDuBarnet,
  forsørgerDuBarnSomIkkeVisesHer,
  fødselsdato,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import { formaterNorskDato } from "~/utils/formatering.utils";

export function BarnetilleggOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  const { t } = useTranslation("barnetillegg");
  const barnetilleggKomponenter = useMemo(() => lagBarnetilleggKomponenter(t), [t]);
  const leggTilBarnManueltSpørsmål = useMemo(() => lagLeggTilBarnManueltSpørsmål(t), [t]);

  if (!seksjonSvarene) return null;

  const barnetilleggSvar = seksjonSvarene as SeksjonSvar;
  const entries = Object.entries(barnetilleggSvar);
  const forsørgerDuBarnSomIkkeVisesHerSvar = barnetilleggSvar[forsørgerDuBarnSomIkkeVisesHer];

  if (forsørgerDuBarnSomIkkeVisesHerSvar === undefined) {
    return null;
  }

  const forsørgerDuBarnetSpørsmål = barnetilleggKomponenter.find(
    (s) => s.id === forsørgerDuBarnSomIkkeVisesHer
  )!;

  const alleBarna = barnetilleggSvar.barnFraPdl?.concat(barnetilleggSvar.barnLagtManuelt ?? []);

  function finnLabelNavn(id: string) {
    return leggTilBarnManueltSpørsmål.find((spørsmål) => spørsmål.id === id)?.label;
  }

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Barnetillegg</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!entries.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}
        {
          <FormSummary.Answer key={"forsørgerDuBarnSomIkkeVisesHer"}>
            <FormSummary.Label>{forsørgerDuBarnetSpørsmål?.label}</FormSummary.Label>
            <OppsummeringsSvar
              spørsmål={forsørgerDuBarnetSpørsmål}
              svar={forsørgerDuBarnSomIkkeVisesHerSvar}
            />
          </FormSummary.Answer>
        }
        {alleBarna?.map((barn, index) => {
          return (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>Barn {index + 1}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnLabelNavn("fornavnOgMellomnavn")}</FormSummary.Label>
                    <FormSummary.Value>{barn[fornavnOgMellomnavn]}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnLabelNavn("etternavn")}</FormSummary.Label>
                    <FormSummary.Value>{barn[etternavn]}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnLabelNavn("fødselsdato")}</FormSummary.Label>
                    <FormSummary.Value>
                      {formaterNorskDato(new Date(barn[fødselsdato]))}
                    </FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnLabelNavn("bostedsland")}</FormSummary.Label>
                    <FormSummary.Value>{barn[bostedsland]}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{t("barn.forsorgerDuBarnet.label")}</FormSummary.Label>
                    <FormSummary.Value>
                      {barnetilleggSvar.barnLagtManuelt?.find(
                        (b) => b.fødselsdato === barn[fødselsdato]
                      )
                        ? t("felles.svar.ja")
                        : barn[forsørgerDuBarnet] === "ja"
                          ? t("felles.svar.ja")
                          : t("felles.svar.nei")}
                    </FormSummary.Value>
                  </FormSummary.Answer>
                </FormSummary.Answers>
              </FormSummary.Value>
            </FormSummary.Answer>
          );
        })}
      </FormSummary.Answers>
      <FormSummaryFooter
        seksjonsUrl={seksjonsUrl}
        redigerbar={redigerbar}
        seksjonnavn="Barnetillegg"
      />
    </FormSummary>
  );
}
