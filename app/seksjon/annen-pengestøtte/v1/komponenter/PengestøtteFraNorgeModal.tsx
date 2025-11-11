import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import {
  pengestøtteFraNorgeModalSpørsmål,
  PengestøtteFraNorgeModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { pengestøtteFraNorgeSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function PengestøtteFraNorgeModal({ ref }: IProps) {
  const {
    pengestøtteFraNorge,
    setPengestøtteFraNorge,
    pengestøtteFraNorgeModalData,
    setPengestøtteFraNorgeModalData,
  } = useAnnenPengestøtteContext();

  const form = useForm({
    submitSource: "state",
    schema: pengestøtteFraNorgeSchema,
    defaultValues: pengestøtteFraNorgeModalData?.pengestøtteFraNorgeSvar ?? {},
    handleSubmit: (enPengestøtteFraNorge) => {
      if (
        pengestøtteFraNorgeModalData?.operasjon !== ModalOperasjon.LeggTil &&
        pengestøtteFraNorgeModalData?.operasjon !== ModalOperasjon.Rediger
      ) {
        console.error("Ugyldig operasjonstype for PengestøtteFraNorgeModal");
        return;
      }

      if (pengestøtteFraNorgeModalData?.operasjon === ModalOperasjon.LeggTil) {
        setPengestøtteFraNorge([
          ...pengestøtteFraNorge,
          enPengestøtteFraNorge as PengestøtteFraNorgeModalSvar,
        ]);
      }

      if (
        pengestøtteFraNorgeModalData?.pengestøtteFraNorgeSvarIndex !== undefined &&
        pengestøtteFraNorgeModalData?.operasjon === ModalOperasjon.Rediger
      ) {
        const oppdatertListe = [...pengestøtteFraNorge];
        oppdatertListe[pengestøtteFraNorgeModalData.pengestøtteFraNorgeSvarIndex] =
          enPengestøtteFraNorge as PengestøtteFraNorgeModalSvar;
        setPengestøtteFraNorge(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setPengestøtteFraNorgeModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  useNullstillSkjulteFelter<PengestøtteFraNorgeModalSvar>(form, pengestøtteFraNorgeModalSpørsmål);

  const modalTittel =
    pengestøtteFraNorgeModalData?.operasjon === ModalOperasjon.LeggTil
      ? "Legg til pengestøtte fra Norge"
      : "Rediger pengestøtte fra Norge";

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setPengestøtteFraNorgeModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">{modalTittel}</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {pengestøtteFraNorgeModalSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof PengestøtteFraNorgeModalSvar)}
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
