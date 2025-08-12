type baseType = "envalg" | "langTekst" | "dato" | "land" | "kortTekst";

export type BaseSporsmal = {
  id: string;
  label: string;
  type: baseType;
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

export type DatoSporsmal = BaseSporsmal & {
  type: "dato";
  fom?: Date;
  tom?: Date;
};

export type LandSporsmal = BaseSporsmal & {
  type: "land";
};

export type KortTekstSporsmal = BaseSporsmal & {
  type: "kortTekst";
};

export type Sporsmal =
  | EnvalgSporsmal
  | LangTekstSporsmal
  | DatoSporsmal
  | LandSporsmal
  | KortTekstSporsmal;
