import {
  erDuVilligTilÅBytteYrkeEllerGåNedILønn,
  hvilkeTyperJobberKanDuTa,
  kanDuJobbeBådeHeltidOgDeltid,
  kanDuJobbeIHeleNorge,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
  kanIkkeJobbeBådeHeltidOgDeltidSkrivKortOmSituasjonen,
  kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse,
  ReellArbeidssøkerSpørsmål,
  situasjonsbeskrivelseAnnenSituasjon,
  situasjonsbeskrivelseDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
  situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  situasjonsbeskrivelseHarFylt60,
  situasjonsbeskrivelseJegErPermitert,
  situasjonsbeskrivelseOmsorgForBarnUnderEttÅr,
  situasjonsbeskrivelseRedusertHelse,
} from "./reell-arbeidssøker.spørsmål";
import { z } from "zod";
import { reellArbeidssøkerSpørsmål } from "~/seksjon-regelsett/reell-arbeidssøker/reell-arbeidssøker";

export const reellArbeidssøkerSchema = z
  .object({
    [kanDuTaAlleTyperArbeid]: z.enum(["ja", "nei"]).optional(),
    [hvilkeTyperJobberKanDuTa]: z.string().max(500).optional(),
    [erDuVilligTilÅBytteYrkeEllerGåNedILønn]: z.enum(["ja", "nei"]).optional(),
    [kanDuJobbeBådeHeltidOgDeltid]: z.enum(["ja", "nei"]).optional(),
    [kanIkkeJobbeBådeHeltidOgDeltidAntallTimer]: z.string().optional(),
    [kanDuJobbeIHeleNorge]: z.enum(["ja", "nei"]).optional(),
    [kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse]: z.array(
      z
        .enum([
          situasjonsbeskrivelseRedusertHelse,
          situasjonsbeskrivelseOmsorgForBarnUnderEttÅr,
          situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
          situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
          situasjonsbeskrivelseDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
          situasjonsbeskrivelseJegErPermitert,
          situasjonsbeskrivelseHarFylt60,
          situasjonsbeskrivelseAnnenSituasjon,
        ])
    ).optional(),
    [kanIkkeJobbeBådeHeltidOgDeltidSkrivKortOmSituasjonen]: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    reellArbeidssøkerSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof ReellArbeidssøkerSpørsmål;
      const svar = data[spørsmålId];

      if (synlig && (!svar || svar?.length === 0)) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });
