import React, { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Bundle, Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
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
  oppdaterEtDokumentasjonskrav: (oppdatertKrav: Dokumentasjonskrav) => void;
  kravIdMedFilopplastingFeil: string[];
  setKravIdMedFilopplastingFeil: (dokumentkravId: string[]) => void;
  kravIdManglerFiler: string[];
  setKravIdManglerFiler: (dokumentkravId: string[]) => void;
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
  const [kravIdMedFilopplastingFeil, setKravIdMedFilopplastingFeil] = useState<string[]>([]);
  const [kravIdManglerFiler, setKravIdManglerFiler] = useState<string[]>([]);

  function oppdaterEtDokumentasjonskrav(oppdatertKrav: Dokumentasjonskrav) {
    setDokumentasjonskrav((current) =>
      current.map((etKrav) => (etKrav.id === oppdatertKrav.id ? oppdatertKrav : etKrav))
    );
  }

  async function validerDokumentasjonskrav(): Promise<void> {
    const sendNåKravIdListeUtenFil = dokumentasjonskrav
      .filter(
        (krav) => krav.svar === dokumentkravSvarSendNå && (!krav.filer || krav.filer.length === 0)
      )
      .map((krav) => krav.id);

    setKravIdManglerFiler(sendNåKravIdListeUtenFil);

    const dokumentkravMedEnFeil = dokumentasjonskrav
      .filter((krav) => krav.filer?.some((fil) => fil.feil))
      .map((krav) => krav.id);

    setKravIdMedFilopplastingFeil(dokumentkravMedEnFeil);

    if (sendNåKravIdListeUtenFil.length > 0 || dokumentkravMedEnFeil.length > 0) {
      return;
    }

    await bundleOgLagreDokumentasjonskrav();
  }

  async function bundleOgLagreDokumentasjonskrav(): Promise<void> {
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
        oppdaterEtDokumentasjonskrav,
        kravIdMedFilopplastingFeil,
        setKravIdMedFilopplastingFeil,
        kravIdManglerFiler,
        setKravIdManglerFiler,
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
