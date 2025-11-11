import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  ModalOperasjon,
  useArbeidsforholdContext,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import { arbeidsforholdModalSchema } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.schema";
import {
  Arbeidsforhold,
  arbeidsforholdForklarendeTekstKomponenter,
  arbeidsforholdModalSkiftTurnusRotasjonSpørsmål,
  arbeidsforholdModalSpørsmål,
  ArbeidsforholdModalSvar,
  ArbeidsforholdSvar,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { arbeidsforholdModalJegHarSagtOppSelvSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegHarSagtOpp";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.jegErOppsagt";
import { arbeidsforholdModalJegHarFåttAvskjedSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.avskjediget";
import { arbeidsforholdModalKontraktenErUgåttSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.kontraktenErUgått";
import { arbeidsforholdModalArbeidstidenErRedusertSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.arbeidstidenErRedusert";
import { arbeidsforholdModalArbeidsgiverErKonkursSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.konkurs";
import { arbeidsforholdModalJegErPermittertSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.permittert";
import { arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål.ikkeEndret";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function ArbeidsforholdModal({ ref }: Readonly<IProps>) {
  const { registrerteArbeidsforhold, setRegistrerteArbeidsforhold, modalData, setModalData } =
    useArbeidsforholdContext();

  const alleModalSpørsmål = arbeidsforholdModalSpørsmål
    .concat(arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål)
    .concat(arbeidsforholdModalJegHarSagtOppSelvSpørsmål)
    .concat(arbeidsforholdModalJegHarFåttAvskjedSpørsmål)
    .concat(arbeidsforholdModalKontraktenErUgåttSpørsmål)
    .concat(arbeidsforholdModalArbeidstidenErRedusertSpørsmål)
    .concat(arbeidsforholdModalArbeidsgiverErKonkursSpørsmål)
    .concat(arbeidsforholdModalJegErPermittertSpørsmål)
    .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål)
    .concat(arbeidsforholdModalSkiftTurnusRotasjonSpørsmål);

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

  useNullstillSkjulteFelter<ArbeidsforholdModalSvar>(form, alleModalSpørsmål);

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
          arbeidsforholdForklarendeTekstKomponenter.map((spørsmål) => {
            if (spørsmål.visHvis && !spørsmål.visHvis(modalData.form?.value())) {
              return null;
            }

            if (modalData?.form) {
              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={modalData.form.scope(spørsmål.id as keyof ArbeidsforholdSvar)}
                />
              );
            }
          })}
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {alleModalSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof ArbeidsforholdModalSvar)}
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
