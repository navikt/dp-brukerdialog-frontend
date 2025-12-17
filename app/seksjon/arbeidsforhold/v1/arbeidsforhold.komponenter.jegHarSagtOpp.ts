import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarSagtOppSelv,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato =
  "jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato";
export const jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato =
  "jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato";
export const jegHarSagtOppHvaVarÅrsaken = "jegHarSagtOppHvaVarÅrsaken";

export const arbeidsforholdModalJegHarSagtOppSelvKomponenter: KomponentType[] = [
  {
    id: jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato,
    type: "periodeFra",
    periodeLabel: "Varighet på arbeidsforholdet",
    label: "Fra og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato,
    type: "periodeTil",
    label: "Til og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: "jegHarSagtOppSelvInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Viktig informasjon",
    description:
      "<p>Hvis du har sagt opp selv, må vi vite når og hvorfor.</p>" +
      "<p>Derfor må du dokumentere grunnen og datoen du sa opp. Dette kan for eksempel stå i oppsigelsen som du legger ved.</p>" +
      "<p>Hvis du <strong>ikke hadde rimelig grunn</strong> til å si opp jobben din, får du ikke utbetalt dagpenger i 18 uker.</p>" +
      "<p>Hvis du hadde <strong>rimelig grunn</strong> til å si opp jobben din, får du utbetaling fra første dag du har rett til dagpenger. Rimelig grunn kan være at du ikke kan fortsette i jobben din på grunn av helseutfordringer, mobbing eller fordi arbeidsgiver nedbemanner. Dette må du dokumentere.</p>" +
      "<p>Det er Nav som vurderer om grunnen til at du har sluttet får betydning for utbetalingen din.</p>" +
      "<p>Du må være registrert som arbeidssøker og sende meldekort i ventetiden.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: "sagtOppArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: "sagtOppOppsigelseDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Oppsigelse",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: jegHarSagtOppHvaVarÅrsaken,
    type: "langTekst",
    label: "Hva er årsaken til at du har sagt opp?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
];
