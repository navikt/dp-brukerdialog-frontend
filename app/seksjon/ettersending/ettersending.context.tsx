import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Bundle, Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { dokumentkravSvarSendNå } from "~/seksjon/dokumentasjon/dokumentasjonskrav.komponenter";

type EttersendingContextType = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
  oppdaterDokumentasjonskrav: (oppdatertKrav: Dokumentasjonskrav) => void;
  lagrer: boolean;
  setLagrer: (lagrer: boolean) => void;
  dokumentkravSomManglerFiler: string[];
  setDokumentkravSomManglerFiler: (dokumentkravId: string[]) => void;
  validerDokumentasjonskrav: () => Promise<void>;
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
  const { soknadId } = useParams();
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [dokumentkravSomManglerFiler, setDokumentkravSomManglerFiler] = useState<string[]>([]);
  const [lagrer, setLagrer] = useState(false);

  function oppdaterDokumentasjonskrav(oppdatertKrav: Dokumentasjonskrav) {
    setDokumentasjonskrav((current) =>
      current.map((krav) => (krav.id === oppdatertKrav.id ? oppdatertKrav : krav))
    );
  }

  async function validerDokumentasjonskrav(): Promise<void> {
    const kravSomManglerFiler = dokumentasjonskrav
      .filter((krav) => !krav.filer || krav.filer.length === 0)
      .map((krav) => krav.id);

    setDokumentkravSomManglerFiler(kravSomManglerFiler);

    if (kravSomManglerFiler.length > 0) {
      return;
    }

    setLagrer(true);

    // Bundle og lagre alle dokumentkrav ett om gangen
    for (const krav of dokumentasjonskrav) {
      const bundle = await bundleFiler(krav);
      if (bundle) {
        const oppdatertKrav = { ...krav, bundle };
        oppdaterDokumentasjonskrav(oppdatertKrav);

        await lagreDokumentasjonskrav(oppdatertKrav);
      }
    }

    setLagrer(false);
  }

  async function bundleFiler(krav: Dokumentasjonskrav): Promise<Bundle | null> {
    try {
      const formData = new FormData();
      formData.append("dokumentasjonskravFiler", JSON.stringify(krav.filer || []));

      const response = await fetch(`/api/dokumentasjonskrav/${soknadId}/${krav.id}/bundle-filer`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        return await response.json();
      }

      return null;
    } catch (error) {
      console.error("Feil ved bundling av filer:", error);
      return null;
    }
  }

  async function lagreDokumentasjonskrav(dokumentasjonskrav: Dokumentasjonskrav): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("dokumentasjonskrav", JSON.stringify(dokumentasjonskrav));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.seksjonId}/${dokumentasjonskrav.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      console.log("lagrer krav");

      if (!response.ok) {
        console.error("Feil ved lagring av dokumentasjonskrav:", dokumentasjonskrav.id);
      }

      return;
    } catch (error) {
      console.error("Feil ved lagring av dokumentasjonskrav:", error);
    }
  }

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
