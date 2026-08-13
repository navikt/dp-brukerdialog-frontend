import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { SeksjonSvar } from "~/routes/$soknadId.barnetillegg";
import {
  lagBarnetilleggKomponenter,
  lagBarnFraPdlKomponenter,
  lagLeggTilBarnManueltModalKomponenter,
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
  if (!seksjonSvarene) return null;

  const { t } = useVersjonertTranslation("barnetillegg", 1);

  const barnetilleggSvar = seksjonSvarene as SeksjonSvar;
  const entries = Object.entries(barnetilleggSvar);
  const forsørgerDuBarnSomIkkeVisesHerSvar = barnetilleggSvar[forsørgerDuBarnSomIkkeVisesHer];

  if (forsørgerDuBarnSomIkkeVisesHerSvar === undefined) {
    return null;
  }

  const barnetilleggKomponenter = lagBarnetilleggKomponenter(t);
  const barnFraPdlSpørsmål = lagBarnFraPdlKomponenter(t);
  const leggTilBarnManueltSpørsmål = lagLeggTilBarnManueltModalKomponenter(t);

  const forsørgerDuBarnetSpørsmål = barnetilleggKomponenter.find(
    (s) => s.id === forsørgerDuBarnSomIkkeVisesHer
  )!;

  const alleBarna = barnetilleggSvar.barnFraPdl?.concat(barnetilleggSvar.barnLagtManuelt ?? []);

  function finnLabelNavn(id: string) {
    return leggTilBarnManueltSpørsmål.find((spørsmål) => spørsmål.id === id)?.label;
  }

  function finnBarnFraPdlLabelNavn(id: string) {
    return barnFraPdlSpørsmål.find((spørsmål) => spørsmål.id === id)?.label;
  }

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">{t("side.overskrift")}</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {!entries.length && <div>{t("oppsummering.ingenSvar")}</div>}
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
              <FormSummary.Label>{t("oppsummering.barn", { nummer: index + 1 })}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  <FormSummary.Answer>
                    <FormSummary.Label>
                      {finnBarnFraPdlLabelNavn("fornavnOgMellomnavn")}
                    </FormSummary.Label>
                    <FormSummary.Value>{barn[fornavnOgMellomnavn]}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnBarnFraPdlLabelNavn("etternavn")}</FormSummary.Label>
                    <FormSummary.Value>{barn[etternavn]}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnBarnFraPdlLabelNavn("fødselsdato")}</FormSummary.Label>
                    <FormSummary.Value>
                      {formaterNorskDato(new Date(barn[fødselsdato]))}
                    </FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnBarnFraPdlLabelNavn("bostedsland")}</FormSummary.Label>
                    <FormSummary.Value>{barn[bostedsland]}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>
                      {finnBarnFraPdlLabelNavn("forsørgerDuBarnet")}
                    </FormSummary.Label>
                    <FormSummary.Value>
                      {barnetilleggSvar.barnLagtManuelt?.find(
                        (b) => b.fødselsdato === barn[fødselsdato]
                      )
                        ? "Ja"
                        : barn[forsørgerDuBarnet] === "ja"
                          ? "Ja"
                          : "Nei"}
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
        seksjonnavn={t("side.overskrift")}
      />
    </FormSummary>
  );
}
