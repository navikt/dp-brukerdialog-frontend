import { KomponentType } from "~/components/sporsmal/sporsmal.types";

export const fornavnOgEtternavn = "fornavnOgEtternavn";
export const etternavn = "etternavn";
export const fodselsnummer = "fodselsnummer";
export const hvilketLandBarnetBorI = "hvilketLandBarnetBorI";

export const forsørgerBarnSomIkkeVises = "forsørgerBarnSomIkkeVises";
export const barnFraPdl = "barnFraPdl";
export const barnLagtManuelt = "barnLagtManuelt";

export type BarneSvar = {
  [fornavnOgEtternavn]: string;
  [etternavn]: string;
  [fodselsnummer]: string;
  [hvilketLandBarnetBorI]?: string;
};

export type BarnetilleggSvar = {
  [forsørgerBarnSomIkkeVises]?: "ja" | "nei";
  [barnFraPdl]?: BarneSvar[];
  [barnLagtManuelt]?: BarneSvar[];
};

export function hentDefaultBarnetilleggSvar(): BarnetilleggSvar {
  return Object.fromEntries(barnetilleggSporsmal.map((spm) => [spm.id, undefined]));
}

export const leggTilBarnSporsmal: KomponentType[] = [
  {
    id: "fornavnOgEtternavn",
    label: "Fornavn og etternavn",
    type: "kortTekst",
  },
  {
    id: "etternavn",
    label: "Etternavn",
    type: "kortTekst",
  },
  {
    id: "fodselsnummer",
    label: "Fødselsnummer",
    type: "kortTekst",
  },
  {
    id: "hvilketLandBarnetBorI",
    label: "Hvilket land bor barnet i?",
    type: "kortTekst",
  },
];

export const barnetilleggSporsmal: KomponentType[] = [
  {
    id: "forsørgerBarnSomIkkeVises",
    type: "envalg",
    label: "Forsørger du barn som ikke vises her?",
    description:
      "Hvis du har forsørgeransvar for barn under 18 år som ikke vises her, kan du legge dem til.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "barnFraPdl",
    type: "barnelist",
    label: "",
    children: leggTilBarnSporsmal,
  },
  {
    id: "barnLagtManuelt",
    type: "barnelist",
    label: "",
    visHvis: (svar: BarnetilleggSvar) => svar.forsørgerBarnSomIkkeVises === "ja",
    children: leggTilBarnSporsmal,
  },
];
