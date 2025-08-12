export type Sporsmal =
  | EnvalgSporsmal
  | LangTekstSporsmal
  | KortTekstSporsmal
  | DatoSporsmal
  | LandSporsmal
  | PeriodeSporsmal;

type baseType = "envalg" | "langTekst" | "kortTekst" | "dato" | "periode" | "land";

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

export type KortTekstSporsmal = BaseSporsmal & {
  type: "kortTekst";
};

export type DatoSporsmal = BaseSporsmal & {
  type: "dato";
  fom?: Date;
  tom?: Date;
};

export type PeriodeSporsmal = BaseSporsmal & {
  type: "periode";
  fra?: {
    fom?: Date;
    tom?: Date;
  };
  til?: {
    fom?: Date;
    tom?: Date;
    optional?: boolean;
  };
};

export type LandSporsmal = BaseSporsmal & {
  type: "land";
};
