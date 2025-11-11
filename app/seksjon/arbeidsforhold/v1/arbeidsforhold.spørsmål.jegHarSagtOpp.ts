import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarSagtOppSelv,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";

export const jegHarSagtOppHvaVarÅrsaken = "jeg-har-sagt-opp-hva-var-årsaken";

export const arbeidsforholdModalJegHarSagtOppSelvSpørsmål: KomponentType[] = [
  {
    id: "jegHarSagtOppSelvVarselmelding",
    type: "varselmelding",
    variant: "info",
    description:
      "Hvis du har sagt opp selv, må vi vite hvorfor.<br/><br/>" +
      "Derfor må du dokumentere grunnen og datoen du sa opp. Dette kan for eksempel stå i oppsigelsen som du legger ved.<br/><br/>" +
      "Hvis du <strong>ikke hadde rimelig grunn</strong>til å si opp jobben din, får du ikke utbetalt dagpenger i 18 uker.<br/><br/>" +
      "Hvis du hadde <strong>rimelig grunn</strong> til å si opp jobben din, får du utbetaling fra første dag du har rett til dagpenger. Rimelig grunn kan være at du ikke kan fortsette i jobben din på grunn av helseutfordringer, mobbing eller fordi arbeidsgiver nedbemanner. Dette må du dokumentere.<br/><br/>" +
      "Det er Nav som vurderer om grunnen til at du har sluttet får betydning for utbetalingen din.",
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
    label: "Hva var årsaken til at du sa opp?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
];
