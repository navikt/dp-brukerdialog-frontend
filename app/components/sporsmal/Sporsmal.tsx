import { FormScope } from "@rvf/react-router";
import { Sporsmal } from "./sporsmal.types";
import { Dato } from "./Dato";
import { Envalg } from "./Envalg";
import { LangTekst } from "./LangTekst";
import { Land } from "./Land";
import KortTekst from "~/components/sporsmal/KortTekst";

interface IProps {
  sporsmal: Sporsmal;
  formScope: FormScope<string | undefined>;
}

export function Sporsmal({ sporsmal, formScope }: IProps) {
  switch (sporsmal.type) {
    case "dato":
      return <Dato sporsmal={sporsmal} formScope={formScope} />;

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
