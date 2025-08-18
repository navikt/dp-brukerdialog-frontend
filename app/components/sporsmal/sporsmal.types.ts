export type Komponent =
  | EnvalgSporsmal
  | FlervalgSpørsmål
  | LangTekstSporsmal
  | KortTekstSporsmal
  | DatoSporsmal
  | LandSporsmal
  | PeriodeSporsmal
  | VarselmeldingKomponent;

type baseKomponentType =
  | "envalg"
  | "flervalg"
  | "langTekst"
  | "kortTekst"
  | "dato"
  | "periodeFra"
  | "periodeTil"
  | "land"
  | "varselmelding";

export type BaseKomponent = {
  id: string;
  type: baseKomponentType;
  visHvis?: (svar: Record<string, any>) => boolean;
}

export type BaseSporsmal = BaseKomponent & {
  label: string;
  optional?: boolean;
  description?: string;
  lesMerLedetekst?: string;
  lesMerTekst?: string;
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

export type VarselmeldingKomponent = BaseKomponent & {
  type: "varselmelding";
  varselvariant: "error" | "warning" | "info" | "success"
  varselmelding: string;
};