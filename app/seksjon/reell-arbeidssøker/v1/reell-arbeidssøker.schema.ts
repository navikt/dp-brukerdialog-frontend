import { z } from "zod";
import { valider } from "~/utils/validering.utils";
import {
  erDuVilligTilÅBytteYrkeEllerGåNedILønn,
  handling,
  kanDuJobbeBådeHeltidOgDeltid,
  kanDuJobbeIHeleNorge,
  kanDuTaAlleTyperArbeid,
  kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa,
  kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
  kanIkkeJobbeHeltidOgDeltidAnnenSituasjon,
  kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidHarFylt60,
  kanIkkeJobbeHeltidOgDeltidJegErPermitert,
  kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen,
  kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
  kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie,
  kanIkkeJobbeHeltidOgDeltidRedusertHelse,
  kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
  kanIkkeJobbeIHeleNorgeAnnenSituasjon,
  kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
  kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeIHeleNorgeHarFylt60,
  kanIkkeJobbeIHeleNorgeJegErPermitert,
  kanIkkeJobbeIHeleNorgeKortOmSituasjonen,
  kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr,
  kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie,
  kanIkkeJobbeIHeleNorgeRedusertHelse,
  kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
  pdfGrunnlag,
  reellArbeidssøkerKomponenter,
  ReellArbeidssøkerSvar,
} from "./reell-arbeidssøker.komponenter";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export const reellArbeidssøkerSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
    [kanDuJobbeBådeHeltidOgDeltid]: z.enum(["ja", "nei"]).optional(),
    [kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]: z
      .array(
        z.enum([
          kanIkkeJobbeHeltidOgDeltidRedusertHelse,
          kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
          kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie,
          kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
          kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
          kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
          kanIkkeJobbeHeltidOgDeltidJegErPermitert,
          kanIkkeJobbeHeltidOgDeltidHarFylt60,
          kanIkkeJobbeHeltidOgDeltidAnnenSituasjon,
        ])
      )
      .optional(),
    [kanIkkeJobbeBådeHeltidOgDeltidAntallTimer]: z.string().optional(),
    [kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen]: z.string().max(500).optional(),
    [kanDuJobbeIHeleNorge]: z.enum(["ja", "nei"]).optional(),
    [kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]: z
      .array(
        z.enum([
          kanIkkeJobbeIHeleNorgeRedusertHelse,
          kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr,
          kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie,
          kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
          kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
          kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
          kanIkkeJobbeIHeleNorgeJegErPermitert,
          kanIkkeJobbeIHeleNorgeHarFylt60,
          kanIkkeJobbeIHeleNorgeAnnenSituasjon,
        ])
      )
      .optional(),
    [kanIkkeJobbeIHeleNorgeKortOmSituasjonen]: z.string().max(500).optional(),
    [kanDuTaAlleTyperArbeid]: z.enum(["ja", "nei"]).optional(),
    [kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa]: z.string().optional(),
    [erDuVilligTilÅBytteYrkeEllerGåNedILønn]: z.enum(["ja", "nei"]).optional(),
    dokumentasjonskrav: z.string().optional(),
    versjon: z.number().optional(),
    [handling]: z.string().optional(),
  })
  .superRefine((data, context) => {
    if (
      data.handling === Seksjonshandling.tilbakenavigering ||
      data.handling === Seksjonshandling.fortsettSenere
    ) {
      return;
    }

    reellArbeidssøkerKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof ReellArbeidssøkerSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
