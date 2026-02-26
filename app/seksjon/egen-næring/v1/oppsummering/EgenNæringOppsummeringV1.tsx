import { FormSummary } from "@navikt/ds-react";
import { OppsummeringsSvar } from "~/components/OppsummeringsSvar";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  egenNæringEgenNæringsvirksomhetKomponenter,
  egenNæringEgetGårdsbrukKomponenter,
  leggTilGårdsbrukKomponenter,
  leggTilNæringsvirksomhetKomponenter,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";

import { KomponentType } from "~/components/Komponent.types";
import { SeksjonSvar as EgenNæringSeksjon } from "~/routes/$soknadId.egen-naring";
import { FormSummaryFooter } from "~/seksjon/oppsummering/FormSummaryFooter";
import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";

export function EgenNæringOppsummeringV1({
  seksjonSvarene,
  seksjonsUrl,
  redigerbar,
}: SeksjonProps) {
  if (!seksjonSvarene) return null;

  const egenNæringSvar = seksjonSvarene as EgenNæringSeksjon;

  const driverDuEgenNæringsvirksomhetSpørsmål = egenNæringEgenNæringsvirksomhetKomponenter.find(
    (s) => s.id === driverDuEgenNæringsvirksomhet
  );

  const driverDuEgenGårdsbrukSpørsmål = egenNæringEgetGårdsbrukKomponenter.find(
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
              svar={egenNæringSvar[driverDuEgenNæringsvirksomhet] ?? "Ikke besvart"}
            />
          ) : (
            "Ikke besvart"
          )}
        </FormSummary.Answer>
        {egenNæringSvar[driverDuEgenNæringsvirksomhet] === "ja" &&
          egenNæringSvar["næringsvirksomheter"]?.map((næringsvirksomhet, index) => (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>Egen næringsvirksomhet {index + 1}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(næringsvirksomhet).map((arbeidsforholdModalSvar) => {
                    const spørsmål = finnSpørsmål(
                      leggTilNæringsvirksomhetKomponenter,
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
              svar={egenNæringSvar[driverDuEgetGårdsbruk] ?? "Ikke besvart"}
            />
          ) : (
            "Ikke besvart"
          )}
        </FormSummary.Answer>
        {egenNæringSvar[driverDuEgetGårdsbruk] === "ja" &&
          egenNæringSvar["gårdsbruk"]?.map((gårdsbruk, index) => (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>Eget gårdsbruk {index + 1}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.entries(gårdsbruk).map((arbeidsforholdModalSvar) => {
                    const spørsmål = finnSpørsmål(
                      leggTilGårdsbrukKomponenter,
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
      <FormSummaryFooter
        seksjonsUrl={seksjonsUrl}
        redigerbar={redigerbar}
        seksjonnavn="Egen næring"
      />
    </FormSummary>
  );
}
