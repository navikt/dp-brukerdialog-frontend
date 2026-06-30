import type { TFunction } from "i18next";
import { startOfDay, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import {
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarSagtOppSelv,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import type { ArbeidsforholdModalSvar } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato =
  "jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato";
export const jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato =
  "jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato";
export const jegHarSagtOppHvaVarÅrsaken = "jegHarSagtOppHvaVarÅrsaken";

type ArbeidsforholdT = TFunction;

export const lagArbeidsforholdModalJegHarSagtOppSelvKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
    type: "periodeFra",
    periodeLabel: t("modal.jegHarSagtOppSelv.varighetPaArbeidsforholdet.label"),
    label: t("felles.dato.fraDato"),
    referanseId: jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
    type: "periodeTil",
    label: t("felles.dato.tilDato"),
    referanseId: jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: "jegHarSagtOppSelvInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("modal.jegHarSagtOppSelv.informasjonskort.label"),
    description:
      `<p>${t("modal.jegHarSagtOppSelv.informasjonskort.description.narOgHvorfor")}</p>` +
      `<p>${t("modal.jegHarSagtOppSelv.informasjonskort.description.dokumentere")}</p>` +
      `<p>${t("modal.jegHarSagtOppSelv.informasjonskort.description.ikkeRimeligGrunn")}</p>` +
      `<p>${t("modal.jegHarSagtOppSelv.informasjonskort.description.rimeligGrunn")}</p>` +
      `<p>${t("modal.jegHarSagtOppSelv.informasjonskort.description.navVurderer")}</p>` +
      `<p>${t("modal.jegHarSagtOppSelv.informasjonskort.description.meldekort")}</p>`,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: "sagtOppArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.jegHarSagtOppSelv.dokumentasjonskrav.arbeidsavtale"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: "sagtOppOppsigelseDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.jegHarSagtOppSelv.dokumentasjonskrav.oppsigelse"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
  {
    id: jegHarSagtOppHvaVarÅrsaken,
    type: "langTekst",
    label: t("modal.jegHarSagtOppSelv.hvaVarArsaken.label"),
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdModalJegHarSagtOppSelvKomponenter =
  lagArbeidsforholdModalJegHarSagtOppSelvKomponenter(fallbackT);
