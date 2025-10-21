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
  | Varselmelding
  | LesMer
  | Dokumentasjonskravindikator
  | Registeropplysning;

type InfoType = "varselmelding" | "lesMer" | "dokumentasjonskravindikator" | "bodyShort";

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
  "varselmelding",
  "lesMer",
  "dokumentasjonskravindikator",
  "bodyShort",
];

export type KomponentBase = {
  id: string;
  label: string;
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
  maxLength?: number;
};

export type KortTekstSpørsmål = SpørsmålBase & {
  type: "kortTekst";
};

export type DatoSpørsmål = SpørsmålBase & {
  type: "dato";
  fraOgMed?: Date;
  tilOgMed?: Date;
};

export type PeriodeSpørsmål = SpørsmålBase & {
  type: "periodeFra" | "periodeTil";
  fraOgMed?: DatoSpørsmål;
  tilOgMed?: DatoSpørsmål;
  periodeLabel?: string;
};

export type LandSpørsmål = SpørsmålBase & {
  type: "land";
};

export type TallSpørsmål = SpørsmålBase & {
  type: "tall";
};

export type NedtrekkslisteSpørsmål = SpørsmålBase & {
  type: "nedtrekksliste";
  options: { value: string; label: string }[];
};

export type Registeropplysning = SpørsmålBase & {
  type: "registeropplysning";
};

export type Varselmelding = KomponentBase & {
  type: "varselmelding";
  variant: "error" | "warning" | "info" | "success";
};

export type LesMer = KomponentBase & {
  type: "lesMer";
};

export type Dokumentasjonskravindikator = KomponentBase & {
  type: "dokumentasjonskravindikator";
};
