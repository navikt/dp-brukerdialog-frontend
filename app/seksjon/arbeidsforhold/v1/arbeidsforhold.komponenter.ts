import type { TFunction } from "i18next";
import { KomponentType } from "~/components/Komponent.types";
import {
  jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  jegErOppsagtHvaHarDuSvartPåTilbudet,
  jegErOppsagtHvaVarÅrsaken,
  jegErOppsagtVarighetPåArbeidsforholdetFraDato,
  jegErOppsagtVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  jegHarFåttAvskjedHvaVarÅrsaken,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import {
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
import {
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  arbeidstidenErRedusertHvaErÅrsaken,
  arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import {
  konkursDekkerLønnsgarantiordningenKravetDitt,
  konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato,
  konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen,
  konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet,
  konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn,
  konkursHarDuSøktOmLønnsgarantimidler,
  konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet,
  konkursVarighetPåArbeidsforholdetFraDato,
  konkursVarighetPåArbeidsforholdetTilDato,
  konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler,
  konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import {
  permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato,
  permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien,
  permittertHvorMangeProsentErDuPermittert,
  permittertLønnsperiodeFraOgMedDato,
  permittertLønnsperiodeTilOgMedDato,
  permittertNårErDuPermittertFraOgMedDato,
  permittertNårErDuPermittertTilOgMedDato,
  permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin,
  permittertVarighetPåArbeidsforholdetFraOgMedDato,
  permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import {
  ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet,
  ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import { startOfDay, subYears } from "date-fns";

export const seksjonsvar = "seksjonsvar";
export const pdfGrunnlag = "pdfGrunnlag";
export const handling = "handling";
export const hvordanHarDuJobbet = "hvordanHarDuJobbet";
export const fastArbeidstidIMindreEnn6Måneder = "fastArbeidstidIMindreEnn6Måneder";
export const fastArbeidstidI6MånederEllerMer = "fastArbeidstidI6MånederEllerMer";
export const varierendeArbeidstidDeSiste12Månedene = "varierendeArbeidstidDeSiste12Månedene";
export const jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene =
  "jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene";
export const harIkkeJobbetDeSiste36Månedene = "harIkkeJobbetDeSiste36Månedene";
export const harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene =
  "harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene";
export const navnetPåBedriften = "navnetPåBedriften";
export const hvilketLandJobbetDuI = "hvilketLandJobbetDuI";
export const oppgiPersonnummeretPinDuHaddeIDetteLandet =
  "oppgiPersonnummeretPinDuHaddeIDetteLandet";
export const hvordanHarDetteArbeidsforholdetEndretSeg = "hvordanHarDetteArbeidsforholdetEndretSeg";
export const arbeidsgiverenMinHarSagtMegOpp = "arbeidsgiverenMinHarSagtMegOpp";
export const jegHarSagtOppSelv = "jegHarSagtOppSelv";
export const jegHarFåttAvskjed = "jegHarFåttAvskjed";
export const kontraktenErUtgått = "kontraktenErUtgått";
export const arbeidstidenErRedusert = "arbeidstidenErRedusert";
export const arbeidsgiverErKonkurs = "arbeidsgiverErKonkurs";
export const jegErPermittert = "jegErPermittert";
export const arbeidsforholdetErIkkeEndret = "arbeidsforholdetErIkkeEndret";
export const harDuJobbetSkiftTurnusEllerRotasjon = "harDuJobbetSkiftTurnusEllerRotasjon";
export const skiftEllerTurns = "skiftEllerTurns";
export const rotasjon = "rotasjon";
export const hverkenSkiftTurnusEllerRotasjon = "hverkenSkiftTurnusEllerRotasjon";
export const annenRotasjon = "annenRotasjon";
export const hvilkenTypeRotasjonsordningJobbetDu = "hvilkenTypeRotasjonsordningJobbetDu";
export const annenRotasjonBeskrivelse = "annenRotasjonBeskrivelse";
export const oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto =
  "oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDato";
export const oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato =
  "oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato";

export type Arbeidsforhold = ArbeidsforholdModalSvar & {
  id: string;
  dokumentasjonskrav?: string[];
};

export type ArbeidsforholdModalSvar = {
  [navnetPåBedriften]?: string;
  [hvilketLandJobbetDuI]?: string;
  [oppgiPersonnummeretPinDuHaddeIDetteLandet]?: string;
  [hvordanHarDetteArbeidsforholdetEndretSeg]?: string;
  [jegErOppsagtVarighetPåArbeidsforholdetFraDato]?: string;
  [jegErOppsagtVarighetPåArbeidsforholdetTilDato]?: string;
  [jegErOppsagtHvaVarÅrsaken]?: string;
  [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [jegErOppsagtHvaHarDuSvartPåTilbudet]?: string;
  [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato]?: string;
  [jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato]?: string;
  [jegHarSagtOppHvaVarÅrsaken]?: string;
  [jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato]?: string;
  [jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato]?: string;
  [jegHarFåttAvskjedHvaVarÅrsaken]?: string;
  [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]?: string;
  [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]?: string;
  [arbeidstidenErRedusertHvaErÅrsaken]?: string;
  [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]?: string;
  [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato]?: string;
  [kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato]?: string;
  [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]?: string;
  [kontraktenErUtgåttHvaHarDuSvartPåTilbudet]?: string;
  [kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [konkursVarighetPåArbeidsforholdetFraDato]?: string;
  [konkursVarighetPåArbeidsforholdetTilDato]?: string;
  [konkursErDetteEtMidlertidigArbeidsforholdMedKontraktsfestetSluttdato]?: string;
  [konkursOppgiDenKontraktsfestedeSluttdatoenPåDetteArbeidsforholdet]?: string;
  [konkursØnskerDuÅSøkeOmForskuddPåLønnsgarantimidler]?: string;
  [konkursØnskerDuÅSøkeOmDagpengerITilleggForskuddPåLønnsgarantimidler]?: string;
  [konkursGodtarDuAtNavTrekkerPengerDirekteFraKonkursboet]?: string;
  [konkursGodtarDuAtNavTrekkerForskuddetOmLønnsgarantimidlerDirekteFraLønnsgarantiordningen]?: string;
  [konkursHarDuSøktOmLønnsgarantimidler]?: string;
  [konkursDekkerLønnsgarantiordningenKravetDitt]?: string;
  [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavviklet]?: string;
  [konkursHarDuFåttUtbetaltLønnForDagerEtterDatoenArbeidsgiverenDinGikkKonkursEllerBleTvangsavvikletSisteDagDetBleUtbetaltLønn]?: string;
  [permittertVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [permittertNårErDuPermittertFraOgMedDato]?: string;
  [permittertNårErDuPermittertTilOgMedDato]?: string;
  [permittertErDetteEtMidlertidigArbeidsforholdMedEnKontraktfestetSluttdato]?: string;
  [permittertOppgiDenKontraktsfestedeSluttdatoenIKontraktenDin]?: string;
  [permittertErDuPermittertFraFiskeforedlingsEllerFiskeoljeindustrien]?: string;
  [permittertHvorMangeProsentErDuPermittert]?: string;
  [permittertVetDuNårLønnspliktperiodenTilArbeidsgiverenDinEr]?: string;
  [permittertLønnsperiodeFraOgMedDato]?: string;
  [permittertLønnsperiodeTilOgMedDato]?: string;
  [ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [ikkeEndretHarDuTilleggsopplysningerTilDetteArbeidsforholdet]?: string;
  [ikkeEndretTilleggsopplysningerTilDetteArbeidsforholdet]?: string;
  [harDuJobbetSkiftTurnusEllerRotasjon]?: string;
  [hvilkenTypeRotasjonsordningJobbetDu]?: string;
  [annenRotasjonBeskrivelse]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato]?: string;
};

export type ArbeidsforholdSvar = {
  [hvordanHarDuJobbet]?:
    | typeof fastArbeidstidIMindreEnn6Måneder
    | typeof fastArbeidstidI6MånederEllerMer
    | typeof varierendeArbeidstidDeSiste12Månedene
    | typeof jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene
    | typeof harIkkeJobbetDeSiste36Månedene;
  [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]?: "ja" | "nei";
};

export type ArbeidsforholdResponse = ArbeidsforholdSvar & {
  registrerteArbeidsforhold?: ArbeidsforholdModalSvar[];
};

type ArbeidsforholdT = TFunction;

const jaNeiOptions = (t: ArbeidsforholdT) => [
  { value: "ja", label: t("felles.svar.ja") },
  { value: "nei", label: t("felles.svar.nei") },
];

const lagForklarendeTekst = (t: ArbeidsforholdT, tekstKey: string) =>
  `<h3>${t("forklarendeTekst.tittel")}</h3>` +
  `<p>${t(tekstKey)}</p>` +
  `<p>${t("forklarendeTekst.dokumentasjon")}</p>`;

export const lagArbeidsforholdKomponenter = (t: ArbeidsforholdT): KomponentType[] => [
  {
    id: hvordanHarDuJobbet,
    type: "envalg",
    label: t("hvordanHarDuJobbet.label"),
    options: [
      {
        value: fastArbeidstidIMindreEnn6Måneder,
        label: t("hvordanHarDuJobbet.options.fastArbeidstidIMindreEnn6Maneder"),
      },
      {
        value: fastArbeidstidI6MånederEllerMer,
        label: t("hvordanHarDuJobbet.options.fastArbeidstidI6ManederEllerMer"),
      },
      {
        value: varierendeArbeidstidDeSiste12Månedene,
        label: t("hvordanHarDuJobbet.options.varierendeArbeidstidDeSiste12Manedene"),
      },
      {
        value: jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
        label: t("hvordanHarDuJobbet.options.jobbetMerIGjennomsnitt"),
      },
      {
        value: harIkkeJobbetDeSiste36Månedene,
        label: t("hvordanHarDuJobbet.options.harIkkeJobbetDeSiste36Manedene"),
      },
    ],
  },
  {
    id: "lesMerOmArbeidstidLesMer",
    type: "lesMer",
    label: t("arbeidstidLesMer.label"),
    description:
      `<p>${t("arbeidstidLesMer.description.intro")}</p>` +
      "<p><ul>" +
      `<li><strong>${t("arbeidstidLesMer.description.fastArbeidstid.tittel")}</strong> ${t(
        "arbeidstidLesMer.description.fastArbeidstid.description"
      )}</li>` +
      `<li><strong>${t("arbeidstidLesMer.description.varierendeArbeidstid.tittel")}</strong> ${t(
        "arbeidstidLesMer.description.varierendeArbeidstid.description"
      )}</li>` +
      "</ul></p>",
  },
  {
    id: harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
    type: "envalg",
    label:
      "Har du jobbet i et annet EØS-land, Sveits eller Storbritannia i løpet av de siste 36 månedene?",
    description:
      "<p>Hvis du bare har jobbet i Norge, skal du svare <b>Nei</b> på dette spørsmålet.</p>" +
      "<p>Andre land i EØS: Belgia, Bulgaria, Danmark, Estland, Finland, Frankrike, Hellas, Irland, Island, Italia, Kroatia, Kypros, Latvia, Liechtenstein, Litauen, Luxembourg, Malta, Nederland, Polen, Portugal, Romania, Slovakia, Slovenia, Spania, Sverige, Tsjekkia, Tyskland, Ungarn og Østerrike.</p>",
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
    visHvis: (svar: ArbeidsforholdSvar) =>
      (svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene) ||
      false,
  },
  {
    id: "harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36MånedeneLesMer",
    type: "lesMer",
    label: t("eosJobb.lesMer.label"),
    description: t("eosJobb.lesMer.description"),
    visHvis: (svar: ArbeidsforholdSvar) =>
      (svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene) ||
      false,
  },
  {
    id: "harIkkeJobbetDeSiste36MånedeneInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: t("harIkkeJobbetInformasjonskort.label"),
    description:
      `<p>${t("harIkkeJobbetInformasjonskort.description.avslag")}</p>` +
      `<p>${t("harIkkeJobbetInformasjonskort.description.unntak")}</p>`,
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[hvordanHarDuJobbet] === harIkkeJobbetDeSiste36Månedene,
  },
];

export const lagArbeidsforholdForklarendeTekstKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: "harJobbetIEøsOgFastArbeidstidIMindreEnn6MånederForklarendeTekst",
    type: "forklarendeTekst",
    description: lagForklarendeTekst(t, "forklarendeTekst.eos.fastArbeidstidIMindreEnn6Maneder"),
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "ja" &&
      svar[hvordanHarDuJobbet] === fastArbeidstidIMindreEnn6Måneder,
  },
  {
    id: "harJobbetIEøsOgFastArbeidstidI6MånederEllerMerForklarendeTekst",
    type: "forklarendeTekst",
    description: lagForklarendeTekst(t, "forklarendeTekst.eos.fastArbeidstidI6ManederEllerMer"),
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "ja" &&
      svar[hvordanHarDuJobbet] === fastArbeidstidI6MånederEllerMer,
  },
  {
    id: "harJobbetIEøsOgVarierendeArbeidstidDeSiste12MånedeneForklarendeTekst",
    type: "forklarendeTekst",
    description: lagForklarendeTekst(
      t,
      "forklarendeTekst.eos.varierendeArbeidstidDeSiste12Manedene"
    ),
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "ja" &&
      svar[hvordanHarDuJobbet] === varierendeArbeidstidDeSiste12Månedene,
  },
  {
    id: "harJobbetIEøsOgJobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12MånedeneForklarendeTekst",
    type: "forklarendeTekst",
    description: lagForklarendeTekst(t, "forklarendeTekst.eos.jobbetMerIGjennomsnitt"),
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "ja" &&
      svar[hvordanHarDuJobbet] === jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  },
  {
    id: "harIkkeJobbetIEøsOgfastArbeidstidIMindreEnn6MånederForklarendeTekst",
    type: "forklarendeTekst",
    description: lagForklarendeTekst(t, "forklarendeTekst.norge.fastArbeidstidIMindreEnn6Maneder"),
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "nei" &&
      svar[hvordanHarDuJobbet] === fastArbeidstidIMindreEnn6Måneder,
  },
  {
    id: "harIkkeJobbetIEøsOgfastArbeidstidI6MånederEllerMerForklarendeTekst",
    type: "forklarendeTekst",
    description: lagForklarendeTekst(t, "forklarendeTekst.norge.fastArbeidstidI6ManederEllerMer"),
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "nei" &&
      svar[hvordanHarDuJobbet] === fastArbeidstidI6MånederEllerMer,
  },
  {
    id: "harIkkeJobbetIEøsOgVarierendeArbeidstidDeSiste12MånedeneForklarendeTekst",
    type: "forklarendeTekst",
    description: lagForklarendeTekst(
      t,
      "forklarendeTekst.norge.varierendeArbeidstidDeSiste12Manedene"
    ),
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "nei" &&
      svar[hvordanHarDuJobbet] === varierendeArbeidstidDeSiste12Månedene,
  },
  {
    id: "harIkkeJobbetIEøsOgJobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12MånedeneForklarendeTekst",
    type: "forklarendeTekst",
    description: lagForklarendeTekst(t, "forklarendeTekst.norge.jobbetMerIGjennomsnitt"),
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "nei" &&
      svar[hvordanHarDuJobbet] === jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  },
];

export const lagArbeidsforholdModalKomponenter = (t: ArbeidsforholdT): KomponentType[] => [
  {
    id: navnetPåBedriften,
    type: "kortTekst",
    label: t("modal.navnetPaBedriften.label"),
    maksLengde: 200,
  },
  {
    id: hvilketLandJobbetDuI,
    type: "land",
    label: t("modal.hvilketLandJobbetDuI.label"),
  },
  {
    id: oppgiPersonnummeretPinDuHaddeIDetteLandet,
    type: "kortTekst",
    label: t("modal.pin.label"),
    maksLengde: 30,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      (svar[hvilketLandJobbetDuI] && svar[hvilketLandJobbetDuI] !== "NOR") || false,
  },
  {
    id: hvordanHarDetteArbeidsforholdetEndretSeg,
    type: "envalg",
    label: t("modal.hvordanHarDetteArbeidsforholdetEndretSeg.label"),
    options: [
      {
        value: arbeidsgiverenMinHarSagtMegOpp,
        label: t(
          "modal.hvordanHarDetteArbeidsforholdetEndretSeg.options.arbeidsgiverenMinHarSagtMegOpp"
        ),
      },
      {
        value: jegHarSagtOppSelv,
        label: t("modal.hvordanHarDetteArbeidsforholdetEndretSeg.options.jegHarSagtOppSelv"),
      },
      {
        value: jegHarFåttAvskjed,
        label: t("modal.hvordanHarDetteArbeidsforholdetEndretSeg.options.jegHarFattAvskjed"),
      },
      {
        value: kontraktenErUtgått,
        label: t("modal.hvordanHarDetteArbeidsforholdetEndretSeg.options.kontraktenErUttgatt"),
      },
      {
        value: arbeidstidenErRedusert,
        label: t("modal.hvordanHarDetteArbeidsforholdetEndretSeg.options.arbeidstidenErRedusert"),
      },
      {
        value: arbeidsgiverErKonkurs,
        label: t("modal.hvordanHarDetteArbeidsforholdetEndretSeg.options.arbeidsgiverErKonkurs"),
      },
      {
        value: jegErPermittert,
        label: t("modal.hvordanHarDetteArbeidsforholdetEndretSeg.options.jegErPermittert"),
      },
      {
        value: arbeidsforholdetErIkkeEndret,
        label: t(
          "modal.hvordanHarDetteArbeidsforholdetEndretSeg.options.arbeidsforholdetErIkkeEndret"
        ),
      },
    ],
  },
];

export const lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter = (
  t: ArbeidsforholdT
): KomponentType[] => [
  {
    id: harDuJobbetSkiftTurnusEllerRotasjon,
    type: "envalg",
    label: t("modal.skiftTurnusRotasjon.harDuJobbet.label"),
    description:
      `<p>${t("modal.skiftTurnusRotasjon.harDuJobbet.description.skiftTurnus")}</p>` +
      `<p>${t("modal.skiftTurnusRotasjon.harDuJobbet.description.rotasjon")}</p>`,
    options: [
      {
        value: skiftEllerTurns,
        label: t("modal.skiftTurnusRotasjon.harDuJobbet.options.skiftEllerTurnus"),
      },
      {
        value: rotasjon,
        label: t("modal.skiftTurnusRotasjon.harDuJobbet.options.rotasjon"),
      },
      {
        value: hverkenSkiftTurnusEllerRotasjon,
        label: t("modal.skiftTurnusRotasjon.harDuJobbet.options.ingenAvDelene"),
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvordanHarDetteArbeidsforholdetEndretSeg] !== undefined,
  },
  {
    id: "harDuJobbetSkiftTurnusEllerRotasjonLesMer",
    type: "lesMer",
    label: t("modal.skiftTurnusRotasjon.lesMer.label"),
    description: `<p>${t("modal.skiftTurnusRotasjon.lesMer.description")}</p>`,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      (svar[hvordanHarDetteArbeidsforholdetEndretSeg] &&
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] !== arbeidsforholdetErIkkeEndret) ||
      false,
  },
  {
    id: "jegHarJobbetRotasjonDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: t("modal.skiftTurnusRotasjon.dokumentasjonskrav.label"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
  },
  {
    id: hvilkenTypeRotasjonsordningJobbetDu,
    type: "envalg",
    label: t("modal.skiftTurnusRotasjon.hvilkenType.label"),
    options: [
      { value: "2-4-rotasjon", label: "2:4" },
      { value: "2-3-rotasjon", label: "2:3" },
      { value: "1-1-rotasjon", label: "1:1" },
      {
        value: annenRotasjon,
        label: t("modal.skiftTurnusRotasjon.hvilkenType.options.annenRotasjon"),
      },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
  },
  {
    id: annenRotasjonBeskrivelse,
    type: "langTekst",
    maksLengde: 500,
    label: t("modal.skiftTurnusRotasjon.annenRotasjon.label"),
    description: t("modal.skiftTurnusRotasjon.annenRotasjon.description"),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvilkenTypeRotasjonsordningJobbetDu] == annenRotasjon,
  },
  {
    id: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto,
    type: "periodeFra",
    periodeLabel: t("modal.skiftTurnusRotasjon.sisteArbeidsperiode.label"),
    label: t("felles.dato.fraDato"),
    referanseId: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato,
    fraOgMed: startOfDay(subYears(new Date(), 5)),
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
  },
  {
    id: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinTilDato,
    type: "periodeTil",
    label: t("felles.dato.tilDato"),
    referanseId: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinFraDto,
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
  },
];

const fallbackT = ((key: string) => key) as unknown as ArbeidsforholdT;

export const arbeidsforholdKomponenter = lagArbeidsforholdKomponenter(fallbackT);

export const arbeidsforholdForklarendeTekstKomponenter =
  lagArbeidsforholdForklarendeTekstKomponenter(fallbackT);

export const arbeidsforholdModalKomponenter = lagArbeidsforholdModalKomponenter(fallbackT);

export const arbeidsforholdModalSkiftTurnusRotasjonKomponenter =
  lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter(fallbackT);
