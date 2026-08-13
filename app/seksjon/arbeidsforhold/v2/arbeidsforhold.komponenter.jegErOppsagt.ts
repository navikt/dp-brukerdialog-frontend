import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  arbeidsgiverenMinHarSagtMegOpp,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter";
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

export function lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter(
  t: TFunction
): KomponentType[] {
  return [
    {
      id: jegErOppsagtVarighetPåArbeidsforholdetFraDato,
      type: "periodeFra",
      periodeLabel: t("felles.varighetPåArbeidsforholdet"),
      label: t("felles.fraDato"),
      referanseId: jegErOppsagtVarighetPåArbeidsforholdetTilDato,
      fraOgMed: startOfDay(subYears(new Date(), 100)),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
    },
    {
      id: jegErOppsagtVarighetPåArbeidsforholdetTilDato,
      type: "periodeTil",
      label: t("felles.tilDato"),
      referanseId: jegErOppsagtVarighetPåArbeidsforholdetFraDato,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
    },
    {
      id: "jegEroOppsagtInformasjonskort",
      type: "informasjonskort",
      variant: "informasjon",
      label: t("felles.informasjon"),
      description: t("jegErOppsagt.informasjonskort"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
    },
    {
      id: "jegErOppsagtArbeidsavtaleDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.arbeidsavtale"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
    },
    {
      id: "jegErOppsagtOppsigelseDokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("felles.oppsigelse"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
    },
    {
      id: jegErOppsagtHvaVarÅrsaken,
      type: "langTekst",
      label: t("jegErOppsagt.hvaVarÅrsaken"),
      maksLengde: 500,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
    },
    {
      id: jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
      type: "envalg",
      label: t("felles.harDuFåttTilbudOmÅFortsette"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
      ],
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverenMinHarSagtMegOpp,
    },
    {
      id: jegErOppsagtHvaHarDuSvartPåTilbudet,
      type: "envalg",
      label: t("felles.hvaHarDuSvartPåTilbudet"),
      options: [
        { value: "ja", label: t("envalg.svar.ja") },
        { value: "nei", label: t("envalg.svar.nei") },
        { value: "harIkkeSvart", label: t("envalg.svar.harIkkeSvart") },
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
      label: t("felles.informasjon"),
      description: t("felles.avslåttTilbudInformasjonskort"),
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[jegErOppsagtHvaHarDuSvartPåTilbudet] === "nei",
    },
    {
      id: jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
      type: "langTekst",
      label: t("felles.hvaErÅrsakenTilAtDuIkkeHarTattImotTilbudet"),
      maksLengde: 500,
      visHvis: (svar: ArbeidsforholdModalSvar) =>
        svar[jegErOppsagtHvaHarDuSvartPåTilbudet] === "nei",
    },
  ];
}
