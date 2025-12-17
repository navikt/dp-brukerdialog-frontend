import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarFåttAvskjed,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato =
  "jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato";
export const jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato =
  "jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato";
export const jegHarFåttAvskjedHvaVarÅrsaken = "jegHarFåttAvskjedHvaVarÅrsaken";

export const arbeidsforholdModalJegHarFåttAvskjedKomponenter: KomponentType[] = [
  {
    id: jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato,
    type: "periodeFra",
    periodeLabel: "Varighet på arbeidsforholdet",
    label: "Fra og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato,
    type: "periodeTil",
    label: "Til og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: "jegHarFåttAvskjedInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Viktig informasjon",
    description:
      "<p>Hvis du har fått avskjed fra arbeidsgiver, må vi vite hvorfor.</p>" +
      "<p>Avskjed betyr at du må slutte i jobben din umiddelbart, uten oppsigelsestid.</p>" +
      "<p>Du må dokumentere eller beskrive grunnen og datoen for avskjeden. Dette kan for eksempel stå i avskjedsbrevet eller i møtereferat.</p>" +
      "<p>Har du fått avskjed vil du normalt ikke få utbetalt dagpenger i 18 uker.</p>" +
      "<p>Det er Nav som vurderer om grunnen til avskjeden får betydning for utbetalingen din.</p>" +
      "<p>Du må være registrert som arbeidssøker og sende meldekort i ventetiden.",
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
    id: jegHarFåttAvskjedHvaVarÅrsaken,
    type: "langTekst",
    label: "Hva var årsaken til at du ble avskjediget?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
];
