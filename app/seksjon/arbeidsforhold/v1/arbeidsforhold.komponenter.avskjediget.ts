import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarFåttAvskjed,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const avskjedigetHvaVarÅrsaken = "avskjedigetHvaVarÅrsaken";

export const arbeidsforholdModalJegHarFåttAvskjedKomponenter: KomponentType[] = [
  {
    id: "jegHarFåttAvskjedVarselmelding",
    type: "informasjonskort",
    variant: "informasjon",
    description:
      "Hvis du har fått avskjed fra arbeidsgiver, må vi vite hvorfor.<br/><br/>" +
      "Avskjed betyr at du må slutte i jobben din umiddelbart, uten oppsigelsestid.<br/><br/>" +
      "Du må dokumentere eller beskrive grunnen og datoen for avskjeden. Dette kan for eksempel stå i avskjedsbrevet eller i møtereferat.<br/><br/>" +
      "Har du fått avskjed vil du normalt ikke få utbetalt dagpenger i 18 uker.<br/><br/>" +
      "Det er Nav som vurderer om grunnen til avskjeden får betydning for utbetalingen din.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: "jegHarFåttAvskjedArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: "jegHarFåttAvskjedDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Avskjedigelse",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: avskjedigetHvaVarÅrsaken,
    type: "langTekst",
    label: "Hva var årsaken til at du ble avskjediget?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
];
