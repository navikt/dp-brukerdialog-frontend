import { BriefcaseIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, InlineMessage, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { useTranslation } from "react-i18next";
import { action, loader } from "~/routes/$soknadId.arbeidsforhold";
import {
  ModalOperasjon,
  useArbeidsforholdContext,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.context";
import {
  Arbeidsforhold,
  ArbeidsforholdResponse,
  ArbeidsforholdSvar,
  handling,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harIkkeJobbetDeSiste36Månedene,
  hvordanHarDuJobbet,
  lagArbeidsforholdForklarendeTekstKomponenter,
  lagArbeidsforholdKomponenter,
  lagArbeidsforholdModalKomponenter,
  lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  pdfGrunnlag,
  seksjonsvar,
} from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter";
import { lagArbeidsforholdModalArbeidstidenErRedusertKomponenter } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { lagArbeidsforholdModalJegHarFåttAvskjedKomponenter } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.avskjediget";
import { lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.ikkeEndret";
import { lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.jegErOppsagt";
import { lagArbeidsforholdModalJegHarSagtOppSelvKomponenter } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.jegHarSagtOpp";
import { lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.konkurs";
import { lagArbeidsforholdModalKontraktenErUtgåttKomponenter } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.kontraktenErUtgått";
import { lagArbeidsforholdModalJegErPermittertKomponenter } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.komponenter.permittert";
import { arbeidsforholdSchema } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.schema";
import { ArbeidsforholdDetaljer } from "~/seksjon/arbeidsforhold/v2/komponenter/ArbeidsforholdDetaljer";
import { ArbeidsforholdModal } from "~/seksjon/arbeidsforhold/v2/komponenter/ArbeidsforholdModal";
import { useSoknad } from "~/seksjon/soknad.context";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { validerSvar } from "~/utils/validering.utils";

export function ArbeidsforholdViewV2() {
  const ref = useRef<HTMLDialogElement>(null);
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [visManglerArbeidsforholdFeilmelding, setVisManglerArbeidsforholdFeilmelding] =
    useState(false);
  const {
    registrerteArbeidsforhold,
    setRegistrerteArbeidsforhold,
    modalData,
    setModalData,
    setDokumentasjonskrav,
    dokumentasjonskrav,
  } = useArbeidsforholdContext();
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();
  const { t } = useTranslation("arbeidsforhold/v2");

  const arbeidsforholdKomponenter = lagArbeidsforholdKomponenter(t);
  const arbeidsforholdForklarendeTekstKomponenter = lagArbeidsforholdForklarendeTekstKomponenter(t);
  const arbeidsforholdModalKomponenter = lagArbeidsforholdModalKomponenter(t);
  const arbeidsforholdModalSkiftTurnusRotasjonKomponenter =
    lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter(t);
  const arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter =
    lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter(t);
  const arbeidsforholdModalJegHarSagtOppSelvKomponenter =
    lagArbeidsforholdModalJegHarSagtOppSelvKomponenter(t);
  const arbeidsforholdModalJegHarFåttAvskjedKomponenter =
    lagArbeidsforholdModalJegHarFåttAvskjedKomponenter(t);
  const arbeidsforholdModalKontraktenErUtgåttKomponenter =
    lagArbeidsforholdModalKontraktenErUtgåttKomponenter(t);
  const arbeidsforholdModalArbeidstidenErRedusertKomponenter =
    lagArbeidsforholdModalArbeidstidenErRedusertKomponenter(t);
  const arbeidsforholdModalArbeidsgiverErKonkursKomponenter =
    lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter(t);
  const arbeidsforholdModalJegErPermittertKomponenter =
    lagArbeidsforholdModalJegErPermittertKomponenter(t);
  const arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter =
    lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter(t);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: arbeidsforholdSchema,
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

  useNullstillSkjulteFelter<ArbeidsforholdSvar>(form, arbeidsforholdKomponenter);

  useEffect(() => {
    if (modalData) {
      ref.current?.showModal();
    }
  }, [modalData]);

  useEffect(() => {
    setVisManglerArbeidsforholdFeilmelding(false);
  }, [registrerteArbeidsforhold.length]);

  useEffect(() => {
    if (form.value(hvordanHarDuJobbet) === harIkkeJobbetDeSiste36Månedene) {
      setRegistrerteArbeidsforhold([]);
      setDokumentasjonskrav([]);
    }
  }, [form.value(hvordanHarDuJobbet)]);

  function lagArbeidsforholdResponse(): ArbeidsforholdResponse {
    return {
      [hvordanHarDuJobbet]: form.transient.value(hvordanHarDuJobbet),
      [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]:
        form.transient.value(
          harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
        ),
      registrerteArbeidsforhold: registrerteArbeidsforhold,
    };
  }

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: t("side.overskrift"),
      spørsmål: [
        ...lagSeksjonPayload(arbeidsforholdKomponenter, form.transient.value()),
        ...lagSeksjonPayload(arbeidsforholdForklarendeTekstKomponenter, form.transient.value()),
        ...registrerteArbeidsforhold.map((etArbeidsforhold) =>
          lagSeksjonPayload(
            arbeidsforholdModalKomponenter
              .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter)
              .concat(arbeidsforholdModalJegHarSagtOppSelvKomponenter)
              .concat(arbeidsforholdModalJegHarFåttAvskjedKomponenter)
              .concat(arbeidsforholdModalKontraktenErUtgåttKomponenter)
              .concat(arbeidsforholdModalArbeidstidenErRedusertKomponenter)
              .concat(arbeidsforholdModalArbeidsgiverErKonkursKomponenter)
              .concat(arbeidsforholdModalJegErPermittertKomponenter)
              .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter)
              .concat(arbeidsforholdModalSkiftTurnusRotasjonKomponenter),
            etArbeidsforhold
          )
        ),
      ],
    };

    return JSON.stringify(pdfPayload);
  }

  function hentDokumentasjonskrav() {
    return dokumentasjonskrav.length > 0 ? JSON.stringify(dokumentasjonskrav) : "null";
  }

  function mellomlagreSvar(ønsketHandling: Seksjonshandling) {
    const arbeidsforholdResponse = lagArbeidsforholdResponse();

    form.setValue(handling, ønsketHandling);
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
    form.setValue(seksjonsvar, JSON.stringify(arbeidsforholdResponse));
    form.submit();
  }

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

    const manglerArbeidsforhold =
      form.value(hvordanHarDuJobbet) &&
      form.value(hvordanHarDuJobbet) !== harIkkeJobbetDeSiste36Månedene &&
      registrerteArbeidsforhold.length === 0;

    if (manglerArbeidsforhold) {
      setVisManglerArbeidsforholdFeilmelding(true);
      return;
    }

    if (klarTilLagring) {
      form.setValue(handling, Seksjonshandling.neste);
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
      form.setValue(seksjonsvar, JSON.stringify(lagArbeidsforholdResponse()));
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <title>{t("side.tittel")}</title>
      <VStack gap="space-24">
        <Form id={formId} action={formAction}>
          <VStack gap="space-24">
            <Heading size="medium" level="2">
              {t("side.overskrift")}
            </Heading>
            <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
            {arbeidsforholdKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(formValues)) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formValues={formValues}
                  formScope={form.scope(komponent.id as keyof ArbeidsforholdSvar)}
                />
              );
            })}

            {form.value(hvordanHarDuJobbet) &&
              form.value(hvordanHarDuJobbet) !== harIkkeJobbetDeSiste36Månedene &&
              form.value(
                harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
              ) && (
                <VStack className="mt-16" gap="space-24">
                  {arbeidsforholdForklarendeTekstKomponenter.map((komponent) => {
                    if (komponent.visHvis && !komponent.visHvis(formValues)) {
                      return null;
                    }

                    return (
                      <Komponent
                        key={komponent.id}
                        props={komponent}
                        formValues={formValues}
                        formScope={form.scope(komponent.id as keyof ArbeidsforholdSvar)}
                      />
                    );
                  })}
                  {registrerteArbeidsforhold?.map((arbeidsforhold: Arbeidsforhold) => (
                    <ArbeidsforholdDetaljer
                      key={arbeidsforhold.id}
                      arbeidsforhold={arbeidsforhold}
                    />
                  ))}
                  <HStack>
                    <Button
                      variant="secondary"
                      type="button"
                      icon={<BriefcaseIcon aria-hidden />}
                      onClick={() => {
                        setModalData({
                          operasjon: ModalOperasjon.LeggTil,
                          form: form,
                        });
                      }}
                    >
                      {t("navigasjon.leggTilArbeidsforhold")}
                    </Button>
                  </HStack>
                  {visManglerArbeidsforholdFeilmelding && (
                    <InlineMessage status="error">
                      {t("navigasjon.manglerArbeidsforhold")}
                    </InlineMessage>
                  )}
                </VStack>
              )}

            {actionData && (
              <SeksjonTekniskFeil tittel={t("tekniskFeil.tittel")} beskrivelse={actionData.error} />
            )}
          </VStack>
        </Form>
        <SeksjonNavigasjon
          onForrigeSteg={() => mellomlagreSvar(Seksjonshandling.tilbakenavigering)}
          onNesteSteg={lagreSvar}
          lagrer={state === "submitting" || state === "loading"}
        />
      </VStack>

      {modalData && <ArbeidsforholdModal ref={ref} />}

      <SøknadFooter onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)} />
    </div>
  );
}
