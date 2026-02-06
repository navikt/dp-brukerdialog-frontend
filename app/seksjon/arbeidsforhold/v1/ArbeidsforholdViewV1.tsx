import { BriefcaseIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, InlineMessage, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import invariant from "tiny-invariant";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.arbeidsforhold";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  Arbeidsforhold,
  arbeidsforholdForklarendeTekstKomponenter,
  arbeidsforholdKomponenter,
  arbeidsforholdModalKomponenter,
  arbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  ArbeidsforholdResponse,
  ArbeidsforholdSvar,
  handling,
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
import { arbeidsforholdModalKontraktenErUtgåttKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
import { arbeidsforholdModalJegErPermittertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { arbeidsforholdSchema } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.schema";
import ArbeidsforholdDetaljer from "~/seksjon/arbeidsforhold/v1/komponenter/ArbeidsforholdDetaljer";
import { ArbeidsforholdModal } from "~/seksjon/arbeidsforhold/v1/komponenter/ArbeidsforholdModal";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export function ArbeidsforholdViewV1() {
  const seksjonnavn = "Arbeidsforhold";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
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
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: arbeidsforholdSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
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

  function lagreSvar() {
    form.setValue(handling, Seksjonshandling.neste);
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
    form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
    form.setValue(seksjonsvar, JSON.stringify(lagArbeidsforholdResponse()));
    form.submit();
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="6">
        <Form {...form.getFormProps()}>
          <VStack gap="6">
            <Heading size="medium" level="2">
              {seksjonnavn}
            </Heading>
            <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
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
                <VStack className="mt-4" gap="6">
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
                    <InlineMessage status="error">Du må legge til et arbeidsforhold</InlineMessage>
                  )}
                </VStack>
              )}

            {actionData && (
              <SeksjonTekniskFeil
                tittel="Det har oppstått en teknisk feil"
                beskrivelse={actionData.error}
              />
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

      <SøknadFooter
        søknadId={soknadId}
        onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
