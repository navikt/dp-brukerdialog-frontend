import React, { createContext, useContext, useState } from "react";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

type DokumentasjonskravContextType = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
  oppdaterDokumentasjonskrav: (oppdatertKrav: Dokumentasjonskrav) => void;
  harTekniskFeil: boolean;
  setHarTekniskFeil: (harTekniskFeil: boolean) => void;
  harValideringsFeil: boolean;
  setHarValideringsFeil: (harValideringsFeil: boolean) => void;
  dokumentasjonskravIdTilÅLagre: string | null;
  setDokumentasjonskravIdTilÅLagre: (id: string | null) => void;
};

type DokumentasjonskravProviderProps = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  children: React.ReactNode;
};

const DokumentasjonskravContext = createContext<DokumentasjonskravContextType | undefined>(
  undefined
);

function useDokumentasjonskravContext() {
  const context = useContext(DokumentasjonskravContext);

  if (!context) {
    const feilmelding =
      "useDokumentasjonskravContext må brukes innenfor en DokumentasjonskravProvider. Sjekk om <DokumentasjonskravView> ligger inni <DokumentasjonskravProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function DokumentasjonskravProvider({
  dokumentasjonskrav: dokumentasjonskravProps,
  children,
}: DokumentasjonskravProviderProps) {
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [harTekniskFeil, setHarTekniskFeil] = useState(false);
  const [harValideringsFeil, setHarValideringsFeil] = useState(false);
  const [dokumentasjonskravIdTilÅLagre, setDokumentasjonskravIdTilÅLagre] = useState<string | null>(
    null
  );

  function oppdaterDokumentasjonskrav(oppdatertKrav: Dokumentasjonskrav) {
    setDokumentasjonskrav((current) =>
      current.map((krav) => (krav.id === oppdatertKrav.id ? oppdatertKrav : krav))
    );
  }

  return (
    <DokumentasjonskravContext.Provider
      value={{
        dokumentasjonskrav,
        setDokumentasjonskrav,
        oppdaterDokumentasjonskrav,
        harTekniskFeil,
        setHarTekniskFeil,
        harValideringsFeil,
        setHarValideringsFeil,
        dokumentasjonskravIdTilÅLagre,
        setDokumentasjonskravIdTilÅLagre,
      }}
    >
      {children}
    </DokumentasjonskravContext.Provider>
  );
}

export { DokumentasjonskravProvider, useDokumentasjonskravContext };
