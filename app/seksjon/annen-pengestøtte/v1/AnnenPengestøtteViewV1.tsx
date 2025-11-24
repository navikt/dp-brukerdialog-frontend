import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@navikt/aksel-icons";
import { Alert, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
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
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverKomponenter,
  mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav,
  pengestøtteFraNorgeKomponenter,
  pengestøtteFraNorgeModalKomponenter,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
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
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  pengestøtteFraAndreEøsLandKomponenter,
  pengestøtteFraAndreEøsLandModalKomponenter,
} from "./annen-pengestøtte-eøs.komponenter";
import { ModalOperasjon, useAnnenPengestøtteContext } from "./annen-pengestøtte.context";

export function AnnenPengestøtteViewV1() {
  const seksjonnavn = "Annen pengestøtte";
  const pengestøtteFraAndreEøsLandModalRef = useRef<HTMLDialogElement>(null);
  const pengestøtteFraNorgeModalRef = useRef<HTMLDialogElement>(null);
  const { state } = useNavigation();
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
    dokumentasjonskrav,
  } = useAnnenPengestøtteContext();
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: annenPengestøtteSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<AnnenPengestøtteSvar>(form, annenPengestøtteKomponenter);

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
        ...lagSeksjonPayload(pengestøtteFraAndreEøsLandKomponenter, form.transient.value()),
        ...pengestøtteFraAndreEøsLand.map((enPengestøtte) =>
          lagSeksjonPayload(pengestøtteFraAndreEøsLandModalKomponenter, enPengestøtte)
        ),
        ...lagSeksjonPayload(pengestøtteFraNorgeKomponenter, form.transient.value()),
        ...pengestøtteFraNorge.map((enPengestøtte) =>
          lagSeksjonPayload(pengestøtteFraNorgeModalKomponenter, enPengestøtte)
        ),
        ...lagSeksjonPayload(
          fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverKomponenter,
          form.transient.value()
        ),
      ],
    };

    return JSON.stringify(pdfPayload);
  };

  function hentDokumentasjonskrav() {
    const fullstendigDokumentasjonskrav = [...dokumentasjonskrav];

    if (
      form.transient.value(fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver) === "ja"
    ) {
      const lønnEllerAndreØkonomiskeGoderDokumentasjonskrav: Dokumentasjonskrav = {
        id: crypto.randomUUID(),
        seksjonId: "annen-pengestotte",
        spørsmålId: fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
        tittel: "Avtale om økonomiske goder",
        type: DokumentasjonskravType.AnnenPengestøtteFåLønnEllerAndreØkonomiskeGoder,
      };

      fullstendigDokumentasjonskrav.push(lønnEllerAndreØkonomiskeGoderDokumentasjonskrav);
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

  function handleSubmit() {
    form.setValue(handling, Seksjonshandling.neste);
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
      <h2>{seksjonnavn}</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
          <VStack gap="8">
            <h3>Pengestøtte fra andre EØS land</h3>
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
                  <ErrorMessage showIcon>
                    Du må legge til pengestøtte fra andre EØS-land
                  </ErrorMessage>
                )}
              </VStack>
            )}

            <h3>Pengestøtte fra Norge</h3>
            {pengestøtteFraNorgeKomponenter.map((komponent) => render(komponent))}

            {form.value(mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNav) === "ja" && (
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
                    Legg til annen pengestøtte fra Norge
                  </Button>
                </HStack>
                {visMottattEllerSøktOmPengestøtteFraNorgeFeilmelding && (
                  <ErrorMessage showIcon>Du må legge til pengestøtte fra Norge</ErrorMessage>
                )}
              </VStack>
            )}

            {fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverKomponenter.map(
              (komponent) => render(komponent)
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
        </Form>
      </VStack>
      {pengestøtteFraAndreEøsLandModalData && (
        <PengestøtteFraAndreEøsLandModal
          ref={pengestøtteFraAndreEøsLandModalRef}
          spørsmålId="harMottattEllerSøktOmPengestøtteFraAndreEøsLandForklarendeTekst"
          seksjonId="annen-pengestotte"
        />
      )}
      {pengestøtteFraNorgeModalData && (
        <PengestøtteFraNorgeModal
          ref={pengestøtteFraNorgeModalRef}
          spørsmålId="mottarDuEllerHarDuSøktOmPengestøtteFraAndreEnnNavForklarendeTekst"
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
