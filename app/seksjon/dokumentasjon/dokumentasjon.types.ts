import {
  dokumentkravEttersendt,
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSenderSenere,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
} from "./dokumentasjonskrav.komponenter";

export type Dokumentasjonskrav = {
  id: string;
  spørsmålId: string;
  tittel?: string;
  skjemakode: string;
  seksjonId: string;
  type: DokumentasjonskravType;
  svar?: GyldigDokumentkravSvar;
  begrunnelse?: string;
  filer?: DokumentkravFil[] | null;
  bundle?: Bundle | null;
};

export type Bundle = {
  filnavn: string;
  urn: string;
  filsti: string;
  storrelse: number;
  tidspunkt: string;
};

export enum DokumentasjonskravType {
  Barn = "Barn",
  ArbeidsforholdArbeidsavtale = "ArbeidsforholdArbeidsavtale",
  ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp = "ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp",
  ArbeidsforholdJegHarSagtOppSelv = "ArbeidsforholdJegHarSagtOppSelv",
  ArbeidsforholdAvskjedigelse = "ArbeidsforholdAvskjedigelse",
  ArbeidsforholdRedusertArbeidstid = "ArbeidsforholdRedusertArbeidstid",
  ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter = "ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter",
  ArbeidsforholdPermitteringsvarsel = "ArbeidsforholdPermitteringsvarsel",
  ArbeidsforholdRotasjon = "ArbeidsforholdRotasjon",
  Tjenestebevis = "Tjenestebevis",
  Utdanning = "Utdanning",
  ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid = "ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid",
  ReellArbeidssøkerKanIkkeJobbeHeleNorge = "ReellArbeidssøkerKanIkkeJobbeHeleNorge",
  ReellArbeidssøkerKanIkkeTaAlleTyperArbeid = "ReellArbeidssøkerKanIkkeTaAlleTyperArbeid",
  AnnenPengestøtteFraAndreEøsLand = "AnnenPengestøtteFraAndreEøsLand",
  AnnenPengestøtteFraNorgePensjonFraAndre = "AnnenPengestøtteFraNorgePensjonFraAndre",
  AnnenPengestøtteFraNorgePengestøtteFraGff = "AnnenPengestøtteFraNorgePengestøtteFraGff",
  AndreUtbetalingerEllerGoderFraTidligereArbeidsgiver = "AndreUtbetalingerEllerGoderFraTidligereArbeidsgiver",
}

export type GyldigDokumentkravSvar =
  | typeof dokumentkravSvarSendNå
  | typeof dokumentkravSvarSenderSenere
  | typeof dokumentkravSvarSendtTidligere
  | typeof dokumentkravSvarSenderIkke
  | typeof dokumentkravEttersendt;

export type DokumentkravFil = {
  id: string;
  filnavn: string;
  urn?: string;
  tidspunkt?: string;
  storrelse?: number;
  filsti?: string;
  lasterOpp?: boolean;
  file?: File;
  feil?: FilOpplastingFeilType;
};

export enum FilOpplastingFeilType {
  FIL_FOR_STOR = "FIL_FOR_STOR",
  UGYLDIG_FORMAT = "UGYLDIG_FORMAT",
  TEKNISK_FEIL = "TEKNISK_FEIL",
  DUPLIKAT_FIL = "DUPLIKAT_FIL",
  UKJENT_FEIL = "UKJENT_FEIL",
}
