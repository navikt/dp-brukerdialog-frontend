import React, { createContext, useContext, useEffect, useState } from "react";

type SoknadContextType = {
  spørsmålIdTilFokus: string | undefined;
  setSpørsmålIdTilFokus: (spørsmålId?: string | undefined) => void;
  submitTeller: number;
  setSubmitTeller: (teller: number) => void;
  økeSubmitTeller: () => void;
};

type SoknadProviderProps = {
  children: React.ReactNode;
};

const SoknadContext = createContext<SoknadContextType | undefined>(undefined);

function useSoknad() {
  const context = useContext(SoknadContext);

  if (!context) {
    const feilmelding =
      "useSoknad må brukes innenfor en SoknadProvider. Sjekk om <SoknadProvider> ligger inni $soknadId.tsx";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function SoknadProvider({ children }: SoknadProviderProps) {
  const [spørsmålIdTilFokus, setSpørsmålIdTilFokus] = useState<string | undefined>(undefined);
  const [submitTeller, setSubmitTeller] = useState(0);

  function økeSubmitTeller() {
    setSubmitTeller((teller) => teller + 1);
  }

  return (
    <SoknadContext.Provider
      value={{
        spørsmålIdTilFokus,
        setSpørsmålIdTilFokus,
        submitTeller,
        setSubmitTeller,
        økeSubmitTeller,
      }}
    >
      {children}
    </SoknadContext.Provider>
  );
}

export { SoknadProvider, useSoknad };
