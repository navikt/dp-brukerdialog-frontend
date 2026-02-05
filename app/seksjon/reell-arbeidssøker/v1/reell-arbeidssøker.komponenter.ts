import { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const kanDuJobbeBådeHeltidOgDeltid = "kanDuJobbeBådeHeltidOgDeltid";
export const kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg =
  "kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg";
export const kanIkkeJobbeHeltidOgDeltidRedusertHelse = "kanIkkeJobbeHeltidOgDeltidRedusertHelse";
export const kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr =
  "kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr";
export const kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie =
  "kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie";
export const kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse =
  "kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse";
export const kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov =
  "kanIkkeJobbeHeltidOgDeltidEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov";
export const kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov =
  "kanIkkeJobbeHeltidOgDeltidDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov";
export const kanIkkeJobbeHeltidOgDeltidJegErPermitert = "kanIkkeJobbeHeltidOgDeltidJegErPermitert";
export const kanIkkeJobbeHeltidOgDeltidHarFylt60 = "kanIkkeJobbeHeltidOgDeltidHarFylt60";
export const kanIkkeJobbeHeltidOgDeltidAnnenSituasjon = "kanIkkeJobbeHeltidOgDeltidAnnenSituasjon";
export const kanIkkeJobbeBådeHeltidOgDeltidAntallTimer =
  "kanIkkeJobbeBådeHeltidOgDeltidAntallTimer";
export const kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen =
  "kanIkkeJobbeHeltidOgDeltidKortOmSituasjonen";
export const kanDuJobbeIHeleNorge = "kanDuJobbeIHeleNorge";
export const kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg =
  "kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg";
export const kanIkkeJobbeIHeleNorgeRedusertHelse = "kanIkkeJobbeIHeleNorgeRedusertHelse";
export const kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr =
  "kanIkkeJobbeIHeleNorgeOmsorgForBarnUnderEttÅr";
export const kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie =
  "kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie";
export const kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse =
  "kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse";
export const kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov =
  "kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov";
export const kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov =
  "kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov";
export const kanIkkeJobbeIHeleNorgeJegErPermitert = "kanIkkeJobbeIHeleNorgeJegErPermitert";
export const kanIkkeJobbeIHeleNorgeHarFylt60 = "kanIkkeJobbeIHeleNorgeHarFylt60";
export const kanIkkeJobbeIHeleNorgeAnnenSituasjon = "kanIkkeJobbeIHeleNorgeAnnenSituasjon";
export const kanIkkeJobbeIHeleNorgeKortOmSituasjonen = "kanIkkeJobbeIHeleNorgeKortOmSituasjonen";
export const kanDuTaAlleTyperArbeid = "kanDuTaAlleTyperArbeid";
export const kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa =
  "kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa";
export const erDuVilligTilÅBytteYrkeEllerGåNedILønn = "erDuVilligTilÅBytteYrkeEllerGåNedILønn";
export const handling = "handling";

export type ReellArbeidssøkerSvar = {
  [kanDuJobbeBådeHeltidOgDeltid]?: "ja" | "nei";
  [kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?: Array<
    | typeof kanIkkeJobbeHeltidOgDeltidRedusertHelse
    | typeof kanIkkeJobbeHeltidOgDeltidOmsorgForBarnUnderEttÅr
    | typeof kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie
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
    | typeof kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie
    | typeof kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse
    | typeof kanIkkeJobbeIHeleNorgeEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov
    | typeof kanIkkeJobbeIHeleNorgeDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov
    | typeof kanIkkeJobbeIHeleNorgeJegErPermitert
    | typeof kanIkkeJobbeIHeleNorgeHarFylt60
    | typeof kanIkkeJobbeIHeleNorgeAnnenSituasjon
  >;
  [kanDuTaAlleTyperArbeid]?: "ja" | "nei";
  [kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa]?: string;
  [erDuVilligTilÅBytteYrkeEllerGåNedILønn]?: "ja" | "nei";
};

export const reellArbeidssøkerKomponenter: KomponentType[] = [
  {
    id: "reellArbeidssøkerForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<p>For å få dagpenger må du være reell arbeidssøker. Det betyr at du må være" +
      "<ul>" +
      "<li>registrert som arbeidssøker</li>" +
      "<li>frisk nok til å jobbe i minst 50 prosent stilling</li>" +
      "<li>villig til å delta i arbeidsmarkedstiltak</li>" +
      "<li>villig til å ta alle typer jobber du har helse til, som er lønnet etter tariff eller sedvane</li>" +
      "</ul></p>" +
      "<p>Som hovedregel må du også være villig til å" +
      "<ul>" +
      "<li>ta arbeid hvor som helst i Norge</li>" +
      "<li>ta arbeid på heltid og deltid</li>" +
      "</ul></p>" +
      "<p>I denne delen av søknaden må du svare på spørsmål om hvor og hvor mye du kan jobbe. Det er noen få unntak fra hovedreglene, som du kan lese mer om hvis du svarer «nei» på spørsmålene under.</p>",
  },
  {
    id: kanDuTaAlleTyperArbeid,
    type: "envalg",
    label: "Kan du ta alle typer arbeid?",
    description:
      "Hvis du har redusert helse og ikke kan ta alle typer arbeid, kan vi ta hensyn til dette.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "kanDuTaAlleTyperArbeidLesMer",
    type: "lesMer",
    label: "Dette regnes som redusert helse",
    description:
      "Med redusert helse mener vi for eksempel funksjonshemning, sykdom, allergier eller lignende som gjør at du ikke kan ta alle typer arbeid. Du må dokumentere hvilke typer arbeid du ikke kan ta på grunn av helsen din.",
  },
  {
    id: "kanDuTaAlleTyperArbeidInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få avslag på søknaden",
    description:
      "<p>For å ha rett til dagpenger, må du være villig til å si ja til alle slags jobber som som du er i fysisk og psykisk i stand til å ta. Du må dokumentere at du har redusert helse.</p>" +
      "<p>Hvis du ikke legger ved dokumentasjon på helsesituasjonen din, vil du mest sannsynlig få avslag på søknaden om dagpenger.</p>",
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
  },
  {
    id: kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTa,
    type: "langTekst",
    label: "Hvilke typer arbeid kan du ikke ta?",
    maksLengde: 500,
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
  },
  {
    id: "kanDuTaAlleTyperArbeidHvilkeTyperArbeidKanDuIkkeTaDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Bekreftelse fra lege eller annen behandler fordi du ikke kan ta alle typer arbeid",
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
  },
  {
    id: erDuVilligTilÅBytteYrkeEllerGåNedILønn,
    type: "envalg",
    label: "Er du villig til å bytte yrke eller gå ned i lønn?",
    description:
      "For å ha rett til dagpenger må du være villig til å ta alle typer jobber du kan utføre. Dette gjelder også jobber du ikke er utdannet til eller har arbeidserfaring fra. Dette betyr at du må være villig til å gå ned i lønn, hvis jobben er lønnet etter tariff eller sedvane.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "erDuVilligTilÅBytteYrkeEllerGåNedILønnInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få avslag på søknaden",
    description:
      '<p>For å ha rett til dagpenger må du være villig til å bytte yrke eller gå ned i lønn. Hvis du svarer "Nei" på spørsmålet vil du mest sannsynlig få avslag på søknaden din om dagpenger.</p>',
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[erDuVilligTilÅBytteYrkeEllerGåNedILønn] === "nei",
  },
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
    label: "Velg årsaken som gjelder deg",
    description:
      "Du kan krysse av for flere alternativer. Med mindre Nav har opplysningene allerede, så må du dokumentere årsaken.",
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
        value: kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie,
        label:
          "Omsorgsansvar for pleietrengende i nær familie, for eksempel barn, foreldre eller ektefelle",
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
          "Den andre forelderen jobber skift, turnus eller utenfor nærområdet. Og dere har ansvar for barn til og med 7. klasse eller barn under 18 år med spesielle behov",
      },
      { value: kanIkkeJobbeHeltidOgDeltidJegErPermitert, label: "Jeg er permittert" },
      { value: kanIkkeJobbeHeltidOgDeltidHarFylt60, label: "Har fylt 60 år" },
      { value: kanIkkeJobbeHeltidOgDeltidAnnenSituasjon, label: "Annen situasjon" },
    ],
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuJobbeBådeHeltidOgDeltid] === "nei",
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidJegErPermitertInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "<p>Når du er permittert er du kanskje mindre tilgjengelig for å ta annet deltids- eller fulltidsarbeid. Permitteringsgraden og hvor lenge du er permittert, kan begrense hvor mye du kan jobbe.</p>" +
      "<p>Skriv kort om situasjonen din og forklar hvorfor du ikke kan ta annet deltids- eller fulltidsarbeid. Du må si ja til jobb som kan kombineres med permitteringen din.</p>" +
      "<p>Hvis det skjer endringer i situasjonen din, må du gi beskjed til oss, slik at vi kan gjøre en ny vurdering.</p>",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidJegErPermitert
      ) || false,
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidHarFylt60Informasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "<p>Siden du er over 60 år, kan du søke om dagpenger selv om du bare ønsker å jobbe deltid. Du trenger ikke begrunne valget ditt, men du må føre opp hvor mange timer du vil arbeide per uke. Dette antallet vil anses som full arbeidstid for deg, og vil bli lagt til grunn ved beregning av dagpengene.</p>",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeHeltidOgDeltidHarFylt60
      ) || false,
  },
  {
    id: "kanIkkeJobbeHeltidOgDeltidAnnenSituasjonInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få avslag på søknaden",
    description:
      '<p>Hvis du svarer "Annen situasjon" og du ikke kan dokumentere svært gode grunner til at du ikke kan jobbe heltid, vil du sannsynligvis få avslag på søknaden din om dagpenger.</p>',
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
        kanIkkeJobbeHeltidOgDeltidOmsorgForPleietrengendeINærFamilie
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
    maksLengde: 500,
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
    label: "Velg årsaken som gjelder deg",
    description:
      "Du kan krysse av for flere alternativer. Med mindre Nav har opplysningene allerede, så må du dokumentere årsaken.",
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
        value: kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie,
        label:
          "Omsorgsansvar for pleietrengende i nær familie, for eksempel barn, foreldre eller ektefelle",
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
    id: "kanIkkeJobbeIHeleNorgeJegErPermitertInformasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "<p>Når du er permittert er du som regel ikke like tilgjengelig for å jobbe i hele Norge. Permitteringsgraden og hvor lenge du er permittert, kan sette noen begrensinger for hvor i landet du kan jobbe.</p>" +
      "<p>Skriv kort om situasjonen din og forklar hvorfor du ikke kan jobbe i hele Norge. Du kan ikke begrense jobbsøkingen mer enn det som er nødvendig på bakgrunn av permitteringen din.</p>" +
      "<p>Hvis det skjer endringer i situasjonen din, må du gi beskjed til oss, slik at vi kan gjøre en ny vurdering.</p>",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeJegErPermitert
      ) || false,
  },
  {
    id: "kanIkkeJobbeIHeleNorgeHarFylt60Informasjonskort",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Informasjon",
    description:
      "<p>Siden du er over 60 år, kan du ha rett til dagpenger selv om du ikke ønsker å ta jobb i hele landet. Du trenger heller ikke være villig til å ta arbeid på heltid. Du trenger ikke begrunne valget ditt.</p>",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeHarFylt60
      ) || false,
  },
  {
    id: "kanIkkeJobbeIHeleNorgeAnnenSituasjonInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få avslag på søknaden",
    description:
      '<p>Hvis du svarer "Annen situasjon" og du ikke kan dokumentere svært gode grunner til at du ikke kan jobbe i hele Norge, vil du sannsynligvis få avslag på søknaden din om dagpenger.</p>',
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
        kanIkkeJobbeIHeleNorgeOmsorgForPleietrengendeINærFamilie
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
    maksLengde: 500,
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeJegErPermitert
      ) ||
      svar[kanIkkeJobbeIHeleNorgeSituasjonenSomGjelderDeg]?.includes(
        kanIkkeJobbeIHeleNorgeAnnenSituasjon
      ) ||
      false,
  },
];
