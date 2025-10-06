import { FormScope } from "@rvf/react-router";
import { KomponentType } from "./spørsmål.types";
import { Dato } from "./Dato";
import { Envalg } from "./Envalg";
import { Flervalg } from "./Flervalg";
import { KortTekst } from "./KortTekst";
import { LangTekst } from "./LangTekst";
import { Land } from "./Land";
import { Periode } from "./Periode";
import { Varselmelding } from "./Varselmelding";
import { LesMer } from "./LesMer";
import { Dokumentasjonskravindikator } from "~/components/spørsmål/Dokumentasjonskravindikator";
import { Tall } from "~/components/spørsmål/Tall";
import { Nedtrekksliste } from "~/components/spørsmål/Nedtrekksliste";

interface IProps {
  spørsmål: KomponentType;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Spørsmål({ spørsmål, formScope }: Readonly<IProps>) {
  switch (spørsmål.type) {
    case "dato":
      return <Dato spørsmål={spørsmål} formScope={formScope} />;

    case "periodeFra":
    case "periodeTil":
      return <Periode spørsmål={spørsmål} formScope={formScope} />;

    case "envalg":
      return <Envalg spørsmål={spørsmål} formScope={formScope} />;

    case "flervalg":
      return <Flervalg spørsmål={spørsmål} formScope={formScope} />;

    case "langTekst":
      return <LangTekst spørsmål={spørsmål} formScope={formScope} />;

    case "kortTekst":
      return <KortTekst spørsmål={spørsmål} formScope={formScope} />;

    case "land":
      return <Land spørsmål={spørsmål} formScope={formScope} />;

    case "tall":
      return <Tall spørsmål={spørsmål} formScope={formScope} />;

    case "nedtrekksliste":
      return <Nedtrekksliste spørsmål={spørsmål} formScope={formScope} />;

    case "varselmelding":
      return <Varselmelding spørsmål={spørsmål} />;

    case "lesMer":
      return <LesMer spørsmål={spørsmål} />;

    case "dokumentasjonskravindikator":
      return <Dokumentasjonskravindikator spørsmål={spørsmål} />;

    default:
      console.warn(`Ukjent spørsmålstype: ${spørsmål}`);
      return null;
  }
}
