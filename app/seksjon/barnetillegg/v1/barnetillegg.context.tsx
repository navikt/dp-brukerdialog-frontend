import React, { createContext, useContext, useState } from "react";
import { Barn } from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";

export enum ModalOperasjonEnum {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type ModalData = {
  operasjon: ModalOperasjonEnum;
  barn?: Barn;
};

export const DOKUMENTKRAV_SVAR_SEND_NAA = "dokumentkrav.svar.send.naa";
export const DOKUMENTKRAV_SVAR_SENDER_IKKE = "dokumentkrav.svar.sender.ikke";
export const DOKUMENTKRAV_SVAR_SENDER_SENERE = "dokumentkrav.svar.send.senere";
export const DOKUMENTKRAV_SVAR_SEND_NOEN_ANDRE = "dokumentkrav.svar.andre.sender";
export const DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE = "dokumentkrav.svar.sendt.tidligere";

export type GyldigDokumentkravSvar =
  | typeof DOKUMENTKRAV_SVAR_SEND_NAA
  | typeof DOKUMENTKRAV_SVAR_SENDER_SENERE
  | typeof DOKUMENTKRAV_SVAR_SEND_NOEN_ANDRE
  | typeof DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE
  | typeof DOKUMENTKRAV_SVAR_SENDER_IKKE;

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

export type Dokumentasjonskrav = {
  id: string;
  spørsmålId: string;
  beskrivelse?: string;
  gyldigeValg?: GyldigDokumentkravSvar[];
  svar?: GyldigDokumentkravSvar;
  begrunnelse?: string;
  bundle?: string;
  bundleFilsti?: string;
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
