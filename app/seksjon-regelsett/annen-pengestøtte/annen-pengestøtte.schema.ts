import { z } from "zod";
import {
  AnnenPengestøtteSpørsmål,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  harMottattPengestøtteFraAndreEØSLand,
  hvemUtbetalerEtterlønnen,
  hvemUtbetalerPengestøtten,
  hvemUtbetalerPensjonen,
  hvilkenAnnenPengestøtteMottas,
  hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed,
  hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed,
  hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed,
  hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed,
  hvilkenPeriodeGjelderEtterlønnenForFraOgMed,
  hvilkenPeriodeGjelderEtterlønnenForTilOgMed,
  hvilkenPeriodeGjelderPensjonenForFraOgMed,
  hvilkenPeriodeGjelderPensjonenForTilOgMed,
  hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed,
  hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed,
  hvilketEøsLandUtbetalerDagpengene,
  hvilkeUtenlandskeYtelserHarDuMottatt,
  hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav,
  mottarEllerHarSøktOmPengestøtteFraAndreEnnNav,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon-regelsett/annen-pengestøtte/annen-pengestøtte.spørsmål";
import { annenPengestøtteAlleSpørsmål } from "~/routes/$soknadId.annen-pengestotte";

const kortTekstMaksLengde = 200;

export const annenPengestøtteSchema = z
  .object({
    [harMottattPengestøtteFraAndreEØSLand]: z.enum(["ja", "nei"]).optional(),
    [hvilkeUtenlandskeYtelserHarDuMottatt]: z
      .array(
        z.enum([
          "sykepenger",
          "foreldrepengerEllerSvangerskapspenger",
          "dagpengerEllerArbeidsledighetstrygd",
          "pleiepengerOmsorgspengerEllerOpplæringspenger",
        ])
      )
      .optional(),
    [mottarEllerHarSøktOmPengestøtteFraAndreEnnNav]: z.enum(["ja", "nei"]).optional(),
    [hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]: z
      .array(
        z.enum([
          "pensjonFraAndreEnnNav",
          "etterlønnFraArbeidsgiver",
          "garantiLottForFiskere",
          "dagpengerFraAnnetEøsLand",
          "annenYtelse",
        ])
      )
      .optional(),
    [hvemUtbetalerPensjonen]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
    [hvilkenPeriodeGjelderPensjonenForFraOgMed]: z.string().optional(),
    [hvilkenPeriodeGjelderPensjonenForTilOgMed]: z.string().optional(),
    [hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed]: z.string().optional(),
    [hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed]: z.string().optional(),
    [hvemUtbetalerEtterlønnen]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
    [hvilkenPeriodeGjelderEtterlønnenForFraOgMed]: z.string().optional(),
    [hvilkenPeriodeGjelderEtterlønnenForTilOgMed]: z.string().optional(),
    [hvilketEøsLandUtbetalerDagpengene]: z.string().optional(),
    [hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed]: z.string().optional(),
    [hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed]: z.string().optional(),
    [hvilkenAnnenPengestøtteMottas]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
    [hvemUtbetalerPengestøtten]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
    [hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed]: z.string().optional(),
    [hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed]: z.string().optional(),
    [fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver]: z
      .enum(["ja", "nei"])
      .optional(),
    [skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
  })
  .superRefine((data, ctx) => {
    annenPengestøtteAlleSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof AnnenPengestøtteSpørsmål;
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