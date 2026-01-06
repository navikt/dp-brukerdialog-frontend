import React, { createContext, useContext, useState } from "react";
import { useParams } from "react-router";
import { Bundle, Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

interface EttersendingTilLagring {
  seksjonId: string;
  dokumentasjonskrav: Dokumentasjonskrav[];
}

type EttersendingContextType = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
  ettersendinger: Dokumentasjonskrav[];
  setEttersendinger: (ettersendinger: Dokumentasjonskrav[]) => void;
  oppdaterEttersendinger: (oppdatertKrav: Dokumentasjonskrav) => void;
  lagrer: boolean;
  setLagrer: (lagrer: boolean) => void;
  ettersendingManglerFiler: string[];
  setEttersendingManglerFiler: (dokumentkravId: string[]) => void;
  validerEttersending: () => Promise<void>;
};

type EttersendingProviderProps = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  ettersendinger: Dokumentasjonskrav[];
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
  ettersendinger: ettersendingerProps,
  children,
}: EttersendingProviderProps) {
  const { soknadId } = useParams();
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [ettersendinger, setEttersendinger] = useState(ettersendingerProps);
  const [ettersendingManglerFiler, setEttersendingManglerFiler] = useState<string[]>([]);
  const [lagrer, setLagrer] = useState(false);

  function oppdaterEttersendinger(ettersending: Dokumentasjonskrav) {
    setEttersendinger((current) =>
      current.map((krav) => (krav.id === ettersending.id ? ettersending : krav))
    );
  }

  async function validerEttersending(): Promise<void> {
    const ettersendingUtenFil = ettersendinger
      .filter((krav) => !krav.filer || krav.filer.length === 0)
      .map((krav) => krav.id);

    setEttersendingManglerFiler(ettersendingUtenFil);

    if (ettersendingUtenFil.length > 0) {
      return;
    }

    setLagrer(true);

    const bundletEttersendinger: Dokumentasjonskrav[] = [];

    for (const ettersending of ettersendinger) {
      const bundle = await bundleFiler(ettersending);

      if (bundle) {
        const oppdatertDokumentasjonskrav = { ...ettersending, bundle };
        bundletEttersendinger.push(oppdatertDokumentasjonskrav);
      }
    }

    const alleDokumentasjonskrav = dokumentasjonskrav.map((krav) => {
      const oppdatert = bundletEttersendinger.find((e) => e.id === krav.id);
      return oppdatert || krav;
    });

    const ettersendingerTilLagring: EttersendingTilLagring[] = [];
    const seksjonIds: string[] = [];

    for (const bundletEttersending of bundletEttersendinger) {
      if (!seksjonIds.includes(bundletEttersending.seksjonId)) {
        seksjonIds.push(bundletEttersending.seksjonId);

        ettersendingerTilLagring.push({
          seksjonId: bundletEttersending.seksjonId,
          dokumentasjonskrav: alleDokumentasjonskrav.filter(
            (krav) => krav.seksjonId === bundletEttersending.seksjonId
          ),
        });
      }
    }

    for (const ettersendingTilLagring of ettersendingerTilLagring) {
      const { seksjonId, dokumentasjonskrav } = ettersendingTilLagring;
      await lagreDokumentasjonskrav(seksjonId, dokumentasjonskrav);
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

  async function lagreDokumentasjonskrav(
    seksjonId: string,
    ettersendinger: Dokumentasjonskrav[]
  ): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("ettersendinger", JSON.stringify(ettersendinger));

      const response = await fetch(`/api/ettersending/${soknadId}/${seksjonId}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        console.error("Feil ved lagring av dokumentasjonskrav:", seksjonId);
      }
    } catch (error) {
      console.error("Feil ved lagring av dokumentasjonskrav:", error);
    }
  }

  return (
    <EttersendingContext.Provider
      value={{
        dokumentasjonskrav,
        setDokumentasjonskrav,
        oppdaterEttersendinger,
        lagrer,
        setLagrer,
        ettersendingManglerFiler,
        setEttersendingManglerFiler,
        validerEttersending,
        ettersendinger,
        setEttersendinger,
      }}
    >
      {children}
    </EttersendingContext.Provider>
  );
}

export { EttersendingProvider, useEttersendingContext };
