import { addMonths, endOfDay, startOfDay, subMonths } from "date-fns";
import { Sporsmal } from "../components/sporsmal/sporsmal.types";

export const mottatt = "mottatt";
export const arsak = "arsak";
export const dato = "dato";

export type DinSituasjonSvar = {
  [mottatt]?: "ja" | "nei" | "vetikke";
  [arsak]?: string;
  [dato]?: string;
};

export const dinSituasjonSporsmal: Sporsmal[] = [
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
];
