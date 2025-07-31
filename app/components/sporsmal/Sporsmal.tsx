import { FormScope } from "@rvf/react-router";
import { DatoSporsmal, EnvalgSporsmal, LangTekstSporsmal } from "../seksjon/seksjon.types";
import { Dato } from "./Dato";
import { Envalg } from "./Envalg";
import { LangTekst } from "./LangTekst";

interface IProps {
  sporsmal: DatoSporsmal | EnvalgSporsmal | LangTekstSporsmal;
  formScope: FormScope<string | undefined>;
}

export function Sporsmal({ sporsmal, formScope }: IProps) {
  switch (sporsmal.type) {
    case "dato":
      return <Dato sporsmal={sporsmal as DatoSporsmal} formScope={formScope} />;
    case "envalg":
      return <Envalg sporsmal={sporsmal as EnvalgSporsmal} formScope={formScope} />;
    case "langTekst":
      return <LangTekst sporsmal={sporsmal as LangTekstSporsmal} formScope={formScope} />;
    default:
      console.warn(`Ukjent spørsmålstype: ${sporsmal}`);
      return null;
  }
}
