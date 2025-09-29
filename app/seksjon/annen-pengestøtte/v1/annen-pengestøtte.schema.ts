import { z } from "zod";
import {
  annenPengestøtteSpørsmål,
  AnnenPengestøtteSvar,
  erTilbakenavigering,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.spørsmål";
import {
  dagpengerEllerArbeidsledighetstrygd,
  foreldrepengerEllerSvangerskapspenger,
  fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed,
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalSpørsmål,
  PengestøtteFraAndreEøsLandModalSvar,
  pleiepengerOmsorgspengerEllerOpplæringspenger,
  sykepenger,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.spørsmål";
import {
  etterlønnFraArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  hvemUtbetalerPengestøtten,
  hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeModalSpørsmål,
  PengestøtteFraNorgeModalSvar,
  pengestøtteUnderArbeidsledighetEllerGarantiLottForFiskere,
  pensjonFraAndreEnnNav,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.spørsmål";
import { payload } from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";

const kortTekstMaksLengde = 200;

export const annenPengestøtteSchema = z
  .object({
    [payload]: z.string().optional(),
    [erTilbakenavigering]: z.boolean().optional(),
    [harMottattEllerSøktOmPengestøtteFraAndreEøsLand]: z.enum(["ja", "nei"]).optional(),
    [mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav]: z.enum(["ja", "nei"]).optional(),
    [fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver]: z
      .enum(["ja", "nei"])
      .optional(),
    [skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver]: z
      .string()
      .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
      .optional(),
    versjon: z.number().optional(),
  })
  .superRefine((data, ctx) => {
    if (data[erTilbakenavigering]) {
      return;
    }

    annenPengestøtteSpørsmål.forEach((spørsmål) => {
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

export const pengestøtteFraAndreEøsLandSchema = z
  .object({
    [hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]: z
      .enum([
        sykepenger,
        foreldrepengerEllerSvangerskapspenger,
        dagpengerEllerArbeidsledighetstrygd,
        pleiepengerOmsorgspengerEllerOpplæringspenger,
      ])
      .optional(),
    [fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]: z.string().optional(),
    [mottarDuFortsattPengestøttenFraAndreEøsLand]: z.string().optional(),
    [fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed]: z.string().optional(),
    [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed]: z
      .string()
      .optional(),
    [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed]: z
      .string()
      .optional(),
  })
  .superRefine((data, ctx) => {
    pengestøtteFraAndreEøsLandModalSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof PengestøtteFraAndreEøsLandModalSvar;
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

export const pengestøtteFraNorgeSchema = z
  .object({
    [hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm]: z
      .enum([
        pensjonFraAndreEnnNav,
        pengestøtteUnderArbeidsledighetEllerGarantiLottForFiskere,
        etterlønnFraArbeidsgiver,
      ])
      .optional(),
    [hvemUtbetalerPengestøtten]: z.string().optional(),
    [iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed]: z.string().optional(),
    [iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    pengestøtteFraNorgeModalSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof PengestøtteFraNorgeModalSvar;
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
