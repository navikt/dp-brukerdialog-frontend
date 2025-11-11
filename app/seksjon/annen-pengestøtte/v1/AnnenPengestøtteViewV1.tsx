import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.annen-pengestotte";
import {
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeModalSpørsmål,
  PengestøtteFraNorgeModalSvar,
  pengestøtteFraNorgeSpørsmål,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.spørsmål";
import { annenPengestøtteSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import {
  AnnenPengestøtteResponse,
  annenPengestøtteSpørsmål,
  AnnenPengestøtteSvar,
  erTilbakenavigering,
  pdfGrunnlag,
  seksjonsvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.spørsmål";
import { useEffect, useRef, useState } from "react";
import { ModalOperasjon, useAnnenPengestøtteContext } from "./annen-pengestøtte.context";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalSpørsmål,
  PengestøtteFraAndreEøsLandModalSvar,
  pengestøtteFraAndreEøsLandSpørsmål,
} from "./annen-pengestøtte-eøs.spørsmål";
import { PengestøtteFraAndreEøsLandDetaljer } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraAndreEøsLandDetaljer";
import { PengestøtteFraNorgeDetaljer } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraNorgeDetaljer";
import { PengestøtteFraAndreEøsLandModal } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraAndreEøsLandModal";
import { PengestøtteFraNorgeModal } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraNorgeModal";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function AnnenPengestøtteViewV1() {
  const seksjonnavn = "Annen pengestøtte";
  const pengestøtteFraAndreEøsLandModalRef = useRef<HTMLDialogElement>(null);
  const pengestøtteFraNorgeModalRef = useRef<HTMLDialogElement>(null);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [
    visMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding,
    setVisMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding,
  ] = useState(false);
  const [
    visMottattEllerSøktOmPengestøtteFraNorgeFeilmelding,
    setVisMottattEllerSøktOmPengestøtteFraNorgeFeilmelding,
  ] = useState(false);
  const {
    pengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLand,
    pengestøtteFraAndreEøsLandModalData,
    setPengestøtteFraAndreEøsLandModalData,
    pengestøtteFraNorge,
    setPengestøtteFraNorge,
    pengestøtteFraNorgeModalData,
    setPengestøtteFraNorgeModalData,
  } = useAnnenPengestøtteContext();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: annenPengestøtteSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
  });

  useNullstillSkjulteFelter<AnnenPengestøtteSvar>(form, annenPengestøtteSpørsmål);

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
      form.value(mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav) !== "ja" &&
        pengestøtteFraNorge.length > 0
    );
    if (form.value(mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav) === "nei") {
      setPengestøtteFraNorge([]);
    }
  }, [form.value(mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav), pengestøtteFraNorge.length]);

  function lagAnnenPengestøtteResponse(): AnnenPengestøtteResponse {
    return {
      [harMottattEllerSøktOmPengestøtteFraAndreEøsLand]: form.transient.value(
        harMottattEllerSøktOmPengestøtteFraAndreEøsLand
      ),
      [fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver]: form.value(
        fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver
      ),
      [skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver]: form.transient.value(
        skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver
      ),
      pengestøtteFraAndreEøsLand: pengestøtteFraAndreEøsLand,
      [mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav]: form.transient.value(
        mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav
      ),
      pengestøtteFraNorge: pengestøtteFraNorge,
    };
  }

  const genererPdfGrunnlag = () => {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [
        ...lagSeksjonPayload(pengestøtteFraAndreEøsLandSpørsmål, form.transient.value()),
        ...pengestøtteFraAndreEøsLand.map((enPengestøtte) =>
          lagSeksjonPayload(pengestøtteFraAndreEøsLandModalSpørsmål, enPengestøtte)
        ),
        ...lagSeksjonPayload(pengestøtteFraNorgeSpørsmål, form.transient.value()),
        ...pengestøtteFraNorge.map((enPengestøtte) =>
          lagSeksjonPayload(pengestøtteFraNorgeModalSpørsmål, enPengestøtte)
        ),
        ...lagSeksjonPayload(
          fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
          form.transient.value()
        ),
      ],
    };

    return JSON.stringify(pdfPayload);
  };

  function handleTilbakenavigering() {
    const annenPengestøtteResponse = lagAnnenPengestøtteResponse();
    form.setValue(erTilbakenavigering, true);
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(annenPengestøtteResponse));
    form.submit();
  }

  function handleSubmit() {
    form.setValue(erTilbakenavigering, false);
    form.validate();

    const manglerPengestøtteFraAndreEøsLand =
      form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) === "ja" &&
      pengestøtteFraAndreEøsLand.length === 0;
    const manglerPengestøtteFraNorge =
      form.value(mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav) === "ja" &&
      pengestøtteFraNorge.length === 0;

    if (manglerPengestøtteFraAndreEøsLand) {
      setVisMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding(true);
    }

    if (manglerPengestøtteFraNorge) {
      setVisMottattEllerSøktOmPengestøtteFraNorgeFeilmelding(true);
    }

    if (manglerPengestøtteFraAndreEøsLand || manglerPengestøtteFraNorge) {
      return;
    }

    if (
      form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) !== undefined &&
      form.value(mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav) !== undefined &&
      !manglerPengestøtteFraAndreEøsLand &&
      !manglerPengestøtteFraNorge
    ) {
      const annenPengestøtteResponse = lagAnnenPengestøtteResponse();
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue(seksjonsvar, JSON.stringify(annenPengestøtteResponse));
      form.submit();
    }
  }

  const render = (spørsmål: KomponentType) => {
    if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
      return null;
    }

    return (
      <Spørsmål
        key={spørsmål.id}
        spørsmål={spørsmål}
        formScope={form.scope(spørsmål.id as keyof AnnenPengestøtteSvar)}
      />
    );
  };

  return (
    <div className="innhold">
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={loaderData.versjon} />
          <VStack gap="8">
            <h3>Pengestøtte fra andre EØS land</h3>
            {pengestøtteFraAndreEøsLandSpørsmål.map((spørsmål) => {
              return render(spørsmål);
            })}

            {form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) === "ja" && (
              <VStack gap="space-16">
                {pengestøtteFraAndreEøsLand?.map(
                  (
                    pengestøtteFraAndreEøsLandSvar: PengestøtteFraAndreEøsLandModalSvar,
                    index: number
                  ) => (
                    <PengestøtteFraAndreEøsLandDetaljer
                      key={index}
                      pengestøtteFraAndreEøsLandSvarIndex={index}
                      pengestøtteFraAndreEøsLandSvar={pengestøtteFraAndreEøsLandSvar}
                    />
                  )
                )}

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
                  <ErrorMessage showIcon>
                    Du må legge til pengestøtte fra andre EØS-land
                  </ErrorMessage>
                )}
              </VStack>
            )}

            <h3>Pengestøtte fra Norge</h3>
            {pengestøtteFraNorgeSpørsmål.map((spørsmål) => render(spørsmål))}

            {form.value(mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav) === "ja" && (
              <VStack gap="space-16">
                {pengestøtteFraNorge?.map(
                  (pengestøtteFraNorgeSvar: PengestøtteFraNorgeModalSvar, index: number) => (
                    <PengestøtteFraNorgeDetaljer
                      key={index}
                      pengestøtteFraNorgeSvarIndex={index}
                      pengestøtteFraNorgeSvar={pengestøtteFraNorgeSvar}
                    />
                  )
                )}
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
                    Legg til annen pengestøtte fra Norge
                  </Button>
                </HStack>
                {visMottattEllerSøktOmPengestøtteFraNorgeFeilmelding && (
                  <ErrorMessage showIcon>Du må legge til pengestøtte fra Norge</ErrorMessage>
                )}
              </VStack>
            )}

            {fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål.map(
              (spørsmål) => render(spørsmål)
            )}
          </VStack>
          {actionData && (
            <Alert variant="error" className="mt-4">
              {actionData.error}
            </Alert>
          )}

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
              variant="primary"
              type="button"
              iconPosition="right"
              icon={<ArrowRightIcon />}
              onClick={handleSubmit}
            >
              Neste steg
            </Button>
          </HStack>
        </Form>
      </VStack>
      {pengestøtteFraAndreEøsLandModalData && (
        <PengestøtteFraAndreEøsLandModal ref={pengestøtteFraAndreEøsLandModalRef} />
      )}
      {pengestøtteFraNorgeModalData && (
        <PengestøtteFraNorgeModal ref={pengestøtteFraNorgeModalRef} />
      )}
    </div>
  );
}
