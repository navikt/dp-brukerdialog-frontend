import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  egenNæringEgenNæringsvirksomhetSpørsmål,
  egenNæringEgetGårdsbrukSpørsmål,
  EgenNæringResponse,
  leggTilGårdsbrukSpørsmål,
  leggTilNæringsvirksomhetSpørsmål,
} from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";

import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import FormSummaryFooter from "~/seksjon/oppsummering/FormSummaryFooter";

export default function EgenNæringOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const egenNæringSvar = seksjonSvarene as EgenNæringResponse;

  const driverDuEgenNæringsvirksomhetSpørsmål = egenNæringEgenNæringsvirksomhetSpørsmål.find(
    (s) => s.id === driverDuEgenNæringsvirksomhet
  );

  const driverDuEgenGårdsbrukSpørsmål = egenNæringEgetGårdsbrukSpørsmål.find(
    (s) => s.id === driverDuEgetGårdsbruk
  );

  const finnSpørsmål = (spørsmålListe: KomponentType[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id);

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Egen næring</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>{driverDuEgenNæringsvirksomhetSpørsmål?.label}</FormSummary.Label>
          {driverDuEgenNæringsvirksomhetSpørsmål ? (
            <OppsummeringsSvar
              spørsmål={driverDuEgenNæringsvirksomhetSpørsmål}
              svar={egenNæringSvar["driver-du-egen-næringsvirksomhet"] ?? "Ikke besvart"}
            />
          ) : (
            "Ikke besvart"
          )}
        </FormSummary.Answer>
        {egenNæringSvar["driver-du-egen-næringsvirksomhet"] === "ja" &&
          egenNæringSvar["næringsvirksomheter"]?.map((næringsvirksomhet, index) => (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>Egen næringsvirksomhet {index + 1}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(næringsvirksomhet).map((arbeidsforholdModalSvar) => {
                    const spørsmål = finnSpørsmål(
                      leggTilNæringsvirksomhetSpørsmål,
                      arbeidsforholdModalSvar[0]
                    );
                    if (spørsmål && !erInformasjonsFelt(spørsmål))
                      return (
                        <FormSummary.Answer key={arbeidsforholdModalSvar[0]}>
                          <FormSummary.Label>{spørsmål?.label}</FormSummary.Label>
                          <OppsummeringsSvar
                            spørsmål={spørsmål!}
                            svar={arbeidsforholdModalSvar[1]}
                          />
                        </FormSummary.Answer>
                      );
                  })}
                </FormSummary.Answers>
              </FormSummary.Value>
            </FormSummary.Answer>
          ))}

        <FormSummary.Answer>
          <FormSummary.Label>{driverDuEgenGårdsbrukSpørsmål?.label}</FormSummary.Label>
          {driverDuEgenGårdsbrukSpørsmål ? (
            <OppsummeringsSvar
              spørsmål={driverDuEgenGårdsbrukSpørsmål}
              svar={egenNæringSvar["driver-du-eget-gårdsbruk"] ?? "Ikke besvart"}
            />
          ) : (
            "Ikke besvart"
          )}
        </FormSummary.Answer>
        {egenNæringSvar["driver-du-eget-gårdsbruk"] === "ja" &&
          egenNæringSvar["gårdsbruk"]?.map((gårdsbruk, index) => (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>Eget gårdsbruk {index + 1}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(gårdsbruk).map((arbeidsforholdModalSvar) => {
                    const spørsmål = finnSpørsmål(
                      leggTilGårdsbrukSpørsmål,
                      arbeidsforholdModalSvar[0]
                    );
                    if (spørsmål && !erInformasjonsFelt(spørsmål))
                      return (
                        <FormSummary.Answer key={arbeidsforholdModalSvar[0]}>
                          <FormSummary.Label>{spørsmål?.label}</FormSummary.Label>
                          <OppsummeringsSvar
                            spørsmål={spørsmål!}
                            svar={arbeidsforholdModalSvar[1]}
                          />
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
