import React, { createContext, useContext, useState } from "react";
import { Barn } from "~/seksjon/barnetillegg/barnetillegg.spørsmål";

type BarnetilleggContextType = {
  barnFraPdl: Barn[];
  setbarnFraPdl: (list: Barn[]) => void;
  barnLagtManuelt: Barn[];
  setBarnLagtManuelt: (list: Barn[]) => void;
  validerBarnFraPdl: boolean;
  setValiderBarnFraPdl: (shouldValidate: boolean) => void;
};

type BarnetilleggProviderProps = {
  barnFraPdl: Barn[];
  barnLagtManuelt: Barn[];
  children: React.ReactNode;
};

const BarnetilleggContext = createContext<BarnetilleggContextType | undefined>(undefined);

function useBarnetilleggContext() {
  const context = useContext(BarnetilleggContext);
  if (!context) {
    throw new Error("useBarnetilleggContext must be used within a BarnetilleggProvider");
  }
  return context;
}

function BarnetilleggProvider({
  barnFraPdl,
  barnLagtManuelt,
  children,
}: BarnetilleggProviderProps) {
  const [validerBarnFraPdl, setValiderBarnFraPdl] = useState(false);
  const [barnFraPdlState, setbarnFraPdl] = useState(barnFraPdl);
  const [barnLagtManueltState, setBarnLagtManuelt] = useState(barnLagtManuelt);

  return (
    <BarnetilleggContext.Provider
      value={{
        barnFraPdl: barnFraPdlState,
        barnLagtManuelt: barnLagtManueltState,
        validerBarnFraPdl,
        setValiderBarnFraPdl,
        setbarnFraPdl,
        setBarnLagtManuelt,
      }}
    >
      {children}
    </BarnetilleggContext.Provider>
  );
}

export { BarnetilleggProvider, useBarnetilleggContext };
