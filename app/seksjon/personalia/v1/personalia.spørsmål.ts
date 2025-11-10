import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const fornavnFraPdl = "fornavn-fra-pdl";
export const mellomnavnFraPdl = "mellomnavn-fra-pdl";
export const etternavnFraPdl = "etternavn-fra-pdl";
export const fødselsnummerFraPdl = "fødselsnummer-fra-pdl";
export const alderFraPdl = "alder-fra-pdl";
export const adresselinje1FraPdl = "adresselinje-1-fra-pdl";
export const adresselinje2FraPdl = "adresselinje-2-fra-pdl";
export const adresselinje3FraPdl = "adresselinje-3-fra-pdl";
export const postnummerFraPdl = "postnummer-fra-pdl";
export const poststedFraPdl = "poststed-fra-pdl";
export const kontonummerFraKontoregister = "kontonummer-fra-kontoregister";
export const folkeregistrertAdresseErNorgeStemmerDet =
  "folkeregistrert-adresse-er-norge-stemmer-det";
export const landkodeFraPdl = "landkode-fra-pdl";
export const landFraPdl = "land-fra-pdl";
export const bostedsland = "bostedsland";
export const reistTilbakeTilBostedslandet = "reist-tilbake-til-bostedslandet";
export const reisteDuHjemTilLandetDuBorI = "reiste-du-hjem-til-landet-du-bor-i";
export const reisteDuITaktMedRotasjon = "reiste-du-i-takt-med-rotasjon";
export const avreiseDatoFra = "avreise-dato-fra";
export const avreiseDatoTil = "avreise-dato-til";
export const hvorforReistDuFraNorge = "hvorfor-reist-du-fra-norge";
export const erTilbakenavigering = "erTilbakenavigering";

export type PersonaliaSvar = {
  [fornavnFraPdl]?: string;
  [mellomnavnFraPdl]?: string;
  [etternavnFraPdl]?: string;
  [fødselsnummerFraPdl]?: string;
  [alderFraPdl]?: string;
  [adresselinje1FraPdl]?: string;
  [adresselinje2FraPdl]?: string;
  [adresselinje3FraPdl]?: string;
  [postnummerFraPdl]?: string;
  [poststedFraPdl]?: string;
  [kontonummerFraKontoregister]?: string;
  [landkodeFraPdl]?: string;
  [landFraPdl]?: string;
  [folkeregistrertAdresseErNorgeStemmerDet]?: string;
  [bostedsland]?: string;
  [reistTilbakeTilBostedslandet]?: "ja" | "nei";
  [reisteDuHjemTilLandetDuBorI]?: "ja" | "nei";
  [reisteDuITaktMedRotasjon]?: "ja" | "nei";
  [avreiseDatoFra]?: string;
  [avreiseDatoTil]?: string;
  [hvorforReistDuFraNorge]?: string;
};

export const personaliaSpørsmål: KomponentType[] = [
  {
    id: fornavnFraPdl,
    type: "registeropplysning",
    label: "Fornavn",
  },
  {
    id: mellomnavnFraPdl,
    type: "registeropplysning",
    label: "Mellomnavn",
  },
  {
    id: etternavnFraPdl,
    type: "registeropplysning",
    label: "Etternavn",
  },
  {
    id: fødselsnummerFraPdl,
    type: "registeropplysning",
    label: "Fødselsnummer",
  },
  {
    id: adresselinje1FraPdl,
    type: "registeropplysning",
    label: "Adresselinje 1",
  },
  {
    id: adresselinje2FraPdl,
    type: "registeropplysning",
    label: "Adresselinje 2",
  },
  {
    id: adresselinje3FraPdl,
    type: "registeropplysning",
    label: "Adresselinje 3",
  },
  {
    id: postnummerFraPdl,
    type: "registeropplysning",
    label: "Postnummer",
  },
  {
    id: poststedFraPdl,
    type: "registeropplysning",
    label: "Poststed",
  },
  {
    id: landkodeFraPdl,
    type: "registeropplysning",
    label: "Landkode",
  },
  {
    id: landFraPdl,
    type: "registeropplysning",
    label: "Land",
  },
  {
    id: kontonummerFraKontoregister,
    type: "registeropplysning",
    label: "Kontonummer",
  },
  {
    id: "viHarRegistretAtDuErOver67VarselMelding",
    type: "varselmelding",
    variant: "warning",
    label: "Vi har registrert at du er over 67 år",
    description:
      "Du har ikke rett på dagpenger fordi du er over 67 år. Hvis du ikke har søkt om alderspensjon, kan du søke om <a href='https://www.nav.no/soknader'>alderspensjon her</a>.",
    visHvis: (svar: PersonaliaSvar) => Number(svar[alderFraPdl]) >= 67,
  },
  {
    id: folkeregistrertAdresseErNorgeStemmerDet,
    type: "envalg",
    label: "Vi ser fra din folkeregistrete adresse at du bor i Norge. Stemmer dette?",
    options: [
      { value: "ja", label: "Ja, jeg bor i Norge" },
      { value: "nei", label: "Nei, jeg bor ikke i Norge" },
    ],
    visHvis: (svar: PersonaliaSvar) => svar[landFraPdl] === "NORGE",
  },
];

