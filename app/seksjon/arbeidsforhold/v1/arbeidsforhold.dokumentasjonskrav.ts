import {
  arbeidsgiverenMinHarSagtMegOpp,
  arbeidsgiverErKonkurs,
  arbeidstidenErRedusert,
  arbeidsforholdetErIkkeEndret,
  harDuJobbetSkiftTurnusEllerRotasjon,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegErPermittert,
  jegHarFåttAvskjed,
  jegHarSagtOppSelv,
  kontraktenErUtgått,
  rotasjon,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { Dokumentasjonskrav, DokumentasjonskravType } from "~/seksjon/dokumentasjon/dokumentasjon.types";

export function lagDokumentasjonskrav(
  jobbetSkiftTurnusEllerRotasjon: string,
  arbeidsforholdSituasjon: string,
  bedriftNavn: string
): Dokumentasjonskrav[] {
  const dokumentasjonskrav = new Array<Dokumentasjonskrav>();

  switch (arbeidsforholdSituasjon) {
    case arbeidsgiverenMinHarSagtMegOpp:
      dokumentasjonskrav.push(
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "O2",
          tittel: `Arbeidsavtale - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T8",
          tittel: `Oppsigelse - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp,
        }
      );
      break;
    case jegHarSagtOppSelv:
      dokumentasjonskrav.push(
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "O2",
          tittel: `Arbeidsavtale - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T8",
          tittel: `Oppsigelse - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdJegHarSagtOppSelv,
        }
      );
      break;
    case jegHarFåttAvskjed:
      dokumentasjonskrav.push(
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "O2",
          tittel: `Arbeidsavtale - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T8",
          tittel: `Avskjedigelse - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdAvskjedigelse,
        }
      );
      break;
    case kontraktenErUtgått:
    case arbeidsforholdetErIkkeEndret:
      dokumentasjonskrav.push({
        id: crypto.randomUUID(),
        seksjonId: "arbeidsforhold",
        spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
        skjemakode: "O2",
        tittel: `Arbeidsavtale - ${bedriftNavn}`,
        type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
      });
      break;
    case arbeidstidenErRedusert:
      dokumentasjonskrav.push(
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "O2",
          tittel: `Arbeidsavtale - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T8",
          tittel: `Redusert arbeidstid - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdRedusertArbeidstid,
        }
      );
      break;
    case arbeidsgiverErKonkurs:
      dokumentasjonskrav.push(
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "O2",
          tittel: `Arbeidsavtale - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "M7",
          tittel: `Oppsigelse fra bostyrer/konkursforvalter - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter,
        }
      );
      break;
    case jegErPermittert:
      dokumentasjonskrav.push(
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "O2",
          tittel: `Arbeidsavtale - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T6",
          tittel: `Permitteringsvarsel - ${bedriftNavn}`,
          type: DokumentasjonskravType.ArbeidsforholdPermitteringsvarsel,
        }
      );
      break;
  }

  if (jobbetSkiftTurnusEllerRotasjon === rotasjon) {
    dokumentasjonskrav.push({
      id: crypto.randomUUID(),
      seksjonId: "arbeidsforhold",
      spørsmålId: harDuJobbetSkiftTurnusEllerRotasjon,
      skjemakode: "M6",
      tittel: `Dokumentasjon av rotasjonsordningen - ${bedriftNavn}`,
      type: DokumentasjonskravType.ArbeidsforholdRotasjon,
    });
  }

  return dokumentasjonskrav;
}
