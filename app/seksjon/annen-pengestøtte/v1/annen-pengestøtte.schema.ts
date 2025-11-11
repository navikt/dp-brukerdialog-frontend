import { z } from "zod";
import {
  annenPengestøtteSpørsmål,
  AnnenPengestøtteSvar,
  erTilbakenavigering,
  seksjonsvar,
  pdfGrunnlag,
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
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
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
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { valider } from "~/utils/validering.utils";

const kortTekstMaksLengde = 200;

export const annenPengestøtteSchema = z
  .object({
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
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
  .superRefine((data, context) => {
    if (data[erTilbakenavigering]) {
      return;
    }

    annenPengestøtteSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof AnnenPengestøtteSvar];
      valider(spørsmål, svar, synlig, context);
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
  .superRefine((data, context) => {
    pengestøtteFraAndreEøsLandModalSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof PengestøtteFraAndreEøsLandModalSvar];
      valider(spørsmål, svar, synlig, context);
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
  .superRefine((data, context) => {
    pengestøtteFraNorgeModalSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const svar = data[spørsmål.id as keyof PengestøtteFraNorgeModalSvar];
      valider(spørsmål, svar, synlig, context);
    });
  });
