import { z } from "zod";
import {
  arbeidsforholdModalSpørsmål,
  ArbeidsforholdModalSvar,
  arbeidsforholdSpørsmål,
  ArbeidsforholdSvar,
  fastArbeidstidI6MånederEllerMer,
  fastArbeidstidIMindreEnn6Måneder,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harIkkeJobbetDeSiste36Månedene,
  hvilketLandJobbetDuI,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  hvordanHarDuJobbet,
  jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
  navnetPåBedriften,
  oppgiPersonnummeretPinDuHaddeIDetteLandet,
  varierendeArbeidstidDeSiste12Månedene,
  varighetPåArbeidsforholdetFraOgMedDato,
  varighetPåArbeidsforholdetTilOgMedDato,
} from "./arbeidsforhold.spørsmål";
import { payload } from "~/seksjon/egen-næring/egen-næring.spørsmål";
import {
  arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål,
  oppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  oppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  oppsagtHvaHarDuSvartPåTilbudet,
  oppsagtHvaVarÅrsaken,
  oppsagtHvorMangeTimerHarDuJobbetIUka,
  oppsagtVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.oppsagt";
import {
  arbeidsforholdModalJegHarSagtOppSelvSpørsmål,
  sagtOppHvaVarÅrsaken,
  sagtOppHvorMangeTimerHarDuJobbetIUka,
  sagtOppVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.sagtOpp";
import {
  arbeidsforholdModalJegHarFåttAvskjedSpørsmål,
  avskjedigetHvaVarÅrsaken,
  avskjedigetHvorMangeTimerHarDuJobbetIUka,
  avskjedigetVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.avskjediget";
import {
  arbeidsforholdModalKontraktenErUgåttSpørsmål,
  kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  kontraktenErUgåttHvaHarDuSvartPåTilbudet,
  kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver,
  kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka,
  kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.kontraktenErUgått";
import {
  arbeidsforholdModalArbeidstidenErRedusertSpørsmål,
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge,
  arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet,
  arbeidstidenErRedusertHvaErÅrsaken,
  arbeidstidenErRedusertHvaHarDuSvartPåTilbudet,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
  arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka,
  arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.arbeidstidenErRedusert";
import {
  arbeidsforholdModalArbeidsgiverErKonkursSpørsmål,
  konkursVetDuHvorMangeTimerDuJobbetIUka,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.konkurs";

export const arbeidsforholdSchema = z
  .object({
    [payload]: z.string().optional(),
    [hvordanHarDuJobbet]: z
      .enum([
        fastArbeidstidIMindreEnn6Måneder,
        fastArbeidstidI6MånederEllerMer,
        varierendeArbeidstidDeSiste12Månedene,
        jobbetMerIGjennomsnittDeSiste36MånedeneEnnDeSiste12Månedene,
        harIkkeJobbetDeSiste36Månedene,
      ])
      .optional(),
    [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]: z
      .enum(["ja", "nei"])
      .optional(),
  })
  .superRefine((data, ctx) => {
    arbeidsforholdSpørsmål.forEach((spørsmål) => {
      const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
      const spørsmålId = spørsmål.id as keyof ArbeidsforholdSvar;
      const svar = data[spørsmålId];

      const erSpørsmål =
        spørsmål.type !== "lesMer" &&
        spørsmål.type !== "varselmelding" &&
        spørsmål.type !== "dokumentasjonskravindikator";

      if (synlig && !svar && erSpørsmål && !spørsmål.optional) {
        ctx.addIssue({
          path: [spørsmål.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });

export const arbeidsforholdModalSchema = z
  .object({
    [navnetPåBedriften]: z.string().optional(),
    [hvilketLandJobbetDuI]: z.string().optional(),
    [oppgiPersonnummeretPinDuHaddeIDetteLandet]: z.string().optional(),
    [varighetPåArbeidsforholdetFraOgMedDato]: z.string().optional(),
    [varighetPåArbeidsforholdetTilOgMedDato]: z.string().optional(),
    [hvordanHarDetteArbeidsforholdetEndretSeg]: z.string().optional(),
    [oppsagtHvaVarÅrsaken]: z.string().optional(),
    [sagtOppHvaVarÅrsaken]: z.string().optional(),
    [avskjedigetHvaVarÅrsaken]: z.string().optional(),
    [arbeidstidenErRedusertHvaErÅrsaken]: z.string().optional(),
    [arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet]: z.string().optional(),
    [arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]: z.string().optional(),
    [oppsagtVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [sagtOppVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [avskjedigetVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [kontraktenErUtgåttVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [arbeidstidenErRedusertVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [konkursVetDuHvorMangeTimerDuJobbetIUka]: z.string().optional(),
    [oppsagtHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [sagtOppHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [avskjedigetHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [kontraktenErUtgåttHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [arbeidstidenErRedusertHvorMangeTimerHarDuJobbetIUka]: z.string().optional(),
    [oppsagtHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]: z
      .string()
      .optional(),
    [kontraktenErUtgåttHarDuFåttTilbudOmForlengelseAvArbeidskontraktenEllerTilbudOmEnAnnenStillingHosArbeidsgiver]:
      z.string().optional(),
    [arbeidstidenErRedusertHarDuFåttTilbudOmÅFortsetteHosArbeidsgiverenDinIAnnenStillingEllerEtAnnetStedINorge]:
      z.string().optional(),
    [oppsagtHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [kontraktenErUgåttHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [arbeidstidenErRedusertHvaHarDuSvartPåTilbudet]: z.string().optional(),
    [oppsagtHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [kontraktenErUgåttHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
    [arbeidstidenErRedusertHvaErGrunnenTilAtDuIkkeHarTattImotTilbudet]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    arbeidsforholdModalSpørsmål
      .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål)
      .concat(arbeidsforholdModalJegHarSagtOppSelvSpørsmål)
      .concat(arbeidsforholdModalJegHarFåttAvskjedSpørsmål)
      .concat(arbeidsforholdModalKontraktenErUgåttSpørsmål)
      .concat(arbeidsforholdModalArbeidstidenErRedusertSpørsmål)
      .concat(arbeidsforholdModalArbeidsgiverErKonkursSpørsmål)
      .forEach((spørsmål) => {
        const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
        const spørsmålId = spørsmål.id as keyof ArbeidsforholdModalSvar;
        const svar = data[spørsmålId];
        const erSpørsmål =
          spørsmål.type !== "lesMer" &&
          spørsmål.type !== "varselmelding" &&
          spørsmål.type !== "dokumentasjonskravindikator";

        if (synlig && !svar && erSpørsmål && !spørsmål.optional) {
          ctx.addIssue({
            path: [spørsmål.id],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }
      });
  });
