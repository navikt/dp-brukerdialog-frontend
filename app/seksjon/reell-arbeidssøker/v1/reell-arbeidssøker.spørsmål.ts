import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const kanDuJobbeBådeHeltidOgDeltid = "kan-du-jobbe-både-heltid-og-deltid";
export const kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg =
  "kan-ikke-jobbe-heltid-og-deltid-situasjonen-som-gjelder-deg";
export const kanIkkeJobbeHeltidOgDeltidRedusertHelse =
  "kan-ikke-jobbe-heltid-og-deltid-redusert-helse";
export const kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr =
  "kan-ikke-jobbe-heltid-og-deltid-omsorg-for-barn-under-ett-år";
export const kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse =
  "kan-ikke-jobbe-heltid-og-deltid-eneansvar-eller-delt-ansvar-for-barn-til-og-med-7-klasse";
export const kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov =
  "kan-ikke-jobbe-heltid-og-deltid-eneansvar-eller-delt-ansvar-for-barn-under-18-år-med-spesielle-behov";
export const kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov =
  "kan-ikke-jobbe-heltid-og-deltid-den-andre-foreldren-jobber-skift-eller-lignende-og-ansvar-for-barn-til-og-med-7-klasse-eller-med-spesielle-behov";
export const kanIkkeJobbeHeltidOgDeltidJegErPermitert =
  "kan-ikke-jobbe-heltid-og-deltid-jeg-er-permitert";
export const kanIkkeJobbeHeltidOgDeltidHarFylt60 = "kan-ikke-jobbe-heltid-og-deltid-har-fylt-60";
export const kanIkkeJobbeHeltidOgDeltidAnnenSituasjon =
  "kan-ikke-jobbe-heltid-og-deltid-annen-situasjon";
export const kanIkkeJobbeBådeHeltidOgDeltidAntallTimer =
  "kan-ikke-jobbe-både-heltid-og-deltid-antall-timer";
export const kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen =
  "kan-ikke-jobbe-heltid-og-deltid-kort-om-sitasjonen";
export const kanDuJobbeIHeleNorge = "kan-du-jobbe-i-hele-norge";
export const kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg =
  "kan-ikke-jobbe-i-hele-norge-situasjonen-som-gjelder-deg";
export const kanIkkeJobbeIHeleNorgeRedusertHelse = "kan-ikke-jobbe-i-hele-norge-redusert-helse";
export const kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr =
  "kan-ikke-jobbe-i-hele-norge-omsorg-for-barn-under-ett-år";
export const kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse =
  "kan-ikke-jobbe-i-hele-norge-eneansvar-eller-delt-ansvar-for-barn-til-og-med-7-klasse";
export const kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov =
  "kan-ikke-jobbe-i-hele-norge-eneansvar-eller-delt-ansvar-for-barn-under-18-år-med-spesielle-behov";
export const kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov =
  "kan-ikke-jobbe-i-hele-norge-den-andre-foreldren-jobber-skift-eller-lignende-og-ansvar-for-barn-til-og-med-7-klasse-eller-med-spesielle-behov";
export const kanIkkeJobbeIHeleNorgeJegErPermitert = "kan-ikke-jobbe-i-hele-norge-jeg-er-permitert";
export const kanIkkeJobbeIHeleNorgeHarFylt60 = "kan-ikke-jobbe-i-hele-norge-har-fylt-60";
export const kanIkkeJobbeIHeleNorgeAnnenSituasjon = "kan-ikke-jobbe-i-hele-norge-annen-situasjon";
export const kanIkkeJobbeIHeleNorgeKortOmSituasjonen =
  "kan-ikke-jobbe-i-hele-norge-kort-om-sitasjonen";
export const kanDuTaAlleTyperArbeid = "kan-du-ta-alle-typer-arbeid";
export const erDuVilligTilÅBytteYrkeEllerGåNedILønn =
  "er-du-villig-til-å-bytte-yrke-eller-gå-ned-i-lønn";
export const erTilbakenavigering = "erTilbakenavigering";

