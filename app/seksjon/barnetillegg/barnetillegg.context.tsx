import React, { createContext, useContext, useState } from "react";
import { Barn } from "~/seksjon/barnetillegg/barnetillegg.spørsmål";

type oppdaterBarnType = {
  barnIndex: number;
  barn: Barn;
};

type BarnetilleggContextType = {
  barnFraPdl: Barn[];
  setbarnFraPdl: (barnFraPdl: Barn[]) => void;
  barnLagtManuelt: Barn[];
  setBarnLagtManuelt: (barnLagtManuelt: Barn[]) => void;
  validerBarnFraPdl: boolean;
  setValiderBarnFraPdl: (valider: boolean) => void;
  oppdaterBarn?: oppdaterBarnType;
  setOppdaterBarn: (oppdaterBarn: oppdaterBarnType | undefined) => void;
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
    const feilmelding =
      "useBarnetilleggContext må brukes innenfor en BarnetilleggProvider. Sjekk om <BarnetilleggView> ligger inni <BarnetilleggProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
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
  const [oppdaterBarnState, setOppdaterBarnState] = useState<oppdaterBarnType | undefined>(
    undefined
  );

  return (
    <BarnetilleggContext.Provider
      value={{
        barnFraPdl: barnFraPdlState,
        barnLagtManuelt: barnLagtManueltState,
        validerBarnFraPdl,
        setValiderBarnFraPdl,
        setbarnFraPdl,
        setBarnLagtManuelt,
        oppdaterBarn: oppdaterBarnState,
        setOppdaterBarn: setOppdaterBarnState,
      }}
    >
      {children}
    </BarnetilleggContext.Provider>
  );
}

export { BarnetilleggProvider, useBarnetilleggContext };
