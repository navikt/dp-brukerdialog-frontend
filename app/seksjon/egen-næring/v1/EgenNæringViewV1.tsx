import { PlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, InlineMessage, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import {
  action,
  loader,
  SEKSJON_NAVN,
  SEKSJON_TITTEL,
  SeksjonSvar,
} from "~/routes/$soknadId.egen-naring";
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
import { useSoknad } from "~/seksjon/soknad.context";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { validerSvar } from "~/utils/validering.utils";

export function EgenNæringViewV1() {
  const næringsvirksomhetModalRef = useRef<HTMLDialogElement>(null);
  const gårdsbrukModalRef = useRef<HTMLDialogElement>(null);
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();

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
      navn: SEKSJON_NAVN,
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

  function mellomlagreSvar(ønsketHandling: Seksjonshandling) {
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

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

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
      !manglerRegistrertGårdsbruk &&
      klarTilLagring
    ) {
      const egenNæringResponse: SeksjonSvar = {
        [driverDuEgenNæringsvirksomhet]: form.value(driverDuEgenNæringsvirksomhet),
        næringsvirksomheter: næringsvirksomheter.length > 0 ? næringsvirksomheter : null,
        [driverDuEgetGårdsbruk]: form.value(driverDuEgetGårdsbruk),
        gårdsbruk: gårdsbruk.length > 0 ? gårdsbruk : null,
      };

      form.setValue(handling, Seksjonshandling.neste);
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue(seksjonsvar, JSON.stringify(egenNæringResponse));
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <title>{SEKSJON_TITTEL}</title>
      <VStack gap="space-24">
        <Heading size="medium" level="2">
          {SEKSJON_NAVN}
        </Heading>
        <Form {...form.getFormProps()}>
          <VStack gap="space-24">
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
              <VStack gap="space-24">
                {næringsvirksomheter?.map((næringsvirksomhet: Næringsvirksomhet, index: number) => (
                  <NæringsvirksomhetDetaljer
                    key={index}
                    næringsvirksomhetIndex={index}
                    næringsvirksomhet={næringsvirksomhet}
                  />
                ))}
                <HStack>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setNæringsvirksomhetModalData({ operasjon: ModalOperasjon.LeggTil });
                    }}
                    icon={<PlusIcon aria-hidden />}
                    iconPosition="left"
                  >
                    Legg til næringsvirksomhet
                  </Button>
                </HStack>
                {visNæringsvirksomhetFeilmelding && (
                  <InlineMessage status="error">Du må legge til en næringsvirksomhet</InlineMessage>
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
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setGårdsbrukModalData({ operasjon: ModalOperasjon.LeggTil });
                    }}
                    icon={<PlusIcon aria-hidden />}
                    iconPosition="left"
                  >
                    Legg til gårdsbruk
                  </Button>
                </HStack>
                {visGårdsbrukFeilmelding && (
                  <InlineMessage status="error" aria-live="polite">
                    Du må legge til et gårdsbruk
                  </InlineMessage>
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
      </VStack>

      {næringsvirksomhetModalData && <NæringsvirksomhetModal ref={næringsvirksomhetModalRef} />}
      {gårdsbrukModalData && <GårdsbrukModal ref={gårdsbrukModalRef} />}

      <SeksjonNavigasjon
        onForrigeSteg={() => mellomlagreSvar(Seksjonshandling.tilbakenavigering)}
        onNesteSteg={lagreSvar}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)} />
    </div>
  );
}
