import { useForm } from "@rvf/react-router";
import { egenNæringSchema } from "~/seksjon/egen-næring/v1/egen-næring.schema";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router";
import { action, loader } from "~/routes/$soknadId.egen-naring";
import { useEffect, useRef, useState } from "react";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  egenNæringEgenNæringsvirksomhetSpørsmål,
  egenNæringEgetGårdsbrukSpørsmål,
  EgenNæringResponse,
  EgenNæringSvar,
  Gårdsbruk,
  Næringsvirksomhet,
  payload,
} from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { Alert, Button, ErrorMessage, HStack, Page, VStack } from "@navikt/ds-react";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { NæringsvirksomhetDetaljer } from "~/seksjon/egen-næring/v1/komponenter/NæringsvirksomhetDetaljer";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@navikt/aksel-icons";
import { GårdsbrukDetaljer } from "~/seksjon/egen-næring/v1/komponenter/GårdsbrukDetaljer";
import { NæringsvirksomhetModal } from "~/seksjon/egen-næring/v1/komponenter/NæringsvirksomhetModal";
import { GårdsbrukModal } from "~/seksjon/egen-næring/v1/komponenter/GårdsbrukModal";
import {
  ModalOperasjonEnum,
  useEgenNæringContext,
} from "~/seksjon/egen-næring/v1/egen-næring.context";

export function EgenNæringView() {
  const navigate = useNavigate();
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
    defaultValues: { ...loaderData.skjema, versjon: loaderData.versjon },
  });

  useNullstillSkjulteFelter<EgenNæringSvar>(form, egenNæringEgenNæringsvirksomhetSpørsmål);

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

  function handleSubmit() {
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

      form.setValue(payload, JSON.stringify(egenNæringResponse));
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <h2>Egen næring</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <input type="hidden" name="versjon" value={loaderData.versjon} />
              {egenNæringEgenNæringsvirksomhetSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }
                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof EgenNæringSvar)}
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
                        setNæringsvirksomhetModalData({ operasjon: ModalOperasjonEnum.LeggTil });
                      }}
                      icon={<PlusIcon />}
                      iconPosition={"left"}
                    >
                      Legg til næringsvirksomhet
                    </Button>
                  </HStack>
                </>
              )}

              {egenNæringEgetGårdsbrukSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }
                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
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
                        setGårdsbrukModalData({ operasjon: ModalOperasjonEnum.LeggTil });
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
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={() => navigate(-1)}
              >
                Forrige steg
              </Button>
              <Button
                type={"button"}
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
