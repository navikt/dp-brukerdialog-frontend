import React, { createContext, useContext, useState } from "react";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { PengestøtteFraAndreEøsLand } from "./komponenter/PengestøtteFraAndreEøsLandModal";
import { PengestøtteFraNorge } from "./komponenter/PengestøtteFraNorgeModal";

export enum ModalOperasjon {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type PengestøtteFraAndreEøsLandModalData = {
  operasjon: ModalOperasjon;
  pengestøtteFraAndreEøsLand?: PengestøtteFraAndreEøsLand;
};

type PengestøtteFraNorgeModalData = {
  operasjon: ModalOperasjon;
  pengestøtteFraNorge?: PengestøtteFraNorge;
};

type AnnenPengestøtteContextType = {
  pengestøtteFraAndreEøsLand: PengestøtteFraAndreEøsLand[];
  setPengestøtteFraAndreEøsLand: (pengestøtteFraAndreEøsLand: PengestøtteFraAndreEøsLand[]) => void;
  pengestøtteFraAndreEøsLandModalData?: PengestøtteFraAndreEøsLandModalData;
  setPengestøtteFraAndreEøsLandModalData: (
    pengestøtteFraAndreEøsLandModalData?: PengestøtteFraAndreEøsLandModalData
  ) => void;
  pengestøtteFraNorge: PengestøtteFraNorge[];
  setPengestøtteFraNorge: (pengestøtteFraNorge: PengestøtteFraNorge[]) => void;
  pengestøtteFraNorgeModalData?: PengestøtteFraNorgeModalData;
  setPengestøtteFraNorgeModalData: (
    pengestøtteFraNorgeModalData?: PengestøtteFraNorgeModalData
  ) => void;
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
};

type AnnenPengestøtteProps = {
  pengestøtteFraAndreEøsLand: PengestøtteFraAndreEøsLand[];
  pengestøtteFraNorge: PengestøtteFraNorge[];
  dokumentasjonskrav: Dokumentasjonskrav[];
  children: React.ReactNode;
};

const AnnenPengestøtteContext = createContext<AnnenPengestøtteContextType | undefined>(undefined);

function useAnnenPengestøtteContext() {
  const context = useContext(AnnenPengestøtteContext);

  if (!context) {
    const feilmelding =
      "useAnnenPengestøtteContext må brukes innenfor en AnnenPengestøtteProvider. Sjekk om <AnnenPengestøtteView> ligger inni <AnnenPengestøtteProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function AnnenPengestøtteProvider({
  pengestøtteFraAndreEøsLand: pengestøtteFraAndreEøsLandProps,
  pengestøtteFraNorge: pengestøtteFraNorgeProps,
  dokumentasjonskrav: dokumentasjonskravProps,
  children,
}: AnnenPengestøtteProps) {
  const [pengestøtteFraAndreEøsLand, setPengestøtteFraAndreEøsLand] = useState(
    pengestøtteFraAndreEøsLandProps
  );
  const [pengestøtteFraAndreEøsLandModalData, setPengestøtteFraAndreEøsLandModalData] = useState<
    PengestøtteFraAndreEøsLandModalData | undefined
  >(undefined);
  const [pengestøtteFraNorge, setPengestøtteFraNorge] = useState(pengestøtteFraNorgeProps);
  const [pengestøtteFraNorgeModalData, setPengestøtteFraNorgeModalData] = useState<
    PengestøtteFraNorgeModalData | undefined
  >(undefined);

  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);

  return (
    <AnnenPengestøtteContext.Provider
      value={{
        pengestøtteFraAndreEøsLand,
        setPengestøtteFraAndreEøsLand,
        pengestøtteFraAndreEøsLandModalData,
        setPengestøtteFraAndreEøsLandModalData,
        pengestøtteFraNorge,
        setPengestøtteFraNorge,
        pengestøtteFraNorgeModalData,
        setPengestøtteFraNorgeModalData,
        dokumentasjonskrav,
        setDokumentasjonskrav,
      }}
    >
      {children}
    </AnnenPengestøtteContext.Provider>
  );
}

export { AnnenPengestøtteProvider, useAnnenPengestøtteContext };
