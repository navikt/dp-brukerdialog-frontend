import { useForm } from "@rvf/react-router";
import { egenNæringSchema } from "~/seksjon/egen-næring/v1/egen-næring.schema";
import { Form, useActionData, useLoaderData } from "react-router";
import { action, loader } from "~/routes/$soknadId.egen-naring";
import { useEffect, useRef, useState } from "react";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  egenNæringEgenNæringsvirksomhetKomponenter,
  egenNæringEgetGårdsbrukKomponenter,
  EgenNæringResponse,
  EgenNæringSvar,
  erTilbakenavigering,
  Gårdsbruk,
  leggTilGårdsbrukKomponenter,
  leggTilNæringsvirksomhetKomponenter,
  Næringsvirksomhet,
  seksjonsvar,
  pdfGrunnlag,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { Alert, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
import { Komponent } from "~/components/Komponent";
import { NæringsvirksomhetDetaljer } from "~/seksjon/egen-næring/v1/komponenter/NæringsvirksomhetDetaljer";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@navikt/aksel-icons";
import { GårdsbrukDetaljer } from "~/seksjon/egen-næring/v1/komponenter/GårdsbrukDetaljer";
import { NæringsvirksomhetModal } from "~/seksjon/egen-næring/v1/komponenter/NæringsvirksomhetModal";
import { GårdsbrukModal } from "~/seksjon/egen-næring/v1/komponenter/GårdsbrukModal";
import { ModalOperasjon, useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function EgenNæringViewV1() {
  const seksjonnavn = "Egen næring";
  const næringsvirksomhetModalRef = useRef<HTMLDialogElement>(null);
  const gårdsbrukModalRef = useRef<HTMLDialogElement>(null);
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
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
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

  function handleTilbakenavigering() {
    form.setValue(erTilbakenavigering, true);

    const egenNæringResponse: EgenNæringResponse = {
      [driverDuEgenNæringsvirksomhet]: form.value(driverDuEgenNæringsvirksomhet),
      næringsvirksomheter: næringsvirksomheter,
      [driverDuEgetGårdsbruk]: form.value(driverDuEgetGårdsbruk),
      gårdsbruk: gårdsbruk,
    };

    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(egenNæringResponse));
    form.submit();
  }

  function handleSubmit() {
    form.setValue(erTilbakenavigering, false);
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
      const egenNæringResponse: EgenNæringResponse = {
        [driverDuEgenNæringsvirksomhet]: form.value(driverDuEgenNæringsvirksomhet),
        næringsvirksomheter: næringsvirksomheter,
        [driverDuEgetGårdsbruk]: form.value(driverDuEgetGårdsbruk),
        gårdsbruk: gårdsbruk,
      };

      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue(seksjonsvar, JSON.stringify(egenNæringResponse));
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <input type="hidden" name="versjon" value={loaderData.versjon} />
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
                <>
                  {visNæringsvirksomhetFeilmelding && (
                    <ErrorMessage showIcon>Du må legge til en næringsvirksomhet</ErrorMessage>
                  )}
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
                  </VStack>
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
                </>
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
                <>
                  {visGårdsbrukFeilmelding && (
                    <ErrorMessage showIcon>Du må legge til et gårdsbruk</ErrorMessage>
                  )}
                  <VStack gap="space-16">
                    {gårdsbruk?.map((gårdsbruk: Gårdsbruk, index: number) => (
                      <GårdsbrukDetaljer
                        key={index}
                        gårdsbrukIndex={index}
                        etGårdsbruk={gårdsbruk}
                      />
                    ))}
                  </VStack>
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
                </>
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
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={handleTilbakenavigering}
              >
                Forrige steg
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={handleSubmit}
                iconPosition="right"
                icon={<ArrowRightIcon />}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
      {næringsvirksomhetModalData && <NæringsvirksomhetModal ref={næringsvirksomhetModalRef} />}
      {gårdsbrukModalData && <GårdsbrukModal ref={gårdsbrukModalRef} />}
    </div>
  );
}
