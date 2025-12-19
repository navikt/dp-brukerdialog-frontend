import { KomponentType } from "~/components/Komponent.types";
import {
  jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  jegErOppsagtHvaHarDuSvartPåTilbudet,
  jegErOppsagtHvaVarÅrsaken,
  jegErOppsagtVarighetPåArbeidsforholdetFraOgMedDato,
  jegErOppsagtVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import {
  jegHarSagtOppHvaVarÅrsaken,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  jegHarFåttAvskjedHvaVarÅrsaken,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import {
  kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUtgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato,
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
  konkursVarighetPåArbeidsforholdetFraOgMedDato,
  konkursVarighetPåArbeidsforholdetTilOgMedDato,
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
export const jegErPermitert = "jegErPermitert";
export const arbeidsforholdetErIkkeEndret = "arbeidsforholdetErIkkeEndret";
export const harDuJobbetSkiftTurnusEllerRotasjon = "harDuJobbetSkiftTurnusEllerRotasjon";
export const skiftEllerTurns = "skiftEllerTurns";
export const rotasjon = "rotasjon";
export const hverkenSkiftTurnusEllerRotasjon = "hverkenSkiftTurnusEllerRotasjon";
export const annenRotasjon = "annenRotasjon";
export const hvilkenTypeRotasjonsordningJobbetDu = "hvilkenTypeRotasjonsordningJobbetDu";
export const annenRotasjonBeskrivelse = "annenRotasjonBeskrivelse";
export const oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed =
  "oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed";
export const oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed =
  "oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed";

export type Arbeidsforhold = ArbeidsforholdModalSvar & {
  id: string;
  dokumentasjonskrav?: string[];
};

export type ArbeidsforholdModalSvar = {
  [navnetPåBedriften]?: string;
  [hvilketLandJobbetDuI]?: string;
  [oppgiPersonnummeretPinDuHaddeIDetteLandet]?: string;
  [hvordanHarDetteArbeidsforholdetEndretSeg]?: string;
  [jegErOppsagtVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [jegErOppsagtVarighetPåArbeidsforholdetTilOgMedDato]?: string;
  [jegErOppsagtHvaVarÅrsaken]?: string;
  [jegErOppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [jegErOppsagtHvaHarDuSvartPåTilbudet]?: string;
  [jegErOppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato]?: string;
  [jegHarSagtOppHvaVarÅrsaken]?: string;
  [jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato]?: string;
  [jegHarFåttAvskjedHvaVarÅrsaken]?: string;
  [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]?: string;
  [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]?: string;
  [arbeidstidenErRedusertHvaErÅrsaken]?: string;
  [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]?: string;
  [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]?: string;
  [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato]?: string;
  [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]?: string;
  [kontraktenErUtgåttHvaHarDuSvartPåTilbudet]?: string;
  [kontraktenErUtgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]?: string;
  [konkursVarighetPåArbeidsforholdetFraOgMedDato]?: string;
  [konkursVarighetPåArbeidsforholdetTilOgMedDato]?: string;
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
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed]?: string;
  [oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed]?: string;
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

export const arbeidsforholdKomponenter: KomponentType[] = [
  {
    id: hvordanHarDuJobbet,
    type: "envalg",
    label: "Hvilke av de følgende alternativene passer best med hvordan du har jobbet?",
    options: [
      {
        value: fastArbeidstidIMindreEnn6Måneder,
        label: "Jeg har hatt fast arbeidstid i mindre enn seks måneder",
      },
      {
        value: fastArbeidstidI6MånederEllerMer,
        label: "Jeg har hatt fast arbeidstid i seks måneder eller mer",
      },
      {
        value: varierendeArbeidstidDeSiste12Månedene,
        label: "Jeg har hatt varierende arbeidstid de siste 12 månedene",
      },
      {
        value: jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
        label: "Jeg har jobbet mer i gjennomsnitt de siste 36 månedene enn de siste 12 månedene",
      },
      {
        value: harIkkeJobbetDeSiste36Månedene,
        label: "Jeg har ikke vært i jobb de siste 36 månedene",
      },
    ],
  },
  {
    id: "lesMerOmArbeidstidLesMer",
    type: "lesMer",
    label: "Les mer om arbeidstid",
    description:
      "<p>Når vi vurderer om du har rett til dagpenger ser vi på hvor mye du har jobbet, og om arbeidstiden din er redusert med minst 50 prosent.</p>" +
      "<p><ul><li><strong>Fast arbeidstid</strong> betyr at du har en arbeidsavtale med fast stillingsprosent eller fast antall arbeidstimer.</li>" +
      "<li><strong>Varierende arbeidstid</strong> betyr at arbeidstiden din varierer per uke eller per måned. Du kan for eksempel ha hatt flere korte arbeidsforhold, jobbet som vikar eller ekstrahjelp.</li></ul></p>",
  },
  {
    id: harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
    type: "envalg",
    label:
      "Har du jobbet i et annet EØS-land, Sveits eller Storbritannia i løpet av de siste 36 månedene?",
    description:
      "Andre land i EØS: Belgia, Bulgaria, Danmark, Estland, Finland, Frankrike, Hellas, Irland, Island, Italia, Kroatia, Kypros, Latvia, Liechtenstein, Litauen, Luxembourg, Malta, Nederland, Polen, Portugal, Romania, Slovakia, Slovenia, Spania, Sverige, Tsjekkia, Tyskland, Ungarn og Østerrike.",
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
    label: "Grunnen til at vi spør om dette og andre EØS land",
    description:
      "Hvis du har jobbet i et annet EØS-land, Sveits eller Storbritannia kan du ha rett til å få overført arbeidsperioder du har hatt der. Da vil de regnes med i vurderingen av retten til dagpenger i Norge.",
    visHvis: (svar: ArbeidsforholdSvar) =>
      (svar[hvordanHarDuJobbet] && svar[hvordanHarDuJobbet] !== harIkkeJobbetDeSiste36Månedene) ||
      false,
  },
  {
    id: "harIkkeJobbetDeSiste36MånedeneInformasjonskort",
    type: "informasjonskort",
    variant: "advarsel",
    label: "Du kan få avslag på søknaden",
    description:
      "<p>Hvis du ikke har vært i arbeid, har du i utgangspunktet ikke rett til dagpenger. Du må derfor regne med å få avslag på søknaden din.</p>" +
      "<p>Unntaket er hvis du har avtjent verneplikt i minst tre av de siste tolv månedene. Du legger ved dokumentasjon på at du har avtjent verneplikt senere i søknaden.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[hvordanHarDuJobbet] === harIkkeJobbetDeSiste36Månedene,
  },
];

export const arbeidsforholdForklarendeTekstKomponenter: KomponentType[] = [
  {
    id: "harJobbetIEøsOgFastArbeidstidIMindreEnn6MånederForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<h3>Dine arbeidsforhold</h3>" +
      "<p>Du må legge til alle arbeidsforholdene du har hatt i EØS-land, Sveits eller Storbritannia de siste 36 månedene og alle arbeidsforhold du har hatt i Norge de siste 12 månedene.</p>" +
      "<p>Du trenger ikke å legge ved dokumentasjon du har sendt inn i forbindelse med en tidligere søknad om dagpenger.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "ja" &&
      svar[hvordanHarDuJobbet] === fastArbeidstidIMindreEnn6Måneder,
  },
  {
    id: "harJobbetIEøsOgFastArbeidstidI6MånederEllerMerForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<h3>Dine arbeidsforhold</h3>" +
      "<p>Du må legge til alle arbeidsforholdene du har hatt i EØS-land, Sveits eller Storbritannia de siste 36 månedene og alle arbeidsforhold du har hatt i Norge de siste 6 månedene.<p>" +
      "<p>Du trenger ikke å legge ved dokumentasjon du har sendt inn i forbindelse med en tidligere søknad om dagpenger.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "ja" &&
      svar[hvordanHarDuJobbet] === fastArbeidstidI6MånederEllerMer,
  },
  {
    id: "harJobbetIEøsOgVarierendeArbeidstidDeSiste12MånedeneForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<h3>Dine arbeidsforhold</h3>" +
      "<p>Du må legge til alle arbeidsforholdene du har hatt i EØS-land, Sveits eller Storbritannia de siste 36 månedene og alle arbeidsforhold du har hatt i Norge de siste 12 månedene.</p>" +
      "<p>Du trenger ikke å legge ved dokumentasjon du har sendt inn i forbindelse med en tidligere søknad om dagpenger.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "ja" &&
      svar[hvordanHarDuJobbet] === varierendeArbeidstidDeSiste12Månedene,
  },
  {
    id: "harJobbetIEøsOgJobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12MånedeneForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<h3>Dine arbeidsforhold</h3>" +
      "<p>Du må legge til alle arbeidsforholdene du har hatt i EØS-land, Sveits, Storbritannia og Norge de siste 36 månedene.</p>" +
      "<p>Du trenger ikke å legge ved dokumentasjon du har sendt inn i forbindelse med en tidligere søknad om dagpenger.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "ja" &&
      svar[hvordanHarDuJobbet] === jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  },
  {
    id: "harIkkeJobbetIEøsOgfastArbeidstidIMindreEnn6MånederForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<h3>Dine arbeidsforhold</h3>" +
      "<p>Du må legge til alle arbeidsforholdene du har hatt de siste 12 månedene.</p>" +
      "<p>Du trenger ikke å legge ved dokumentasjon du har sendt inn i forbindelse med en tidligere søknad om dagpenger.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "nei" &&
      svar[hvordanHarDuJobbet] === fastArbeidstidIMindreEnn6Måneder,
  },
  {
    id: "harIkkeJobbetIEøsOgfastArbeidstidI6MånederEllerMerForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<h3>Dine arbeidsforhold</h3>" +
      "<p>Du må legge til alle arbeidsforholdene du har hatt de siste 6 månedene.</p>" +
      "<p>Du trenger ikke å legge ved dokumentasjon du har sendt inn i forbindelse med en tidligere søknad om dagpenger.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "nei" &&
      svar[hvordanHarDuJobbet] === fastArbeidstidI6MånederEllerMer,
  },
  {
    id: "harIkkeJobbetIEøsOgVarierendeArbeidstidDeSiste12MånedeneForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<h3>Dine arbeidsforhold</h3>" +
      "<p>Du må legge til alle arbeidsforholdene du har hatt de siste 12 månedene.</p>" +
      "<p>Du trenger ikke å legge ved dokumentasjon du har sendt inn i forbindelse med en tidligere søknad om dagpenger.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "nei" &&
      svar[hvordanHarDuJobbet] === varierendeArbeidstidDeSiste12Månedene,
  },
  {
    id: "harIkkeJobbetIEøsOgJobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12MånedeneForklarendeTekst",
    type: "forklarendeTekst",
    description:
      "<h3>Dine arbeidsforhold</h3>" +
      "<p>Du må legge til alle arbeidsforhold du har hatt i løpet av de siste 36 månedene.</p>" +
      "<p>Du trenger ikke å legge ved dokumentasjon du har sendt inn i forbindelse med en tidligere søknad om dagpenger.</p>",
    visHvis: (svar: ArbeidsforholdSvar) =>
      svar[harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene] === "nei" &&
      svar[hvordanHarDuJobbet] === jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  },
];

export const arbeidsforholdModalKomponenter: KomponentType[] = [
  {
    id: navnetPåBedriften,
    type: "kortTekst",
    label: "Navnet på bedriften",
  },
  {
    id: hvilketLandJobbetDuI,
    type: "land",
    label: "Hvilket land jobbet du i?",
  },
  {
    id: oppgiPersonnummeretPinDuHaddeIDetteLandet,
    type: "kortTekst",
    label: "Oppgi personnummeret (PIN) som du hadde i dette landet",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      (svar[hvilketLandJobbetDuI] && svar[hvilketLandJobbetDuI] !== "NOR") || false,
  },
  {
    id: hvordanHarDetteArbeidsforholdetEndretSeg,
    type: "envalg",
    label: "Hvordan har dette arbeidsforholdet endret seg?",
    options: [
      { value: arbeidsgiverenMinHarSagtMegOpp, label: "Arbeidsgiveren min har sagt meg opp" },
      { value: jegHarSagtOppSelv, label: "Jeg har sagt opp selv" },
      { value: jegHarFåttAvskjed, label: "Jeg har fått avskjed" },
      { value: kontraktenErUtgått, label: "Kontrakten er utgått" },
      { value: arbeidstidenErRedusert, label: "Arbeidstiden er redusert" },
      { value: arbeidsgiverErKonkurs, label: "Arbeidsgiver er konkurs" },
      { value: jegErPermitert, label: "Jeg er permittert" },
      { value: arbeidsforholdetErIkkeEndret, label: "Arbeidsforholdet er ikke endret" },
    ],
  },
];

export const arbeidsforholdModalSkiftTurnusRotasjonKomponenter: KomponentType[] = [
  {
    id: harDuJobbetSkiftTurnusEllerRotasjon,
    type: "envalg",
    label: "Har du jobbet du skift, turnus eller rotasjon?",
    description:
      "<p>Skift eller turnus kan være når du har avtale om å arbeide ulike tider i ulike uker, som for eksempel dagtid en uke og kveldstid en uke, eller har fri hver tredje helg.</p>" +
      "<p>En rotasjon er for eksempel at du arbeider to uker og har fri i to uker.</p>",
    options: [
      { value: skiftEllerTurns, label: "Ja, jeg har jobbet skift eller turnus" },
      { value: rotasjon, label: "Ja, jeg har jobbet rotasjon" },
      { value: hverkenSkiftTurnusEllerRotasjon, label: "Nei, ingen av delene" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      (svar[hvordanHarDetteArbeidsforholdetEndretSeg] &&
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] !== arbeidsforholdetErIkkeEndret) ||
      false,
  },
  {
    id: "harDuJobbetSkiftTurnusEllerRotasjonLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette",
    description:
      "<p>Vi må vite hvilken arbeidstidsordning du har for å gi deg dagpenger fra riktig dato.</p>",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      (svar[hvordanHarDetteArbeidsforholdetEndretSeg] &&
        svar[hvordanHarDetteArbeidsforholdetEndretSeg] !== arbeidsforholdetErIkkeEndret) ||
      false,
  },
  {
    id: "jegHarJobbetRotasjonDokumentasjonskravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon av rotasjonsordningen og den siste arbeidsperioden din",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
  },
  {
    id: hvilkenTypeRotasjonsordningJobbetDu,
    type: "envalg",
    label: "Hvilke type rotasjonsordning jobbet du?",
    options: [
      { value: "2-4-rotasjon", label: "2:4" },
      { value: "2-3-rotasjon", label: "2:3" },
      { value: "1-1-rotasjon", label: "1:1" },
      { value: annenRotasjon, label: "Annen rotasjon" },
    ],
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
  },
  {
    id: annenRotasjonBeskrivelse,
    type: "langTekst",
    maxLength: 500,
    label: "Annen rotasjon",
    description: "Beskriv kort den avtalte rotasjonsordningen din",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[hvilkenTypeRotasjonsordningJobbetDu] == annenRotasjon,
  },
  {
    id: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoFraOgMed,
    type: "periodeFra",
    periodeLabel: "Oppgi siste arbeidsperiode du hadde i den siste rotasjonen din",
    label: "Fra og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
  },
  {
    id: oppgiSisteArbeidsperiodeIDenSisteRotasjonenDinDatoTilOgMed,
    type: "periodeTil",
    label: "Til og med",
    visHvis: (svar: ArbeidsforholdModalSvar) =>
      svar[harDuJobbetSkiftTurnusEllerRotasjon] == rotasjon,
  },
];
