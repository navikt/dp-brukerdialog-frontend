import { KomponentType } from "~/components/Komponent.types";
import { TFunction } from "i18next";

export const hvemMottarDuUtbetalingerEllerGoderFra = "hvemMottarDuUtbetalingerEllerGoderFra";
export const hvaFårEllerBeholderDu = "hvaFårEllerBeholderDu";

export type PengestøtteFraTidligereArbeidsgiverModalSvar = {
  [hvemMottarDuUtbetalingerEllerGoderFra]?: string;
  [hvaFårEllerBeholderDu]?: string;
};

export function lagPengestøtteFraTidligereArbeidsgiverModalKomponenter(
  t: TFunction
): KomponentType[] {
  return [
    {
      id: hvemMottarDuUtbetalingerEllerGoderFra,
      type: "kortTekst",
      maksLengde: 200,
      label: t("tidligereArbeidsgiver.modal.hvemMottar.label"),
    },
    {
      id: "hvemMottarDuUtbetalingerEllerGoderFraLesMer",
      type: "lesMer",
      label: t("tidligereArbeidsgiver.modal.lesMer.label"),
      description: t("tidligereArbeidsgiver.modal.lesMer.description"),
    },
    {
      id: hvaFårEllerBeholderDu,
      type: "langTekst",
      label: t("tidligereArbeidsgiver.modal.hvaFår.label"),
      maksLengde: 500,
    },
    {
      id: "dokumentasjonskravindikator",
      type: "dokumentasjonskravindikator",
      label: t("tidligereArbeidsgiver.modal.dokumentasjonskrav.label"),
    },
  ];
}
