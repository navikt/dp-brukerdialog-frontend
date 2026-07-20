import type { TFunction } from "i18next";
import { startOfDay, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import {
  arbeidsgiverenMinHarSagtMegOpp,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import type { ArbeidsforholdModalSvar } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

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

type ArbeidsforholdT = TFunction;

const jaNeiOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

const jaNeiHarIkkeSvartOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
  { value: "harIkkeSvart", label: t("felles.svar.harIkkeSvart") },
];

export const lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: jegErOppsagtVarighetPåArbeidsforholdetFraDato,
    type: "periodeFra",
    periodeLabel: t("modal.jegErOppsagt.varighetPaArbeidsforholdet.label"),
    label: t("felles.dato.fraDato"),
    referanseId: jegErOppsagtVarighetPåArbeidsforholdetTilDato,
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: jegErOppsagtVarighetPåArbeidsforholdetTilDato,
    type: "periodeTil",
    label: t("felles.dato.tilDato"),
    referanseId: jegErOppsagtVarighetPåArbeidsforholdetFraDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: "jegEroOppsagtInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("modal.jegErOppsagt.informasjonskort.label"),
    description:
      `<p>${t("modal.jegErOppsagt.informasjonskort.description.narOgHvorfor")}</p>` +
      `<p>${t("modal.jegErOppsagt.informasjonskort.description.karantene")}</p>` +
      `<p>${t("modal.jegErOppsagt.informasjonskort.description.navVurderer")}</p>` +
      `<p>${t("modal.jegErOppsagt.informasjonskort.description.meldekort")}</p>`,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: "jegErOppsagtArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.jegErOppsagt.dokumentasjonskrav.arbeidsavtale"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: "jegErOppsagtOppsigelseDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.jegErOppsagt.dokumentasjonskrav.oppsigelse"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: jegErOppsagtHvaVarÅrsaken,
    type: "langTekst",
    label: t("modal.jegErOppsagt.hvaVarArsaken.label"),
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
    type: "envalg",
    label: t("modal.jegErOppsagt.tilbudOmAnnenStilling.label"),
    options: jaNeiOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
  },
  {
    id: jegErOppsagtHvaHarDuSvartPåTilbudet,
    type: "envalg",
    label: t("modal.jegErOppsagt.hvaHarDuSvart.label"),
    options: jaNeiHarIkkeSvartOptions(t),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge
      ] === "ja",
  },
  {
    id: "oppsagtHvaHarDuSvartPåTilbudetOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorgeInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("modal.jegErOppsagt.tilbudAvslattInformasjonskort.label"),
    description:
      `<p>${t("modal.jegErOppsagt.tilbudAvslattInformasjonskort.description.karantene")}</p>` +
      `<p>${t("modal.jegErOppsagt.tilbudAvslattInformasjonskort.description.sokNa")}</p>` +
      `<p>${t("modal.jegErOppsagt.tilbudAvslattInformasjonskort.description.meldekort")}</p>`,
    visHvis: (svar: ArbeidsforholdModalSvar) => svar[jegErOppsagtHvaHarDuSvartPåTilbudet] === "nei",
  },
  {
    id: jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
    type: "langTekst",
    label: t("modal.jegErOppsagt.grunnTilIkkeTattImot.label"),
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) => svar[jegErOppsagtHvaHarDuSvartPåTilbudet] === "nei",
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter =
  lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter(fallbackT);
