import React, { createContext, useContext, useEffect, useState } from "react";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";

type DokumentasjonskravContextType = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  lagrer: boolean;
  setLagrer: (lagrer: boolean) => void;
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
  oppdaterDokumentasjonskrav: (oppdatertKrav: Dokumentasjonskrav) => void;
  dokumentasjonskravHarEnValideringsfeil: string[];
  setDokumentasjonskravHarEnValideringsfeil: (dokumentkravId: string[]) => void;
  dokumentasjonskravManglerFiler: string[];
  setDokumentasjonskravManglerFiler: (dokumentkravId: string[]) => void;
  validerDokumentasjonskrav: () => Promise<void>;
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
  const [lagrer, setLagrer] = useState(false);
  const [dokumentasjonskravHarEnValideringsfeil, setDokumentasjonskravHarEnValideringsfeil] =
    useState<string[]>([]);
  const [dokumentasjonskravManglerFiler, setDokumentasjonskravManglerFiler] = useState<string[]>(
    []
  );

  function oppdaterDokumentasjonskrav(oppdatertDokumentasjonskrav: Dokumentasjonskrav) {
    setDokumentasjonskrav((current) =>
      current.map((krav) =>
        krav.id === oppdatertDokumentasjonskrav.id ? oppdatertDokumentasjonskrav : krav
      )
    );
  }

  useEffect(() => {
    console.log(dokumentasjonskrav);
  }, [dokumentasjonskrav]);

  async function validerDokumentasjonskrav(): Promise<void> {
    console.log("Validerer dokumentasjonskrav...");

    setLagrer(true);

    const dokumentasjonskravUtenFil = dokumentasjonskrav
      .filter(
        (dokumentasjonskrav) => !dokumentasjonskrav.filer || dokumentasjonskrav.filer.length === 0
      )
      .map((dokumentasjonskrav) => dokumentasjonskrav.id);

    setDokumentasjonskravManglerFiler(dokumentasjonskravUtenFil);
    const dokumentasjonskravMedFilFeil = dokumentasjonskrav
      .filter((dokumentasjonskrav) => dokumentasjonskrav.filer?.some((fil) => fil.feil))
      .map((dokumentasjonskrav) => dokumentasjonskrav.id);

    setDokumentasjonskravHarEnValideringsfeil(dokumentasjonskravMedFilFeil);

    if (dokumentasjonskravUtenFil.length > 0 || dokumentasjonskravMedFilFeil.length > 0) {
      return;
    }
  }

  return (
    <DokumentasjonskravContext.Provider
      value={{
        dokumentasjonskrav,
        setDokumentasjonskrav,
        oppdaterDokumentasjonskrav,
        dokumentasjonskravHarEnValideringsfeil,
        setDokumentasjonskravHarEnValideringsfeil,
        dokumentasjonskravManglerFiler,
        setDokumentasjonskravManglerFiler,
        validerDokumentasjonskrav,
        lagrer,
        setLagrer,
      }}
    >
      {children}
    </DokumentasjonskravContext.Provider>
  );
}

export { DokumentasjonskravProvider, useDokumentasjonskravContext };
