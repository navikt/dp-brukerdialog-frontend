import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import {
  Dokumentasjonskrav,
  GyldigDokumentkravSvar,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { dokumentkravEttersendt } from "../dokumentasjon/dokumentasjonskrav.komponenter";
import {
  bundleFiler,
  grupperDokumentasjonskravPerSeksjon,
  harMinstEnGyldigEttersending,
  hentGyldigeEttersendinger,
  kombinerDokumentasjonskravMedEttersendinger,
  lagreEttersending,
} from "./ettersendinger.utils";

export interface EttersendingTilLagring {
  seksjonId: string;
  dokumentasjonskraver: Dokumentasjonskrav[];
}

type EttersendingContextType = {
  dokumentasjonskraver: Dokumentasjonskrav[];
  setDokumentasjonskraver: (dokumentasjonskraver: Dokumentasjonskrav[]) => void;
  ettersendinger: Dokumentasjonskrav[];
  setEttersendinger: (ettersendinger: Dokumentasjonskrav[]) => void;
  oppdaterEttersending: (ettersending: Dokumentasjonskrav) => void;
  lagrer: boolean;
  setLagrer: (lagrer: boolean) => void;
  validerOgLagreEttersendinger: () => Promise<void>;
  harTekniskFeil: boolean;
  setHarTekniskFeil: (harTekniskFeil: boolean) => void;
  valideringStartet: boolean;
  setValideringStartet: (valideringStartet: boolean) => void;
};

type EttersendingProviderProps = {
  søknadId: string;
  dokumentasjonskraver: Dokumentasjonskrav[];
  ettersendinger: Dokumentasjonskrav[];
  children: React.ReactNode;
};

const EttersendingContext = createContext<EttersendingContextType | undefined>(undefined);

function useEttersendinger() {
  const context = useContext(EttersendingContext);

  if (!context) {
    const feilmelding =
      "useEttersendinger må brukes innenfor en EttersendingerProvider. Sjekk om <EttersendingView> ligger inni <EttersendingerProvider>.";

    console.error(feilmelding);
    throw new Error(feilmelding);
  }

  return context;
}

function EttersendingerProvider({
  søknadId,
  dokumentasjonskraver: dokumentasjonskraverProps,
  ettersendinger: ettersendingerProps,
  children,
}: EttersendingProviderProps) {
  const navigate = useNavigate();
  const [dokumentasjonskraver, setDokumentasjonskraver] = useState(dokumentasjonskraverProps);
  const [ettersendinger, setEttersendinger] = useState(ettersendingerProps);
  const [lagrer, setLagrer] = useState(false);
  const [valideringStartet, setValideringStartet] = useState(false);
  const [harTekniskFeil, setHarTekniskFeil] = useState(false);

  function oppdaterEttersending(ettersending: Dokumentasjonskrav) {
    setEttersendinger((current) =>
      current.map((krav) => (krav.id === ettersending.id ? ettersending : krav))
    );
  }

  async function validerOgLagreEttersendinger(): Promise<void> {
    setValideringStartet(true);

    if (!harMinstEnGyldigEttersending(ettersendinger)) {
      return;
    }

    await bundleFilerOgLagre();
  }

  async function bundleFilerOgLagre(): Promise<void> {
    setLagrer(true);
    setHarTekniskFeil(false);

    const ettersendingerTilBundling = hentGyldigeEttersendinger(ettersendinger);
    const ettersendingerFerdigBundlet: Dokumentasjonskrav[] = [];

    for (const ettersending of ettersendingerTilBundling) {
      const bundle = await bundleFiler(ettersending, søknadId);

      if (bundle) {
        const oppdatertDokumentasjonskrav: Dokumentasjonskrav = {
          ...ettersending,
          svar: dokumentkravEttersendt as GyldigDokumentkravSvar,
          bundle,
          begrunnelse: undefined,
        };

        ettersendingerFerdigBundlet.push(oppdatertDokumentasjonskrav);
      } else {
        setLagrer(false);
        setHarTekniskFeil(true);
        console.error("Bundling feilet for dokumentkrav:", ettersending.id);
      }
    }

    const oppdaterteDokumentasjonskrav = kombinerDokumentasjonskravMedEttersendinger(
      dokumentasjonskraver,
      ettersendingerFerdigBundlet
    );

    const ettersendingerTilLagring = grupperDokumentasjonskravPerSeksjon(
      ettersendingerFerdigBundlet,
      oppdaterteDokumentasjonskrav
    );

    for (const ettersending of ettersendingerTilLagring) {
      const { seksjonId, dokumentasjonskraver: dokumentasjonskrav } = ettersending;

      const lagringOk = await lagreEttersending(søknadId, seksjonId, dokumentasjonskrav);

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
        dokumentasjonskraver,
        setDokumentasjonskraver,
        oppdaterEttersending,
        lagrer,
        setLagrer,
        validerOgLagreEttersendinger,
        ettersendinger,
        setEttersendinger,
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

export { EttersendingerProvider, useEttersendinger };
