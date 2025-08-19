export const kanDuJobbeBådeHeltidOgDeltid = "kan-du-jobbe-både-heltid-og-deltid";
export const situasjonsbeskrivelseRedusertHelse =
  "situasjonsbeskrivelse-redusert-helse";
export const situasjonsbeskrivelseOmsorgForBarnUnderEttÅr =
  "situasjonsbeskrivelse-omsorg-for-barn-under-ett-år";
export const situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse =
  "situasjonsbeskrivelse-eneansvar-eller-delt-ansvar-for-barn-til-og-med-7-klasse";
export const situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov =
  "situasjonsbeskrivelse-eneansvar-eller-delt-ansvar-for-barn-under-18-år-med-spesielle-behov";
export const situasjonsbeskrivelseDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov =
  "situasjonsbeskrivelse-den-andre-foreldren-jobber-skift-eller-lignende-og-ansvar-for-barn-til-og-med-7-klasse-eller-med-spesielle-behov";
export const situasjonsbeskrivelseJegErPermitert =
  "situasjonsbeskrivelse-jeg-er-permitert";
export const situasjonsbeskrivelseJegErPermitertVarselmelding =
  "situasjonsbeskrivelse-jeg-er-permitert-varselmelding";
export const situasjonsbeskrivelseHarFylt60 = "situasjonsbeskrivelse-har-fylt-60";
export const situasjonsbeskrivelseAnnenSituasjon =
  "situasjonsbeskrivelse-annen-situasjon";
export const kanIkkeJobbeBådeHeltidOgDeltidAntallTimer =
  "kan-ikke-jobbe-både-heltid-og-deltid-redusert-helse-antall-timer";
export const kanIkkeJobbeBådeHeltidOgDeltidSkrivKortOmSituasjonen =
  "kan-ikke-jobbe-både-heltid-og-deltid-skriv-kort-om-situasjonen";
export const kanDuJobbeIHeleNorge = "kan-du-jobbe-i-hele-norge";
export const kanDuTaAlleTyperArbeid = "kan-du-ta-alle-typer-arbeid";
export const hvilkeTyperJobberKanDuTa = "hvilke-typer-jobber-kan-du-ta"
export const hvilkeTyperJobberKanDuTaVarselmelding = "hvilke-typer-jobber-kan-du-ta-varselmelding";
export const erDuVilligTilÅBytteYrkeEllerGåNedILønn = "er-du-villig-til-å-bytte-yrke-eller-gå-ned-i-lønn";
export const erDuVilligTilÅBytteYrkeEllerGåNedILønnVarselmelding = "er-du-villig-til-å-bytte-yrke-eller-gå-ned-i-lønn-varselmelding";
export const kanIkkeJobbeHeltidOgDeltidMenKanJobbeIHeleNorgeVarselmelding = "kan-ikke-jobbe-heltid-og-deltid-men-kan-jobbe-i-hele-norge-varselmelding"
export const kanIkkeJobbeHeltidOgDeltidOgKanIkkeJobbeIHeleNorgeVarselmelding = "kan-ikke-jobbe-heltid-og-deltid-og-kan-ikke-jobbe-i-hele-norge-varselmelding";
export const kanJobbeHeltidOgDeltidMenKanIkkeJobbeIHeleNorgeVarselmelding = "kan-jobbe-heltid-og-deltid-men-kan-ikke-jobbe-i-hele-norge-varselmelding";
export const kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse =
  "kan-ikke-jobbe-heltid-og-deltid-og-ellerkan-ikke-jobbe-i-hele-norge-situasjonsbeskrivelse";

export type ReellArbeidssøkerSpørsmål = {
  [kanDuJobbeBådeHeltidOgDeltid]?: "ja" | "nei";
  [kanDuJobbeIHeleNorge]?: "ja" | "nei";
  [kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse]?: Array<
    | typeof situasjonsbeskrivelseRedusertHelse
    | typeof situasjonsbeskrivelseOmsorgForBarnUnderEttÅr
    | typeof situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse
    | typeof situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
    | typeof situasjonsbeskrivelseDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
    | typeof situasjonsbeskrivelseJegErPermitert
    | typeof situasjonsbeskrivelseHarFylt60
    | typeof situasjonsbeskrivelseAnnenSituasjon>
  [kanIkkeJobbeBådeHeltidOgDeltidSkrivKortOmSituasjonen]?: string;
  [kanDuTaAlleTyperArbeid]?: "ja" | "nei";
  [hvilkeTyperJobberKanDuTa]?: string;
  [erDuVilligTilÅBytteYrkeEllerGåNedILønn]?: "ja" | "nei";
};
