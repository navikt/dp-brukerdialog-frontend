import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarFåttAvskjed,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { startOfDay, subYears } from "date-fns";

export const jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato =
  "jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato";
export const jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato =
  "jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato";
export const jegHarFåttAvskjedHvaVarÅrsaken = "jegHarFåttAvskjedHvaVarÅrsaken";

export function lagArbeidsforholdModalJegHarFåttAvskjedKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
      type: "periodeFra",
      periodeLabel: t("felles.varighetPåArbeidsforholdet"),
      label: t("felles.fraDato"),
      referanseId: jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
      fraOgMed: startOfDay(subYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
    },
    {
      id: jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
      type: "periodeTil",
      label: t("felles.tilDato"),
      referanseId: jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
    },
    {
      id: "jegHarFåttAvskjedInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("felles.informasjon"),
      description: t("jegHarFåttAvskjed.informasjonskort"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
    },
    {
      id: "jegHarFåttAvskjedArbeidsavtaleDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.arbeidsavtale"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
    },
    {
      id: "jegHarFåttAvskjedDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("jegHarFåttAvskjed.avskjedigelse"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
    },
    {
      id: jegHarFåttAvskjedHvaVarÅrsaken,
      type: "langTekst",
      label: t("jegHarFåttAvskjed.hvaVarÅrsaken"),
      maksLengde: 500,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarFåttAvskjed,
    },
  ];
}
