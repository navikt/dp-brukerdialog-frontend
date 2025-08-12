import { Sporsmal } from "../sporsmal/sporsmal.types";

const bostedsland = "bostedsland";
const reistTilbakeTilBostedslandet = "reist-tilbake-til-bostedslandet";
const reisteDuHjemTilLandetDuBorI = "reiste-du-hjem-til-landet-du-bor-i";
const reisteDuITaktMedRotasjon = "reiste-du-i-takt-med-rotasjon";
const avreiseDatoFra = "avreise-dato-fra";
const avreiseDatoTil = "avreise-dato-til";
const avreiseDato = "avreise-dato";
const hvorforReistDuFraNorge = "hvorfor-reist-du-fra-norge";

export type BostedslandSvar = {
  // [bostedsland]?: string;
  // [reistTilbakeTilBostedslandet]?: "ja" | "nei";
  // [reisteDuHjemTilLandetDuBorI]?: "ja" | "nei";
  // [reisteDuITaktMedRotasjon]?: "ja" | "nei";
  [avreiseDatoFra]?: string;
  [avreiseDatoTil]?: string;
  // [avreiseDato]?: string;
  // [hvorforReistDuFraNorge]?: string;
};

export const bostedslandSporsmal: Sporsmal[] = [
  // {
  //   id: bostedsland,
  //   type: "land",
  //   label: "Velg hvilket land du bor i",
  // },
  // {
  //   id: reistTilbakeTilBostedslandet,
  //   type: "envalg",
  //   label:
  //     "Har du reist tilbake til bostedslandet ditt etter at du ble arbeidsledig eller permittert?",
  //   options: [
  //     { value: "ja", label: "Ja" },
  //     { value: "nei", label: "Nei" },
  //   ],
  //   visHvis: (svar: BostedslandSvar) => !!svar[bostedsland] && svar[bostedsland] !== "NO",
  // },
  {
    id: "avreise-dato",
    type: "periode",
    label: "Avreise dato",
    fom: {
      id: "fra",
      type: "dato",
      label: "Fra dato",
    },
    tom: {
      id: "til",
      type: "dato",
      label: "Til dato",
    },
  },
  // {
  //   id: avreiseDatoFra,
  //   type: "dato",
  //   label: "Fra dato",
  //   visHvis: (svar: BostedslandSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  // },
  // {
  //   id: avreiseDatoTil,
  //   type: "dato",
  //   label: "Til dato",
  //   visHvis: (svar: BostedslandSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  // },
  // {
  //   id: hvorforReistDuFraNorge,
  //   type: "kortTekst",
  //   label: "Hvorfor reiste du fra Norge?",
  //   visHvis: (svar: BostedslandSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  // },
  // {
  //   id: reisteDuHjemTilLandetDuBorI,
  //   type: "envalg",
  //   label: "Reiste du hjem til landet du bor i en gang i uken eller mer, mens du jobbet i Norge?",
  //   options: [
  //     { value: "ja", label: "Ja" },
  //     { value: "nei", label: "Nei" },
  //   ],
  //   visHvis: (svar: BostedslandSvar) =>
  //     svar[reistTilbakeTilBostedslandet] === "nei" || !!svar[hvorforReistDuFraNorge],
  // },
  // {
  //   id: reisteDuITaktMedRotasjon,
  //   type: "envalg",
  //   label: "Reiste du i takt med rotasjon?",
  //   options: [
  //     { value: "ja", label: "Ja" },
  //     { value: "nei", label: "Nei" },
  //   ],
  //   visHvis: (svar: BostedslandSvar) => svar[reisteDuHjemTilLandetDuBorI] === "nei",
  // },
];
