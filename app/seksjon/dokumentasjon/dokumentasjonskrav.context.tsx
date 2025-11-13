import React, { createContext, useContext, useState } from "react";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

type DokumentasjonskravContextType = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
};

type DokumentasjonskravProviderProps = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  children: React.ReactNode;
};

const DokumentasjonskravContext = createContext<DokumentasjonskravContextType | undefined>(
  undefined
);

function useDokumentasjonskravContext() {
  const context = useContext(DokumentasjonskravContext);

  if (!context) {
    const feilmelding =
      "useDokumentasjonskravContext må brukes innenfor en DokumentasjonskravProvider. Sjekk om <DokumentasjonskravView> ligger inni <DokumentasjonskravProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function DokumentasjonskravProvider({
  dokumentasjonskrav: dokumentasjonskravProps,
  children,
}: DokumentasjonskravProviderProps) {
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);

  return (
    <DokumentasjonskravContext.Provider
      value={{
        dokumentasjonskrav,
        setDokumentasjonskrav,
      }}
    >
      {children}
    </DokumentasjonskravContext.Provider>
  );
}

export { DokumentasjonskravProvider, useDokumentasjonskravContext };
