export const TILLATTE_FILTYPER = ["pdf", ".jpg", ".jpeg", ".png"];
export const MAX_ANTALL_FILER = 5;
export const MAX_FIL_STØRRELSE = 10485760; // 10 MB

export function hentMaksFilStørrelseMB() {
  // Runde opp til nærmeste maks 2 desimaler
  return Math.ceil((MAX_FIL_STØRRELSE / (1024 * 1024)) * 100) / 100;
}

export function hentTillatteFiltyperString() {
  return TILLATTE_FILTYPER.join(", ");
}

export function hentTillatteFiltyperTekst() {
  const typer = TILLATTE_FILTYPER.map((ext) => ext.replace(".", "").toUpperCase());
  if (typer.length > 1) {
    return `${typer.slice(0, -1).join(", ")} eller ${typer[typer.length - 1]}`;
  }
  return typer[0];
}
