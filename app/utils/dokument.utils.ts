export const TILLATTE_FILFORMAT = [".pdf", ".jpg", ".jpeg", ".png"];
export const MAX_ANTALL_FILER = 5;
export const MAX_FIL_STØRRELSE = 10485760; // 10 MB

export function hentMaksFilStørrelseMB() {
  // Runde opp til nærmeste maks 2 desimaler
  return Math.ceil((MAX_FIL_STØRRELSE / (1024 * 1024)) * 100) / 100;
}

export function hentTillatteFiltyperString() {
  return TILLATTE_FILFORMAT.join(",");
}

export function hentTillatteFiltyperTekst() {
  const typer = TILLATTE_FILFORMAT.map((ext) => ext.replace(".", "").toUpperCase());
  if (typer.length > 1) {
    return `${typer.slice(0, -1).join(", ")} eller ${typer[typer.length - 1]}`;
  }
  return typer[0];
}

export async function lastnedDokument(filsti?: string, tittel?: string) {
  if (!filsti) {
    console.log("Mangler filsti tilgjengelig for nedlasting");
    return;
  }

  if (!tittel) {
    console.log("Mangler tittel for nedlasting");
    return;
  }

  const url = "/api/dokumentasjonskrav/lastned";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filsti }),
  });

  if (!response.ok) {
    throw new Response("Klarte ikke laste ned dokument", {
      status: response.status,
      statusText: response.statusText,
    });
  }

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = `${tittel}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(blobUrl);
}
