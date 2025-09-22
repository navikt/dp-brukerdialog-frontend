import {
  kanIkkeJobbeIHeleNorgeKortOmSituasjonen,
  kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
  reellArbeidssøkerSpørsmål,
  ReellArbeidssøkerSvar,
} from "~/seksjon/reell-arbeidssøker/reell-arbeidssøker.spørsmål";
import { FormSummary } from "@navikt/ds-react";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";
import { FlervalgSpørsmål } from "~/components/spørsmål/spørsmål.types";

export default function ReellArbeidssøkerOppsummering({ seksjonsData, seksjonsUrl }: SeksjonProps) {
  if (!seksjonsData) return <></>;

  const reellArbeidssøkerData: ReellArbeidssøkerSvar = JSON.parse(seksjonsData);
  const reellArbeidssøkerEntries = Object.entries(reellArbeidssøkerData);

  function kanIkkeJobbeIHeleNorge(spørsmål: FlervalgSpørsmål, svar: string) {
    const kanIkkeJobbeIHeleNorgeSpørsmål: FlervalgSpørsmål = reellArbeidssøkerSpørsmål.find(
      (s) => s.id === kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg
    ) as FlervalgSpørsmål;

    const kanIkkeJobbeIHeleNorgeOmSituasjonen = reellArbeidssøkerEntries.find(
      (entry) => entry[0] === kanIkkeJobbeIHeleNorgeKortOmSituasjonen
    );

    function hentKanIkkeJobbeINorgeGrunnLabelTekst() {
      return Object.entries(reellArbeidssøkerData)
        .filter(([key]) => key.startsWith(kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg))
        .map(([, value]) => {
          return (
            kanIkkeJobbeIHeleNorgeSpørsmål?.options?.find((o) => o.value === value)?.label || value
          );
        })
        .join(", ");
    }

    return (
      <>
        <FormSummary.Answer key={spørsmål.id}>
          <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
          <OppsummeringsSvar spørsmål={spørsmål} svar={svar} />
        </FormSummary.Answer>
        <FormSummary.Answer key={spørsmål.id}>
          <FormSummary.Label>Velg situasjon som gjelder deg</FormSummary.Label>
          <FormSummary.Value>{hentKanIkkeJobbeINorgeGrunnLabelTekst()}</FormSummary.Value>
        </FormSummary.Answer>
        {kanIkkeJobbeIHeleNorgeOmSituasjonen && (
          <FormSummary.Answer key={spørsmål.id}>
            <FormSummary.Label>Skriv kort om situasjonen din</FormSummary.Label>
            <FormSummary.Value>{kanIkkeJobbeIHeleNorgeOmSituasjonen[1]}</FormSummary.Value>
          </FormSummary.Answer>
        )}
      </>
    );
  }

  function kanIkkeJobbeBådeHeltidOgDeltid(spørsmål: FlervalgSpørsmål, svar: string) {
    const kanIkkeJobbeBådeHeltidOgDeltidSpørsmål: FlervalgSpørsmål = reellArbeidssøkerSpørsmål.find(
      (s) => s.id === "kan-ikke-jobbe-heltid-og-deltid-situasjonen-som-gjelder-deg"
    ) as FlervalgSpørsmål;

    const kanIkkeJobbeBådeHeltidOgDeltidOmSituasjonen = reellArbeidssøkerEntries.find(
      (entry) => entry[0] === "kan-ikke-jobbe-heltid-og-deltid-kort-om-sitasjonen"
    );

    const kanIkkeJobbeBådeHeltidOgDeltidGrunn = Object.entries(reellArbeidssøkerData)
      .filter(([key]) =>
        key.startsWith("kan-ikke-jobbe-heltid-og-deltid-situasjonen-som-gjelder-deg")
      )
      .map(([, value]) => {
        return (
          kanIkkeJobbeBådeHeltidOgDeltidSpørsmål?.options?.find((o) => o.value === value)?.label ||
          value
        );
      })
      .join(", ");

    return (
      <>
        <FormSummary.Answer key={spørsmål.id}>
          <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
          <OppsummeringsSvar spørsmål={spørsmål} svar={svar} />
        </FormSummary.Answer>
        <FormSummary.Answer key={spørsmål.id}>
          <FormSummary.Label>Velg situasjon som gjelder deg</FormSummary.Label>
          <FormSummary.Value>{kanIkkeJobbeBådeHeltidOgDeltidGrunn}</FormSummary.Value>
        </FormSummary.Answer>
        {kanIkkeJobbeBådeHeltidOgDeltidOmSituasjonen && (
          <FormSummary.Answer key={spørsmål.id}>
            <FormSummary.Label>Skriv kort om situasjonen din</FormSummary.Label>
            <FormSummary.Value>{kanIkkeJobbeBådeHeltidOgDeltidOmSituasjonen[1]}</FormSummary.Value>
          </FormSummary.Answer>
        )}
      </>
    );
  }

  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Reell arbeidssøker</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        {reellArbeidssøkerSpørsmål.map((spørsmål) => {
          let svar = reellArbeidssøkerData[spørsmål.id as keyof ReellArbeidssøkerSvar];
          if (
            svar === undefined ||
            spørsmål.id === "kan-ikke-jobbe-i-hele-norge-kort-om-sitasjonen" ||
            spørsmål.id === "kan-ikke-jobbe-heltid-og-deltid-kort-om-sitasjonen"
          )
            return null;
          if (spørsmål.id === "kan-du-jobbe-i-hele-norge" && svar === "nei") {
            return kanIkkeJobbeIHeleNorge(spørsmål as FlervalgSpørsmål, svar);
          }

          if (spørsmål.id === "kan-du-jobbe-både-heltid-og-deltid" && svar === "nei") {
            return kanIkkeJobbeBådeHeltidOgDeltid(spørsmål as FlervalgSpørsmål, svar);
          }

          return (
            <FormSummary.Answer key={spørsmål.id}>
              <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
              <OppsummeringsSvar spørsmål={spørsmål} svar={svar.toString()} />
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
