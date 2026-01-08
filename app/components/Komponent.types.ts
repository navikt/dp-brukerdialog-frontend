export type KomponentType =
  | EnvalgSpørsmål
  | FlervalgSpørsmål
  | LangTekstSpørsmål
  | KortTekstSpørsmål
  | DatoSpørsmål
  | PeriodeSpørsmål
  | LandSpørsmål
  | TallSpørsmål
  | NedtrekkslisteSpørsmål
  | Informasjonskort
  | LesMer
  | Dokumentasjonskravindikator
  | Registeropplysning
  | ForklarendeTekst;

type InfoType = "informasjonskort" | "lesMer" | "dokumentasjonskravindikator" | "forklarendeTekst";

export type SpørsmålType =
  | "envalg"
  | "flervalg"
  | "langTekst"
  | "kortTekst"
  | "dato"
  | "periodeFra"
  | "periodeTil"
  | "land"
  | "tall"
  | "nedtrekksliste"
  | "registeropplysning";

export const INFO_KOMPONENTER: InfoType[] = [
  "informasjonskort",
  "lesMer",
  "dokumentasjonskravindikator",
  "forklarendeTekst",
];

export type KomponentBase = {
  id: string;
  label?: string;
  description?: string;
  type: SpørsmålType | InfoType;
  visHvis?: (svar: Record<string, any>) => boolean;
};

export type SpørsmålBase = KomponentBase & {
  optional?: boolean;
};

export type EnvalgSpørsmål = SpørsmålBase & {
  type: "envalg";
  options: { value: string; label: string }[];
};

export type FlervalgSpørsmål = SpørsmålBase & {
  type: "flervalg";
  options: { value: string; label: string }[];
};

export type LangTekstSpørsmål = SpørsmålBase & {
  type: "langTekst";
  maksLengde?: number;
};

export type KortTekstSpørsmål = SpørsmålBase & {
  type: "kortTekst";
  maksLengde?: number;
};

export type DatoSpørsmål = SpørsmålBase & {
  type: "dato";
  fraOgMed?: Date;
  tilOgMed?: Date;
};

export type PeriodeSpørsmål = SpørsmålBase & {
  type: "periodeFra" | "periodeTil";
  fraOgMed?: Date;
  tilOgMed?: Date;
  periodeLabel?: string;
};

export type LandSpørsmål = SpørsmålBase & {
  type: "land";
  erEøsLand?: boolean;
};

export type TallSpørsmål = SpørsmålBase & {
  type: "tall";
  maksVerdi?: number
};

export type NedtrekkslisteSpørsmål = SpørsmålBase & {
  type: "nedtrekksliste";
  options: { value: string; label: string }[];
};

export type Registeropplysning = SpørsmålBase & {
  type: "registeropplysning";
};

export type Informasjonskort = KomponentBase & {
  type: "informasjonskort";
  variant: "advarsel" | "informasjon";
};

export type LesMer = KomponentBase & {
  type: "lesMer";
};

export type Dokumentasjonskravindikator = KomponentBase & {
  type: "dokumentasjonskravindikator";
};

export type ForklarendeTekst = KomponentBase & {
  type: "forklarendeTekst";
};
