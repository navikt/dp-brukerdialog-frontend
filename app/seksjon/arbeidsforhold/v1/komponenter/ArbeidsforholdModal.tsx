import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import {
  ModalOperasjon,
  useArbeidsforholdContext,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  arbeidsforholdForklarendeTekstKomponenter,
  arbeidsforholdModalKomponenter,
  arbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  ArbeidsforholdModalSvar,
  ArbeidsforholdSvar,
  harDuJobbetSkiftTurnusEllerRotasjon,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  navnetPåBedriften,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { arbeidsforholdModalArbeidstidenErRedusertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { arbeidsforholdModalJegHarFåttAvskjedKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import { arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import { arbeidsforholdModalJegHarSagtOppSelvKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import { arbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import { arbeidsforholdModalKontraktenErUtgåttKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
import { arbeidsforholdModalJegErPermittertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { arbeidsforholdModalSchema } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.schema";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { lagDokumentasjonskrav } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.dokumentasjonskrav";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";
import { useEffect, useRef, useState } from "react";

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

  const alleModalKomponenter = arbeidsforholdModalKomponenter
    .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter)
    .concat(arbeidsforholdModalJegHarSagtOppSelvKomponenter)
    .concat(arbeidsforholdModalJegHarFåttAvskjedKomponenter)
    .concat(arbeidsforholdModalKontraktenErUtgåttKomponenter)
    .concat(arbeidsforholdModalArbeidstidenErRedusertKomponenter)
    .concat(arbeidsforholdModalArbeidsgiverErKonkursKomponenter)
    .concat(arbeidsforholdModalJegErPermittertKomponenter)
    .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter)
    .concat(arbeidsforholdModalSkiftTurnusRotasjonKomponenter);

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

    const nyttDokumentkrav = lagDokumentasjonskrav(
      jobbetSkiftTurnusEllerRotasjon,
      arbeidsforholdSituasjon,
      bedriftNavn
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

    const oppdaterteDokumentasjonskrav = dokumentasjonskrav.filter(
      (krav) => !gammeltArbeidsforhold.dokumentasjonskrav?.includes(krav.id)
    );

    const nyeDokumentkrav = lagDokumentasjonskrav(
      jobbetSkiftTurnusEllerRotasjon,
      arbeidsforholdSituasjon,
      bedriftNavn
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

  const modalTittel =
    modalData?.operasjon === ModalOperasjon.LeggTil
      ? "Legg til arbeidsforhold"
      : "Rediger arbeidsforhold";
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
          } else {
            return true;
          }
        }}
        onClose={() => setModalData(undefined)}
      >
        <Modal.Header>
          <Heading level="1" size="medium" id="modal-heading">
            {modalTittel}
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
                    formValues={form.value()}
                    formScope={modalData.form.scope(komponent.id as keyof ArbeidsforholdSvar)}
                  />
                );
              }
            })}
          <Form {...form.getFormProps()}>
            <VStack gap="space-24" className="mt-16">
              {alleModalKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formValues={form.value()}
                    formScope={form.scope(komponent.id as keyof ArbeidsforholdModalSvar)}
                  />
                );
              })}

              <HStack className="mt-16" justify="end">
                <Button type="submit" icon={<FloppydiskIcon aria-hidden />}>
                  Lagre og lukk
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
