import {
  erDuVilligTilÅBytteYrkeEllerGåNedILønn,
  erTilbakenavigering,
  kanDuJobbeBådeHeltidOgDeltid,
  kanDuJobbeIHeleNorge,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
  kanIkkeJobbeHeltidOgDeltidAnnenSituasjon,
  kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidHarFylt60,
  kanIkkeJobbeHeltidOgDeltidJegErPermitert,
  kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen,
  kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
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
  kanIkkeJobbeIHeleNorgeRedusertHelse,
  kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
  pdfGrunnlag,
  reellArbeidssøkerKomponenter,
  ReellArbeidssøkerSvar,
} from "./reell-arbeidssøker.komponenter";
import { z } from "zod";
import { valider } from "~/utils/validering.utils";

export const reellArbeidssøkerSchema = z
  .object({
    [pdfGrunnlag]: z.string().optional(),
    [kanDuJobbeBådeHeltidOgDeltid]: z.enum(["ja", "nei"]).optional(),
    [kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]: z
      .array(
        z.enum([
          kanIkkeJobbeHeltidOgDeltidRedusertHelse,
          kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
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
    [erDuVilligTilÅBytteYrkeEllerGåNedILønn]: z.enum(["ja", "nei"]).optional(),
    versjon: z.number().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
  })
  .superRefine((data, context) => {
    if (data.erTilbakenavigering) {
      return;
    }

    reellArbeidssøkerKomponenter.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof ReellArbeidssøkerSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
