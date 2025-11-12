import { Gårdsbruk, Næringsvirksomhet } from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import React, { createContext, useContext, useState } from "react";

export enum ModalOperasjon {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type NæringsvirksomhetModalData = {
  operasjon: ModalOperasjon;
  næringsvirksomhetIndex?: number;
  næringsvirksomhet?: Næringsvirksomhet;
};

type GårdsbrukModalData = {
  operasjon: ModalOperasjon;
  gårdsbrukIndex?: number;
  etGårdsbruk?: Gårdsbruk;
};

type EgenNæringContextType = {
  næringsvirksomheter: Næringsvirksomhet[];
  setNæringsvirksomheter: (næringsvirksomheter: Næringsvirksomhet[]) => void;
  gårdsbruk: Gårdsbruk[];
  setGårdsbruk: (gårdsbruk: Gårdsbruk[]) => void;
  næringsvirksomhetModalData?: NæringsvirksomhetModalData;
  setNæringsvirksomhetModalData: (næringsvirksomhetModalData?: NæringsvirksomhetModalData) => void;
  gårdsbrukModalData?: GårdsbrukModalData;
  setGårdsbrukModalData: (gårdsbrukModalData?: GårdsbrukModalData) => void;
};

type EgenNæringProviderProps = {
  næringsvirksomheter: Næringsvirksomhet[];
  gårdsbruk: Gårdsbruk[];
  children: React.ReactNode;
};

const EgenNæringContext = createContext<EgenNæringContextType | undefined>(undefined);

function useEgenNæringContext() {
  const context = useContext(EgenNæringContext);

  if (!context) {
    const feilmelding =
      "useEgenNæringContext må brukes innenfor en EgenNæringProvider. Sjekk om <EgenNæringView> ligger inni <EgenNæringProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function EgenNæringProvider({
  næringsvirksomheter: næringsvirksomheterProps,
  gårdsbruk: gårdsbrukProps,
  children,
}: EgenNæringProviderProps) {
  const [næringsvirksomheter, setNæringsvirksomheter] = useState(næringsvirksomheterProps);
  const [gårdsbruk, setGårdsbruk] = useState(gårdsbrukProps);
  const [næringsvirksomhetModalData, setNæringsvirksomhetModalData] = useState<
    NæringsvirksomhetModalData | undefined
  >(undefined);
  const [gårdsbrukModalData, setGårdsbrukModalData] = useState<GårdsbrukModalData | undefined>(
    undefined
  );

  return (
    <EgenNæringContext.Provider
      value={{
        næringsvirksomheter,
        setNæringsvirksomheter,
        gårdsbruk,
        setGårdsbruk,
        næringsvirksomhetModalData,
        setNæringsvirksomhetModalData,
        gårdsbrukModalData,
        setGårdsbrukModalData,
      }}
    >
      {children}
    </EgenNæringContext.Provider>
  );
}

export { EgenNæringProvider, useEgenNæringContext };
