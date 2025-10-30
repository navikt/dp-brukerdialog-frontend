import React, { createContext, useContext, useState } from "react";
import {
  BarnLagtManueltType,
  BarnFraPdlType,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { DokumentasjonskravType } from "~/seksjon/dokumentasjon/Dokumentasjonskrav";

export enum ModalOperasjonEnum {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type ModalData = {
  operasjon: ModalOperasjonEnum;
  barn?: BarnLagtManueltType;
};

type BarnetilleggContextType = {
  barnFraPdl: BarnFraPdlType[];
  setBarnFraPdl: (barnFraPdl: BarnFraPdlType[]) => void;
  barnLagtManuelt: BarnLagtManueltType[];
  setBarnLagtManuelt: (barnLagtManuelt: BarnLagtManueltType[]) => void;
  validerBarnFraPdl: boolean;
  setValiderBarnFraPdl: (valider: boolean) => void;
  modalData?: ModalData;
  setModalData: (modalData?: ModalData) => void;
  dokumentasjonskrav: DokumentasjonskravType[];
  setDokumentasjonskrav: (dokumentasjonskrav: DokumentasjonskravType[]) => void;
};

type BarnetilleggProviderProps = {
  barnFraPdl: BarnLagtManueltType[];
  barnLagtManuelt: BarnLagtManueltType[];
  dokumentasjonskrav: DokumentasjonskravType[];
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
  barnFraPdl: barnFraProps,
  barnLagtManuelt: barnLagtManueltProps,
  dokumentasjonskrav: dokumentasjonskravProps,
  children,
}: BarnetilleggProviderProps) {
  const [validerBarnFraPdl, setValiderBarnFraPdl] = useState(false);
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);
  const [barnFraPdl, setBarnFraPdl] = useState(barnFraProps);
  const [barnLagtManuelt, setBarnLagtManuelt] = useState(barnLagtManueltProps);
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);

  return (
    <BarnetilleggContext.Provider
      value={{
        barnFraPdl,
        barnLagtManuelt,
        validerBarnFraPdl,
        setValiderBarnFraPdl,
        setBarnFraPdl,
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
