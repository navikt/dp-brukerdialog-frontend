import { Bundle, Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";

export function harMinstEnFilOgIngenFeil(ettersendingene: Dokumentasjonskrav[]): boolean {
  const harMinstEnFil = ettersendingene.some(
    (ettersending) => ettersending.filer && ettersending.filer.length > 0
  );

  const harEnFeil = ettersendingene.some((ettersending) =>
    ettersending.filer?.some((fil) => fil.feil)
  );

  return harMinstEnFil && !harEnFeil;
}

export function hentGyldigeEttersendingeneTilBundling(
  ettersendingene: Dokumentasjonskrav[]
): Dokumentasjonskrav[] {
  return ettersendingene.filter(
    (ettersending) =>
      ettersending.filer &&
      ettersending.filer.length > 0 &&
      !ettersending.filer.some((fil) => fil.feil)
  );
}

export function hentOppdaterteDokumentasjonskravene(
  dokumentasjonskravene: Dokumentasjonskrav[],
  ettersendingeneFerdigBundlet: Dokumentasjonskrav[]
): Dokumentasjonskrav[] {
  return dokumentasjonskravene.map((dokumentkrav) => {
    const oppdatertDokumentasjonskrav = ettersendingeneFerdigBundlet.find(
      (ettersending) => ettersending.id === dokumentkrav.id
    );

    return oppdatertDokumentasjonskrav || dokumentkrav;
  });
}

type OppdaterteSeksjon = {
  seksjonId: string;
  dokumentasjonskravene: Dokumentasjonskrav[];
};

export function hentOppdaterteDokumentasjonskravSeksjoner(
  ettersendingeneFerdigBundlet: Dokumentasjonskrav[],
  oppdaterteDokumentasjonskravene: Dokumentasjonskrav[]
): OppdaterteSeksjon[] {
  const ettersendingeneTilLagring: OppdaterteSeksjon[] = [];
  const seksjonIds: string[] = [];

  for (const ettersending of ettersendingeneFerdigBundlet) {
    if (!seksjonIds.includes(ettersending.seksjonId)) {
      seksjonIds.push(ettersending.seksjonId);

      ettersendingeneTilLagring.push({
        seksjonId: ettersending.seksjonId,
        dokumentasjonskravene: oppdaterteDokumentasjonskravene.filter(
          (dokumentasjonskrav) => dokumentasjonskrav.seksjonId === ettersending.seksjonId
        ),
      });
    }
  }

  return ettersendingeneTilLagring;
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
