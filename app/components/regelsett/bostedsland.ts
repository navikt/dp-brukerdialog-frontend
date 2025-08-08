import { addMonths, endOfDay, startOfDay, subMonths } from "date-fns";
import { Sporsmal } from "../sporsmal/sporsmal.types";

const bostedsland = "bostedsland";
const reistTilbakeTilBostedslandet = "reist-tilbake-til-bostedslandet";
// const reisteDuHjemTilLandetDuBorI = "reiste-du-hjem-til-landet-du-bor-i";
// const reisteDuITaktMedRotasjon = "reiste-du-i-takt-med-rotasjon";
// const avreiseDatoFra = "avreise-dato-fra";
// const avreiseDatoTil = "avreise-dato-til";
// const hvorforReistDuFraNorge = "hvorfor-reist-du-fra-norge";

export type BostedslandSvar = {
  [bostedsland]?: string;
  [reistTilbakeTilBostedslandet]?: "ja" | "nei";
  // [reisteDuHjemTilLandetDuBorI]?: "ja" | "nei";
  // [reisteDuITaktMedRotasjon]?: "ja" | "nei";
  // [avreiseDatoFra]?: string;
  // [avreiseDatoTil]?: string;
  // [hvorforReistDuFraNorge]?: string;
};

export const bostedslandSporsmal: Sporsmal[] = [
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
    visHvis: (svar: BostedslandSvar) => {
      return !!svar.bostedsland && svar.bostedsland !== "NO";
    },
  },
];
