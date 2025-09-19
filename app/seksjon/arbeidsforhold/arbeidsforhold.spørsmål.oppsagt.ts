import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  ArbeidsforholdModalSvar,
  arbeidsgiverenMinHarSagtMegOpp,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";

export const oppsagtHvaVarÅrsaken = "oppsagt-hva-var-årsaken";
export const oppsagtVetDuHvorMangeTimerDuJobbetIUka =
  "oppsagt-vet-du-hvor-mange-timer-du-jobbet-i-uka";
export const oppsagtHvorMangeTimerHarDuJobbetIUka = "oppsagt-hvor-mange-timer-har-du-jobbet-i-uka";
export const oppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge =
  "oppsagt-har-du-fått-tilbud-om-å-fortsette-hos-arbeidsgiveren-din-i-annen-stilling-eller-et-annet-sted-i-norge";
export const oppsagtHvaHarDuSvartPåTilbudet = "oppsagt-hva-har-du-svart-på-tilbudet";
export const oppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "oppsagt-hva-er-grunnen-til-at-du-ikke-har-tatt-imot-tilbudet";

export const arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål: KomponentType[] = [
  {
    id: "oppsagtVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Hvis du har blitt sagt opp av arbeidsgiveren din, må vi vite hvorfor.<br/><br/>" +
      "Derfor må du dokumentere grunnen og datoen du ble sagt opp. Dette kan for eksempel stå i oppsigelsen som du legger ved.<br/><br/>" +
      "Var du selv skyld i oppsigelsen, vil du normalt ikke få dagpenger utbetalt i 18 uker.<br/><br/>" +
      "Det er NAV som vurderer om grunnen for oppsigelsen får betydning for utbetalingen din.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: "oppsagtArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: "oppsagtOppsigelseDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Oppsigelse",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: oppsagtHvaVarÅrsaken,
    type: "langTekst",
    label: "Hva var årsaken til at du ble sagt opp?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: oppsagtVetDuHvorMangeTimerDuJobbetIUka,
    type: "envalg",
    label: "Vet du hvor mange timer du har jobbet i uka før du ble sagt opp?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label:
          "Nei, jeg er usikker, bruk opplysninger fra skatteetaten.no/mine inntekter for å beregne min vanlige arbeidstid.",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: oppsagtHvorMangeTimerHarDuJobbetIUka,
    type: "kortTekst",
    label: "Skriv inn hvor mange timer du har jobbet per uke før du ble oppsagt",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[oppsagtVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: "oppsagtHvorMangeTimerHarDuJobbetIUkaLesMer",
    type: "lesMer",
    label: "Dette skal du oppgi som arbeidstid",
    description:
      "Har du jobbet like mye hver uke, oppgir du denne arbeidstiden. Hvis du ikke har jobbet like mye hver uke, oppgir du det antall timer du har jobbet i snitt de seks siste månedene.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[oppsagtVetDuHvorMangeTimerDuJobbetIUka] === "ja",
  },
  {
    id: oppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
    type: "envalg",
    label:
      "Har du fått tilbud om å fortsette hos arbeidsgiveren din i en annen stilling eller et annet sted i Norge?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: oppsagtHvaHarDuSvartPåTilbudet,
    type: "envalg",
    label: "Hva har du svart på tilbudet?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
      { value: "harIkkeSvart", label: "Har ikke svart" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        oppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge
      ] === "ja",
  },
  {
    id: "oppsagtHvaHarDuSvartPåTilbudetOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorgeVarselMelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Takket du nei til et tilbud om å fortsette hos arbeidsgiveren din, vil du normalt ikke få dagpenger de første 18 ukene. Denne ventetiden løper først fra den datoen dagpengeperioden starter.<br/><br/>" +
      "Det er viktig at du ikke venter med å søke om dagpenger. Du må sende søknaden din nå, selv om du kan få en ventetid på 18 uker.<br/><br/>" +
      "Du må være registrert som arbeidssøker og sende meldekort i ventetiden.",
    visHvis: (svar: ArbeidsforholdModalSvar) => svar[oppsagtHvaHarDuSvartPåTilbudet] === "nei",
  },
  {
    id: oppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: "Hva er grunnen til at du ikke har tatt imot tilbudet?",
    maxLength: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) => svar[oppsagtHvaHarDuSvartPåTilbudet] === "nei",
  },
];