export const personaliaBostedslandSpørsmål: KomponentType[] = [
  {
    id: "personaliaBostedslandForklarendeTekst",
    type: "forklarendeTekst",
    description: "<h2>Bostedsland</h2>",
    visHvis: (svar: PersonaliaSvar) =>
      svar[folkeregistrertAdresseErNorgeStemmerDet] === "nei" && svar[landFraPdl] === "NORGE",
  },
  {
    id: bostedsland,
    type: "land",
    label: "Hvilket land bor du i?",
    description:
      "Med bostedsland mener vi ditt vanlige oppholdssted, som er der du eier eller leier bolig og tilbringer mesteparten av tiden din. Du må som hovedregel oppholde deg i Norge for å ha rett til dagpenger fra Norge.",
    visHvis: (svar: PersonaliaSvar) =>
      svar[landFraPdl] !== "NORGE" || svar[folkeregistrertAdresseErNorgeStemmerDet] === "nei",
  },
  {
    id: "bostedslandLesMer",
    type: "lesMer",
    label: "For deg som her pendlet mellom EØS-Land og Sveits",
    description:
      "Hvis du bor i et EØS-land og jobber i et annet, er du en EØS-pendler. Det er egne regler for hvor du skal søke om penger hvis du blir arbeidsledig eller permittert og du har tilknytning til flere EØS-land.<br/><br/>" +
      "Hvilket land du skal søke om penger fra avhenger av" +
      "<ul>" +
      "<li>hvilket land du sist jobbet i</li>" +
      "<li>hvilket land du bor i</li>" +
      "<li>om du er permittert eller delvis arbeidsledig, eller om du er helt arbeidsledig</li>" +
      "</ul>" +
      "Er du usikker på hva du skal svare, kan du lese <a href='https://nav.no/dagpenger#eos'>mer om hvor du skal søke penger fra</a>.",
  },
  {
    id: reistTilbakeTilBostedslandet,
    type: "envalg",
    label:
      "Har du reist tilbake til bostedslandet ditt etter at du ble arbeidsledig eller permittert?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: PersonaliaSvar) => !!svar[bostedsland] && svar[bostedsland] !== "NOR",
  },
  {
    id: avreiseDatoFra,
    type: "periodeFra",
    label: "Fra dato",
    periodeLabel: "Avreise dato",
    visHvis: (svar: PersonaliaSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  },
  {
    id: avreiseDatoTil,
    type: "periodeTil",
    label: "Til dato",
    optional: true,
    visHvis: (svar: PersonaliaSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  },
  {
    id: hvorforReistDuFraNorge,
    type: "kortTekst",
    label: "Hvorfor reiste du fra Norge?",
    visHvis: (svar: PersonaliaSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  },
  {
    id: reisteDuHjemTilLandetDuBorI,
    type: "envalg",
    label: "Reiste du hjem til landet du bor i en gang i uken eller mer, mens du jobbet i Norge?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: PersonaliaSvar) => !!svar[bostedsland] && svar[bostedsland] !== "NOR",
  },
  {
    id: reisteDuITaktMedRotasjon,
    type: "envalg",
    label: "Reiste du i takt med rotasjon?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: PersonaliaSvar) => svar[reisteDuHjemTilLandetDuBorI] === "nei",
  },
];
