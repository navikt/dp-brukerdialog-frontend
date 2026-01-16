import React, { createContext, useContext, useState } from "react";
import { BarnFraPdl, BarnLagtManuelt } from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";

export enum ModalOperasjon {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type ModalData = {
  operasjon: ModalOperasjon;
  barn?: BarnLagtManuelt;
};

type BarnetilleggContextType = {
  barnFraPdl: BarnFraPdl[];
  setbarnFraPdl: (barnFraPdl: BarnFraPdl[]) => void;
  barnLagtManuelt: BarnLagtManuelt[];
  setBarnLagtManuelt: (barnLagtManuelt: BarnLagtManuelt[]) => void;
  validerBarnFraPdl: boolean;
  setValiderBarnFraPdl: (valider: boolean) => void;
  modalData?: ModalData;
  setModalData: (modalData?: ModalData) => void;
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
};

type BarnetilleggProviderProps = {
  barnFraPdl: BarnFraPdl[];
  barnLagtManuelt: BarnLagtManuelt[];
  dokumentasjonskrav: Dokumentasjonskrav[];
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
  barnFraPdl: barnFraPdlProps,
  barnLagtManuelt: barnLagtManueltProps,
  dokumentasjonskrav: dokumentasjonskravProps,
  children,
}: BarnetilleggProviderProps) {
  const [validerBarnFraPdl, setValiderBarnFraPdl] = useState(false);
  const [barnFraPdl, setbarnFraPdl] = useState(barnFraPdlProps);
  const [barnLagtManuelt, setBarnLagtManuelt] = useState(barnLagtManueltProps);
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);

  return (
    <BarnetilleggContext.Provider
      value={{
        barnFraPdl,
        barnLagtManuelt,
        validerBarnFraPdl,
        setValiderBarnFraPdl,
        setbarnFraPdl,
        dokumentasjonskrav,
        setDokumentasjonskrav,
        setBarnLagtManuelt,
        modalData,
        setModalData,
      }}
    >
      {children}
    </BarnetilleggContext.Provider>
  );
}

export { BarnetilleggProvider, useBarnetilleggContext };
