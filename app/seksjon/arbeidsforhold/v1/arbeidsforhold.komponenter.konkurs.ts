import { KomponentType } from "~/components/Komponent.types";
import {
  ArbeidsforholdModalSvar,
  arbeidsgiverErKonkurs,
  hvordanHarDetteArbeidsforholdetEndretSeg,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";

export const konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato =
  "konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato";
export const konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet =
  "konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet";
export const konkursNårStartetDuIDenneJobben = "konkursNårStartetDuIDenneJobben";
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
    label: "Oppgi den kontraktsfestede sluttdatoen på dette arbeidsforholdet",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato] === "ja",
  },
  {
    id: konkursNårStartetDuIDenneJobben,
    type: "dato",
    label: "Når startet du i denne jobben?",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato] === "ja" ||
      svar[konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato] === "nei",
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
      "Når arbeidsgiveren din går konkurs kan du i tillegg til dagpenger søke om:<br/><br/>" +
      "<ol><li>Lønnsgarantimidler<br/>Lønnsgarantiordningen skal sikre at du som arbeidstaker får utbetalt lønn, feriepenger og annet arbeidsvederlag som du har til gode når arbeidsgiveren din går konkurs. Send søknad om lønnsgarantidekning via bostyrer i konkursboet.</li>" +
      '<li>Forskudd på lønnsgarantimidler i form av dagpenger<br/>Du kan få forskudd på lønnsgarantimidler i form av dagpenger for den første måneden etter at arbeidsgiveren din er konkurs. Dette er fordi det kan ta lang tid å få svar på søknaden om lønnsgaranti. Du søker om forskudd ved å svare "Ja" på spørsmålet over.</li></ol>' +
      "Er du usikker på om du har rett på lønnsgarantimidler, anbefaler vi at du søker om forskudd. Du må da også sende en egen søknad om lønnsgarantimidler. Dette kan bostyrer hjelpe deg med.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidlerVarselemdling",
    type: "varselmelding",
    variant: "info",
    description:
      'Det er viktig at du i tillegg til denne søknaden sender egen <a href="#">søknad om lønnsgarantimidler</a>. Dette kan du få hjelp til av bobestyrer i konkursboet.',
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
      "Forskudd på lønnsgarantimidler blir utbetalt i inntil én måned.<br/><br/>Hvis du er uten arbeid etter at perioden med forskudd på lønnsgarantimidler er ferdig, kan du ha rett på dagpenger. Det kan du søke om ved å svare ja på dette spørsmålet.",
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
      "Når arbeidsgiveren din er konkurs, kan du ha krav på å få dekket tapt lønn i oppsigelsestiden fra konkursboet (dividende). Dette kan være full lønn, eller deler av lønnen for en kort eller lengre periode. Fram til boet er gjort opp, er det usikkert hvor mye penger du har krav på. Har du krav på lønn, har du ikke samtidig krav på dagpenger.<br/><br/>" +
      "Får du innvilget dagpenger for en periode du senere får dekket lønn for, har du derfor fått dagpenger du egentlig ikke har rett til. For at du skal slippe å tilbakebetale dagpenger til Nav, vil vi trekke for mye utbetalt dagpenger direkte fra konkursboet. Samlet sett taper du ikke penger på dette.<br/><br/>" +
      "For at vi skal kunne trekke direkte fra boet, trenger vi en godkjenning fra deg.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] === arbeidsgiverErKonkurs,
  },
  {
    id: "godtarDuAtNavTrekkerPengerDirekteFraKonkursboetVarselMelding",
    type: "varselmelding",
    variant: "warning",
    description:
      "Hvis du ikke godtar at NAV trekker penger direkte fra konkursboet, kan du få krav om tilbakebetaling av dagpenger.",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet] === "nei",
  },
  {
    id: konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
    type: "envalg",
    label:
      "Godtar du at Nav trekker forskuddet om lønnsgarantimidler direkte fra lønnsgarantiordningen?",
    description:
      "Når du får innvilget lønnsgarantimidler, trekker vi forskuddet fra lønnsgarantimidlene. Dette er fordi forskuddet kun skal dekke den første måneden du venter på svar på søknaden om lønnsgarantimidler. Du taper ikke penger totalt sett.<br/><br/>Du får likt beløp i lønnsgarantimidler totalt, uavhengig av om du velger forskudd eller ikke.",
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
    id: "konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningenVarselMelding",
    type: "varselmelding",
    variant: "warning",
    description:
      "Når du får innvilget lønnsgarantimidler, trekker vi forskuddet fra lønnsgarantimidlene.<br/><br/>" +
      "Hvis du ikke godtar dette, vil du få avslag på søknaden om forskudd på lønnsgarantimidler.<br/><br/>" +
      "Da får du utbetalt hele summen når søknaden din om lønnsgarantimidler er behandlet. Du får likt beløp i lønnsgarantimidler totalt, uavhengig av om du velger forskudd eller ikke.",
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
        value: "nei",
        label: "Nei",
      },
      {
        value: "neiMenSkalSøke",
        label: "Nei, men jeg skal søke om lønnsgarantimidler",
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler] === "ja",
  },
  {
    id: "konkursHarDuSøktOmLønnsgarantimidler",
    type: "varselmelding",
    variant: "warning",
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
