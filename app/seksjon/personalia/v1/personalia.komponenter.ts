import { KomponentType } from "~/components/Komponent.types";
import { endOfDay } from "date-fns";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const fornavnFraPdl = "fornavnFraPdl";
export const mellomnavnFraPdl = "mellomnavnFraPdl";
export const etternavnFraPdl = "etternavnFraPdl";
export const fødselsnummerFraPdl = "fødselsnummerFraPdl";
export const alderFraPdl = "alderFraPdl";
export const adresselinje1FraPdl = "adresselinje1FraPdl";
export const adresselinje2FraPdl = "adresselinje2FraPdl";
export const adresselinje3FraPdl = "adresselinje3FraPdl";
export const postnummerFraPdl = "postnummerFraPdl";
export const poststedFraPdl = "poststedFraPdl";
export const kontonummerFraKontoregister = "kontonummerFraKontoregister";
export const folkeregistrertAdresseErNorgeStemmerDet = "folkeregistrertAdresseErNorgeStemmerDet";
export const landkodeFraPdl = "landkodeFraPdl";
export const landFraPdl = "landFraPdl";
export const bostedsland = "bostedsland";
export const reistTilbakeTilBostedslandet = "reistTilbakeTilBostedslandet";
export const reisteDuHjemTilLandetDuBorI = "reisteDuHjemTilLandetDuBorI";
export const reisteDuITaktMedRotasjon = "reisteDuITaktMedRotasjon";
export const avreiseDatoFra = "avreiseDatoFra";
export const avreiseDatoTil = "avreiseDatoTil";
export const hvorforReistDuFraNorge = "hvorforReistDuFraNorge";
export const handling = "handling";

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
    id: "viHarRegistretAtDuErOver67Informasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Vi har registrert at du er over 67 år",
    description:
      '<p>Du har ikke rett til dagpenger lenger enn ut måneden du fyller 67 år. Hvis du ikke har søkt om alderspensjon, kan du <a href="https://www.nav.no/soknader#alderspensjon">søke om alderspensjon her</a>.</p>',
    visHvis: (svar: PersonaliaSvar) => Number(svar[alderFraPdl]) >= 67,
  },
  {
    id: "personaliaBostedslandForklarendeTekst",
    type: "forklarendeTekst",
    description: "<h3>Bostedsland</h3>",
  },
  {
    id: folkeregistrertAdresseErNorgeStemmerDet,
    type: "envalg",
    label: "Du er folkeregistrert i Norge. Er Norge bostedslandet ditt?",
    description:
      "Bostedslandet ditt er det landet du eier eller leier bolig i og tilbringer mesteparten av tiden din, også når du ikke jobber.",
    options: [
      { value: "ja", label: "Ja, Norge er bostedslandet mitt" },
      { value: "nei", label: "Nei, Norge er ikke bostedslandet mitt" },
    ],
    visHvis: (svar: PersonaliaSvar) => svar[landFraPdl] === "NORGE",
  },
];

export const personaliaBostedslandSpørsmål: KomponentType[] = [
  {
    id: bostedsland,
    type: "land",
    label: "Hvilket land bor du i?",
    visHvis: (svar: PersonaliaSvar) =>
      svar[landFraPdl] !== "NORGE" || svar[folkeregistrertAdresseErNorgeStemmerDet] === "nei",
  },
  {
    id: "bostedslandLesMer",
    type: "lesMer",
    label: "For deg som har pendlet mellom EØS-Land og Sveits",
    description:
      "Hvis du bor i et EØS-land og jobber i et annet, er du en EØS-pendler. Det er egne regler for hvor du skal søke om penger hvis du blir arbeidsledig eller permittert og du har tilknytning til flere EØS-land.<br/><br/>" +
      "Hvilket land du skal søke om penger fra avhenger av" +
      "<ul>" +
      "<li>hvilket land du sist jobbet i</li>" +
      "<li>hvilket land du bor i</li>" +
      "<li>om du er permittert eller delvis arbeidsledig, eller om du er helt arbeidsledig</li>" +
      "</ul>" +
      "Er du usikker på hva du skal svare, kan du lese <a href='https://nav.no/dagpenger#eos'>mer om hvor du skal søke penger fra</a>.",
    visHvis: (svar: PersonaliaSvar) =>
      svar[landFraPdl] !== "NORGE" || svar[folkeregistrertAdresseErNorgeStemmerDet] === "nei",
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
    tilOgMed: endOfDay(new Date()),
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
    type: "langTekst",
    label: "Hvorfor reiste du fra Norge?",
    maksLengde: 500,
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
