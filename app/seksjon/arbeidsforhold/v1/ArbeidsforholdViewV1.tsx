import { ArrowLeftIcon, ArrowRightIcon, BriefcaseIcon } from "@navikt/aksel-icons";
import { Alert, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.arbeidsforhold";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  Arbeidsforhold,
  arbeidsforholdForklarendeTekstKomponenter,
  arbeidsforholdKomponenter,
  arbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  arbeidsforholdModalKomponenter,
  ArbeidsforholdResponse,
  ArbeidsforholdSvar,
  erTilbakenavigering,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harIkkeJobbetDeSiste36Månedene,
  hvordanHarDuJobbet,
  pdfGrunnlag,
  seksjonsvar,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { arbeidsforholdModalArbeidstidenErRedusertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { arbeidsforholdModalJegHarFåttAvskjedKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import { arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import { arbeidsforholdModalJegHarSagtOppSelvKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import { arbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import { arbeidsforholdModalKontraktenErUgåttKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUgått";
import { arbeidsforholdModalJegErPermittertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { arbeidsforholdSchema } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.schema";
import { ArbeidsforholdDetaljer } from "~/seksjon/arbeidsforhold/v1/komponenter/ArbeidsforholdDetaljer";
import { ArbeidsforholdModal } from "~/seksjon/arbeidsforhold/v1/komponenter/ArbeidsforholdModal";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function ArbeidsforholdViewV1() {
  const seksjonnavn = "Arbeidsforhold";
  const ref = useRef<HTMLDialogElement>(null);
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [visManglerArbeidsforholdFeilmelding, setVisManglerArbeidsforholdFeilmelding] =
    useState(false);
  const { registrerteArbeidsforhold, setRegistrerteArbeidsforhold, modalData, setModalData } =
    useArbeidsforholdContext();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: arbeidsforholdSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
  });

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

  const genererPdfGrunnlag = () => {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [
        ...lagSeksjonPayload(arbeidsforholdKomponenter, form.transient.value()),
        ...lagSeksjonPayload(arbeidsforholdForklarendeTekstKomponenter, form.transient.value()),
        ...registrerteArbeidsforhold.map((etArbeidsforhold) =>
          lagSeksjonPayload(
            arbeidsforholdModalKomponenter
              .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter)
              .concat(arbeidsforholdModalJegHarSagtOppSelvKomponenter)
              .concat(arbeidsforholdModalJegHarFåttAvskjedKomponenter)
              .concat(arbeidsforholdModalKontraktenErUgåttKomponenter)
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
  };

  function handleTilbakenavigering() {
    const arbeidsforholdResponse = lagArbeidsforholdResponse();
    form.setValue(erTilbakenavigering, true);
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(arbeidsforholdResponse));

    form.submit();
  }

  function handleSubmit() {
    form.setValue(erTilbakenavigering, false);
    form.validate();

    const manglerArbeidsforhold =
      form.value(hvordanHarDuJobbet) &&
      form.value(hvordanHarDuJobbet) !== harIkkeJobbetDeSiste36Månedene &&
      registrerteArbeidsforhold.length === 0;

    if (manglerArbeidsforhold) {
      setVisManglerArbeidsforholdFeilmelding(true);
      return;
    }

    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(lagArbeidsforholdResponse()));
    form.submit();
  }

  return (
    <div className="innhold">
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <input type="hidden" name="versjon" value={loaderData.versjon} />
              {arbeidsforholdKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formScope={form.scope(komponent.id as keyof ArbeidsforholdSvar)}
                  />
                );
              })}

              {form.value(hvordanHarDuJobbet) &&
                form.value(hvordanHarDuJobbet) !== harIkkeJobbetDeSiste36Månedene &&
                form.value(
                  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
                ) && (
                  <VStack gap="space-16">
                    {arbeidsforholdForklarendeTekstKomponenter.map((komponent) => {
                      if (komponent.visHvis && !komponent.visHvis(form.value())) {
                        return null;
                      }

                      return (
                        <Komponent
                          key={komponent.id}
                          props={komponent}
                          formScope={form.scope(komponent.id as keyof ArbeidsforholdSvar)}
                        />
                      );
                    })}
                    {registrerteArbeidsforhold?.map(
                      (arbeidsforhold: Arbeidsforhold, index: number) => (
                        <ArbeidsforholdDetaljer
                          key={index}
                          arbeidsforholdIndex={index}
                          arbeidsforhold={arbeidsforhold}
                        />
                      )
                    )}
                    <HStack>
                      <Button
                        variant="secondary"
                        type="button"
                        icon={<BriefcaseIcon />}
                        onClick={() => {
                          setModalData({
                            operasjon: ModalOperasjon.LeggTil,
                            form: form,
                          });
                        }}
                      >
                        Legg til arbeidsforhold
                      </Button>
                    </HStack>
                    {visManglerArbeidsforholdFeilmelding && (
                      <ErrorMessage showIcon>Du må legge til minst et arbeidsforhold</ErrorMessage>
                    )}
                  </VStack>
                )}

              {actionData && (
                <Alert variant="error" className="mt-4">
                  {actionData.error}
                </Alert>
              )}
            </VStack>

            <HStack gap="4" className="mt-8">
              <Button
                variant="secondary"
                type="button"
                icon={<ArrowLeftIcon aria-hidden />}
                onClick={handleTilbakenavigering}
                disabled={state === "submitting" || state === "loading"}
              >
                Forrige steg
              </Button>
              <Button
                variant="primary"
                type="button"
                iconPosition="right"
                icon={<ArrowRightIcon aria-hidden />}
                onClick={handleSubmit}
                disabled={state === "submitting" || state === "loading"}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
        {modalData && <ArbeidsforholdModal ref={ref} />}
      </VStack>
    </div>
  );
}
