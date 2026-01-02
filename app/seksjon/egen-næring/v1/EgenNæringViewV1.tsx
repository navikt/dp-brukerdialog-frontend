import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@navikt/aksel-icons";
import { Alert, Button, ErrorMessage, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader, SeksjonSvar } from "~/routes/$soknadId.egen-naring";
import { ModalOperasjon, useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  egenNæringEgenNæringsvirksomhetKomponenter,
  egenNæringEgetGårdsbrukKomponenter,
  EgenNæringSvar,
  Gårdsbruk,
  handling,
  leggTilGårdsbrukKomponenter,
  leggTilNæringsvirksomhetKomponenter,
  Næringsvirksomhet,
  pdfGrunnlag,
  seksjonsvar,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { egenNæringSchema } from "~/seksjon/egen-næring/v1/egen-næring.schema";
import { GårdsbrukDetaljer } from "~/seksjon/egen-næring/v1/komponenter/GårdsbrukDetaljer";
import { GårdsbrukModal } from "~/seksjon/egen-næring/v1/komponenter/GårdsbrukModal";
import { NæringsvirksomhetDetaljer } from "~/seksjon/egen-næring/v1/komponenter/NæringsvirksomhetDetaljer";
import { NæringsvirksomhetModal } from "~/seksjon/egen-næring/v1/komponenter/NæringsvirksomhetModal";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import invariant from "tiny-invariant";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { SøknadFooter } from "~/components/SøknadFooter";

export function EgenNæringViewV1() {
  const seksjonnavn = "Egen næring";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const næringsvirksomhetModalRef = useRef<HTMLDialogElement>(null);
  const gårdsbrukModalRef = useRef<HTMLDialogElement>(null);
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const {
    næringsvirksomheter,
    setNæringsvirksomheter,
    gårdsbruk,
    setGårdsbruk,
    næringsvirksomhetModalData,
    setNæringsvirksomhetModalData,
    gårdsbrukModalData,
    setGårdsbrukModalData,
  } = useEgenNæringContext();
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const [visNæringsvirksomhetFeilmelding, setVisNæringsvirksomhetFeilmelding] = useState(false);
  const [visGårdsbrukFeilmelding, setVisGårdsbrukFeilmelding] = useState(false);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: egenNæringSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<EgenNæringSvar>(form, egenNæringEgenNæringsvirksomhetKomponenter);

  useEffect(() => {
    setVisNæringsvirksomhetFeilmelding(
      form.value(driverDuEgenNæringsvirksomhet) !== "ja" && næringsvirksomheter.length > 0
    );
    if (form.value(driverDuEgenNæringsvirksomhet) === "nei") {
      setNæringsvirksomheter([]);
    }
  }, [form.value(driverDuEgenNæringsvirksomhet), næringsvirksomheter.length]);

  useEffect(() => {
    setVisGårdsbrukFeilmelding(form.value(driverDuEgetGårdsbruk) !== "ja" && gårdsbruk.length > 0);
    if (form.value(driverDuEgetGårdsbruk) === "nei") {
      setGårdsbruk([]);
    }
  }, [form.value(driverDuEgetGårdsbruk), gårdsbruk.length]);

  useEffect(() => {
    if (næringsvirksomhetModalData) {
      næringsvirksomhetModalRef.current?.showModal();
    }
  }, [næringsvirksomhetModalData]);

  useEffect(() => {
    if (gårdsbrukModalData) {
      gårdsbrukModalRef.current?.showModal();
    }
  }, [gårdsbrukModalData]);

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [
        ...lagSeksjonPayload(egenNæringEgenNæringsvirksomhetKomponenter, form.transient.value()),
        ...næringsvirksomheter.map((enVirksomhet) =>
          lagSeksjonPayload(leggTilNæringsvirksomhetKomponenter, enVirksomhet)
        ),
        ...lagSeksjonPayload(egenNæringEgetGårdsbrukKomponenter, form.transient.value()),
        ...gårdsbruk.map((etGårdsbruk) =>
          lagSeksjonPayload(leggTilGårdsbrukKomponenter, etGårdsbruk)
        ),
      ],
    };

    return JSON.stringify(pdfPayload);
  }

  function handleMellomlagring(ønsketHandling: Seksjonshandling) {
    form.setValue(handling, ønsketHandling);

    const egenNæringResponse: SeksjonSvar = {
      [driverDuEgenNæringsvirksomhet]: form.value(driverDuEgenNæringsvirksomhet),
      næringsvirksomheter: næringsvirksomheter.length > 0 ? næringsvirksomheter : null,
      [driverDuEgetGårdsbruk]: form.value(driverDuEgetGårdsbruk),
      gårdsbruk: gårdsbruk.length > 0 ? gårdsbruk : null,
    };

    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(egenNæringResponse));
    form.submit();
  }

  function handleSubmit() {
    form.setValue(handling, Seksjonshandling.neste);
    form.validate();

    const manglerRegistrertNæringsvirksomhet =
      form.value(driverDuEgenNæringsvirksomhet) === "ja" && næringsvirksomheter.length === 0;
    const manglerRegistrertGårdsbruk =
      form.value(driverDuEgetGårdsbruk) === "ja" && gårdsbruk.length === 0;

    if (manglerRegistrertNæringsvirksomhet) {
      setVisNæringsvirksomhetFeilmelding(true);
    }

    if (manglerRegistrertGårdsbruk) {
      setVisGårdsbrukFeilmelding(true);
    }

    if (visNæringsvirksomhetFeilmelding || visGårdsbrukFeilmelding) {
      return;
    }

    if (
      form.value(driverDuEgenNæringsvirksomhet) !== undefined &&
      form.value(driverDuEgetGårdsbruk) !== undefined &&
      !manglerRegistrertNæringsvirksomhet &&
      !manglerRegistrertGårdsbruk
    ) {
      const egenNæringResponse: SeksjonSvar = {
        [driverDuEgenNæringsvirksomhet]: form.value(driverDuEgenNæringsvirksomhet),
        næringsvirksomheter: næringsvirksomheter.length > 0 ? næringsvirksomheter : null,
        [driverDuEgetGårdsbruk]: form.value(driverDuEgetGårdsbruk),
        gårdsbruk: gårdsbruk.length > 0 ? gårdsbruk : null,
      };

      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue(seksjonsvar, JSON.stringify(egenNæringResponse));
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="20">
        <VStack gap="6">
          <Heading size="medium" level="2">
            {seksjonnavn}
          </Heading>
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
              {egenNæringEgenNæringsvirksomhetKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(form.value())) {
                  return null;
                }
                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formScope={form.scope(komponent.id as keyof EgenNæringSvar)}
                  />
                );
              })}
              {form.value(driverDuEgenNæringsvirksomhet) === "ja" && (
                <VStack gap="space-16">
                  {næringsvirksomheter?.map(
                    (næringsvirksomhet: Næringsvirksomhet, index: number) => (
                      <NæringsvirksomhetDetaljer
                        key={index}
                        næringsvirksomhetIndex={index}
                        næringsvirksomhet={næringsvirksomhet}
                      />
                    )
                  )}
                  <HStack>
                    <Button
                      type={"button"}
                      variant={"secondary"}
                      onClick={() => {
                        setNæringsvirksomhetModalData({ operasjon: ModalOperasjon.LeggTil });
                      }}
                      icon={<PlusIcon />}
                      iconPosition={"left"}
                    >
                      Legg til næringsvirksomhet
                    </Button>
                  </HStack>
                  {visNæringsvirksomhetFeilmelding && (
                    <ErrorMessage showIcon aria-live="polite">
                      Du må legge til en næringsvirksomhet
                    </ErrorMessage>
                  )}
                </VStack>
              )}
              {egenNæringEgetGårdsbrukKomponenter.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Komponent
                    key={spørsmål.id}
                    props={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof EgenNæringSvar)}
                  />
                );
              })}
              {form.value(driverDuEgetGårdsbruk) === "ja" && (
                <VStack gap="space-16">
                  {gårdsbruk?.map((gårdsbruk: Gårdsbruk, index: number) => (
                    <GårdsbrukDetaljer key={index} gårdsbrukIndex={index} etGårdsbruk={gårdsbruk} />
                  ))}
                  <HStack>
                    <Button
                      type={"button"}
                      variant={"secondary"}
                      onClick={() => {
                        setGårdsbrukModalData({ operasjon: ModalOperasjon.LeggTil });
                      }}
                      icon={<PlusIcon />}
                      iconPosition={"left"}
                    >
                      Legg til gårdsbruk
                    </Button>
                  </HStack>
                  {visGårdsbrukFeilmelding && (
                    <ErrorMessage showIcon aria-live="polite">
                      Du må legge til et gårdsbruk
                    </ErrorMessage>
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
                onClick={() => handleMellomlagring(Seksjonshandling.tilbakenavigering)}
                disabled={state === "submitting" || state === "loading"}
              >
                Forrige steg
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleSubmit}
                iconPosition="right"
                icon={<ArrowRightIcon aria-hidden />}
                disabled={state === "submitting" || state === "loading"}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
      {næringsvirksomhetModalData && <NæringsvirksomhetModal ref={næringsvirksomhetModalRef} />}
      {gårdsbrukModalData && <GårdsbrukModal ref={gårdsbrukModalRef} />}
      <SøknadFooter
        className="footer"
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
