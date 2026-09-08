import type { Person } from "~/routes/$soknadId.personalia";

type PersonNavn = Pick<Person, "fornavn" | "mellomnavn" | "etternavn">;

export function hentOgFormatterNavn(person: PersonNavn | null | undefined) {
  if (!person) {
    return "";
  }

  return [person.fornavn, person.mellomnavn, person.etternavn]
    .filter(Boolean)
    .map(formaterNavn)
    .join(" ");
}

export function formaterNavn(navn: string) {
  return navn.charAt(0).toUpperCase() + navn.slice(1).toLowerCase();
}
