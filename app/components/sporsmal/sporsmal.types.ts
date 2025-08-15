export type Sporsmal =
  | EnvalgSporsmal
  | FlervalgSpørsmål
  | LangTekstSporsmal
  | KortTekstSporsmal
  | DatoSporsmal
  | LandSporsmal
  | PeriodeSporsmal
  | VarselmeldingKomponent;

type baseType =
  | "envalg"
  | "flervalg"
  | "langTekst"
  | "kortTekst"
  | "dato"
  | "periodeFra"
  | "periodeTil"
  | "land"
  | "varselmelding";

export type BaseSporsmal = {
  id: string;
  label: string;
  type: baseType;
  optional?: boolean;
  description?: string;
  lesMerLabel?: string;
  lesMerDescription?: string;
  visHvis?: (svar: Record<string, any>) => boolean;
};

export type EnvalgSporsmal = BaseSporsmal & {
  type: "envalg";
  options: { value: string; label: string }[];
};

  export type FlervalgSpørsmål = BaseSporsmal & {
  type: "flervalg";
  options: { value: string; label: string }[];
};

export type LangTekstSporsmal = BaseSporsmal & {
  type: "langTekst";
  maxLength?: number;
};

export type KortTekstSporsmal = BaseSporsmal & {
  type: "kortTekst";
};

export type DatoSporsmal = BaseSporsmal & {
  type: "dato";
  fraOgMed?: Date;
  tilOgMed?: Date;
};

export type PeriodeSporsmal = BaseSporsmal & {
  type: "periodeFra" | "periodeTil";
  fraOgMed?: DatoSporsmal;
  tilOgMed?: DatoSporsmal;
  periodeLabel?: string;
};

export type LandSporsmal = BaseSporsmal & {
  type: "land";
};

export type VarselmeldingKomponent = BaseSporsmal & {
  type: "varselmelding";
  varselvariant: "error" | "warning" | "info" | "success"
  varselmelding: string;
};