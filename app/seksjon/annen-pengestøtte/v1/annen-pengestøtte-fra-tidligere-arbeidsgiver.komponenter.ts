import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";

export const hvemMottarDuUtbetalingerEllerGoderFra = "hvemMottarDuUtbetalingerEllerGoderFra";
export const hvaFårEllerBeholderDu = "hvaFårEllerBeholderDu";

type AnnenPengestotteT = TFunction<"annen-pengestotte">;

export type PengestøtteFraTidligereArbeidsgiverModalSvar = {
  [hvemMottarDuUtbetalingerEllerGoderFra]?: string;
  [hvaFårEllerBeholderDu]?: string;
};

export const lagPengestøtteFraTidligereArbeidsgiverModalKomponenter = (
  t: AnnenPengestotteT
): KomponentType[] => [
  {
    id: hvemMottarDuUtbetalingerEllerGoderFra,
    type: "kortTekst",
    maksLengde: 200,
    label: t("fraTidligereArbeidsgiver.modal.hvemMottar.label"),
  },
  {
    id: "hvemMottarDuUtbetalingerEllerGoderFraLesMer",
    type: "lesMer",
    label: t("fraTidligereArbeidsgiver.modal.lesMer.label"),
    description:
      `<p><strong>${t("fraTidligereArbeidsgiver.modal.lesMer.utbetalinger.tittel")}</strong><br/>` +
      `${t("fraTidligereArbeidsgiver.modal.lesMer.utbetalinger.intro")}</p>` +
      "<p><ul>" +
      `<li>${t("fraTidligereArbeidsgiver.modal.lesMer.utbetalinger.sluttvederlag")}</li>` +
      `<li>${t("fraTidligereArbeidsgiver.modal.lesMer.utbetalinger.etterlonn")}</li>` +
      `<li>${t("fraTidligereArbeidsgiver.modal.lesMer.utbetalinger.andreUtbetalinger")}</li>` +
      "</ul></p>" +
      `<p>${t("fraTidligereArbeidsgiver.modal.lesMer.utbetalinger.skalIkkeOppgi")}</p>` +
      `<p><strong>${t("fraTidligereArbeidsgiver.modal.lesMer.okonomiskeGoder.tittel")}</strong><br/>` +
      `${t("fraTidligereArbeidsgiver.modal.lesMer.okonomiskeGoder.intro")}</p>` +
      "<p><ul>" +
      `<li>${t("fraTidligereArbeidsgiver.modal.lesMer.okonomiskeGoder.bil")}</li>` +
      `<li>${t("fraTidligereArbeidsgiver.modal.lesMer.okonomiskeGoder.abonnementer")}</li>` +
      `<li>${t("fraTidligereArbeidsgiver.modal.lesMer.okonomiskeGoder.andreGoder")}</li>` +
      "</ul></p>" +
      `<p>${t("fraTidligereArbeidsgiver.modal.lesMer.okonomiskeGoder.skalKunOppgi")}</p>`,
  },
  {
    id: hvaFårEllerBeholderDu,
    type: "langTekst",
    label: t("fraTidligereArbeidsgiver.modal.hvaFarEllerBeholder.label"),
    maksLengde: 500,
  },
  {
    id: "dokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("fraTidligereArbeidsgiver.modal.dokumentasjonskrav.label"),
  },
];

const fallbackT = ((key: string) => key) as unknown as AnnenPengestotteT;

export const pengestøtteFraTidligereArbeidsgiverModalKomponenter =
  lagPengestøtteFraTidligereArbeidsgiverModalKomponenter(fallbackT);
