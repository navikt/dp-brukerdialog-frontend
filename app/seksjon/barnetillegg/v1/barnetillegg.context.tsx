import React, { createContext, useContext, useState } from "react";
import { Barn } from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import {
  Dokumentasjonskrav,
  GyldigDokumentkravSvar,
} from "~/seksjon/dokumentasjon/DokumentasjonView";

export enum ModalOperasjonEnum {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type ModalData = {
  operasjon: ModalOperasjonEnum;
  barn?: Barn;
};

type BarnetilleggContextType = {
  barnFraPdl: Barn[];
  setbarnFraPdl: (barnFraPdl: Barn[]) => void;
  barnLagtManuelt: Barn[];
  setBarnLagtManuelt: (barnLagtManuelt: Barn[]) => void;
  validerBarnFraPdl: boolean;
  setValiderBarnFraPdl: (valider: boolean) => void;
  modalData?: ModalData;
  setModalData: (modalData?: ModalData) => void;
  dokumentkravList: Dokumentasjonskrav[];
  setDokumentkravList: (dokumentkravList: Dokumentasjonskrav[]) => void;
};

type BarnetilleggProviderProps = {
  barnFraPdl: Barn[];
  barnLagtManuelt: Barn[];
  dokumentkravList: Dokumentasjonskrav[];
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
  dokumentkravList: [],
  children,
}: BarnetilleggProviderProps) {
  const [validerBarnFraPdl, setValiderBarnFraPdl] = useState(false);
  const [barnFraPdl, setbarnFraPdl] = useState(barnFraPdlProps);
  const [barnLagtManuelt, setBarnLagtManuelt] = useState(barnLagtManueltProps);
  const [dokumentkravList, setDokumentkravList] = useState<Dokumentasjonskrav[]>([]);
  const [modalData, setModalData] = useState<ModalData | undefined>(undefined);

  return (
    <BarnetilleggContext.Provider
      value={{
        barnFraPdl,
        barnLagtManuelt,
        validerBarnFraPdl,
        setValiderBarnFraPdl,
        setbarnFraPdl,
        dokumentkravList,
        setDokumentkravList,
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
