import React, { createContext, useContext, useState } from "react";
import { Barn } from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";

type DokumentasjonContextType = {
  barnFraPdl: Barn[];
  setbarnFraPdl: (barnFraPdl: Barn[]) => void;
};

type DokumentasjonProviderProps = {
  barnFraPdl: Barn[];
  children: React.ReactNode;
};

const DokumentasjonContext = createContext<DokumentasjonContextType | undefined>(undefined);

function useDokumentasjonContext() {
  const context = useContext(DokumentasjonContext);

  if (!context) {
    const feilmelding =
      "useDokumentasjonContext må brukes innenfor en DokumentasjonProvider. Sjekk om <DokumentasjonView> ligger inni <DokumentasjonProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function DokumentasjonProvider({
  barnFraPdl: barnFraPdlProps,
  children,
}: DokumentasjonProviderProps) {
  const [barnFraPdl, setbarnFraPdl] = useState(barnFraPdlProps);

  return (
    <DokumentasjonContext.Provider
      value={{
        barnFraPdl,
        setbarnFraPdl,
      }}
    >
      {children}
    </DokumentasjonContext.Provider>
  );
}

export { DokumentasjonProvider, useDokumentasjonContext };
