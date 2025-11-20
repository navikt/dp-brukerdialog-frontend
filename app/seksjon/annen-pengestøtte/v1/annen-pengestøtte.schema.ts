import { z } from "zod";
import {
  annenPengestøtteKomponenter,
  AnnenPengestøtteSvar,
  handling,
  pdfGrunnlag,
  seksjonsvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
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
  pengestøtteFraAndreEøsLandModalKomponenter,
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
  pengestøtteFraNorgeModalKomponenter,
  PengestøtteFraNorgeModalSvar,
  pengestøtteUnderArbeidsledighetEllerGarantiLottForFiskere,
  pensjonFraAndreEnnNav,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { valider } from "~/utils/validering.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

const kortTekstMaksLengde = 200;

export const annenPengestøtteSchema = z
  .object({
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [handling]: z.string().optional(),
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
    if (
      data.handling === Seksjonshandling.tilbakenavigering ||
      data.handling === Seksjonshandling.fortsettSenere
    ) {
      return;
    }

    annenPengestøtteKomponenter.forEach((komponent) => {
      const synlig = !komponent.visHvis || komponent.visHvis(data);
      const svar = data[komponent.id as keyof AnnenPengestøtteSvar];
      valider(komponent, svar, synlig, context);
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
    pengestøtteFraAndreEøsLandModalKomponenter.forEach((komponent) => {
      const synlig = !komponent.visHvis || komponent.visHvis(data);
      const svar = data[komponent.id as keyof PengestøtteFraAndreEøsLandModalSvar];
      valider(komponent, svar, synlig, context);
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
    pengestøtteFraNorgeModalKomponenter.forEach((komponent) => {
      const synlig = !komponent.visHvis || komponent.visHvis(data);
      const svar = data[komponent.id as keyof PengestøtteFraNorgeModalSvar];
      valider(komponent, svar, synlig, context);
    });
  });
