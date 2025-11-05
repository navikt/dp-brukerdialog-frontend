import React, { createContext, useContext, useState } from "react";
import { Arbeidsforhold } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";

export enum ModalOperasjon {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type ModalData = {
  ledetekst: string;
  operasjon: ModalOperasjon;
  arbeidsforholdIndex?: number;
  arbeidsforhold?: Arbeidsforhold;
};

type ArbeidsforholdContextType = {
  registrerteArbeidsforhold: Arbeidsforhold[];
  setRegistrerteArbeidsforhold: (registrerteArbeidsforhold: Arbeidsforhold[]) => void;
  modalData?: ModalData;
  setModalData: (modalData?: ModalData) => void;
};

type ArbeidsforholdProviderProps = {
  registrerteArbeidsforhold: Arbeidsforhold[];
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
  children,
}: ArbeidsforholdProviderProps) {
  const [registrerteArbeidsforhold, setRegistrerteArbeidsforhold] = useState(
    registrerteArbeidsforholdProps
  );
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);

  return (
    <ArbeidsforholdContext.Provider
      value={{
        registrerteArbeidsforhold,
        setRegistrerteArbeidsforhold,
        modalData,
        setModalData,
      }}
    >
      {children}
    </ArbeidsforholdContext.Provider>
  );
}

export { ArbeidsforholdProvider, useArbeidsforholdContext };
