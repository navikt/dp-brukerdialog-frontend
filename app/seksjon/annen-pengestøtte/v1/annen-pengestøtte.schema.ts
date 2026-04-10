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
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato,
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalKomponenter,
  PengestøtteFraAndreEøsLandModalSvar,
  pleiepengerOmsorgspengerEllerOpplæringspenger,
  sykepenger,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
  hvemUtbetalerPengestøtten,
  hvilkenPengestøtteFraAndreEnnNavMottarDu,
  mottarDuPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeModalKomponenter,
  PengestøtteFraNorgeModalSvar,
  dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere,
  pensjonFraAndreEnnNav,
  iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato,
  iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { valider } from "~/utils/validering.utils";
import {
  hvaFårEllerBeholderDu,
  hvemMottarDuUtbetalingerEllerGoderFra,
  pengestøtteFraTidligereArbeidsgiverModalKomponenter,
  PengestøtteFraTidligereArbeidsgiverModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export const annenPengestøtteSchema = z
  .object({
    [seksjonsvar]: z.string().optional(),
    [pdfGrunnlag]: z.string().optional(),
    [handling]: z.string().optional(),
    [harMottattEllerSøktOmPengestøtteFraAndreEøsLand]: z.enum(["ja", "nei"]).optional(),
    [mottarDuPengestøtteFraAndreEnnNav]: z.enum(["ja", "nei"]).optional(),
    [mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver]: z
      .enum(["ja", "nei"])
      .optional(),
    versjon: z.number().optional(),
    dokumentasjonskrav: z.string().optional(),
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

export const pengestøtteFraTidligereArbeidsgiverSchema = z
  .object({
    [hvemMottarDuUtbetalingerEllerGoderFra]: z.string().optional(),
    [hvaFårEllerBeholderDu]: z.string().optional(),
  })
  .superRefine((data, context) => {
    pengestøtteFraTidligereArbeidsgiverModalKomponenter.forEach((komponent) => {
      const synlig = !komponent.visHvis || komponent.visHvis(data);
      const svar = data[komponent.id as keyof PengestøtteFraTidligereArbeidsgiverModalSvar];
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
    [fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato]: z.string().optional(),
    [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato]: z
      .string()
      .optional(),
    [iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato]: z
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
    [hvilkenPengestøtteFraAndreEnnNavMottarDu]: z
      .enum([pensjonFraAndreEnnNav, dagpengerUnderArbeidsledighetEllerGarantiLottForFiskere])
      .optional(),
    [hvemUtbetalerPengestøtten]: z.string().optional(),
    [iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato]: z.string().optional(),
    [iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato]: z.string().optional(),
  })
  .superRefine((data, context) => {
    pengestøtteFraNorgeModalKomponenter.forEach((komponent) => {
      const synlig = !komponent.visHvis || komponent.visHvis(data);
      const svar = data[komponent.id as keyof PengestøtteFraNorgeModalSvar];
      valider(komponent, svar, synlig, context);
    });
  });
