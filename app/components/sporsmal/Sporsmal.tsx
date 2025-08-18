import { FormScope } from "@rvf/react-router";
import { Komponent } from "./sporsmal.types";
import { Dato } from "./Dato";
import { Envalg } from "./Envalg";
import { Flervalg } from "./Flervalg";
import { KortTekst } from "./KortTekst";
import { LangTekst } from "./LangTekst";
import { Land } from "./Land";
import { Periode } from "./Periode";
import { Varselmelding } from "./Varselmelding";

interface IProps {
  sporsmal: Komponent;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Sporsmal({ sporsmal, formScope }: Readonly<IProps>) {
  switch (sporsmal.type) {
    case "dato":
      return <Dato sporsmal={sporsmal} formScope={formScope} />;

    case "periodeFra":
    case "periodeTil":
      return <Periode sporsmal={sporsmal} formScope={formScope} />;

    case "envalg":
      return <Envalg sporsmal={sporsmal} formScope={formScope} />;

    case "flervalg":
      return <Flervalg spørsmål={sporsmal} formScope={formScope} />;

    case "langTekst":
      return <LangTekst sporsmal={sporsmal} formScope={formScope} />;

    case "kortTekst":
      return <KortTekst sporsmal={sporsmal} formScope={formScope} />;

    case "land":
      return <Land sporsmal={sporsmal} formScope={formScope} />;

    case "varselmelding":
      return <Varselmelding sporsmal={sporsmal} />;

    default:
      console.warn(`Ukjent spørsmålstype: ${sporsmal}`);
      return null;
  }
}
