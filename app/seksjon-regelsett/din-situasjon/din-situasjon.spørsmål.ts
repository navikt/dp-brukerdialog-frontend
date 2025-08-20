import { addMonths, endOfDay, startOfDay, subMonths } from "date-fns";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const mottatt = "mottatt";
export const arsak = "arsak";
export const dato = "dato";

export type DinSituasjonSvar = {
  [mottatt]?: "ja" | "nei" | "vetikke";
  [arsak]?: string;
  [dato]?: string;
};

export const dinSituasjonSpørsmål: KomponentType[] = [
  {
    id: mottatt,
    type: "envalg",
    label: "Har du mottatt dagpenger fra NAV i løpet av de siste 52 ukene?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
      { value: "vetikke", label: "Vet ikke" },
    ],
  },
  {
    id: arsak,
    type: "langTekst",
    label: "Skriv årsaken til at dagpengene ble stanset (Maks 500 tegn)",
    maxLength: 500,
    visHvis: (svar: DinSituasjonSvar) => svar.mottatt === "ja",
  },
  {
    id: dato,
    type: "dato",
    label: "Hvilken dato søker du dagpenger fra?",
    description:
      "Du kan få dagpenger fra første dag du er helt eller delvis arbeidsledig eller permittert og tidligst fra den dagen du sender inn søknaden. Datoen du søker om dagpenger fra har betydning for beregning av dagpengene dine.",
    visHvis: (svar: DinSituasjonSvar) => svar.mottatt === "nei" || svar.mottatt === "vetikke",
    fraOgMed: startOfDay(subMonths(new Date(), 6)),
    tilOgMed: endOfDay(addMonths(new Date(), 3)),
  },
  {
    id: "hvilkenDatoSøkerDuDagpengerFraLesMer",
    type: "lesMer",
    label: "Dato, inntekt og beregning av dagpenger",
    description:
      "Vi beregner hvor mye du kan få i dagpenger basert på hva du har hatt i inntekt de siste 12 eller 36 månedene. Ønsker du å få med siste måneds inntekt, må du søke dagpenger tidligst fra den 6. i måneden etter. Årsaken er at vi får melding om inntekten din fra Skatteetaten den 5. i måneden. Hvis den 5. er en helg eller helligdag, får vi melding om inntekten din neste virkedag.<br/><br/>" +
      "<strong>Eksempel:</strong><br/><br/>" +
      "Hvis du søker om dagpenger fra 1. til 5. mars, vil januar bli siste måned med inntekt som tas med i beregningen av dagpengene dine. Søker du om dagpenger fra 6. mars, vil februar bli siste måned med inntekt som tas med i beregningen.<br/><br/>" +
      "Hvis 5. mars er en lørdag, får vi inn inntekten din mandag 7. mars. Da må du søke dagpenger fra tirsdag 8. mars hvis du vil ha med inntekten din fra februar i beregningen.",
    visHvis: (svar: DinSituasjonSvar) => svar.mottatt === "nei" || svar.mottatt === "vetikke",
  },
];
