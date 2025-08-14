export type Sporsmal =
  | EnvalgSporsmal
  | LangTekstSporsmal
  | KortTekstSporsmal
  | DatoSporsmal
  | LandSporsmal
  | PeriodeSporsmal;

type baseType =
  | "envalg"
  | "langTekst"
  | "kortTekst"
  | "dato"
  | "periodeFra"
  | "periodeTil"
  | "land";

export type BaseSporsmal = {
  id: string;
  label: string;
  type: baseType;
  optional?: boolean;
  description?: string;
  visHvis?: (svar: Record<string, any>) => boolean;
};

export type EnvalgSporsmal = BaseSporsmal & {
  type: "envalg";
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
