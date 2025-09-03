import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  Gårdsbruk,
  leggTilGårdsbrukSpørsmål,
  LeggTilGårdsbrukSvar,
} from "~/seksjon/egen-næring/egen-næring.spørsmål";
import { leggTilGårdsbrukSchema } from "~/seksjon/egen-næring/egen-næring.schema";
import { useEgenNæringContext } from "~/seksjon/egen-næring/egen-næring.context";
import { ModalOperasjonEnum } from "~/seksjon/barnetillegg/barnetillegg.context";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function GårdsbrukModal({ ref }: Readonly<IProps>) {
  const {
    gårdsbruk,
    setGårdsbruk,
    gårdsbrukModalData,
    setGårdsbrukModalData,
  } = useEgenNæringContext();

  const form = useForm({
    submitSource: "state",
    schema: leggTilGårdsbrukSchema,
    defaultValues: gårdsbrukModalData?.etGårdsbruk ?? {},
    handleSubmit: (etGårdsbruk) => {
      if (
        gårdsbrukModalData?.operasjon !== ModalOperasjonEnum.LeggTil &&
        gårdsbrukModalData?.operasjon !== ModalOperasjonEnum.Rediger
      ) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (gårdsbrukModalData?.operasjon === ModalOperasjonEnum.LeggTil) {
        setGårdsbruk([...gårdsbruk, etGårdsbruk as Gårdsbruk]);
      }

      if (
        gårdsbrukModalData?.gårdsbrukIndex !== undefined &&
        gårdsbrukModalData?.operasjon === ModalOperasjonEnum.Rediger
      ) {
        const oppdatertListe = [...gårdsbruk];
        oppdatertListe[gårdsbrukModalData.gårdsbrukIndex] = etGårdsbruk as Gårdsbruk;
        setGårdsbruk(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setGårdsbrukModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setGårdsbrukModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">Legg til gårdsbruk</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {leggTilGårdsbrukSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof LeggTilGårdsbrukSvar)}
                />
              );
            })}

            <HStack className="mt-4" justify="end">
              <Button
                type={"submit"}
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
