import React, { createContext, useContext, useState } from "react";
import { PengestøtteFraAndreEøsLandModalSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import { PengestøtteFraNorgeModalSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";

export enum ModalOperasjon {
  LeggTil = "leggTil",
  Rediger = "rediger",
}

type PengestøtteFraAndreEøsLandModalData = {
  operasjon: ModalOperasjon;
  pengestøtteFraAndreEøsLandSvar?: PengestøtteFraAndreEøsLandModalSvar;
  pengestøtteFraAndreEøsLandSvarIndex?: number;
};

type PengestøtteFraNorgeModalData = {
  operasjon: ModalOperasjon;
  pengestøtteFraNorgeSvar?: PengestøtteFraNorgeModalSvar;
  pengestøtteFraNorgeSvarIndex?: number;
};

type AnnenPengestøtteContextType = {
  pengestøtteFraAndreEøsLand: PengestøtteFraAndreEøsLandModalSvar[];
  setPengestøtteFraAndreEøsLand: (
    pengestøtteFraAndreEøsLandSvar: PengestøtteFraAndreEøsLandModalSvar[]
  ) => void;
  pengestøtteFraAndreEøsLandModalData?: PengestøtteFraAndreEøsLandModalData;
  setPengestøtteFraAndreEøsLandModalData: (
    pengestøtteFraAndreEøsLandModalData?: PengestøtteFraAndreEøsLandModalData
  ) => void;
  pengestøtteFraNorge: PengestøtteFraNorgeModalSvar[];
  setPengestøtteFraNorge: (pengestøtteFraNorgeSvar: PengestøtteFraNorgeModalSvar[]) => void;
  pengestøtteFraNorgeModalData?: PengestøtteFraNorgeModalData;
  setPengestøtteFraNorgeModalData: (
    pengestøtteFraNorgeModalData?: PengestøtteFraNorgeModalData
  ) => void;
};

type AnnenPengestøtteProps = {
  pengestøtteFraAndreEøsLand: PengestøtteFraAndreEøsLandModalSvar[];
  pengestøtteFraNorge: PengestøtteFraNorgeModalSvar[];
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
  children,
}: AnnenPengestøtteProps) {
  const [pengestøtteFraAndreEøsLand, setPengestøtteFraAndreEøsLand] = useState(
    pengestøtteFraAndreEøsLandProps as any
  );
  const [pengestøtteFraAndreEøsLandModalData, setPengestøtteFraAndreEøsLandModalData] = useState<
    PengestøtteFraAndreEøsLandModalData | undefined
  >(undefined);
  const [pengestøtteFraNorge, setPengestøtteFraNorge] = useState(pengestøtteFraNorgeProps as any);
  const [pengestøtteFraNorgeModalData, setPengestøtteFraNorgeModalData] = useState<
    PengestøtteFraNorgeModalData | undefined
  >(undefined);

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
      }}
    >
      {children}
    </AnnenPengestøtteContext.Provider>
  );
}

export { AnnenPengestøtteProvider, useAnnenPengestøtteContext };
