import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Bundle,
  Dokumentasjonskrav,
  GyldigDokumentkravSvar,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { dokumentkravSvarSendNå } from "./dokumentasjonskrav.komponenter";

interface DokumentasjonskravTilLagring {
  seksjonId: string;
  dokumentasjonskrav: Dokumentasjonskrav[];
}

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
  harTekniskFeil: boolean;
  setHarTekniskFeil: (harTekniskFeil: boolean) => void;
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
  const { soknadId } = useParams();
  const navigate = useNavigate();
  const [dokumentasjonskrav, setDokumentasjonskrav] = useState(dokumentasjonskravProps);
  const [lagrer, setLagrer] = useState(false);
  const [harTekniskFeil, setHarTekniskFeil] = useState(false);
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
    const dokumentasjonskravUtenFil = dokumentasjonskrav
      .filter(
        (dokumentasjonskrav) =>
          dokumentasjonskrav.svar === dokumentkravSvarSendNå &&
          (!dokumentasjonskrav.filer || dokumentasjonskrav.filer.length === 0)
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

    await bundleOgLagreEttersendinger();
  }

  async function bundleOgLagreEttersendinger(): Promise<void> {
    setLagrer(true);
    setHarTekniskFeil(false);

    const bundletDokumentasjonskrav: Dokumentasjonskrav[] = [];
    let bundlingFeilet = false;

    for (const etKrav of dokumentasjonskrav) {
      if (etKrav.svar !== dokumentkravSvarSendNå) {
        continue;
      }

      const bundle = await bundleFilerForDokumentasjonskrav(etKrav);

      if (bundle) {
        const oppdatertDokumentasjonskrav: Dokumentasjonskrav = {
          ...etKrav,
          bundle,
        };

        bundletDokumentasjonskrav.push(oppdatertDokumentasjonskrav);
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
    navigate(`../kvittering`);
  }

  async function bundleFilerForDokumentasjonskrav(
    dokumentasjonskrav: Dokumentasjonskrav
  ): Promise<Bundle | null> {
    try {
      const formData = new FormData();
      formData.append("filer", JSON.stringify(dokumentasjonskrav.filer));

      const response = await fetch(
        `/api/dokumentasjonskrav/${soknadId}/${dokumentasjonskrav.id}/bundle-filer`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Feil ved bundling av filer for dokumentasjonskrav:", dokumentasjonskrav.id);

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
        oppdaterDokumentasjonskrav,
        dokumentasjonskravHarEnValideringsfeil,
        setDokumentasjonskravHarEnValideringsfeil,
        dokumentasjonskravManglerFiler,
        setDokumentasjonskravManglerFiler,
        validerDokumentasjonskrav,
        lagrer,
        setLagrer,
        harTekniskFeil,
        setHarTekniskFeil,
      }}
    >
      {children}
    </DokumentasjonskravContext.Provider>
  );
}

export { DokumentasjonskravProvider, useDokumentasjonskravContext };
