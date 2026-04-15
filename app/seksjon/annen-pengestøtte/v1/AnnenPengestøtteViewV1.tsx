import { PlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, InlineMessage, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { KomponentType } from "~/components/Komponent.types";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader, SEKSJON_NAVN, SEKSJON_TITTEL } from "~/routes/$soknadId.annen-pengestotte";
import { pengestøtteFraTidligereArbeidsgiverModalKomponenter } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";
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
import { PengestøtteFraTidligereArbeidsgiverDetaljer } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraTidligereArbeidsgiverDetaljer";
import {
  PengestøtteFraTidligereArbeidsgiver,
  PengestøtteFraTidligereArbeidsgiverModal,
} from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraTidligereArbeidsgiverModal";
import { handling } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { useSoknad } from "~/seksjon/soknad.context";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { validerSvar } from "~/utils/validering.utils";
import {
  harMottattEllerSøktOmPengestøtteFraAndreEøsLand,
  pengestøtteFraAndreEøsLandKomponenter,
  pengestøtteFraAndreEøsLandModalKomponenter,
} from "./annen-pengestøtte-eøs.komponenter";
import { ModalOperasjon, useAnnenPengestøtteContext } from "./annen-pengestøtte.context";

export function AnnenPengestøtteViewV1() {
  const pengestøtteFraTidligereArbeidsgiverModalRef = useRef<HTMLDialogElement>(null);
  const pengestøtteFraAndreEøsLandModalRef = useRef<HTMLDialogElement>(null);
  const pengestøtteFraNorgeModalRef = useRef<HTMLDialogElement>(null);
  const { state } = useNavigation();
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();

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

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: annenPengestøtteSchema,
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

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: SEKSJON_NAVN,
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
  }

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

  function mellomlagreSvar(ønsketHandling: Seksjonshandling) {
    const annenPengestøtteResponse = lagAnnenPengestøtteResponse();
    form.setValue(handling, ønsketHandling);
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(seksjonsvar, JSON.stringify(annenPengestøtteResponse));
    form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
    form.submit();
  }

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

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
      !manglerPengestøtteFraNorge &&
      klarTilLagring
    ) {
      const annenPengestøtteResponse = lagAnnenPengestøtteResponse();
      form.setValue(handling, Seksjonshandling.neste);
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
      <title>{SEKSJON_TITTEL}</title>
      <VStack gap="6">
        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
          <VStack gap="6">
            <Heading size="medium" level="2">
              {SEKSJON_NAVN}
            </Heading>
            {mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiverKomponenter.map(
              (komponent) => render(komponent)
            )}

            {form.value(mottarDuAndreUtbetalingerEllerØkonomiskeGoderFraTidligereArbeidsgiver) ===
              "ja" && (
              <VStack gap="6">
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
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setPengestøtteFraTidligereArbeidsgiverModalData({
                        operasjon: ModalOperasjon.LeggTil,
                      });
                    }}
                    icon={<PlusIcon />}
                    iconPosition="left"
                  >
                    Legg til utbetalinger eller goder
                  </Button>
                </HStack>
                {visPengestøtteFraTidligereArbeidsgiverFeilmelding && (
                  <InlineMessage status="error">
                    Du må legge til utbetalinger eller økonomiske goder
                  </InlineMessage>
                )}
              </VStack>
            )}

            <Heading size="small" level="3" className="mt-4">
              Pengestøtte fra Norge
            </Heading>

            {pengestøtteFraNorgeKomponenter.map((komponent) => render(komponent))}

            {form.value(mottarDuPengestøtteFraAndreEnnNav) === "ja" && (
              <VStack gap="6">
                {pengestøtteFraNorge?.map((støtte: PengestøtteFraNorge) => (
                  <PengestøtteFraNorgeDetaljer key={støtte.id} pengestøtteFraNorge={støtte} />
                ))}
                <HStack>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setPengestøtteFraNorgeModalData({
                        operasjon: ModalOperasjon.LeggTil,
                      });
                    }}
                    icon={<PlusIcon />}
                    iconPosition="left"
                  >
                    Legg til pengestøtte fra Norge
                  </Button>
                </HStack>
                {visMottattEllerSøktOmPengestøtteFraNorgeFeilmelding && (
                  <InlineMessage status="error">
                    Du må legge til pengestøtte fra Norge
                  </InlineMessage>
                )}
              </VStack>
            )}

            <Heading size="small" level="3" className="mt-4">
              Pengestøtte fra andre EØS-land
            </Heading>

            {pengestøtteFraAndreEøsLandKomponenter.map((komponent) => {
              return render(komponent);
            })}

            {form.value(harMottattEllerSøktOmPengestøtteFraAndreEøsLand) === "ja" && (
              <VStack gap="6">
                {pengestøtteFraAndreEøsLand?.map((støtte: PengestøtteFraAndreEøsLand) => (
                  <PengestøtteFraAndreEøsLandDetaljer
                    key={støtte.id}
                    pengestøtteFraAndreEøsLand={støtte}
                  />
                ))}

                <HStack>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setPengestøtteFraAndreEøsLandModalData({
                        operasjon: ModalOperasjon.LeggTil,
                      });
                    }}
                    icon={<PlusIcon />}
                    iconPosition="left"
                  >
                    Legg til pengestøtte fra andre EØS-land
                  </Button>
                </HStack>
                {visMottattEllerSøktOmPengestøtteFraAndreEøsLandFeilmelding && (
                  <InlineMessage status="error">
                    Du må legge til pengestøtte fra andre EØS-land
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

      <SeksjonNavigasjon
        onForrigeSteg={() => mellomlagreSvar(Seksjonshandling.tilbakenavigering)}
        onNesteSteg={lagreSvar}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)} />
    </div>
  );
}
