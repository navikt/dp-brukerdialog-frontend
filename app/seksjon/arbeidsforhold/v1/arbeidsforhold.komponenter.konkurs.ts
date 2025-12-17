import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  arbeidsgiverErKonkurs,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const konkursVarighetPåArbeidsforholdetFraOgMedDato =
  "konkursVarighetPåArbeidsforholdetFraOgMedDato";
export const konkursVarighetPåArbeidsforholdetTilOgMedDato =
  "konkursVarighetPåArbeidsforholdetTilOgMedDato";
export const konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato =
  "konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato";
export const konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet =
  "konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet";
export const konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler =
  "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler";
export const konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet =
  "konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet";
export const konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler =
  "konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler";
export const konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen =
  "konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen";
export const konkursHarDuSøktOmLønnsgarantimidler = "konkursHarDuSøktOmLønnsgarantimidler";
export const konkursDekkerLønnsgarantiordningenKravetDitt =
  "konkursDekkerLønnsgarantiordningenKravetDitt";
export const konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet =
  "konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet";
export const konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn =
  "konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn";

export const arbeidsforholdModalArbeidsgiverErKonkursKomponenter: KomponentType[] = [
  {
    id: konkursVarighetPåArbeidsforholdetFraOgMedDato,
    type: "periodeFra",
    periodeLabel: "Varighet på arbeidsforholdet",
    label: "Fra og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: konkursVarighetPåArbeidsforholdetTilOgMedDato,
    type: "periodeTil",
    label: "Til og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursArbeidsavtaleDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Arbeidsavtale",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursOppsigelseDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Oppsigelse fra bostyrer/konkursforvalter",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
    type: "envalg",
    label: "Er dette et midlertidig arbeidsforhold med en kontraktfestet sluttdato?",
    description:
      "Vi må vite om du hadde en midlertidig arbeidskontrakt med fast sluttdato, for eksempel et vikariat. Svar ja hvis kontrakten din hadde en sluttdato, og nei hvis du var fast ansatt uten sluttdato.",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
      {
        value: "vetIkke",
        label: "Jeg vet ikke",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
    type: "dato",
    label: "Oppgi den kontraktsfestede sluttdatoen for dette arbeidsforholdet",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato] === "ja",
  },
  {
    id: konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
    type: "envalg",
    label: "Ønsker du å søke om forskudd på lønnsgarantimidler?",
    description:
      "Lønnsgarantimidler erstatter lønn som du ikke har fått utbetalt fordi arbeidsgiveren din går konkurs. Er du usikker på om du har rett på lønnsgarantimidler, anbefaler vi at du søker om forskudd her.",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidlerLesMer",
    type: "lesMer",
    label: "Les mer om hvem som bør søke om forskudd på lønnsgarantimidler",
    description:
      "<p>Når arbeidsgiveren din går konkurs, kan du i tillegg til dagpenger søke om:</p>" +
      '<ol><li><strong>Lønnsgarantimidler</strong><br/>Lønnsgarantiordningen skal sikre at du som arbeidstaker får utbetalt lønn, feriepenger og annet arbeidsvederlag som du har til gode når arbeidsgiveren din går konkurs. Send <a href="https://www.nav.no/soknader#lonnsgaranti">søknad om lønnsgarantimidler</a> via bostyrer i konkursboet.</li>' +
      '<li><strong>Forskudd på lønnsgarantimidler i form av dagpenger</strong><br/>Du kan få forskudd på lønnsgarantimidler i form av dagpenger for den første måneden etter at arbeidsgiveren din er konkurs. Dette er fordi det kan ta lang tid å få svar på søknaden om lønnsgaranti. Du søker om forskudd ved å svare "Ja" på spørsmålet over.</li></ol>' +
      "<p>Er du usikker på om du har rett på lønnsgarantimidler, anbefaler vi at du søker om forskudd. Du må da også sende en egen søknad om lønnsgarantimidler. Dette kan bostyrer hjelpe deg med.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidlerVarselemdling",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Viktig informasjon",
    description:
      '<p>Det er viktig at du i tillegg til denne søknaden sender egen <a href="https://www.nav.no/soknader#lonnsgaranti">søknad om lønnsgarantimidler</a>. Dette kan du få hjelp til av bobestyrer i konkursboet.</p>',
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
    type: "envalg",
    label: "Ønsker du å søke om dagpenger i tillegg til forskudd om lønnsgarantimidler?",
    description:
      "Lønnsgarantimidler erstatter lønn som du ikke har fått utbetalt fordi arbeidsgiveren din går konkurs. Er du usikker på om du har rett på lønnsgarantimidler, anbefaler vi at du søker om forskudd her.",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: "konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidlerLesMer",
    type: "lesMer",
    label: "Les om hvem som kan ha rett til dagpenger",
    description:
      "<p>Forskudd på lønnsgarantimidler blir utbetalt i inntil én måned.</p>" +
      "<p>Hvis du er uten arbeid etter at perioden med forskudd på lønnsgarantimidler er ferdig, kan du ha rett på dagpenger. Det kan du søke om ved å svare ja på dette spørsmålet</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet,
    type: "envalg",
    label: "Godtar du at Nav trekker penger direkte fra konkursboet?",
    description:
      "Får du innvilget dagpenger for en periode du senere får dekket lønn for, har du fått dagpenger du egentlig ikke har rett til. For at du skal slippe å tilbakebetale dagpenger til Nav, vil vi trekke for mye utbetalt dagpenger direkte fra konkursboet.",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboetLesMer",
    type: "lesMer",
    label: "Les om hvorfor vi vil trekke penger",
    description:
      "<p>Når arbeidsgiveren din er konkurs, kan du ha krav på å få dekket tapt lønn i oppsigelsestiden fra konkursboet (dividende). Dette kan være full lønn, eller deler av lønnen for en kort eller lengre periode. Fram til boet er gjort opp, er det usikkert hvor mye penger du har krav på. Har du krav på lønn, har du ikke samtidig krav på dagpenger.</p>" +
      "<p>Får du innvilget dagpenger for en periode du senere får dekket lønn for, har du derfor fått dagpenger du egentlig ikke har rett til. For at du skal slippe å tilbakebetale dagpenger til Nav, vil vi trekke for mye utbetalt dagpenger direkte fra konkursboet. Samlet sett taper du ikke penger på dette.</p>" +
      "<p>For at vi skal kunne trekke direkte fra boet, trenger vi en godkjenning fra deg.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "godtarDuAtNavTrekkerPengerDirekteFraKonkursboetInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få krav om tilbakebetaling",
    description:
      "Hvis du ikke godtar at Nav trekker penger direkte fra konkursboet, kan du få krav om tilbakebetaling.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet] === "nei",
  },
  {
    id: konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
    type: "envalg",
    label:
      "Godtar du at Nav trekker forskuddet på lønnsgarantimidler direkte fra lønnsgarantiordningen?",
    description:
      "<p>Forskuddet skal dekke den første måneden du venter på svar på søknaden om lønnsgarantimidler. Når du får utbetalt lønnsgarantimidler, trekker vi forskuddet fra utbetalingen.</p>" +
      '<p>Du taper ikke penger på å svare "Ja".</p>',
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: "konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningenInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få avslag",
    description:
      '<p>Hvis du svarer "Nei" vil du få avslag på søknaden om forskudd på lønnsgarantimidler.</p>' +
      "<p>Vi må trekke forskuddet fra lønnsgarantimidlene dine for å hindre at du får dobbelt utbetaling for den første måneden.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen
      ] === "nei",
  },
  {
    id: konkursHarDuSøktOmLønnsgarantimidler,
    type: "envalg",
    label: "Har du søkt om lønnsgarantimidler?",
    description:
      "For å ha rett til forskudd på lønnsgarantimidler må du søke lønnsgarantiordningen om lønnsgarantimidler. Dette kan bostyrer i konkursboet hjelpe deg med.",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "neiMenSkalSøke",
        label: "Nei, men jeg skal søke om lønnsgarantimidler",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: "konkursHarDuSøktOmLønnsgarantimidlerInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få avslag",
    description:
      "Hvis du ikke søker om lønnsgarantimidler, har du ikke rett til forskudd, og du vil få avslag på søknaden din om forskudd på lønnsgarantimidler.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursHarDuSøktOmLønnsgarantimidler] === "nei",
  },
  {
    id: konkursDekkerLønnsgarantiordningenKravetDitt,
    type: "envalg",
    label: "Dekker lønnsgarantiordningen lønnskravet ditt?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
      {
        value: "vetIkke",
        label: "Jeg vet ikke",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet,
    type: "envalg",
    label:
      "Har du fått utbetalt lønn for dager etter datoen arbeidsgiveren din gikk konkurs eller ble tvangsavviklet?",
    options: [
      {
        value: "ja",
        label: "Ja",
      },
      {
        value: "nei",
        label: "Nei",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn,
    type: "dato",
    label: "Velg den siste dagen du har fått utbetalt lønn for",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[
        konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet
      ] === "ja",
  },
];
