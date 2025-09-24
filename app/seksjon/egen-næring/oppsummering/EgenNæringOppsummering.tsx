import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  egenNæringEgenNæringsvirksomhetSpørsmål,
  egenNæringEgetGårdsbrukSpørsmål,
  EgenNæringResponse,
  Gårdsbruk,
  leggTilGårdsbrukSpørsmål,
  leggTilNæringsvirksomhetSpørsmål,
  Næringsvirksomhet,
} from "~/seksjon/egen-næring/egen-næring.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { SeksjonProps } from "~/seksjon/oppsummering/OppsummeringUtils";

export default function EgenNæringOppsummering({ seksjonsData, seksjonsUrl }: SeksjonProps) {
  if (!seksjonsData) return <></>;

  const egenNæringSvar: EgenNæringResponse = JSON.parse(seksjonsData);

  const driverDuEgenNæringsvirksomhetSpørsmål = egenNæringEgenNæringsvirksomhetSpørsmål.find(
    (s) => s.id === driverDuEgenNæringsvirksomhet
  );

  const driverDuEgenGårdsbrukSpørsmål = egenNæringEgetGårdsbrukSpørsmål.find(
    (s) => s.id === driverDuEgetGårdsbruk
  );

  const finnLabel = (spørsmålListe: { id: string; label: string }[], id: string) =>
    spørsmålListe.find((spørsmål) => spørsmål.id === id)?.label;

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
          egenNæringSvar["næringsvirksomheter"]?.map((næring, index) => (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>Egen næringsvirksomhet {index + 1}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.keys(næring).map((key) => (
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        {finnLabel(leggTilNæringsvirksomhetSpørsmål, key)}
                      </FormSummary.Label>
                      <FormSummary.Value>
                        {næring[key as keyof Næringsvirksomhet]}
                      </FormSummary.Value>
                    </FormSummary.Answer>
                  ))}
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
          egenNæringSvar["gårdsbruk"]?.map((næring, index) => (
            <FormSummary.Answer key={index}>
              <FormSummary.Label>Eget gårdsbruk {index + 1}</FormSummary.Label>
              <FormSummary.Value>
                <FormSummary.Answers>
                  {Object.keys(næring).map((key) => (
                    <FormSummary.Answer>
                      <FormSummary.Label>
                        {finnLabel(leggTilGårdsbrukSpørsmål, key)}
                      </FormSummary.Label>
                      <FormSummary.Value>{næring[key as keyof Gårdsbruk]}</FormSummary.Value>
                    </FormSummary.Answer>
                  ))}
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
