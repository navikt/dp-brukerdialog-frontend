import React, { createContext, useContext, useEffect, useState } from "react";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

type EttersendingContextType = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
  oppdaterDokumentasjonskrav: (oppdatertKrav: Dokumentasjonskrav) => void;
  lagrer: boolean;
  setLagrer: (lagrer: boolean) => void;
  dokumentkravSomManglerFiler: string[];
  setDokumentkravSomManglerFiler: (dokumentkravId: string[]) => void;
  validerDokumentasjonskrav: () => void;
};

type EttersendingProviderProps = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  children: React.ReactNode;
};

const EttersendingContext = createContext<EttersendingContextType | undefined>(undefined);

function useEttersendingContext() {
  const context = useContext(EttersendingContext);

  if (!context) {
    const feilmelding =
      "useEttersendingContext må brukes innenfor en EttersendingProvider. Sjekk om <EttersendingView> ligger inni <EttersendingProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function EttersendingProvider({
  dokumentasjonskrav: dokumentasjonskravProps,
  children,
}: EttersendingProviderProps) {
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [dokumentkravSomManglerFiler, setDokumentkravSomManglerFiler] = useState<string[]>([]);
  const [lagrer, setLagrer] = useState(false);

  function oppdaterDokumentasjonskrav(oppdatertKrav: Dokumentasjonskrav) {
    setDokumentasjonskrav((current) =>
      current.map((krav) => (krav.id === oppdatertKrav.id ? oppdatertKrav : krav))
    );
  }

  function validerDokumentasjonskrav(): void {
    const kravSomManglerFiler = dokumentasjonskrav
      .filter((krav) => !krav.filer || krav.filer.length === 0)
      .map((krav) => krav.id);

    setDokumentkravSomManglerFiler(kravSomManglerFiler);
  }

  useEffect(() => {
    console.log(dokumentasjonskrav);
  }, [dokumentasjonskrav]);

  return (
    <EttersendingContext.Provider
      value={{
        dokumentasjonskrav,
        setDokumentasjonskrav,
        oppdaterDokumentasjonskrav,
        lagrer,
        setLagrer,
        dokumentkravSomManglerFiler,
        setDokumentkravSomManglerFiler,
        validerDokumentasjonskrav,
      }}
    >
      {children}
    </EttersendingContext.Provider>
  );
}

export { EttersendingProvider, useEttersendingContext };
