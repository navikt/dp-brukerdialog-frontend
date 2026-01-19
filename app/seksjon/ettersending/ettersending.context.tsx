import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Bundle,
  Dokumentasjonskrav,
  GyldigDokumentkravSvar,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { dokumentkravEttersendt } from "../dokumentasjon/dokumentasjonskrav.komponenter";

interface EttersendingTilLagring {
  seksjonId: string;
  dokumentasjonskrav: Dokumentasjonskrav[];
}

type EttersendingContextType = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
  ettersending: Dokumentasjonskrav[];
  setEttersending: (ettersending: Dokumentasjonskrav[]) => void;
  oppdaterEttersending: (ettersending: Dokumentasjonskrav) => void;
  lagrer: boolean;
  setLagrer: (lagrer: boolean) => void;
  ettersendingManglerFiler: string[];
  setEttersendingManglerFiler: (dokumentkravId: string[]) => void;
  validerEttersending: () => Promise<void>;
  ettersendingHarEnValideringsfeil: string[];
  setEttersendingHarEnValideringsfeil: (dokumentkravId: string[]) => void;
  harTekniskFeil: boolean;
  setHarTekniskFeil: (harTekniskFeil: boolean) => void;
};

type EttersendingProviderProps = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  ettersending: Dokumentasjonskrav[];
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
  ettersending: ettersendingProps,
  children,
}: EttersendingProviderProps) {
  const { soknadId } = useParams();
  const navigate = useNavigate();
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [ettersending, setEttersending] = useState(ettersendingProps);
  const [lagrer, setLagrer] = useState(false);
  const [harTekniskFeil, setHarTekniskFeil] = useState(false);
  const [ettersendingManglerFiler, setEttersendingManglerFiler] = useState<string[]>([]);
  const [ettersendingHarEnValideringsfeil, setEttersendingHarEnValideringsfeil] = useState<
    string[]
  >([]);

  function oppdaterEttersending(ettersending: Dokumentasjonskrav) {
    setEttersending((current) =>
      current.map((krav) => (krav.id === ettersending.id ? ettersending : krav))
    );
  }

  async function validerEttersending(): Promise<void> {
    const ettersendingUtenFil = ettersending
      .filter((ettersending) => !ettersending.filer || ettersending.filer.length === 0)
      .map((ettersending) => ettersending.id);

    setEttersendingManglerFiler(ettersendingUtenFil);

    const ettersendingMedFilFeil = ettersending
      .filter((ettersending) => ettersending.filer?.some((fil) => fil.feil))
      .map((ettersending) => ettersending.id);

    setEttersendingHarEnValideringsfeil(ettersendingMedFilFeil);

    if (ettersendingUtenFil.length > 0 || ettersendingMedFilFeil.length > 0) {
      return;
    }

    await bundleOgLagreEttersendinger();
  }

  async function bundleOgLagreEttersendinger(): Promise<void> {
    setLagrer(true);
    setHarTekniskFeil(false);

    const bundletEttersendinger: Dokumentasjonskrav[] = [];
    let bundlingFeilet = false;

    for (const etEttersending of ettersending) {
      const bundle = await bundleFilerForEttersending(etEttersending);

      if (bundle) {
        const oppdatertDokumentasjonskrav: Dokumentasjonskrav = {
          ...etEttersending,
          svar: dokumentkravEttersendt as GyldigDokumentkravSvar,
          bundle,
          begrunnelse: undefined,
        };

        bundletEttersendinger.push(oppdatertDokumentasjonskrav);
      } else {
        bundlingFeilet = true;
        console.error("Bundling feilet for dokumentkrav:", etEttersending.id);
      }
    }

    if (bundlingFeilet) {
      setLagrer(false);
      return;
    }

    const alleDokumentasjonskrav = dokumentasjonskrav.map((etDokumentasjonskrav) => {
      const oppdatertDokumentasjonskrav = bundletEttersendinger.find(
        (etEttersending) => etEttersending.id === etDokumentasjonskrav.id
      );

      return oppdatertDokumentasjonskrav || etDokumentasjonskrav;
    });

    const ettersendingTilLagring: EttersendingTilLagring[] = [];
    const seksjonIds: string[] = [];

    for (const bundletEttersending of bundletEttersendinger) {
      if (!seksjonIds.includes(bundletEttersending.seksjonId)) {
        seksjonIds.push(bundletEttersending.seksjonId);

        ettersendingTilLagring.push({
          seksjonId: bundletEttersending.seksjonId,
          dokumentasjonskrav: alleDokumentasjonskrav.filter(
            (krav) => krav.seksjonId === bundletEttersending.seksjonId
          ),
        });
      }
    }

    for (const etEttersending of ettersendingTilLagring) {
      const { seksjonId, dokumentasjonskrav } = etEttersending;
      const lagringsResultat = await lagreDokumentasjonskravMedEttersending(
        seksjonId,
        dokumentasjonskrav
      );

      if (!lagringsResultat) {
        setLagrer(false);
        return;
      }
    }

    setLagrer(false);
    navigate(`../kvittering`);
  }

  async function bundleFilerForEttersending(
    ettersending: Dokumentasjonskrav
  ): Promise<Bundle | null> {
    try {
      const formData = new FormData();
      formData.append("filer", JSON.stringify(ettersending.filer));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${ettersending.id}/bundle-filer`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Feil ved bundling av filer for dokumentasjonskrav:", ettersending.id);

        setHarTekniskFeil(true);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error("Feil ved bundling av filer:", error);

      setHarTekniskFeil(true);
      return null;
    }
  }

  async function lagreDokumentasjonskravMedEttersending(
    seksjonId: string,
    ettersendinger: Dokumentasjonskrav[]
  ): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("ettersendinger", JSON.stringify(ettersendinger));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${seksjonId}/ettersending`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Feil ved lagring av dokumentasjonskrav:", seksjonId);
        setHarTekniskFeil(true);
        return false;
      }

      return true;
    } catch (error) {
      setHarTekniskFeil(true);
      console.error("Feil ved lagring av dokumentasjonskrav:", error);
      return false;
    }
  }

  return (
    <EttersendingContext.Provider
      value={{
        dokumentasjonskrav,
        setDokumentasjonskrav,
        oppdaterEttersending,
        lagrer,
        setLagrer,
        ettersendingManglerFiler,
        setEttersendingManglerFiler,
        validerEttersending,
        ettersending,
        setEttersending,
        ettersendingHarEnValideringsfeil,
        setEttersendingHarEnValideringsfeil,
        harTekniskFeil,
        setHarTekniskFeil,
      }}
    >
      {children}
    </EttersendingContext.Provider>
  );
}

export { EttersendingProvider, useEttersendingContext };