export type ReellArbeidssøkerSvar = {
  [kanDuJobbeBådeHeltidOgDeltid]?: "ja" | "nei";
  [kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?: Array<
    | typeof kanIkkeJobbeHeltidOgDeltidRedusertHelse
    | typeof kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr
    | typeof kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse
    | typeof kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
    | typeof kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
    | typeof kanIkkeJobbeHeltidOgDeltidJegErPermitert
    | typeof kanIkkeJobbeHeltidOgDeltidHarFylt60
    | typeof kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
  >;
  [kanIkkeJobbeBådeHeltidOgDeltidAntallTimer]?: string;
  [kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen]?: string;
  [kanDuJobbeIHeleNorge]?: "ja" | "nei";
  [kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?: Array<
    | typeof kanIkkeJobbeIHeleNorgeRedusertHelse
    | typeof kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr
    | typeof kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse
    | typeof kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
    | typeof kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
    | typeof kanIkkeJobbeIHeleNorgeJegErPermitert
    | typeof kanIkkeJobbeIHeleNorgeHarFylt60
    | typeof kanIkkeJobbeIHeleNorgeAnnenSituasjon
  >;
  [kanDuTaAlleTyperArbeid]?: "ja" | "nei";
  [erDuVilligTilÅBytteYrkeEllerGåNedILønn]?: "ja" | "nei";
};

export const reellArbeidssøkerSpørsmål: KomponentType[] = [
  {
    id: kanDuJobbeBådeHeltidOgDeltid,
    type: "envalg",
    label: "Kan du jobbe både heltid og deltid?",
    description:
      "Som hovedregel må du kunne ta både hel- og deltidsjobb for å ha rett til dagpenger. Det er noen få unntak fra hovedregelen. Svarer du «nei» på dette spørsmålet må du oppgi årsaken og hvor mye du kan jobbe.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg,
    type: "flervalg",
    label: "Velg situasjonen som gjelder deg",
    description: "Du kan krysse av for flere alternativer. Du må dokumentere årsaken.",
    options: [
      {
        value: kanIkkeJobbeHeltidOgDeltidRedusertHelse,
        label: "Redusert helse, fysisk eller psykisk",
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr,
        label: "Omsorg for barn under ett år",
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
        label:
          "Eneansvar eller delt ansvar med en annen forelder som du ikke bor sammen med, for barn til og med 7. klasse",
      },
      {
        value: kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
        label:
          "Eneansvar eller delt ansvar med en annen forelder som du ikke bor sammen med, for barn under 18 år med spesielle behov",
      },
      {
        value:
          kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
        label:
          "Den andre forelderen jobber skift, turnus eller utenfor nærområdet, og dere har ansvar for barn til og med 7. klasse eller barn under 18 år med spesielle behov",
      },
      { value: kanIkkeJobbeHeltidOgDeltidJegErPermitert, label: "Jeg er permittert" },
      { value: kanIkkeJobbeHeltidOgDeltidHarFylt60, label: "Har fylt 60 år" },
      { value: kanIkkeJobbeHeltidOgDeltidAnnenSituasjon, label: "Annen situasjon" },
    ],
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDegLesMer",
    type: "lesMer",
    label: "Hvis ingen av disse situasjonene passer deg",
    description:
      "Hvis du har svart nei og ingen av disse situasjonene gjelder for deg, kan du få avslag på søknaden din om dagpenger. Du kan allikevel velge annen situasjon og få dagpengesøknaden din behandlet.",
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidJegErPermitertVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "Permittert",
    description:
      "Når du er permittert er du kanskje mindre tilgjengelig for å ta annet deltids- eller fulltidsarbeid. Permitteringsgraden og hvor lenge du er permittert, kan begrense hvor mye du kan jobbe.<br/><br/>" +
      "Skriv kort om situasjonen din og forklar hvorfor du ikke kan ta annet deltids- eller fulltidsarbeid. Du må si ja til jobb som kan kombineres med permitteringen din.<br/><br/>" +
      "Hvis det skjer endringer i situasjonen din, må du gi beskjed til oss, slik at vi kan gjøre en ny vurdering.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidJegErPermitert
      ) || false,
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidHarFylt60Varselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Siden du er over 60 år, kan du søke om dagpenger selv om du bare ønsker å jobbe deltid. Du trenger ikke begrunne valget ditt, men du må føre opp hvor mange timer du vil arbeide per uke. Dette antallet vil anses som full arbeidstid for deg, og vil bli lagt til grunn ved beregning av dagpengene.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidHarFylt60
      ) || false,
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidAnnenSituasjonVarselmelding",
    type: "varselmelding",
    variant: "warning",
    label: "",
    description:
      "Hvis du svarer &quot;annen situasjon&quot; og du ikke kan dokumentere svært gode grunner til at du ikke kan jobbe heltid, vil du sannsynligvis få avslag på søknaden din om dagpenger.<br/><br/>" +
      "Annen situasjon kan for eksempel være hvis du har pleietrengende familie, eller den andre forelderen ikke kan delta i den daglige omsorgen for barn på grunn av sykdom eller institusjonsopphold.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
      ) || false,
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Bekreftelse fra relevant fagpersonell fordi du bare kan jobbe deltid",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidRedusertHelse
      ) ||
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
      ) ||
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
      ) ||
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
      ) ||
      false,
  },
  {
    id: kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen,
    type: "langTekst",
    label: "Skriv kort om situasjonen din",
    maxLength: 500,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidJegErPermitert
      ) ||
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidAnnenSituasjon
      ) ||
      false,
  },
  {
    id: kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
    type: "tall",
    label: "Skriv inn antall timer du kan jobbe per uke",
    description: "For å få rett til dagpenger må du normalt kunne jobbe minst 18,75 timer per uke.",
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
  },
  {
    id: "kanIkkeJobbeBådeHeltidOgDeltidAntallTimerLesMer",
    type: "lesMer",
    label: "Hvis du har uføretrygd",
    description: "Hvis du har uføretrygd må du kunne jobbe minst 11,25 timer per uke.",
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
  },
  {
    id: kanDuJobbeIHeleNorge,
    type: "envalg",
    label: "Kan du jobbe i hele Norge?",
    description:
      "Som hovedregel må du være villig til å ta arbeid i hele Norge for å ha rett til dagpenger. Det er noen få unntak fra hovedregelen. Svarer du «nei» på dette spørsmålet må du oppgi årsaken.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg,
    type: "flervalg",
    label: "Velg situasjonen som gjelder deg",
    description: "Du kan krysse av for flere alternativer. Du må dokumentere årsaken.",
    options: [
      {
        value: kanIkkeJobbeIHeleNorgeRedusertHelse,
        label: "Redusert helse, fysisk eller psykisk",
      },
      {
        value: kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr,
        label: "Omsorg for barn under ett år",
      },
      {
        value: kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
        label:
          "Eneansvar eller delt ansvar med en annen forelder som du ikke bor sammen med, for barn til og med 7. klasse",
      },
      {
        value: kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
        label:
          "Eneansvar eller delt ansvar med en annen forelder som du ikke bor sammen med, for barn under 18 år med spesielle behov",
      },
      {
        value:
          kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
        label:
          "Den andre forelderen jobber skift, turnus eller utenfor nærområdet, og dere har ansvar for barn til og med 7. klasse eller barn under 18 år med spesielle behov",
      },
      { value: kanIkkeJobbeIHeleNorgeJegErPermitert, label: "Jeg er permittert" },
      { value: kanIkkeJobbeIHeleNorgeHarFylt60, label: "Har fylt 60 år" },
      { value: kanIkkeJobbeIHeleNorgeAnnenSituasjon, label: "Annen situasjon" },
    ],
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeIHeleNorge] === "nei",
  },
  {
    id: "kanIkkeJobbeIHeleNorgeSitasjonenSomGjelderDegLesMer",
    type: "lesMer",
    label: "Hvis ingen av disse situasjonene passer deg",
    description:
      "Hvis du har svart nei og ingen av disse situasjonene gjelder for deg, kan du få avslag på søknaden din om dagpenger. Du kan allikevel velge annen situasjon og få dagpengesøknaden din behandlet.",
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeIHeleNorge] === "nei",
  },
  {
    id: "kanIkkeJobbeIHeleNorgeJegErPermitertVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "Permittert",
    description:
      "Når du er permittert er du som regel ikke like tilgjengelig for å jobbe i hele Norge. Permitteringsgraden og hvor lenge du er permittert, kan sette noen begrensinger for hvor i landet du kan jobbe.<br/><br/> " +
      "Skriv kort om situasjonen din og forklar hvorfor du ikke kan jobbe i hele Norge. Du kan ikke begrense jobbsøkingen mer enn det som er nødvendig på bakgrunn av permitteringen din.<br/><br/>" +
      "Hvis det skjer endringer i permitteringen din, må du gi beskjed til oss, slik at vi kan gjøre en ny vurdering.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeJegErPermitert
      ) || false,
  },
  {
    id: "kanIkkeJobbeIHeleNorgeHarFylt60Varselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Siden du er over 60 år, kan du søke om dagpenger selv om du ikke ønsker å ta jobb i hele Norge. Du trenger ikke begrunne valget ditt.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeHarFylt60
      ) || false,
  },
  {
    id: "kanIkkeJobbeIHeleNorgeAnnenSituasjonVarselmelding",
    type: "varselmelding",
    variant: "warning",
    label: "",
    description:
      "Hvis du svarer &quot;annen situasjon&quot; og du ikke kan dokumentere svært gode grunner til at du ikke kan jobbe i hele Norge, vil du sannsynligvis få avslag på søknaden din om dagpenger.<br/><br/>" +
      "Annen situasjon kan for eksempel være hvis du har pleietrengende familie, eller den andre forelderen ikke kan delta i den daglige omsorgen for barn på grunn av sykdom eller institusjonsopphold.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeAnnenSituasjon
      ) || false,
  },
  {
    id: "kanIkkeJobbeIHeleNorgeDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Bekreftelse fra relevant fagpersonell fordi du ikke kan jobbe i hele Norge",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeRedusertHelse
      ) ||
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
      ) ||
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
      ) ||
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeAnnenSituasjon
      ) ||
      false,
  },
  {
    id: kanIkkeJobbeIHeleNorgeKortOmSituasjonen,
    type: "langTekst",
    label: "Skriv kort om situasjonen din",
    maxLength: 500,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeJegErPermitert
      ) ||
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeAnnenSituasjon
      ) ||
      false,
  },
  {
    id: kanDuTaAlleTyperArbeid,
    type: "envalg",
    label: "Kan du ta alle typer arbeid?",
    description:
      "Som hovedregel må du kunne ta alle typer arbeid for å ha rett til dagpenger." +
      "<br/><br/>Hvis du har helsemessige begrensninger og ikke kan ta alle typer arbeid, vil vi ta hensyn til dette",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "kanDuTaAlleTyperArbeidLesMer",
    type: "lesMer",
    label: "Dette regnes som helsemessige begrensninger",
    description:
      "Med helsemessige begrensninger mener vi for eksempel funksjonshemning, sykdom, allergier eller lignende som gjør at du ikke kan ta alle typer arbeid. Du må dokumentere hvilke typer arbeid du ikke kan ta på grunn av helsen din.",
  },
  {
    id: erDuVilligTilÅBytteYrkeEllerGåNedILønn,
    type: "envalg",
    label: "Er du villig til å bytte yrke eller gå ned i lønn?",
    description:
      "For å ha rett til dagpenger må du være villig til å ta ethvert arbeid du er kvalifisert for. Dette gjelder også innenfor yrker du ikke er utdannet til eller har arbeidserfaring fra. Dette betyr også at du må være villig til å gå ned i lønn. Du trenger ikke å ta arbeid som ikke er lønnet etter tariff.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "erDuVilligTilÅBytteYrkeEllerGåNedILønnVarselmelding",
    type: "varselmelding",
    variant: "warning",
    label: "",
    description:
      "For å ha rett til dagpenger må du være villig til å bytte yrke eller gå ned i lønn. Hvis du svarer “Nei” på spørsmålet vil du mest sannsynlig få avslag på søknaden din om dagpenger.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[erDuVilligTilÅBytteYrkeEllerGåNedILønn] === "nei",
  },
];
