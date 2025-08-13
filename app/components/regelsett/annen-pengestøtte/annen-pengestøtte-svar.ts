export const harMottattPengestøtteFraAndreEØSLand = "harMottattPengestøtteFraAndreEØSLand";
export const hvilkeUtenlandskeYtelserHarDuMottatt = "hvilkeUtenlandskeYtelserHarDuMottatt";
export const mottarEllerHarSøktOmPengestøtteFraAndreEnnNav =
  "mottarEllerHarSøktOmPengestøtteFraAndreEnnNav";
export const hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav =
  "hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav";
export const hvemUtbetalerPensjonen = "hvemUtbetalerPensjonen";
export const hvilkenPeriodeGjelderPensjonenForFraOgMed =
  "hvilkenPeriodeGjelderPensjonenForFraOgMed";
export const hvilkenPeriodeGjelderPensjonenForTilOgMed =
  "hvilkenPeriodeGjelderPensjonenForTilOgMed";
export const hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed =
  "hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed";
export const hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed =
  "hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed";
export const hvemUtbetalerEtterlønnen = "hvemUtbetalerEtterlønnen";
export const hvilkenPeriodeGjelderEtterlønnenForFraOgMed =
  "hvilkenPeriodeGjelderEtterlønnenForFraOgMed";
export const hvilkenPeriodeGjelderEtterlønnenForTilOgMed =
  "hvilkenPeriodeGjelderEtterlønnenForTilOgMed";
export const hvilketEøsLandUtbetalerDagpengene = "hvilketEøsLandUtbetalerDagpengene";
export const hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed =
  "hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed";
export const hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed =
  "hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed";
export const hvilkenAnnenPengestøtteMottas = "hvilkenAnnenPengestøtteMottas";
export const hvemUtbetalerPengestøtten = "hvemUtbetalerPengestøtten";
export const hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed =
  "hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed";
export const hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed =
  "hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed";
export const fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver =
  "fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver";
export const skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver =
  "skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver";

export type AnnenPengestøtteSvar = {
  [harMottattPengestøtteFraAndreEØSLand]?: "ja" | "nei";
  [hvilkeUtenlandskeYtelserHarDuMottatt]?:
    | "sykepenger"
    | "foreldrepengerEllerSvangerskapspenger"
    | "dagpengerEllerArbeidsledighetstrygd"
    | "pleiepengerOmsorgspengerEllerOpplæringspenger";
  [mottarEllerHarSøktOmPengestøtteFraAndreEnnNav]?: "ja" | "nei";
  [hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]?:
    | "pensjonFraAndreEnnNav"
    | "etterlønnFraArbeidsgiver"
    | "garantiLottForFiskere"
    | "dagpengerFraAnnetEøsLand"
    | "annenYtelse";
  [hvemUtbetalerPensjonen]?: string;
  [hvilkenPeriodeGjelderPensjonenForFraOgMed]?: string;
  [hvilkenPeriodeGjelderPensjonenForTilOgMed]?: string;
  [hvemUtbetalerEtterlønnen]?: string;
  [hvilkenPeriodeGjelderEtterlønnenForFraOgMed]?: string;
  [hvilkenPeriodeGjelderEtterlønnenForTilOgMed]?: string;
  [hvilketEøsLandUtbetalerDagpengene]?: string;
  [hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed]?: string;
  [hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed]?: string;
  [hvilkenAnnenPengestøtteMottas]?: string;
  [hvemUtbetalerPengestøtten]?: string;
  [hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed]?: string;
  [hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed]?: string;
  [fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver]?: "ja" | "nei";
  [skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver]?: string;
};