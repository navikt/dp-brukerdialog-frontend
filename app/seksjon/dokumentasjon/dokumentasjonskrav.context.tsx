import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Bundle,
  Dokumentasjonskrav,
  DokumentkravFil,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { dokumentkravSvarSendNå } from "./dokumentasjonskrav.komponenter";

const FORRIGE_STEG = "../tilleggsopplysninger";
const NESTE_STEG = "../oppsummering";

interface DokumentasjonskravTilLagring {
  seksjonId: string;
  dokumentasjonskrav: Dokumentasjonskrav[];
}

type DokumentasjonskravContextType = {
  dokumentasjonskrav: Dokumentasjonskrav[];
  lagrer: boolean;
  setLagrer: (lagrer: boolean) => void;
  setDokumentasjonskrav: (dokumentasjonskrav: Dokumentasjonskrav[]) => void;
  oppdaterEtDokumentasjonskrav: (oppdatertKrav: Dokumentasjonskrav) => void;
  harTekniskFeil: boolean;
  setHarTekniskFeil: (harTekniskFeil: boolean) => void;
  valideringsTeller: number;
  setValideringsTeller: React.Dispatch<React.SetStateAction<number>>;
  bundleOgLagreDokumentasjonskrav: (tilbakenavigering: Seksjonshandling) => Promise<void>;
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
  const navigate = useNavigate();
  const { soknadId } = useParams();
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [lagrer, setLagrer] = useState(false);
  const [harTekniskFeil, setHarTekniskFeil] = useState(false);
  const [valideringsTeller, setValideringsTeller] = useState(0);

  useEffect(() => {
    if (valideringsTeller > 0) {
      const klarTilBundlingOgLagring = verifiserDokumentasjonskrav();

      if (klarTilBundlingOgLagring) {
        bundleOgLagreDokumentasjonskrav(Seksjonshandling.neste);
      }
    }
  }, [valideringsTeller]);

  function oppdaterEtDokumentasjonskrav(oppdatertKrav: Dokumentasjonskrav) {
    setDokumentasjonskrav((current) =>
      current.map((etKrav) => (etKrav.id === oppdatertKrav.id ? oppdatertKrav : etKrav))
    );
  }

  function verifiserDokumentasjonskrav(): boolean {
    return dokumentasjonskrav.every((krav) => {
      if (!krav.svar || krav.feil) {
        return false;
      }

      if (krav.svar === dokumentkravSvarSendNå) {
        const alleFilerErOk = krav.filer?.every((fil) => !fil.feil) ?? false;
        return alleFilerErOk;
      }

      return true;
    });
  }

  async function bundleOgLagreDokumentasjonskrav(ønsketHandling: Seksjonshandling): Promise<void> {
    setLagrer(true);
    setHarTekniskFeil(false);

    const bundletDokumentasjonskrav: Dokumentasjonskrav[] = [];
    let bundlingFeilet = false;

    for (const etKrav of dokumentasjonskrav) {
      if (etKrav.svar !== dokumentkravSvarSendNå || ønsketHandling !== Seksjonshandling.neste) {
        continue;
      }

      if (!etKrav.filer || etKrav.filer.length === 0) {
        continue;
      }

      const bundle = await bundleFilerForDokumentasjonskrav(etKrav.id, etKrav.filer);

      if (bundle) {
        bundletDokumentasjonskrav.push({
          ...etKrav,
          bundle,
          filer: etKrav.filer,
        });
      } else {
        bundlingFeilet = true;
        console.error("Bundling feilet for dokumentkrav:", etKrav.id);
      }
    }

    if (bundlingFeilet) {
      setLagrer(false);
      return;
    }

    const alleDokumentasjonskrav = dokumentasjonskrav.map((etKrav) => {
      const oppdatertDokumentasjonskrav = bundletDokumentasjonskrav.find(
        (etBundletKrav) => etBundletKrav.id === etKrav.id
      );

      return oppdatertDokumentasjonskrav || etKrav;
    });

    const dokumentasjonskravTilLagring: DokumentasjonskravTilLagring[] = [];
    const seksjonIds: string[] = [];

    for (const etKrav of alleDokumentasjonskrav) {
      if (!seksjonIds.includes(etKrav.seksjonId)) {
        seksjonIds.push(etKrav.seksjonId);

        dokumentasjonskravTilLagring.push({
          seksjonId: etKrav.seksjonId,
          dokumentasjonskrav: alleDokumentasjonskrav.filter(
            (krav) => krav.seksjonId === etKrav.seksjonId
          ),
        });
      }
    }

    for (const etKrav of dokumentasjonskravTilLagring) {
      const { seksjonId, dokumentasjonskrav } = etKrav;
      const lagringsResultat = await lagreDokumentasjonskrav(seksjonId, dokumentasjonskrav);

      if (!lagringsResultat) {
        setLagrer(false);
        return;
      }
    }

    setLagrer(false);

    if (ønsketHandling === Seksjonshandling.fortsettSenere) return;
    if (ønsketHandling === Seksjonshandling.tilbakenavigering) {
      navigate(FORRIGE_STEG);
    } else {
      navigate(NESTE_STEG);
    }
  }

  async function bundleFilerForDokumentasjonskrav(
    dokumentasjonskravId: string,
    dokumentasjonskravFiler: DokumentkravFil[]
  ): Promise<Bundle | null> {
    try {
      const formData = new FormData();
      formData.append("filer", JSON.stringify(dokumentasjonskravFiler));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskravId}/bundle-filer`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Feil ved bundling av filer for dokumentasjonskrav:", dokumentasjonskravId);

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

  async function lagreDokumentasjonskrav(
    seksjonId: string,
    dokumentasjonskrav: Dokumentasjonskrav[]
  ): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append("dokumentasjonskrav", JSON.stringify(dokumentasjonskrav));

      const response = await fetch(`/api/dokumentasjonskrav/${soknadId}/${seksjonId}`, {
        method: "PUT",
        body: formData,
      });

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
    <DokumentasjonskravContext.Provider
      value={{
        dokumentasjonskrav,
        setDokumentasjonskrav,
        oppdaterEtDokumentasjonskrav,
        lagrer,
        setLagrer,
        harTekniskFeil,
        setHarTekniskFeil,
        valideringsTeller,
        setValideringsTeller,
        bundleOgLagreDokumentasjonskrav,
      }}
    >
      {children}
    </DokumentasjonskravContext.Provider>
  );
}

export { DokumentasjonskravProvider, useDokumentasjonskravContext };
