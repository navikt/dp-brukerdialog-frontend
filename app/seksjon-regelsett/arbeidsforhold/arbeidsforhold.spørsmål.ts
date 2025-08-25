import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const hvordanHarDuJobbet = "hvordan-har-du-jobbet";
export const fastArbeidstidIMindreEnn6Måneder = "fast-arbeidstid-imindre-enn-6-måneder";
export const fastArbeidstidI6MånederEllerMer = "fast-arbeidstid-i-6-måneder-eller-mer";
export const varierendeArbeidstidDeSiste12Månedene = "varierende-arbeidstid-de-siste-12-månedene";
export const jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene =
  "jobbet-mer-igjennomsnitt-de-siste-36-månedene-enn-de-siste-12-månedenen";
export const harIkkeJobbetDeSiste36Månedene = "har-ikke-jobbet-de-siste-36-månedene";
export const harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene =
  "har-du-jobbet-iet-annet-eøs-land-sveits-eller-storbritannia-iløpet-av-de-siste-36-månedene";

export type ArbeidsforholdSvar = {
  [hvordanHarDuJobbet]?:
    | typeof fastArbeidstidIMindreEnn6Måneder
    | typeof fastArbeidstidI6MånederEllerMer
    | typeof varierendeArbeidstidDeSiste12Månedene
    | typeof jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene
    | typeof harIkkeJobbetDeSiste36Månedene;
  [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]?: "ja" | "nei";
};

export const arbeidsforholdSpørsmål: KomponentType[] = [
  {
    id: hvordanHarDuJobbet,
    type: "envalg",
    label: "Hvilke av de følgende alternativene passer best med hvordan du har jobbet?",
    options: [
      {
        value: fastArbeidstidIMindreEnn6Måneder,
        label: "Jeg har hatt fast arbeidstid i mindre enn seks måneder",
      },
      {
        value: fastArbeidstidI6MånederEllerMer,
        label: "Jeg har hatt fast arbeidstid i seks måneder eller mer",
      },
      {
        value: varierendeArbeidstidDeSiste12Månedene,
        label: "Jeg har hatt varierende arbeidstid de siste 12 månedene",
      },
      {
        value: jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
        label: "Jeg har jobbet mer i gjennomsnitt de siste 36 månedene enn de siste 12 månedene",
      },
      {
        value: harIkkeJobbetDeSiste36Månedene,
        label: "Jeg har ikke vært i jobb de siste 36 månedene",
      },
    ],
  },
  {
    id: "hvordanHarDuJobbetLesMer",
    type: "lesMer",
    label: "Les mer om arbeidstid",
    description:
      "<ul><li><strong>Fast arbeidstid</strong> betyr at du har en arbeidsavtale med fast stillingsprosent eller fast antall arbeidstimer.</li><li><strong>Varierende arbeidstid</strong> betyr at antall timer du jobber er ulik og har endret seg over tid. Du har for eksempel hatt flere korte arbeidsforhold, jobbet som vikar eller ekstrahjelp. Hvis arbeidstiden din er varierende gjør vi en gjennomsnittsberegning av arbeidstiden din fra de siste 12 månedene.<br/><br/>Hvis du har jobbet mer i gjennomsnitt de siste 36 månedene enn de siste 12 månedene, gjør vi en gjennomsnittsberegning for å finne ut om det lønner seg å ta med arbeidstiden din de siste 36 månedene i vurderingen.</li></ul>",
  },
  {
    id: harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
    type: "envalg",
    label:
      "Har du jobbet i et annet EØS-land, Sveits eller Storbritannia i løpet av de siste 36 månedene?",
    description:
      "Andre land i EØS: Belgia, Bulgaria, Danmark, Estland, Finland, Frankrike, Hellas, Irland, Island, Italia, Kroatia, Kypros, Latvia, Liechtenstein, Litauen, Luxembourg, Malta, Nederland, Polen, Portugal, Romania, Slovakia, Slovenia, Spania, Sverige, Tsjekkia, Tyskland, Ungarn og Østerrike.",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdSvar) => svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene || false,
  },
  {
    id: "harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette",
    description:
      "Hvis du har jobbet i et annet EØS-land, Sveits eller Storbritannia kan du ha rett til å få overført arbeidsperioder du har hatt der. Da vil de regnes med i vurderingen av retten til dagpenger i Norge.",
    visHvis: (svar: ArbeidsforholdSvar) => svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene || false,
  },
  {
    id: "harIkkeJobbetDeSiste36MånedeneVarselMelding",
    type: "varselmelding",
    variant: "warning",
    label: "",
    description:
      "Hvis du ikke har vært i arbeid, har du i utgangspunktet ikke rett til dagpenger. Du må derfor regne med å få avslag på søknaden din.<br/><br/>" +
      "<strong>Unntaket er hvis du har avtjent verneplikt</strong> i minst tre av de siste tolv månedene. Du legger ved dokumentasjon på at du har avtjent verneplikt senere i søknaden.",
    visHvis: (svar: ArbeidsforholdSvar) => svar[hvordanHarDuJobbet] === harIkkeJobbetDeSiste36Månedene,
  },
];
