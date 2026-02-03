import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import {
  Dokumentasjonskrav,
  GyldigDokumentkravSvar,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { dokumentkravEttersendt } from "../dokumentasjon/dokumentasjonskrav.komponenter";
import {
  bundleFiler,
  hentOppdaterteDokumentasjonskravSeksjoner,
  harMinstEnFilOgIngenFeil,
  hentGyldigeEttersendingeneTilBundling,
  hentOppdaterteDokumentasjonskravene,
  lagreEttersending,
} from "./ettersending.utils";

type EttersendingContextType = {
  dokumentasjonskravene: Dokumentasjonskrav[];
  setDokumentasjonskravene: (dokumentasjonskravene: Dokumentasjonskrav[]) => void;
  ettersendingene: Dokumentasjonskrav[];
  setEttersendingene: (ettersendingene: Dokumentasjonskrav[]) => void;
  oppdaterEttersending: (ettersending: Dokumentasjonskrav) => void;
  lagrer: boolean;
  setLagrer: (lagrer: boolean) => void;
  validerOgLagre: () => Promise<void>;
  harTekniskFeil: boolean;
  setHarTekniskFeil: (harTekniskFeil: boolean) => void;
  valideringStartet: boolean;
  setValideringStartet: (valideringStartet: boolean) => void;
};

type EttersendingProviderProps = {
  søknadId: string;
  dokumentasjonskravene: Dokumentasjonskrav[];
  ettersendingene: Dokumentasjonskrav[];
  children: React.ReactNode;
};

const EttersendingContext = createContext<EttersendingContextType | undefined>(undefined);

function useEttersending() {
  const context = useContext(EttersendingContext);

  if (!context) {
    const feilmelding =
      "useEttersending må brukes innenfor en EttersendingProvider. Sjekk om <EttersendingView> ligger inni <EttersendingProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function EttersendingProvider({
  søknadId,
  dokumentasjonskravene: dokumentasjonskraveneProps,
  ettersendingene: ettersendingeneProps,
  children,
}: EttersendingProviderProps) {
  const navigate = useNavigate();
  const [dokumentasjonskravene, setDokumentasjonskravene] = useState(dokumentasjonskraveneProps);
  const [ettersendingene, setEttersendingene] = useState(ettersendingeneProps);
  const [lagrer, setLagrer] = useState(false);
  const [valideringStartet, setValideringStartet] = useState(false);
  const [harTekniskFeil, setHarTekniskFeil] = useState(false);

  function oppdaterEttersending(ettersending: Dokumentasjonskrav) {
    setEttersendingene((current) =>
      current.map((eksisterendeEttersending) =>
        eksisterendeEttersending.id === ettersending.id ? ettersending : eksisterendeEttersending
      )
    );
  }

  async function validerOgLagre(): Promise<void> {
    setValideringStartet(true);

    const klarForBundlingOgLagring = harMinstEnFilOgIngenFeil(ettersendingene);
    const ettersendingeneTilBundling = hentGyldigeEttersendingeneTilBundling(ettersendingene);

    if (!klarForBundlingOgLagring || ettersendingeneTilBundling.length === 0) {
      return;
    }

    await bundleOgLagre(ettersendingeneTilBundling);
  }

  async function bundleOgLagre(ettersendingeneTilBundling: Dokumentasjonskrav[]): Promise<void> {
    setLagrer(true);
    setHarTekniskFeil(false);

    const ettersendingeneFerdigBundlet: Dokumentasjonskrav[] = [];

    for (const ettersending of ettersendingeneTilBundling) {
      const bundle = await bundleFiler(ettersending, søknadId);

      if (bundle) {
        const oppdatertDokumentasjonskrav: Dokumentasjonskrav = {
          ...ettersending,
          svar: dokumentkravEttersendt as GyldigDokumentkravSvar,
          bundle,
          begrunnelse: undefined,
        };

        ettersendingeneFerdigBundlet.push(oppdatertDokumentasjonskrav);
      } else {
        setLagrer(false);
        setHarTekniskFeil(true);
        console.error("Bundling feilet for dokumentkrav:", ettersending.id);
      }
    }

    const oppdaterteDokumentasjonskravene = hentOppdaterteDokumentasjonskravene(
      dokumentasjonskravene,
      ettersendingeneFerdigBundlet
    );

    const oppdaterteDokumentasjonskravSeksjoner = hentOppdaterteDokumentasjonskravSeksjoner(
      ettersendingeneFerdigBundlet,
      oppdaterteDokumentasjonskravene
    );

    for (const seksjon of oppdaterteDokumentasjonskravSeksjoner) {
      const { seksjonId, dokumentasjonskravene } = seksjon;
      const lagringOk = await lagreEttersending(søknadId, seksjonId, dokumentasjonskravene);

      if (!lagringOk) {
        setLagrer(false);
        setHarTekniskFeil(true);
        return;
      }
    }

    setLagrer(false);
    navigate(`../kvittering`);
  }

  return (
    <EttersendingContext.Provider
      value={{
        dokumentasjonskravene,
        setDokumentasjonskravene,
        oppdaterEttersending,
        lagrer,
        setLagrer,
        validerOgLagre,
        ettersendingene,
        setEttersendingene,
        harTekniskFeil,
        setHarTekniskFeil,
        valideringStartet,
        setValideringStartet,
      }}
    >
      {children}
    </EttersendingContext.Provider>
  );
}

export { EttersendingProvider, useEttersending };
