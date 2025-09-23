export const TILATT_FIL_TYPER = ".png, .jpg, .jpeg, .pdf";
export const MAX_ANTALL_FILER = 5;
export const MAX_FIL_STØRRELSE = 52428800; // 50MB

export function hentMaksFilStørrelseMB() {
  // Runde opp til nærmeste maks 2 desimaler
  return Math.ceil((MAX_FIL_STØRRELSE / (1024 * 1024)) * 100) / 100;
}
