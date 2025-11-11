import {
  erDuVilligTilÅBytteYrkeEllerGåNedILønn,
  kanDuJobbeBådeHeltidOgDeltid,
  kanDuJobbeIHeleNorge,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
  kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
  kanIkkeJobbeHeltidOgDeltidRedusertHelse,
  kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
  kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr,
  kanIkkeJobbeIHeleNorgeRedusertHelse,
  kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
  ReellArbeidssøkerSvar,
} from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.komponenter";

export const mockReellArbeidssøker: ReellArbeidssøkerSvar = {
  [kanDuJobbeBådeHeltidOgDeltid]: "nei",
  [kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]: [
    kanIkkeJobbeHeltidOgDeltidRedusertHelse,
    kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
  ],
  [kanIkkeJobbeBådeHeltidOgDeltidAntallTimer]: "20",
  [kanDuJobbeIHeleNorge]: "nei",
  [kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]: [
    kanIkkeJobbeIHeleNorgeRedusertHelse,
    kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr,
  ],
  [kanDuTaAlleTyperArbeid]: "ja",
  [erDuVilligTilÅBytteYrkeEllerGåNedILønn]: "ja",
};
