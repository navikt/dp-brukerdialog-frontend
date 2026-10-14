import type { TFunction } from "i18next";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import {
  arbeidsforholdetErIkkeEndret,
  arbeidsgiverenMinHarSagtMegOpp,
  arbeidsgiverErKonkurs,
  arbeidstidenErRedusert,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harDuJobbetSkiftTurnusEllerRotasjon,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegErPermittert,
  jegHarFåttAvskjed,
  jegHarSagtOppSelv,
  kontraktenErUtgått,
  rotasjon,
} from "./arbeidsforhold.komponenter";
import { finnLandnavnMedLocale } from "~/utils/land.utils";

export function lagDokumentasjonskrav(
  t: TFunction,
  jobbetSkiftTurnusEllerRotasjon: string,
  arbeidsforholdSituasjon: string,
  bedriftNavn: string,
  harJobbetEØSLand?: boolean,
  eøsLand?: string
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
          tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T8",
          tittel: t("dokumentasjonskrav.oppsigelse", { bedrift: bedriftNavn }),
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
          tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T8",
          tittel: t("dokumentasjonskrav.oppsigelse", { bedrift: bedriftNavn }),
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
          tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T8",
          tittel: t("dokumentasjonskrav.avskjedigelse", { bedrift: bedriftNavn }),
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
        tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
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
          tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T8",
          tittel: t("dokumentasjonskrav.redusertArbeidstid", { bedrift: bedriftNavn }),
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
          tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "M7",
          tittel: t("dokumentasjonskrav.oppsigelseFraBostyrer", { bedrift: bedriftNavn }),
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
          tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        },
        {
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "T6",
          tittel: t("dokumentasjonskrav.permitteringsvarsel", { bedrift: bedriftNavn }),
          type: DokumentasjonskravType.ArbeidsforholdPermitteringsvarsel,
        }
      );
      break;
  }

  if (harJobbetEØSLand && eøsLand) {
    const eøsLandNavn = finnLandnavnMedLocale(eøsLand);

    const eøsArbeidsforholdDokumentasjonskrav = {
      id: crypto.randomUUID(),
      seksjonId: "arbeidsforhold",
      spørsmålId: harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
      skjemakode: "O2",
      tittel: t("dokumentasjonskrav.arbeidsavtaleAnnetEØSLand", { land: eøsLandNavn }),
      type: DokumentasjonskravType.ArbeidsforholdAnnetEØSLand,
    };

    dokumentasjonskrav.push(eøsArbeidsforholdDokumentasjonskrav);
  }

  if (jobbetSkiftTurnusEllerRotasjon === rotasjon) {
    dokumentasjonskrav.push({
      id: crypto.randomUUID(),
      seksjonId: "arbeidsforhold",
      spørsmålId: harDuJobbetSkiftTurnusEllerRotasjon,
      skjemakode: "M6",
      tittel: t("dokumentasjonskrav.rotasjonsordning", { bedrift: bedriftNavn }),
      type: DokumentasjonskravType.ArbeidsforholdRotasjon,
    });
  }

  return dokumentasjonskrav;
}
