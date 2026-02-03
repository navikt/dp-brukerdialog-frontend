import { Bundle, Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import { EttersendingTilLagring } from "./ettersending.context";

export function hentGyldigeEttersendinger(
  ettersendinger: Dokumentasjonskrav[]
): Dokumentasjonskrav[] {
  return ettersendinger.filter(
    (ettersending) =>
      ettersending.filer &&
      ettersending.filer.length > 0 &&
      !ettersending.filer.some((fil) => fil.feil)
  );
}

export function harMinstEnGyldigEttersending(ettersendinger: Dokumentasjonskrav[]): boolean {
  return ettersendinger.some(
    (ettersending) =>
      ettersending.filer &&
      ettersending.filer.length > 0 &&
      !ettersending.filer.some((fil) => fil.feil)
  );
}

export function kombinerDokumentasjonskravMedEttersendinger(
  dokumentasjonskraver: Dokumentasjonskrav[],
  bundletEttersendinger: Dokumentasjonskrav[]
): Dokumentasjonskrav[] {
  return dokumentasjonskraver.map((dokumentkrav) => {
    const oppdatertDokumentasjonskrav = bundletEttersendinger.find(
      (ettersending) => ettersending.id === dokumentkrav.id
    );

    return oppdatertDokumentasjonskrav || dokumentkrav;
  });
}

export function grupperDokumentasjonskravPerSeksjon(
  ettersendingerFerdigBundlet: Dokumentasjonskrav[],
  oppdaterteDokumentasjonskrav: Dokumentasjonskrav[]
): EttersendingTilLagring[] {
  const ettersendingTilLagring: EttersendingTilLagring[] = [];
  const seksjonIds: string[] = [];

  for (const ettersending of ettersendingerFerdigBundlet) {
    if (!seksjonIds.includes(ettersending.seksjonId)) {
      seksjonIds.push(ettersending.seksjonId);

      ettersendingTilLagring.push({
        seksjonId: ettersending.seksjonId,
        dokumentasjonskraver: oppdaterteDokumentasjonskrav.filter(
          (dokumentasjonskrav) => dokumentasjonskrav.seksjonId === ettersending.seksjonId
        ),
      });
    }
  }

  return ettersendingTilLagring;
}

export async function bundleFiler(
  dokumentasjonskrav: Dokumentasjonskrav,
  soknadId: string
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

      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Feil ved bundling av filer:", error);

    return null;
  }
}

export async function lagreEttersending(
  søknadId: string,
  seksjonId: string,
  ettersendinger: Dokumentasjonskrav[]
): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("ettersendinger", JSON.stringify(ettersendinger));

    const response = await fetch(`/api/dokumentasjonskrav/${søknadId}/${seksjonId}/ettersending`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      console.error("Feil ved lagring av dokumentasjonskrav:", seksjonId);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Feil ved lagring av dokumentasjonskrav:", error);
    return false;
  }
}
