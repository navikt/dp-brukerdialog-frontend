import { Komponent } from "../components/sporsmal/sporsmal.types";

export const bostedsland = "bostedsland";
export const reistTilbakeTilBostedslandet = "reist-tilbake-til-bostedslandet";
export const reisteDuHjemTilLandetDuBorI = "reiste-du-hjem-til-landet-du-bor-i";
export const reisteDuITaktMedRotasjon = "reiste-du-i-takt-med-rotasjon";
export const avreiseDatoFra = "avreise-dato-fra";
export const avreiseDatoTil = "avreise-dato-til";
export const hvorforReistDuFraNorge = "hvorfor-reist-du-fra-norge";

export type BostedslandSvar = {
  [bostedsland]?: string;
  [reistTilbakeTilBostedslandet]?: "ja" | "nei";
  [reisteDuHjemTilLandetDuBorI]?: "ja" | "nei";
  [reisteDuITaktMedRotasjon]?: "ja" | "nei";
  [avreiseDatoFra]?: string;
  [avreiseDatoTil]?: string;
  [hvorforReistDuFraNorge]?: string;
};

export function hentDefaultBostedslandSvar(): BostedslandSvar {
  return Object.fromEntries(
    bostedslandSporsmal.map((spm) => [spm.id, undefined])
  ) as BostedslandSvar;
}

export const bostedslandSporsmal: Komponent[] = [
  {
    id: bostedsland,
    type: "land",
    label: "Velg hvilket land du bor i",
  },
  {
    id: reistTilbakeTilBostedslandet,
    type: "envalg",
    label:
      "Har du reist tilbake til bostedslandet ditt etter at du ble arbeidsledig eller permittert?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: BostedslandSvar) => !!svar[bostedsland] && svar[bostedsland] !== "NO",
  },
  {
    id: avreiseDatoFra,
    type: "periodeFra",
    label: "Fra dato",
    periodeLabel: "Avreise dato",
    visHvis: (svar: BostedslandSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  },
  {
    id: avreiseDatoTil,
    type: "periodeTil",
    label: "Til dato",
    visHvis: (svar: BostedslandSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  },
  {
    id: hvorforReistDuFraNorge,
    type: "kortTekst",
    label: "Hvorfor reiste du fra Norge?",
    visHvis: (svar: BostedslandSvar) => svar[reistTilbakeTilBostedslandet] === "ja",
  },
  {
    id: reisteDuHjemTilLandetDuBorI,
    type: "envalg",
    label: "Reiste du hjem til landet du bor i en gang i uken eller mer, mens du jobbet i Norge?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: BostedslandSvar) =>
      svar[reistTilbakeTilBostedslandet] === "nei" || !!svar[hvorforReistDuFraNorge],
  },
  {
    id: reisteDuITaktMedRotasjon,
    type: "envalg",
    label: "Reiste du i takt med rotasjon?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: BostedslandSvar) => svar[reisteDuHjemTilLandetDuBorI] === "nei",
  },
];
