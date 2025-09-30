import {
  barnetilleggSpørsmål,
  forsørgerDuBarnSomIkkeVisesHer,
  leggTilBarnManueltSpørsmål,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnetilleggResponse } from "~/routes/$soknadId.barnetillegg";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { formaterNorskDato } from "~/utils/formattering.utils";

import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";

export default function BarnetilleggOppsummeringV1({ seksjonSvarene, seksjonsUrl }: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const barnetilleggSvar = seksjonSvarene as BarnetilleggResponse;
  const entries = Object.entries(barnetilleggSvar);
  const forsørgerDuBarnSomIkkeVisesHerSvar = barnetilleggSvar[forsørgerDuBarnSomIkkeVisesHer];

  if (forsørgerDuBarnSomIkkeVisesHerSvar === undefined) {
    return null;
  }

  const forsørgerDuBarnetSpørsmål = barnetilleggSpørsmål.find(
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
            <FormSummary.Answer>
              <FormSummary.Label key={index}>Barn {index + 1}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnLabelNavn("fornavnOgMellomnavn")}</FormSummary.Label>
                    <FormSummary.Value>{barn.fornavnOgMellomnavn}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnLabelNavn("etternavn")}</FormSummary.Label>
                    <FormSummary.Value>{barn.etternavn}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnLabelNavn("fødselsdato")}</FormSummary.Label>
                    <FormSummary.Value>
                      {formaterNorskDato(new Date(barn.fødselsdato))}
                    </FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>{finnLabelNavn("bostedsland")}</FormSummary.Label>
                    <FormSummary.Value>{barn.bostedsland}</FormSummary.Value>
                  </FormSummary.Answer>
                  <FormSummary.Answer>
                    <FormSummary.Label>Forsørger du barnet?</FormSummary.Label>
                    <FormSummary.Value>
                      {barnetilleggSvar.barnLagtManuelt?.find(
                        (b) => b.fødselsdato === barn.fødselsdato
                      )
                        ? "Ja"
                        : barn.forsørgerDuBarnet === "ja"
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
      <FormSummary.Footer>
        <FormSummary.EditLink href={seksjonsUrl} />
      </FormSummary.Footer>
    </FormSummary>
  );
}
