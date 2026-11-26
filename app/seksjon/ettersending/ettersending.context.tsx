import React, { createContext, useContext, useRef, useState } from "react";
import {
  Dokumentasjonskrav,
  GyldigDokumentkravSvar,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { dokumentkravEttersendt } from "../dokumentasjon/v1/dokumentasjonskrav.komponenter";
import {
  bundleFiler,
  harMinstEnFilOgIngenFeil,
  hentOppdaterteDokumentasjonskravene,
  lagreEttersending,
} from "./ettersending.utils";

type EttersendingContextType = {
  dokumentasjonskravene: Dokumentasjonskrav[];
  ettersendingene: Dokumentasjonskrav[];
  oppdaterEttersending: (ettersending: Dokumentasjonskrav) => void;
  lagrer: boolean;
  lagrerKravId: string | null;
  validerOgLagre: (dokumentasjonskravId: string) => Promise<void>;
  tekniskeFeilKrav: string[];
  validerteKrav: string[];
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
  const [dokumentasjonskravene, setDokumentasjonskravene] = useState(dokumentasjonskraveneProps);
  const [ettersendingene, setEttersendingene] = useState(ettersendingeneProps);
  const [lagrerKravId, setLagrerKravId] = useState<string | null>(null);
  const [validerteKrav, setValiderteKrav] = useState<string[]>([]);
  const [tekniskeFeilKrav, setTekniskeFeilKrav] = useState<string[]>([]);
  const innsendingPågår = useRef(false);
  const lagrer = lagrerKravId !== null;

  function oppdaterEttersending(ettersending: Dokumentasjonskrav) {
    setEttersendingene((current) =>
      current.map((eksisterendeEttersending) =>
        eksisterendeEttersending.id === ettersending.id ? ettersending : eksisterendeEttersending
      )
    );
  }

  async function validerOgLagre(dokumentasjonskravId: string): Promise<void> {
    if (innsendingPågår.current) {
      return;
    }

    const ettersending = ettersendingene.find((krav) => krav.id === dokumentasjonskravId);
    if (!ettersending) {
      console.error("Fant ikke dokumentasjonskrav for ettersending:", dokumentasjonskravId);
      return;
    }

    setValiderteKrav((current) =>
      current.includes(dokumentasjonskravId) ? current : [...current, dokumentasjonskravId]
    );
    setTekniskeFeilKrav((current) => current.filter((id) => id !== dokumentasjonskravId));

    if (
      !harMinstEnFilOgIngenFeil([ettersending]) ||
      ettersending.filer?.some((fil) => fil.lasterOpp)
    ) {
      return;
    }

    await bundleOgLagre(ettersending);
  }

  async function bundleOgLagre(ettersending: Dokumentasjonskrav): Promise<void> {
    innsendingPågår.current = true;
    setLagrerKravId(ettersending.id);

    try {
      const bundle = await bundleFiler(ettersending, søknadId);

      if (!bundle) {
        setTekniskeFeilKrav((current) => [...current, ettersending.id]);
        return;
      }

      const oppdatertDokumentasjonskrav: Dokumentasjonskrav = {
        ...ettersending,
        svar: dokumentkravEttersendt as GyldigDokumentkravSvar,
        bundle,
        begrunnelse: undefined,
      };

      const oppdaterteDokumentasjonskravene = hentOppdaterteDokumentasjonskravene(
        dokumentasjonskravene,
        [oppdatertDokumentasjonskrav]
      );

      const lagringOk = await lagreEttersending(
        søknadId,
        ettersending.seksjonId,
        oppdaterteDokumentasjonskravene.filter((krav) => krav.seksjonId === ettersending.seksjonId)
      );

      if (!lagringOk) {
        setTekniskeFeilKrav((current) => [...current, ettersending.id]);
        return;
      }

      setDokumentasjonskravene(oppdaterteDokumentasjonskravene);
      setEttersendingene((current) => current.filter((krav) => krav.id !== ettersending.id));
    } finally {
      innsendingPågår.current = false;
      setLagrerKravId(null);
    }
  }

  return (
    <EttersendingContext.Provider
      value={{
        dokumentasjonskravene,
        oppdaterEttersending,
        lagrer,
        lagrerKravId,
        validerOgLagre,
        ettersendingene,
        tekniskeFeilKrav,
        validerteKrav,
      }}
    >
      {children}
    </EttersendingContext.Provider>
  );
}

export { EttersendingProvider, useEttersending };
