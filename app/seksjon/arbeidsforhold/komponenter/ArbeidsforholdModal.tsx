import { FloppydiskIcon } from "@navikt/aksel-icons";
import { BodyShort, Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  ModalOperasjonEnum,
  useArbeidsforholdContext,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.context";
import { arbeidsforholdModalSchema } from "~/seksjon/arbeidsforhold/arbeidsforhold.schema";
import {
  Arbeidsforhold,
  arbeidsforholdModalSpørsmål,
  ArbeidsforholdModalSvar,
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { arbeidsforholdModalJegHarSagtOppSelvSpørsmål } from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.jegHarSagtOpp";
import { arbeidsforholdModalArbeidsgiverenMinHarSagtMegOppSpørsmål } from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.jegErOppsagt";
import { arbeidsforholdModalJegHarFåttAvskjedSpørsmål } from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.avskjediget";
import { arbeidsforholdModalKontraktenErUgåttSpørsmål } from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.kontraktenErUgått";
import { arbeidsforholdModalArbeidstidenErRedusertSpørsmål } from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.arbeidstidenErRedusert";
import {
  arbeidsforholdModalArbeidsgiverErKonkursSpørsmål
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.konkurs";
import { arbeidsforholdModalJegErPermittertSpørsmål } from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.permittert";
import {
  arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål
} from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål.ikkeEndret";

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
    .concat(arbeidsforholdModalArbeidsforholdetErIkkeEndretSpørsmål);

  const form = useForm({
    submitSource: "state",
    schema: arbeidsforholdModalSchema,
    defaultValues: modalData?.arbeidsforhold ?? {},
    handleSubmit: (arbeidsforhold) => {
      if (
        modalData?.operasjon !== ModalOperasjonEnum.LeggTil &&
        modalData?.operasjon !== ModalOperasjonEnum.Rediger
      ) {
        console.error("Ugyldig operasjonstype for arbeidsforholdmodal");
        return;
      }

      if (modalData?.operasjon === ModalOperasjonEnum.LeggTil) {
        setRegistrerteArbeidsforhold([
          ...registrerteArbeidsforhold,
          arbeidsforhold as Arbeidsforhold,
        ]);
      }

      if (
        modalData?.arbeidsforholdIndex !== undefined &&
        modalData?.operasjon === ModalOperasjonEnum.Rediger
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
    modalData?.operasjon === ModalOperasjonEnum.LeggTil
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
        <BodyShort>{modalData?.ledetekst}</BodyShort>
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
