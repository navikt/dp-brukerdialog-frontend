export const harMottattPengestøtteFraAndreEØSLand = "har-mottatt-pengestøtte-fra-andre-eøsland";
export const hvilkeUtenlandskeYtelserHarDuMottatt = "hvilke-utenlandske-ytelser-har-du-mottatt";
export const mottarEllerHarSøktOmPengestøtteFraAndreEnnNav =
  "mottar-eller-har-søkt-om-pengestøtte-fra-andre-enn-nav";
export const hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav =
  "hvilke-ytelser-mottar-du-eller-har-du-søkt-på-fra-andre-enn-nav";
export const hvemUtbetalerPensjonen = "hvem-utbetaler-pensjonen";
export const hvilkenPeriodeGjelderPensjonenForFraOgMed =
  "hvilken-periode-gjelder-pensjonen-for-fra-og-med";
export const hvilkenPeriodeGjelderPensjonenForTilOgMed =
  "hvilken-periode-gjelder-pensjonen-for-til-og-med";
export const hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed =
  "hvilken-periode-gjelder-utbetaling-fra-garantikassen-for-fiskere-for-fra-og-med";
export const hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed =
  "hvilken-periode-gjelder-utbetaling-fra-garantikassen-for-fiskere-for-til-og-med";
export const hvemUtbetalerEtterlønnen = "hvem-utbetaler-etterlønnen";
export const hvilkenPeriodeGjelderEtterlønnenForFraOgMed =
  "hvilken-periode-gjelder-etterlønnen-for-fra-og-med";
export const hvilkenPeriodeGjelderEtterlønnenForTilOgMed =
  "hvilken-periode-gjelder-etterlønnen-for-til-og-med";
export const hvilketEøsLandUtbetalerDagpengene = "hvilket-eøs-land-utbetaler-dagpengene";
export const hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed =
  "hvilken-periode-gjelder-dagpengene-fra-annet-eøs-land-for-fra-og-med";
export const hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed =
  "hvilken-periode-gjelder-dagpengene-fra-annet-eøs-land-for-til-og-med";
export const hvilkenAnnenPengestøtteMottas = "hvilken-annen-pengestøtte-mottas";
export const hvemUtbetalerPengestøtten = "hvem-utbetaler-pengestøtten";
export const hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed =
  "hvilken-periode-gjelder-annen-pengestøtte-fra-andre-enn-nav-for-fra-og-med";
export const hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed =
  "hvilken-periode-gjelder-annen-pengestøtte-fra-andre-enn-nav-for-til-og-med";
export const fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver =
  "får-eller-kommer-til-å-få-lønn-eller-andre-goder-fra-tidligere-arbeidsgiver";
export const skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver =
  "skriv-inn-hva-du-får-beholde-fra-tidligere-arbeidsgiver";

export type AnnenPengestøtteSpørsmål = {
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
