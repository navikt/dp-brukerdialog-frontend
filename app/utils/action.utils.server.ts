// Dette er funksjon som samler opp flervalg-svar fra formdata som kommer inn fra action-funksjoner i react-router
// F.eks. spørsmål med checkbokser som kan ha flere svar
// Input: { 'flervalg[0]': 'svar1', 'flervalg[1]': 'svar2', 'annetSpørsmål': 'svar3' }
// Output: { flervalg: ['svar1', 'svar2'], annetSpørsmål: 'svar3' }

export function normaliserFormData(data: Record<string, unknown>) {
  const formDataEntries = Object.entries(data);
  const seksjonSvar: Record<string, unknown> = {};

  formDataEntries.forEach(([navn, verdi]) => {
    const flervalgMatch = navn.match(/^(.*)\[(\d+)\]$/);
    if (flervalgMatch) {
      // Henter ut navnet på flervalg-spørsmålet uten indeks, f.eks. "flervalg" fra "flervalg[0]"
      // flervalgMatch[0] er hele strengen som matchet (f.eks. "flervalg[0]")
      // flervalgMatch[1] er første gruppe i regexen, altså teksten før [0] (f.eks. "flervalg")
      // flervalgMatch[2] er andre gruppe, altså tallet inni klammeparentesene (f.eks. "0")
      const flervalgNavn = flervalgMatch[1];

      // Initialiserer arrayet hvis det ikke finnes fra før
      if (!Array.isArray(seksjonSvar[flervalgNavn])) {
        seksjonSvar[flervalgNavn] = [];
      }

      // Legger til verdien i arrayet
      const svarArray = seksjonSvar[flervalgNavn] as unknown[];
      svarArray.push(verdi);
    } else {
      // Vanlig spørsmål, lagrer direkte
      seksjonSvar[navn] = verdi;
    }
  });

  return seksjonSvar;
}
