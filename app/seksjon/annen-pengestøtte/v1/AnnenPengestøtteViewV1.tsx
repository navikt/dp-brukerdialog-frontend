import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@navikt/aksel-icons";
import { Alert, Button, ErrorMessage, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import invariant from "tiny-invariant";
import { Komponent } from "~/components/Komponent";
import { KomponentType } from "~/components/Komponent.types";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.annen-pengestotte";
import {
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver,
  mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter,
  mottarDuPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeKomponenter,
  pengestøtteFraNorgeModalKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import {
  annenPengestøtteKomponenter,
  AnnenPengestøtteResponse,
  AnnenPengestøtteSvar,
  pdfGrunnlag,
  seksjonsvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { annenPengestøtteSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import { PengestøtteFraAndreEøsLandDetaljer } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraAndreEøsLandDetaljer";
import {
  PengestøtteFraAndreEøsLand,
  PengestøtteFraAndreEøsLandModal,
} from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraAndreEøsLandModal";
import { PengestøtteFraNorgeDetaljer } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraNorgeDetaljer";
import {
  PengestøtteFraNorge,
  PengestøtteFraNorgeModal,
} from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraNorgeModal";
import { handling } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  pengestøtteFraAndreEøsLandKomponenter,
  pengestøtteFraAndreEøsLandModalKomponenter,
} from "./annen-pengestøtte-eøs.komponenter";
import { ModalOperasjon, useAnnenPengestøtteContext } from "./annen-pengestøtte.context";
import { pengestøtteFraTidligereArbeidsgiverModalKomponenter } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";
import {
  PengestøtteFraTidligereArbeidsgiver,
  PengestøtteFraTidligereArbeidsgiverModal,
} from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraTidligereArbeidsgiverModal";
import { PengestøtteFraTidligereArbeidsgiverDetaljer } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraTidligereArbeidsgiverDetaljer";
import { SistOppdatert } from "~/components/SistOppdatert";

export function AnnenPengestøtteViewV1() {
  const seksjonnavn = "Annen pengestøtte";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const pengestøtteFraTidligereArbeidsgiverModalRef = useRef<HTMLDialogElement>(null);
  const pengestøtteFraAndreEøsLandModalRef = useRef<HTMLDialogElement>(null);
  const pengestøtteFraNorgeModalRef = useRef<HTMLDialogElement>(null);
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [
    visPengestøtteFraTidligereArbeidsgiverFeilmelding,
    setVisPengestøtteFraTidligereArbeidsgiverFeilmelding,
  ] = useState(false);
  const [
    visMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding,
    setVisMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding,
  ] = useState(false);
  const [
    visMottattEllerSøktOmPengestøtteFraNorgeFeilmelding,
    setVisMottattEllerSøktOmPengestøtteFraNorgeFeilmelding,
  ] = useState(false);
  const {
    pengestøtteFraTidligereArbeidsgiver,
    setPengestøtteFraTidligereArbeidsgiver,
    pengestøtteFraTidligereArbeidsgiverModalData,
    setPengestøtteFraTidligereArbeidsgiverModalData,
    pengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLand,
    pengestøtteFraAndreEøsLandModalData,
    setPengestøtteFraAndreEøsLandModalData,
    pengestøtteFraNorge,
    setPengestøtteFraNorge,
    pengestøtteFraNorgeModalData,
    setPengestøtteFraNorgeModalData,
    dokumentasjonskrav,
  } = useAnnenPengestøtteContext();
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: annenPengestøtteSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<AnnenPengestøtteSvar>(form, annenPengestøtteKomponenter);

  useEffect(() => {
    if (pengestøtteFraTidligereArbeidsgiverModalData) {
      pengestøtteFraTidligereArbeidsgiverModalRef.current?.showModal();
    }
  }, [pengestøtteFraTidligereArbeidsgiverModalData]);

  useEffect(() => {
    if (pengestøtteFraAndreEøsLandModalData) {
      pengestøtteFraAndreEøsLandModalRef.current?.showModal();
    }
  }, [pengestøtteFraAndreEøsLandModalData]);

  useEffect(() => {
    if (pengestøtteFraNorgeModalData) {
      pengestøtteFraNorgeModalRef.current?.showModal();
    }
  }, [pengestøtteFraNorgeModalData]);

  useEffect(() => {
    setVisPengestøtteFraTidligereArbeidsgiverFeilmelding(
      form.value(mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver) !== "ja" &&
        pengestøtteFraTidligereArbeidsgiver.length > 0
    );
    if (
      form.value(mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver) === "nei"
    ) {
      setPengestøtteFraTidligereArbeidsgiver([]);
    }
  }, [
    form.value(mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver),
    pengestøtteFraTidligereArbeidsgiver.length,
  ]);

  useEffect(() => {
    setVisMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding(
      form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) !== "ja" &&
        pengestøtteFraAndreEøsLand.length > 0
    );
    if (form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) === "nei") {
      setPengestøtteFraAndreEøsLand([]);
    }
  }, [
    form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand),
    pengestøtteFraAndreEøsLand.length,
  ]);

  useEffect(() => {
    setVisMottattEllerSøktOmPengestøtteFraNorgeFeilmelding(
      form.value(mottarDuPengestøtteFraAndreEnnNav) !== "ja" && pengestøtteFraNorge.length > 0
    );
    if (form.value(mottarDuPengestøtteFraAndreEnnNav) === "nei") {
      setPengestøtteFraNorge([]);
    }
  }, [form.value(mottarDuPengestøtteFraAndreEnnNav), pengestøtteFraNorge.length]);

  function lagAnnenPengestøtteResponse(): AnnenPengestøtteResponse {
    return {
      [harMottattEllerSøktOmPengestøtteFraAndreEøsLand]: form.transient.value(
        harMottattEllerSøktOmPengestøtteFraAndreEøsLand
      ),
      pengestøtteFraAndreEøsLand: pengestøtteFraAndreEøsLand,
      [mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver]: form.value(
        mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver
      ),
      pengestøtteFraTidligereArbeidsgiver: pengestøtteFraTidligereArbeidsgiver,
      [mottarDuPengestøtteFraAndreEnnNav]: form.transient.value(mottarDuPengestøtteFraAndreEnnNav),
      pengestøtteFraNorge: pengestøtteFraNorge,
    };
  }

  const genererPdfGrunnlag = () => {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [
        ...lagSeksjonPayload(
          mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter,
          form.transient.value()
        ),
        ...pengestøtteFraTidligereArbeidsgiver.map((enPengestøtte) =>
          lagSeksjonPayload(pengestøtteFraTidligereArbeidsgiverModalKomponenter, enPengestøtte)
        ),
        ...lagSeksjonPayload(pengestøtteFraNorgeKomponenter, form.transient.value()),
        ...pengestøtteFraNorge.map((enPengestøtte) =>
          lagSeksjonPayload(pengestøtteFraNorgeModalKomponenter, enPengestøtte)
        ),
        ...lagSeksjonPayload(pengestøtteFraAndreEøsLandKomponenter, form.transient.value()),
        ...pengestøtteFraAndreEøsLand.map((enPengestøtte) =>
          lagSeksjonPayload(pengestøtteFraAndreEøsLandModalKomponenter, enPengestøtte)
        ),
      ],
    };

    return JSON.stringify(pdfPayload);
  };

  function hentDokumentasjonskrav() {
    let fullstendigDokumentasjonskrav = [...dokumentasjonskrav];

    if (
      form.transient.value(
        mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver
      ) === "nei"
    ) {
      fullstendigDokumentasjonskrav = fullstendigDokumentasjonskrav.filter(
        (dokumentasjonskrav) =>
          dokumentasjonskrav.spørsmålId !==
          mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver
      );
    }

    if (form.transient.value(mottarDuPengestøtteFraAndreEnnNav) === "nei") {
      fullstendigDokumentasjonskrav = fullstendigDokumentasjonskrav.filter(
        (dokumentasjonskrav) => dokumentasjonskrav.spørsmålId !== mottarDuPengestøtteFraAndreEnnNav
      );
    }

    if (form.transient.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) === "nei") {
      fullstendigDokumentasjonskrav = fullstendigDokumentasjonskrav.filter(
        (dokumentasjonskrav) =>
          dokumentasjonskrav.spørsmålId !== harMottattEllerSøktOmPengestøtteFraAndreEøsLand
      );
    }

    return fullstendigDokumentasjonskrav.length > 0
      ? JSON.stringify(fullstendigDokumentasjonskrav)
      : "null";
  }

  function handleMellomlagring(ønsketHandling: Seksjonshandling) {
    const annenPengestøtteResponse = lagAnnenPengestøtteResponse();
    form.setValue(handling, ønsketHandling);
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(annenPengestøtteResponse));
    form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
    form.submit();
  }

  async function handleSubmit() {
    form.setValue(handling, Seksjonshandling.neste);
    form.validate();

    const manglerPengestøtteFraTidligereArbeidsgiver =
      form.value(mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver) === "ja" &&
      pengestøtteFraTidligereArbeidsgiver.length === 0;
    const manglerPengestøtteFraAndreEøsLand =
      form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) === "ja" &&
      pengestøtteFraAndreEøsLand.length === 0;
    const manglerPengestøtteFraNorge =
      form.value(mottarDuPengestøtteFraAndreEnnNav) === "ja" && pengestøtteFraNorge.length === 0;

    if (manglerPengestøtteFraTidligereArbeidsgiver) {
      setVisPengestøtteFraTidligereArbeidsgiverFeilmelding(true);
    }

    if (manglerPengestøtteFraAndreEøsLand) {
      setVisMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding(true);
    }

    if (manglerPengestøtteFraNorge) {
      setVisMottattEllerSøktOmPengestøtteFraNorgeFeilmelding(true);
    }

    if (
      manglerPengestøtteFraTidligereArbeidsgiver ||
      manglerPengestøtteFraAndreEøsLand ||
      manglerPengestøtteFraNorge
    ) {
      return;
    }

    if (
      form.value(mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver) !==
        undefined &&
      form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) !== undefined &&
      form.value(mottarDuPengestøtteFraAndreEnnNav) !== undefined &&
      !manglerPengestøtteFraNorge &&
      !manglerPengestøtteFraAndreEøsLand &&
      !manglerPengestøtteFraNorge
    ) {
      const annenPengestøtteResponse = lagAnnenPengestøtteResponse();
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue(seksjonsvar, JSON.stringify(annenPengestøtteResponse));
      form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
      form.submit();
    }
  }

  const render = (komponent: KomponentType) => {
    if (komponent.visHvis && !komponent.visHvis(form.value())) {
      return null;
    }

    return (
      <Komponent
        key={komponent.id}
        props={komponent}
        formScope={form.scope(komponent.id as keyof AnnenPengestøtteSvar)}
      />
    );
  };

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
          <VStack gap="8">
            <Heading size="medium" level="2">
              {seksjonnavn}
            </Heading>
            {mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter.map(
              (komponent) => render(komponent)
            )}

            {form.value(mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver) ===
              "ja" && (
              <VStack gap="space-16">
                {pengestøtteFraTidligereArbeidsgiver?.map(
                  (pengestøtte: PengestøtteFraTidligereArbeidsgiver) => (
                    <PengestøtteFraTidligereArbeidsgiverDetaljer
                      key={pengestøtte.id}
                      pengestøtteFraTidligereArbeidsgiver={pengestøtte}
                    />
                  )
                )}
                <HStack>
                  <Button
                    type={"button"}
                    variant={"secondary"}
                    onClick={() => {
                      setPengestøtteFraTidligereArbeidsgiverModalData({
                        operasjon: ModalOperasjon.LeggTil,
                      });
                    }}
                    icon={<PlusIcon />}
                    iconPosition={"left"}
                  >
                    Legg til utbetalinger eller goder
                  </Button>
                </HStack>
                {visPengestøtteFraTidligereArbeidsgiverFeilmelding && (
                  <ErrorMessage showIcon aria-live="polite">
                    Du må legge til utbetalinger eller økonomiske goder
                  </ErrorMessage>
                )}
              </VStack>
            )}

            <Heading size="small" level="3">
              Pengestøtte fra Norge
            </Heading>
            {pengestøtteFraNorgeKomponenter.map((komponent) => render(komponent))}

            {form.value(mottarDuPengestøtteFraAndreEnnNav) === "ja" && (
              <VStack gap="space-16">
                {pengestøtteFraNorge?.map((støtte: PengestøtteFraNorge) => (
                  <PengestøtteFraNorgeDetaljer key={støtte.id} pengestøtteFraNorge={støtte} />
                ))}
                <HStack>
                  <Button
                    type={"button"}
                    variant={"secondary"}
                    onClick={() => {
                      setPengestøtteFraNorgeModalData({
                        operasjon: ModalOperasjon.LeggTil,
                      });
                    }}
                    icon={<PlusIcon />}
                    iconPosition={"left"}
                  >
                    Legg til pengestøtte fra Norge
                  </Button>
                </HStack>
                {visMottattEllerSøktOmPengestøtteFraNorgeFeilmelding && (
                  <ErrorMessage showIcon aria-live="polite">
                    Du må legge til pengestøtte fra Norge
                  </ErrorMessage>
                )}
              </VStack>
            )}

            <Heading size="small" level="3">
              Pengestøtte fra andre EØS-land
            </Heading>
            {pengestøtteFraAndreEøsLandKomponenter.map((komponent) => {
              return render(komponent);
            })}

            {form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) === "ja" && (
              <VStack gap="space-16">
                {pengestøtteFraAndreEøsLand?.map((støtte: PengestøtteFraAndreEøsLand) => (
                  <PengestøtteFraAndreEøsLandDetaljer
                    key={støtte.id}
                    pengestøtteFraAndreEøsLand={støtte}
                  />
                ))}

                <HStack>
                  <Button
                    type={"button"}
                    variant={"secondary"}
                    onClick={() => {
                      setPengestøtteFraAndreEøsLandModalData({
                        operasjon: ModalOperasjon.LeggTil,
                      });
                    }}
                    icon={<PlusIcon />}
                    iconPosition={"left"}
                  >
                    Legg til pengestøtte fra andre EØS-land
                  </Button>
                </HStack>
                {visMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding && (
                  <ErrorMessage showIcon aria-live="polite">
                    Du må legge til pengestøtte fra andre EØS-land
                  </ErrorMessage>
                )}
              </VStack>
            )}
          </VStack>
          {actionData && (
            <Alert variant="error" className="mt-4">
              {actionData.error}
            </Alert>
          )}

          <VStack className="mt-8" gap="4">
            <SistOppdatert />
            <HStack gap="4">
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
          </VStack>
        </Form>
      </VStack>
      {pengestøtteFraTidligereArbeidsgiverModalData && (
        <PengestøtteFraTidligereArbeidsgiverModal
          ref={pengestøtteFraTidligereArbeidsgiverModalRef}
          spørsmålId={mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver}
          seksjonId="annen-pengestotte"
        />
      )}
      {pengestøtteFraAndreEøsLandModalData && (
        <PengestøtteFraAndreEøsLandModal
          ref={pengestøtteFraAndreEøsLandModalRef}
          spørsmålId={harMottattEllerSøktOmPengestøtteFraAndreEøsLand}
          seksjonId="annen-pengestotte"
        />
      )}
      {pengestøtteFraNorgeModalData && (
        <PengestøtteFraNorgeModal
          ref={pengestøtteFraNorgeModalRef}
          spørsmålId={mottarDuPengestøtteFraAndreEnnNav}
          seksjonId="annen-pengestotte"
        />
      )}
      <SøknadFooter
        className="footer"
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
