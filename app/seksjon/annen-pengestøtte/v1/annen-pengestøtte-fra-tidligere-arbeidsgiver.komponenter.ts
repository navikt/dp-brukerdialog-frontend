import { KomponentType } from "~/components/Komponent.types";

export const hvemMottarDuUtbetalingerEllerGoderFra = "hvemMottarDuUtbetalingerEllerGoderFra";
export const hvaFårEllerBeholderDu = "hvaFårEllerBeholderDu";

export type PengestøtteFraTidligereArbeidsgiverModalSvar = {
  [hvemMottarDuUtbetalingerEllerGoderFra]?: string;
  [hvaFårEllerBeholderDu]?: string;
};

export const pengestøtteFraTidligereArbeidsgiverModalKomponenter: KomponentType[] = [
  {
    id: hvemMottarDuUtbetalingerEllerGoderFra,
    type: "kortTekst",
    maksLengde: 200,
    label: "Hvem mottar du utbetalinger eller økonomiske goder fra?",
  },
  {
    id: "hvemMottarDuUtbetalingerEllerGoderFraLesMer",
    type: "lesMer",
    label: "Dette mener vi med utbetalinger og økonomiske goder",
    description:
      "<p><strong>Utbetalinger</strong><br/>Med utbetalinger mener vi for eksempel:</p>" +
      "<p><ul><li>Sluttvederlag</li>" +
      "<li>Etterlønn</li>" +
      "<li>Andre utbetalinger som erstatter lønn</li></ul></p>" +
      "<p>Du skal ikke oppgi utbetalinger som er lønn i oppsigelsestiden eller feriepenger.</p>" +
      "<p><strong>Økonomiske goder</strong><br/>Med økonomisk goder mener vi for eksempel:</p>" +
      "<p><ul><li>Bil</li>" +
      "<li>Abonnementer</li>" +
      "<li>Andre goder med stor verdi</li></ul></p>" +
      "<p>Du skal kun oppgi økonomiske goder du beholder etter at arbeidsforholdet er avsluttet.</p>",
  },
  {
    id: hvaFårEllerBeholderDu,
    type: "langTekst",
    label: "Skriv inn hva du får eller beholder",
    maksLengde: 500,
  },
  {
    id: "dokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Avtalen om sluttvederlag, etterlønn eller andre økonomiske goder",
  },
];
