import { FormScope } from "@rvf/react-router";
import { Dokumentasjonskravindikator } from "~/components/Dokumentasjonskravindikator";
import { ForklarendeTekst } from "~/components/ForklarendeTekst";
import { Nedtrekksliste } from "~/components/Nedtrekksliste";
import { Tall } from "~/components/Tall";
import { Dato } from "./Dato";
import { Envalg } from "./Envalg";
import { Flervalg } from "./Flervalg";
import { KomponentType } from "./Komponent.types";
import { KortTekst } from "./KortTekst";
import { Land } from "./Land";
import { LangTekst } from "./LangTekst";
import { LesMer } from "./LesMer";
import { Periode } from "./Periode";
import { Varselmelding } from "./Varselmelding";

interface IProps {
  props: KomponentType;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Komponent({ props, formScope }: Readonly<IProps>) {
  switch (props.type) {
    case "dato":
      return <Dato props={props} formScope={formScope} />;

    case "periodeFra":
    case "periodeTil":
      return <Periode props={props} formScope={formScope} />;

    case "envalg":
      return <Envalg props={props} formScope={formScope} />;

    case "flervalg":
      return <Flervalg props={props} formScope={formScope} />;

    case "langTekst":
      return <LangTekst props={props} formScope={formScope} />;

    case "kortTekst":
      return <KortTekst props={props} formScope={formScope} />;

    case "land":
      return <Land props={props} formScope={formScope} />;

    case "tall":
      return <Tall props={props} formScope={formScope} />;

    case "nedtrekksliste":
      return <Nedtrekksliste props={props} formScope={formScope} />;

    case "varselmelding":
      return <Varselmelding props={props} />;

    case "lesMer":
      return <LesMer props={props} />;

    case "dokumentasjonskravindikator":
      return <Dokumentasjonskravindikator props={props} />;

    case "forklarendeTekst":
      return <ForklarendeTekst props={props} />;

    case "registeropplysning":
      return null;

    default:
      console.warn(`Ukjent spørsmålstype: ${props}`);
      return null;
  }
}
