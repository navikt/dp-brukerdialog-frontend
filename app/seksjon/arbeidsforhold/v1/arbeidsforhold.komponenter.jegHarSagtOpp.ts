import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegHarSagtOppSelv,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { startOfDay, subYears } from "date-fns";

export const jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato =
  "jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato";
export const jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato =
  "jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato";
export const jegHarSagtOppHvaVarÅrsaken = "jegHarSagtOppHvaVarÅrsaken";

export function lagArbeidsforholdModalJegHarSagtOppSelvKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
      type: "periodeFra",
      periodeLabel: t("felles.varighetPåArbeidsforholdet"),
      label: t("felles.fraDato"),
      referanseId: jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
      fraOgMed: startOfDay(subYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
    },
    {
      id: jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
      type: "periodeTil",
      label: t("felles.tilDato"),
      referanseId: jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
    },
    {
      id: "jegHarSagtOppSelvInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("felles.informasjon"),
      description: t("jegHarSagtOpp.informasjonskort"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
    },
    {
      id: "sagtOppArbeidsavtaleDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.arbeidsavtale"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
    },
    {
      id: "sagtOppOppsigelseDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.oppsigelse"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
    },
    {
      id: jegHarSagtOppHvaVarÅrsaken,
      type: "langTekst",
      label: t("jegHarSagtOpp.hvaVarÅrsaken"),
      maksLengde: 500,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === jegHarSagtOppSelv,
    },
  ];
}
