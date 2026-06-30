import type { TFunction } from "i18next";
import { startOfDay, subYears } from "date-fns";
import { KomponentType } from "~/components/Komponent.types";
import {
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarFåttAvskjed,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import type { ArbeidsforholdModalSvar } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato =
  "jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato";
export const jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato =
  "jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato";
export const jegHarFåttAvskjedHvaVarÅrsaken = "jegHarFåttAvskjedHvaVarÅrsaken";

type ArbeidsforholdT = TFunction;

export const lagArbeidsforholdModalJegHarFåttAvskjedKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
    type: "periodeFra",
    periodeLabel: t("modal.jegHarFattAvskjed.varighetPaArbeidsforholdet.label"),
    label: t("felles.dato.fraDato"),
    referanseId: jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
    fraOgMed: startOfDay(subYears(new Date(), 100)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
    type: "periodeTil",
    label: t("felles.dato.tilDato"),
    referanseId: jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: "jegHarFåttAvskjedInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: t("modal.jegHarFattAvskjed.informasjonskort.label"),
    description:
      `<p>${t("modal.jegHarFattAvskjed.informasjonskort.description.hvorfor")}</p>` +
      `<p>${t("modal.jegHarFattAvskjed.informasjonskort.description.hvaBetyrAvskjed")}</p>` +
      `<p>${t("modal.jegHarFattAvskjed.informasjonskort.description.dokumentere")}</p>` +
      `<p>${t("modal.jegHarFattAvskjed.informasjonskort.description.karantene")}</p>` +
      `<p>${t("modal.jegHarFattAvskjed.informasjonskort.description.navVurderer")}</p>` +
      `<p>${t("modal.jegHarFattAvskjed.informasjonskort.description.meldekort")}</p>`,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: "jegHarFåttAvskjedArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.jegHarFattAvskjed.dokumentasjonskrav.arbeidsavtale"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: "jegHarFåttAvskjedDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.jegHarFattAvskjed.dokumentasjonskrav.avskjedigelse"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
  {
    id: jegHarFåttAvskjedHvaVarÅrsaken,
    type: "langTekst",
    label: t("modal.jegHarFattAvskjed.hvaVarArsaken.label"),
    maksLengde: 500,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdModalJegHarFåttAvskjedKomponenter =
  lagArbeidsforholdModalJegHarFåttAvskjedKomponenter(fallbackT);
