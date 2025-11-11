import { FormScope } from "@rvf/react-router";
import { Dokumentasjonskravindikator } from "~/components/informasjon-komponent/Dokumentasjonskravindikator";
import { ForklarendeTekst } from "~/components/informasjon-komponent/ForklarendeTekst";
import { Nedtrekksliste } from "~/components/spørsmål-komponent/Nedtrekksliste";
import { Tall } from "~/components/spørsmål-komponent/Tall";
import { LesMer } from "./informasjon-komponent/LesMer";
import { Varselmelding } from "./informasjon-komponent/Varselmelding";
import { KomponentType } from "./Komponent.types";
import { Dato } from "./spørsmål-komponent/Dato";
import { Envalg } from "./spørsmål-komponent/Envalg";
import { Flervalg } from "./spørsmål-komponent/Flervalg";
import { KortTekst } from "./spørsmål-komponent/KortTekst";
import { Land } from "./spørsmål-komponent/Land";
import { LangTekst } from "./spørsmål-komponent/LangTekst";
import { Periode } from "./spørsmål-komponent/Periode";

interface IProps {
  props: KomponentType;
  formScope: FormScope<string | Array<string> | undefined>;
}

export function Komponent({ props, formScope }: IProps) {
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
