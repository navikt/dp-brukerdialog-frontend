type baseType = "envalg" | "langTekst" | "dato";

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
};

export type Sporsmal = EnvalgSporsmal | LangTekstSporsmal | DatoSporsmal;
