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
  Arbeidsforhold,
  arbeidsforholdForklarendeTekstKomponenter,
  arbeidsforholdModalKomponenter,
  arbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  ArbeidsforholdModalSvar,
  ArbeidsforholdSvar,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { arbeidsforholdModalArbeidstidenErRedusertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { arbeidsforholdModalJegHarFåttAvskjedKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import { arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import { arbeidsforholdModalJegHarSagtOppSelvKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import { arbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import { arbeidsforholdModalKontraktenErUgåttKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUgått";
import { arbeidsforholdModalJegErPermittertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { arbeidsforholdModalSchema } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.schema";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

// Test verif commit uten local ssh nøkkel

export function ArbeidsforholdModal({ ref }: IProps) {
  const { registrerteArbeidsforhold, setRegistrerteArbeidsforhold, modalData, setModalData } =
    useArbeidsforholdContext();

  const alleModalKomponenter = arbeidsforholdModalKomponenter
    .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter)
    .concat(arbeidsforholdModalJegHarSagtOppSelvKomponenter)
    .concat(arbeidsforholdModalJegHarFåttAvskjedKomponenter)
    .concat(arbeidsforholdModalKontraktenErUgåttKomponenter)
    .concat(arbeidsforholdModalArbeidstidenErRedusertKomponenter)
    .concat(arbeidsforholdModalArbeidsgiverErKonkursKomponenter)
    .concat(arbeidsforholdModalJegErPermittertKomponenter)
    .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter)
    .concat(arbeidsforholdModalSkiftTurnusRotasjonKomponenter);

  const form = useForm({
    submitSource: "state",
    schema: arbeidsforholdModalSchema,
    defaultValues: modalData?.arbeidsforhold ?? {},
    handleSubmit: (arbeidsforhold) => {
      if (
        modalData?.operasjon !== ModalOperasjon.LeggTil &&
        modalData?.operasjon !== ModalOperasjon.Rediger
      ) {
        console.error("Ugyldig operasjonstype for arbeidsforholdmodal");
        return;
      }

      if (modalData?.operasjon === ModalOperasjon.LeggTil) {
        setRegistrerteArbeidsforhold([
          ...registrerteArbeidsforhold,
          arbeidsforhold as Arbeidsforhold,
        ]);
      }

      if (
        modalData?.arbeidsforholdIndex !== undefined &&
        modalData?.operasjon === ModalOperasjon.Rediger
      ) {
        const oppdatertListe = [...registrerteArbeidsforhold];
        oppdatertListe[modalData.arbeidsforholdIndex] = arbeidsforhold as Arbeidsforhold;
        setRegistrerteArbeidsforhold(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  useNullstillSkjulteFelter<ArbeidsforholdModalSvar>(form, alleModalKomponenter);

  const modalTittel =
    modalData?.operasjon === ModalOperasjon.LeggTil
      ? "Legg til arbeidsforhold"
      : "Rediger arbeidsforhold";
  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
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
                  formScope={modalData.form.scope(komponent.id as keyof ArbeidsforholdSvar)}
                />
              );
            }
          })}
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {alleModalKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formScope={form.scope(komponent.id as keyof ArbeidsforholdModalSvar)}
                />
              );
            })}

            <HStack className="mt-4" justify="end">
              <Button
                type="submit"
                icon={<FloppydiskIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
              >
                Lagre og lukk
              </Button>
            </HStack>
          </VStack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
