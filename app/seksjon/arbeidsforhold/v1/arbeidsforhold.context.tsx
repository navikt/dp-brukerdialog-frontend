import { FormApi } from "@rvf/react-router";
import React, { createContext, useContext, useState } from "react";
import { Arbeidsforhold } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";

export enum ModalOperasjon {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type ModalData = {
  form?: FormApi<any>;
  operasjon: ModalOperasjon;
  arbeidsforhold?: Arbeidsforhold;
};

type ArbeidsforholdContextType = {
  registrerteArbeidsforhold: Arbeidsforhold[];
  setRegistrerteArbeidsforhold: (registrerteArbeidsforhold: Arbeidsforhold[]) => void;
  modalData?: ModalData;
  setModalData: (modalData?: ModalData) => void;
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
};

type ArbeidsforholdProviderProps = {
  registrerteArbeidsforhold: Arbeidsforhold[];
  dokumentasjonskrav: Dokumentasjonskrav[];
  children: React.ReactNode;
};

const ArbeidsforholdContext = createContext<ArbeidsforholdContextType | undefined>(undefined);

function useArbeidsforholdContext() {
  const context = useContext(ArbeidsforholdContext);

  if (!context) {
    const feilmelding =
      "useArbeidsforholdContext må brukes innenfor en ArbeidsforholdProvider. Sjekk om <ArbeidsforholdView> ligger inni <ArbeidsforholdProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function ArbeidsforholdProvider({
  registrerteArbeidsforhold: registrerteArbeidsforholdProps,
  dokumentasjonskrav: dokumentasjonskravProps,
  children,
}: ArbeidsforholdProviderProps) {
  const [registrerteArbeidsforhold, setRegistrerteArbeidsforhold] = useState(
    registrerteArbeidsforholdProps
  );
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);

  return (
    <ArbeidsforholdContext.Provider
      value={{
        registrerteArbeidsforhold,
        setRegistrerteArbeidsforhold,
        modalData,
        setModalData,
        dokumentasjonskrav,
        setDokumentasjonskrav,
      }}
    >
      {children}
    </ArbeidsforholdContext.Provider>
  );
}

export { ArbeidsforholdProvider, useArbeidsforholdContext };
