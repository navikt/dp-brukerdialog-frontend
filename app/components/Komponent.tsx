import { FormScope } from "@rvf/react-router";
import { useEffect, useRef } from "react";
import { Dokumentasjonskravindikator } from "~/components/informasjon-komponent/Dokumentasjonskravindikator";
import { ForklarendeTekst } from "~/components/informasjon-komponent/ForklarendeTekst";
import { Nedtrekksliste } from "~/components/spørsmål-komponent/Nedtrekksliste";
import { Tall } from "~/components/spørsmål-komponent/Tall";
import { useFokus } from "~/hooks/useFokus";
import { useSoknad } from "~/seksjon/soknad.context";
import { Informasjonskort } from "./informasjon-komponent/Informasjonskort";
import { LesMer } from "./informasjon-komponent/LesMer";
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
  formValues?: Record<string, any>;
}

export function Komponent({ props, formScope, formValues }: IProps) {
  const ref = useRef(null);
  const { settFokus } = useFokus();
  const { spørsmålIdTilFokus, submitTeller } = useSoknad();

  useEffect(() => {
    if (props.id === spørsmålIdTilFokus) {
      settFokus(ref);
    }
  }, [spørsmålIdTilFokus, submitTeller]);

  switch (props.type) {
    case "dato":
      return <Dato ref={ref} props={props} formScope={formScope} />;

    case "periodeFra":
    case "periodeTil":
      return <Periode ref={ref} props={props} formScope={formScope} formValues={formValues} />;

    case "envalg":
      return <Envalg ref={ref} props={props} formScope={formScope} />;

    case "flervalg":
      return <Flervalg ref={ref} props={props} formScope={formScope} />;

    case "langTekst":
      return <LangTekst ref={ref} props={props} formScope={formScope} />;

    case "kortTekst":
      return <KortTekst ref={ref} props={props} formScope={formScope} />;

    case "land":
      return <Land ref={ref} props={props} formScope={formScope} />;

    case "tall":
      return <Tall ref={ref} props={props} formScope={formScope} />;

    case "nedtrekksliste":
      return <Nedtrekksliste ref={ref} props={props} formScope={formScope} />;

    case "informasjonskort":
      return <Informasjonskort props={props} />;

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
