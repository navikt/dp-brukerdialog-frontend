import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  arbeidsgiverenMinHarSagtMegOpp,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { startOfDay, subYears } from "date-fns";

export const jegErOppsagtVarighetPåArbeidsforholdetFraDato =
  "jegErOppsagtVarighetPåArbeidsforholdetFraDato";
export const jegErOppsagtVarighetPåArbeidsforholdetTilDato =
  "jegErOppsagtVarighetPåArbeidsforholdetTilDato";
export const jegErOppsagtHvaVarÅrsaken = "jegErOppsagtHvaVarÅrsaken";
export const jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge =
  "jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge";
export const jegErOppsagtHvaHarDuSvartPåTilbudet = "jegErOppsagtHvaHarDuSvartPåTilbudet";
export const jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet =
  "jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet";

export const arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter: KomponentType[] = [
  {
    id: jegErOppsagtVarighetPåArbeidsforholdetFraDato,
    type: "periodeFra",
    periodeLabel: "Varighet på arbeidsforholdet",
    label: "Fra dato",
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: jegErOppsagtVarighetPåArbeidsforholdetTilDato,
    type: "periodeTil",
    label: "Til dato",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: "jegEroOppsagtInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "<p>Hvis du har blitt sagt opp av arbeidsgiveren din, må vi vite når og hvorfor.</p>" +
      "<p>Hvis du selv var skyld i oppsigelsen, vil du ikke få utbetalt dagpenger de 18 første ukene av dagpengeperioden din. Det er viktig at du ikke venter med å søke om dagpenger.</p>" +
      "<p>Det er Nav som vurderer om grunnen for oppsigelsen får betydning for utbetalingen din.</p>" +
      "<p>Du må være registrert som arbeidssøker og sende meldekort i ventetiden.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: "jegErOppsagtArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: "jegErOppsagtOppsigelseDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Oppsigelse",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: jegErOppsagtHvaVarÅrsaken,
    type: "langTekst",
    label: "Hva var årsaken til at du ble sagt opp?",
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
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
    id: jegErOppsagtHvaHarDuSvartPåTilbudet,
    type: "envalg",
    label: "Hva har du svart på tilbudet?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
      { value: "harIkkeSvart", label: "Har ikke svart" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge
      ] === "ja",
  },
  {
    id: "oppsagtHvaHarDuSvartPåTilbudetOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorgeInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "<p>Hvis du har svart nei til et tilbud om å fortsette hos arbeidsgiveren din, vil du ikke få utbetalt dagpenger de første 18 ukene av dagpengeperioden din.</p>" +
      "<p>Det er viktig at du ikke venter med å søke om dagpenger.</p>" +
      "<p>Du må være registrert som arbeidssøker og sende meldekort i ventetiden.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) => svar[jegErOppsagtHvaHarDuSvartPåTilbudet] === "nei",
  },
  {
    id: jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: "Hva er årsaken til at du ikke har tatt imot tilbudet?",
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) => svar[jegErOppsagtHvaHarDuSvartPåTilbudet] === "nei",
  },
];
