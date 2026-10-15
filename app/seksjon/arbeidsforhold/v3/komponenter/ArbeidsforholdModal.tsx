import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-router";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { ModalOperasjon, useArbeidsforholdContext } from "../arbeidsforhold.context";
import { lagDokumentasjonskrav } from "../arbeidsforhold.dokumentasjonskrav.utils";
import {
  ArbeidsforholdModalSvar,
  ArbeidsforholdSvar,
  harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene,
  harDuJobbetSkiftTurnusEllerRotasjon,
  hvilketLandJobbetDuI,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  lagArbeidsforholdForklarendeTekstKomponenter,
  lagArbeidsforholdModalKomponenter,
  lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  navnetPåBedriften,
} from "../arbeidsforhold.komponenter";
import { lagArbeidsforholdModalArbeidstidenErRedusertKomponenter } from "../arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { lagArbeidsforholdModalJegHarFåttAvskjedKomponenter } from "../arbeidsforhold.komponenter.avskjediget";
import { lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "../arbeidsforhold.komponenter.ikkeEndret";
import { lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "../arbeidsforhold.komponenter.jegErOppsagt";
import { lagArbeidsforholdModalJegHarSagtOppSelvKomponenter } from "../arbeidsforhold.komponenter.jegHarSagtOpp";
import { lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "../arbeidsforhold.komponenter.konkurs";
import { lagArbeidsforholdModalKontraktenErUtgåttKomponenter } from "../arbeidsforhold.komponenter.kontraktenErUtgått";
import { lagArbeidsforholdModalJegErPermittertKomponenter } from "../arbeidsforhold.komponenter.permittert";
import { arbeidsforholdModalSchema } from "../arbeidsforhold.schema";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function ArbeidsforholdModal({ ref }: IProps) {
  const endringerErIkkeLagretModalRef = useRef<HTMLDialogElement>(null);
  const [stengModalSelvOmDetErUlagredeEndringer, setStengModalSelvOmDetErUlagredeEndringer] =
    useState(false);
  const {
    registrerteArbeidsforhold,
    setRegistrerteArbeidsforhold,
    modalData,
    setModalData,
    setDokumentasjonskrav,
    dokumentasjonskrav,
  } = useArbeidsforholdContext();
  const { t } = useTranslation("arbeidsforhold/v3");

  const arbeidsforholdForklarendeTekstKomponenter = lagArbeidsforholdForklarendeTekstKomponenter(t);

  const alleModalKomponenter = lagArbeidsforholdModalKomponenter(t)
    .concat(lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter(t))
    .concat(lagArbeidsforholdModalJegHarSagtOppSelvKomponenter(t))
    .concat(lagArbeidsforholdModalJegHarFåttAvskjedKomponenter(t))
    .concat(lagArbeidsforholdModalKontraktenErUtgåttKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidstidenErRedusertKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter(t))
    .concat(lagArbeidsforholdModalJegErPermittertKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter(t))
    .concat(lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter(t));

  const form = useForm({
    submitSource: "state",
    schema: arbeidsforholdModalSchema,
    defaultValues: modalData?.arbeidsforhold ?? {},
    handleSubmit: (skjemaData) => {
      if (modalData?.operasjon === undefined) {
        console.error("Ugyldig operasjonstype for arbeidsforholdmodal");
        return;
      }

      if (modalData?.operasjon === ModalOperasjon.LeggTil) {
        leggTilArbeidsforhold(skjemaData);
      }

      if (modalData?.operasjon === ModalOperasjon.Rediger) {
        redigerArbeidsforhold(skjemaData);
      }
    },
    onSubmitSuccess() {
      setModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();
  const harJobbetIEøsLand = modalData?.form?.value(
    harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene
  );

  const seksjonOgModalSvar: ArbeidsforholdSvar & ArbeidsforholdModalSvar = {
    ...formValues,
    [harDuJobbetIEtAnnetEøsLandSveitsEllerStorbritanniaILøpetAvDeSiste36Månedene]:
      harJobbetIEøsLand,
  };

  useNullstillSkjulteFelter<ArbeidsforholdModalSvar>(form, alleModalKomponenter);

  useEffect(() => {
    if (stengModalSelvOmDetErUlagredeEndringer) {
      setModalData(undefined);
    }
  }, [stengModalSelvOmDetErUlagredeEndringer]);

  function leggTilArbeidsforhold(skjemaData: ArbeidsforholdModalSvar) {
    const jobbetSkiftTurnusEllerRotasjon = skjemaData[harDuJobbetSkiftTurnusEllerRotasjon] || "";
    const arbeidsforholdSituasjon = skjemaData[hvordanHarDetteArbeidsforholdetEndretSeg] || "";
    const bedriftNavn = skjemaData[navnetPåBedriften] || "";
    const eøsLand = skjemaData[hvilketLandJobbetDuI];

    const nyttDokumentkrav = lagDokumentasjonskrav(
      t,
      jobbetSkiftTurnusEllerRotasjon,
      arbeidsforholdSituasjon,
      bedriftNavn,
      harJobbetIEøsLand === "ja",
      eøsLand
    );

    const nyttArbeidsforhold = {
      ...skjemaData,
      id: crypto.randomUUID(),
      dokumentasjonskrav: nyttDokumentkrav.map((krav) => krav.id),
    };

    setDokumentasjonskrav([...dokumentasjonskrav, ...nyttDokumentkrav]);
    setRegistrerteArbeidsforhold([...registrerteArbeidsforhold, nyttArbeidsforhold]);
  }

  function redigerArbeidsforhold(skjemaData: ArbeidsforholdModalSvar) {
    if (!modalData?.arbeidsforhold) {
      console.error("Mangler arbeidsforhold for redigering");
      return;
    }

    const gammeltArbeidsforhold = modalData.arbeidsforhold;
    const jobbetSkiftTurnusEllerRotasjon = skjemaData[harDuJobbetSkiftTurnusEllerRotasjon] || "";
    const arbeidsforholdSituasjon = skjemaData[hvordanHarDetteArbeidsforholdetEndretSeg] || "";
    const bedriftNavn = skjemaData[navnetPåBedriften] || "";
    const eøsLand = skjemaData[hvilketLandJobbetDuI];

    const oppdaterteDokumentasjonskrav = dokumentasjonskrav.filter(
      (krav) => !gammeltArbeidsforhold.dokumentasjonskrav?.includes(krav.id)
    );

    const nyeDokumentkrav = lagDokumentasjonskrav(
      t,
      jobbetSkiftTurnusEllerRotasjon,
      arbeidsforholdSituasjon,
      bedriftNavn,
      harJobbetIEøsLand === "ja",
      eøsLand
    );

    const oppdatertArbeidsforhold = {
      ...skjemaData,
      id: gammeltArbeidsforhold.id,
      dokumentasjonskrav: nyeDokumentkrav.map((krav) => krav.id),
    };

    const oppdatertArbeidsforholdListe = registrerteArbeidsforhold.map((arbeidsforhold) =>
      arbeidsforhold.id === gammeltArbeidsforhold.id ? oppdatertArbeidsforhold : arbeidsforhold
    );

    setDokumentasjonskrav([...oppdaterteDokumentasjonskrav, ...nyeDokumentkrav]);
    setRegistrerteArbeidsforhold(oppdatertArbeidsforholdListe);
  }

  return (
    <>
      <Modal
        ref={ref}
        width={700}
        aria-labelledby="modal-heading"
        onBeforeClose={() => {
          if (form.transient.formState.isDirty) {
            endringerErIkkeLagretModalRef.current?.showModal();
            return false;
          }

          return true;
        }}
        onClose={() => setModalData(undefined)}
      >
        <Modal.Header>
          <Heading level="1" size="medium" id="modal-heading">
            {modalData?.operasjon === ModalOperasjon.LeggTil
              ? t("modal.leggTil")
              : t("modal.rediger")}
          </Heading>
        </Modal.Header>
        <Modal.Body>
          {modalData?.form &&
            arbeidsforholdForklarendeTekstKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(modalData.form?.value())) {
                return null;
              }

              if (modalData?.form) {
                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formValues={formValues}
                    formScope={modalData.form.scope(komponent.id as keyof ArbeidsforholdSvar)}
                  />
                );
              }
            })}
          <Form id={formId} action={formAction}>
            <VStack gap="space-24" className="mt-16">
              {alleModalKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(seksjonOgModalSvar)) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formValues={formValues}
                    formScope={form.scope(komponent.id as keyof ArbeidsforholdModalSvar)}
                  />
                );
              })}

              <HStack className="mt-16" justify="end">
                <Button
                  type="button"
                  onClick={() => form.submit()}
                  icon={<FloppydiskIcon aria-hidden />}
                >
                  {t("navigasjon.lagreOgLukk")}
                </Button>
              </HStack>
            </VStack>
          </Form>
        </Modal.Body>
      </Modal>
      <EndringerErIkkeLagretModal
        ref={endringerErIkkeLagretModalRef}
        setStengModalSelvOmDetErUlagredeEndringer={setStengModalSelvOmDetErUlagredeEndringer}
      />
    </>
  );
}
