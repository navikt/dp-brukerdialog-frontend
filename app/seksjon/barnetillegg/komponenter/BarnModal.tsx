import { FloppydiskIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  ModalOperasjonEnum,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/barnetillegg.context";
import { leggTilBarnManueltSchema } from "~/seksjon/barnetillegg/barnetillegg.schema";
import {
  Barn,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
} from "~/seksjon/barnetillegg/barnetillegg.spørsmål";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function BarnModal({ ref }: IProps) {
  const { barnLagtManuelt, setBarnLagtManuelt, modalData, setModalData } = useBarnetilleggContext();

  const form = useForm({
    submitSource: "state",
    schema: leggTilBarnManueltSchema,
    defaultValues: modalData?.barn ?? {},
    handleSubmit: (barn) => {
      if (
        modalData?.operasjon !== ModalOperasjonEnum.LeggTil &&
        modalData?.operasjon !== ModalOperasjonEnum.Rediger
      ) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (modalData?.operasjon === ModalOperasjonEnum.LeggTil) {
        setBarnLagtManuelt([...barnLagtManuelt, barn as Barn]);
      }

      if (
        modalData?.barnIndex !== undefined &&
        modalData?.operasjon === ModalOperasjonEnum.Rediger
      ) {
        const oppdatertListe = [...barnLagtManuelt];
        oppdatertListe[modalData.barnIndex] = barn as Barn;
        setBarnLagtManuelt(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">
            <PersonPlusIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
            Legg til barn du forsørger
          </HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {leggTilBarnManueltSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof LeggTilBarnManueltSvar)}
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
