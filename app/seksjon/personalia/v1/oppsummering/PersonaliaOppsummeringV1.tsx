import { FormSummary } from "@navikt/ds-react";

import { SeksjonProps } from "~/seksjon/oppsummering/oppsummering.types";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  fødselsnummerFraPdl,
  kontonummerFraKontoregister,
  landFraPdl,
  navnFraPdl,
  personaliaSpørsmål,
  postnummerFraPdl,
  poststedFraPdl,
} from "~/seksjon/personalia/v1/personalia.spørsmål";
import { erInformasjonsFelt } from "~/utils/oppsummering.utils";
import OppsummeringsSvar from "~/components/OppsummeringsSvar";

function finnRegisterverdi(key: string, registerverdier: [string, string][]) {
  return registerverdier.find((verdi) => verdi[0] === key)?.[1];
}

export default function PersonaliaOppsummeringV1({ seksjonSvarene, seksjonsUrl }: SeksjonProps) {
  const seksjonSvar = Object.entries(seksjonSvarene);
  return (
    <FormSummary>
      <FormSummary.Header>
        <FormSummary.Heading level="2">Personalia</FormSummary.Heading>
      </FormSummary.Header>
      <FormSummary.Answers>
        <FormSummary.Answer>
          <FormSummary.Label>Navn</FormSummary.Label>
          <FormSummary.Value>{finnRegisterverdi(navnFraPdl, seksjonSvar)}</FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>Fødselsnummer</FormSummary.Label>
          <FormSummary.Value>
            {finnRegisterverdi(fødselsnummerFraPdl, seksjonSvar)}
          </FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>Alder</FormSummary.Label>
          <FormSummary.Value>{finnRegisterverdi(alderFraPdl, seksjonSvar)}</FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>Folkeregistrert adresse</FormSummary.Label>
          <FormSummary.Value>
            {finnRegisterverdi(adresselinje1FraPdl, seksjonSvar)}{" "}
            {finnRegisterverdi(adresselinje1FraPdl, seksjonSvar) && <br />}
            {finnRegisterverdi(adresselinje2FraPdl, seksjonSvar)}{" "}
            {finnRegisterverdi(adresselinje2FraPdl, seksjonSvar) && <br />}
            {finnRegisterverdi(adresselinje3FraPdl, seksjonSvar)}{" "}
            {finnRegisterverdi(adresselinje3FraPdl, seksjonSvar) && <br />}
            {finnRegisterverdi(postnummerFraPdl, seksjonSvar)}{" "}
            {finnRegisterverdi(poststedFraPdl, seksjonSvar)}
            {finnRegisterverdi(landFraPdl, seksjonSvar) && <br />}
            {finnRegisterverdi(landFraPdl, seksjonSvar)}
          </FormSummary.Value>
        </FormSummary.Answer>
        <FormSummary.Answer>
          <FormSummary.Label>Kontonummer</FormSummary.Label>
          <FormSummary.Value>
            {finnRegisterverdi(kontonummerFraKontoregister, seksjonSvar) ||
              "Vi har ikke registrert kontonummeret ditt, og anbefaler at du legger det inn på Min side."}
          </FormSummary.Value>
        </FormSummary.Answer>
        {!seksjonSvar.length && <div>Du har ikke svart på noen spørsmål i denne seksjonen</div>}

        {seksjonSvar.map(([key, value]) => {
          const spørsmål = personaliaSpørsmål.find((s) => s.id === key);
          if (spørsmål && !erInformasjonsFelt(spørsmål)) {
            return (
              <FormSummary.Answer key={key}>
                <FormSummary.Label>{spørsmål.label}</FormSummary.Label>
                <OppsummeringsSvar spørsmål={spørsmål} svar={value} />
              </FormSummary.Answer>
            );
          }
        })}
      </FormSummary.Answers>
      <FormSummary.Footer>
        <FormSummary.EditLink href={seksjonsUrl} />
      </FormSummary.Footer>
    </FormSummary>
  );
}
