import { FormScope } from "@rvf/react-router";
import { Dato } from "./Dato";
import { Envalg } from "./Envalg";
import { KortTekst } from "./KortTekst";
import { Land } from "./Land";
import { LangTekst } from "./LangTekst";
import { Periode } from "./Periode";
import { Sporsmal } from "./sporsmal.types";

interface IProps {
  sporsmal: Sporsmal;
  formScope: FormScope<string | undefined>;
}

export function Sporsmal({ sporsmal, formScope }: IProps) {
  switch (sporsmal.type) {
    case "dato":
      return <Dato sporsmal={sporsmal} formScope={formScope} />;

    case "periodeFra":
    case "periodeTil":
      return <Periode sporsmal={sporsmal} formScope={formScope} />;

    case "envalg":
      return <Envalg sporsmal={sporsmal} formScope={formScope} />;

    case "langTekst":
      return <LangTekst sporsmal={sporsmal} formScope={formScope} />;

    case "kortTekst":
      return <KortTekst sporsmal={sporsmal} formScope={formScope} />;

    case "land":
      return <Land sporsmal={sporsmal} formScope={formScope} />;

    default:
      console.warn(`Ukjent spørsmålstype: ${sporsmal}`);
      return null;
  }
}
