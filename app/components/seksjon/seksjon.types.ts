export type BaseSporsmal = {
  id: string;
  label: string;
  description?: string;
  visHvis?: (svar: Record<string, any>) => boolean;
  avhengigAv?: {};
};

export type EnvalgSporsmal = BaseSporsmal & {
  type: "envalg";
  options: { value: string; label: string }[];
};

export type LangTekstSporsmal = BaseSporsmal & {
  type: "langtekst";
  maxLength?: number;
};

export type DatoSporsmal = BaseSporsmal & {
  type: "dato";
};

export type Sporsmal = EnvalgSporsmal | LangTekstSporsmal | DatoSporsmal;
