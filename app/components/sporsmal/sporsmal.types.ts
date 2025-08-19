export type KomponentType =
  | EnvalgSpørsmål
  | FlervalgSpørsmål
  | LangTekstSpørsmål
  | KortTekstSpørsmål
  | DatoSpørsmål
  | LandSpørsmål
  | PeriodeSpørsmål
  | Varselmelding
  | LesMer;

type InfoType = "varselmelding" | "lesMer";
export type SpørsmalType =
  | "envalg"
  | "flervalg"
  | "langTekst"
  | "kortTekst"
  | "dato"
  | "periodeFra"
  | "periodeTil"
  | "land";

export type KomponentBase = {
  id: string;
  label: string;
  description?: string;
  type: SpørsmalType | InfoType;
  visHvis?: (svar: Record<string, any>) => boolean;
};

export type SpørsmalBase = KomponentBase & {
  optional?: boolean;
};

export type EnvalgSpørsmål = SpørsmalBase & {
  type: "envalg";
  options: { value: string; label: string }[];
};

export type FlervalgSpørsmål = SpørsmalBase & {
  type: "flervalg";
  options: { value: string; label: string }[];
};

export type LangTekstSpørsmål = SpørsmalBase & {
  type: "langTekst";
  maxLength?: number;
};

export type KortTekstSpørsmål = SpørsmalBase & {
  type: "kortTekst";
};

export type DatoSpørsmål = SpørsmalBase & {
  type: "dato";
  fraOgMed?: Date;
  tilOgMed?: Date;
};

export type PeriodeSpørsmål = SpørsmalBase & {
  type: "periodeFra" | "periodeTil";
  fraOgMed?: DatoSpørsmål;
  tilOgMed?: DatoSpørsmål;
  periodeLabel?: string;
};

export type LandSpørsmål = SpørsmalBase & {
  type: "land";
};

export type Varselmelding = KomponentBase & {
  type: "varselmelding";
  variant: "error" | "warning" | "info" | "success";
};

export type LesMer = KomponentBase & {
  type: "lesMer";
};
