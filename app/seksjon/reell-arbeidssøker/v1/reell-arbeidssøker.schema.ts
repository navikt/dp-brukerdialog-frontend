import {
  erDuVilligTilÅBytteYrkeEllerGåNedILønn,
  kanDuJobbeBådeHeltidOgDeltid,
  kanDuJobbeIHeleNorge,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
  kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen,
  reellArbeidssøkerSpørsmål,
  ReellArbeidssøkerSvar,
  kanIkkeJobbeHeltidOgDeltidAnnenSituasjon,
  kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
  kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeHeltidOgDeltidHarFylt60,
  kanIkkeJobbeHeltidOgDeltidJegErPermitert,
  kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
  kanIkkeJobbeHeltidOgDeltidRedusertHelse,
  kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
  kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
  kanIkkeJobbeIHeleNorgeKortOmSituasjonen,
  kanIkkeJobbeIHeleNorgeRedusertHelse,
  kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr,
  kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
  kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeIHeleNorgeJegErPermitert,
  kanIkkeJobbeIHeleNorgeHarFylt60,
  kanIkkeJobbeIHeleNorgeAnnenSituasjon,
} from "./reell-arbeidssøker.spørsmål";
import { z } from "zod";

export const reellArbeidssøkerSchema = z
  .object({
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
  })
  .superRefine((data, ctx) => {
    // TODO: Generaliser denne på et vis så den kan brukes i alle `superRefine`. Gjelder alle `schema`-filene.
    reellArbeidssøkerSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof ReellArbeidssøkerSvar;
      const svar = data[spørsmålId];

      const erSpørsmål =
        spørsmål.type !== "lesMer" &&
        spørsmål.type !== "varselmelding" &&
        spørsmål.type !== "dokumentasjonskravindikator";

      if (synlig && !svar && erSpørsmål && !spørsmål.optional) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
