import {
  erDuVilligTilÅBytteYrkeEllerGåNedILønn,
  erDuVilligTilÅBytteYrkeEllerGåNedILønnVarselmelding,
  hvilkeTyperJobberKanDuTa,
  hvilkeTyperJobberKanDuTaVarselmelding,
  kanDuJobbeBådeHeltidOgDeltid,
  kanDuJobbeIHeleNorge,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
  kanIkkeJobbeHeltidOgDeltidMenKanJobbeIHeleNorgeVarselmelding,
  kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse,
  kanIkkeJobbeHeltidOgDeltidOgKanIkkeJobbeIHeleNorgeVarselmelding,
  kanJobbeHeltidOgDeltidMenKanIkkeJobbeIHeleNorgeVarselmelding,
  ReellArbeidssøkerSvar,
  situasjonsbeskrivelseAnnenSituasjon,
  situasjonsbeskrivelseDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
  situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  situasjonsbeskrivelseHarFylt60,
  situasjonsbeskrivelseJegErPermitert,
  situasjonsbeskrivelseJegErPermitertVarselmelding,
  situasjonsbeskrivelseOmsorgForBarnUnderEttÅr,
  situasjonsbeskrivelseRedusertHelse,
} from "~/components/regelsett/reell-arbeidssøker/reell-arbeidssøker-svar";
import { KomponentType } from "~/components/sporsmal/sporsmal.types";

export const reellArbeidssøkerSpørsmål: KomponentType[] = [
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
    id: hvilkeTyperJobberKanDuTaVarselmelding,
    type: "varselmelding",
    label: "Informasjon om konsekvens",
    variant: "info",
    description: "Informasjon om konsekvens",
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
  },
  {
    id: hvilkeTyperJobberKanDuTa,
    type: "langTekst",
    label: "Hvilke typer jobber kan du ta?",
    maxLength: 500,
    visHvis: (svar: ReellArbeidssøkerSvar) => svar[kanDuTaAlleTyperArbeid] === "nei",
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
    id: erDuVilligTilÅBytteYrkeEllerGåNedILønnVarselmelding,
    type: "varselmelding",
    variant: "warning",
    label: "Informasjon om konsekvens",
    description:
      "For å ha rett til dagpenger må du være villig til å bytte yrke eller gå ned i lønn. Hvis du svarer “Nei” på spørsmålet vil du mest sannsynlig få avslag på søknaden din om dagpenger.",
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
    id: kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
    type: "kortTekst",
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
    id: kanIkkeJobbeHeltidOgDeltidMenKanJobbeIHeleNorgeVarselmelding,
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Informasjon om konsekvens: Kan ikke jobbe heltid og deltid, men kan jobbe i hele Norge.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanDuJobbeBådeHeltidOgDeltid] === "nei" && svar[kanDuJobbeIHeleNorge] === "ja",
  },
  {
    id: kanIkkeJobbeHeltidOgDeltidOgKanIkkeJobbeIHeleNorgeVarselmelding,
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Informasjon om konsekvens: Kan ikke jobbe heltid og deltid, og kan ikke jobbe i hele Norge.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanDuJobbeBådeHeltidOgDeltid] === "nei" && svar[kanDuJobbeIHeleNorge] === "nei",
  },
  {
    id: kanJobbeHeltidOgDeltidMenKanIkkeJobbeIHeleNorgeVarselmelding,
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Informasjon om konsekvens: Kan jobbe heltid og deltid, men kan ikke jobbe i hele Norge.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanDuJobbeBådeHeltidOgDeltid] === "ja" && svar[kanDuJobbeIHeleNorge] === "nei",
  },
  {
    id: kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse,
    type: "flervalg",
    label: "Velg situasjonen som gjelder deg",
    description: "Du kan krysse av for flere alternativer. Du må dokumentere årsaken.",
    options: [
      {
        value: situasjonsbeskrivelseRedusertHelse,
        label: "Redusert helse, fysisk eller psykisk",
      },
      {
        value: situasjonsbeskrivelseOmsorgForBarnUnderEttÅr,
        label: "Omsorg for barn under ett år",
      },
      {
        value: situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
        label:
          "Eneansvar eller delt ansvar med en annen forelder som du ikke bor sammen med, for barn til og med 7. klasse",
      },
      {
        value: situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
        label:
          "Eneansvar eller delt ansvar med en annen forelder som du ikke bor sammen med, for barn under 18 år med spesielle behov",
      },
      {
        value:
          situasjonsbeskrivelseDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
        label:
          "Den andre forelderen jobber skift, turnus eller utenfor nærområdet, og dere har ansvar for barn til og med 7. klasse eller barn under 18 år med spesielle behov",
      },
      { value: situasjonsbeskrivelseJegErPermitert, label: "Jeg er permittert" },
      { value: situasjonsbeskrivelseHarFylt60, label: "Har fylt 60 år" },
      { value: situasjonsbeskrivelseAnnenSituasjon, label: "Annen situasjon" },
    ],
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      (svar[kanDuJobbeBådeHeltidOgDeltid] === "nei" && svar[kanDuJobbeIHeleNorge] !== undefined) ||
      (svar[kanDuJobbeBådeHeltidOgDeltid] !== undefined && svar[kanDuJobbeIHeleNorge] === "nei"),
  },
  {
    id: situasjonsbeskrivelseJegErPermitertVarselmelding,
    type: "varselmelding",
    variant: "info",
    label: "Permittert",
    description:
      "<h4 style='margin-top: 0'>Permittert</h4>" +
      "Når du er permittert er du som regel ikke like tilgjengelig for å jobbe i hele Norge. Permitteringsgraden og hvor lenge du er permittert, kan sette noen begrensinger for hvor i landet du kan jobbe.<br/><br/> " +
      "Skriv kort om situasjonen din og forklar hvorfor du ikke kan jobbe i hele Norge. Du kan ikke begrense jobbsøkingen mer enn det som er nødvendig på bakgrunn av permitteringen din.<br/><br/>" +
      "Hvis det skjer endringer i permitteringen din, må du gi beskjed til oss, slik at vi kan gjøre en ny vurdering.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse]?.includes(
        situasjonsbeskrivelseJegErPermitert
      ) || false,
  },
  {
    id: situasjonsbeskrivelseHarFylt60,
    type: "varselmelding",
    variant: "info",
    label: "",
    description:
      "Siden du er over 60 år, kan du søke om dagpenger selv om du ikke ønsker å ta jobb i hele Norge. Du trenger ikke begrunne valget ditt.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse]?.includes(
        situasjonsbeskrivelseHarFylt60
      ) || false,
  },
  {
    id: situasjonsbeskrivelseAnnenSituasjon,
    type: "varselmelding",
    variant: "warning",
    label: "Annen situasjon",
    description:
      "Hvis du svarer &quot;annen situasjon&quot; og du ikke kan dokumentere svært gode grunner til at du ikke kan jobbe i hele Norge, vil du sannsynligvis få avslag på søknaden din om dagpenger.<br/><br/>" +
      "Annen situasjon kan for eksempel være hvis du har pleietrengende familie, eller den andre forelderen ikke kan delta i den daglige omsorgen for barn på grunn av sykdom eller institusjonsopphold.",
    visHvis: (svar: ReellArbeidssøkerSvar) =>
      svar[kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse]?.includes(
        situasjonsbeskrivelseAnnenSituasjon
      ) || false,
  },
];
