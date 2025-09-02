import { z } from "zod";
import {
  AnnenPengestøtteSvar,
  annenYtelse,
  dagpengerEllerArbeidsledighetstrygd,
  dagpengerFraAnnetEøsLand,
  etterlønnFraArbeidsgiver,
  foreldrepengerEllerSvangerskapspenger,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  garantiLottForFiskere,
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
  pensjonFraAndreEnnNav,
  pleiepengerOmsorgspengerEllerOpplæringspenger,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
  sykepenger,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";
import { annenPengestøtteAlleSpørsmål } from "~/routes/$soknadId.annen-pengestotte";

const kortTekstMaksLengde = 200;

export const annenPengestøtteSchema = z
  .object({
    [harMottattPengestøtteFraAndreEØSLand]: z.enum(["ja", "nei"]).optional(),
    [hvilkeUtenlandskeYtelserHarDuMottatt]: z
      .array(
        z.enum([
          sykepenger,
          foreldrepengerEllerSvangerskapspenger,
          dagpengerEllerArbeidsledighetstrygd,
          pleiepengerOmsorgspengerEllerOpplæringspenger,
        ])
      )
      .optional(),
    [mottarEllerHarSøktOmPengestøtteFraAndreEnnNav]: z.enum(["ja", "nei"]).optional(),
    [hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]: z
      .array(
        z.enum([
          pensjonFraAndreEnnNav,
          garantiLottForFiskere,
          etterlønnFraArbeidsgiver,
          dagpengerFraAnnetEøsLand,
          annenYtelse,
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
      const spørsmålId = spørsmål.id as keyof AnnenPengestøtteSvar;
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
