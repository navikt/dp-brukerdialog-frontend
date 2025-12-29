import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { ModalOperasjon } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  Gårdsbruk,
  leggTilGårdsbrukKomponenter,
  LeggTilGårdsbrukSvar,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { leggTilGårdsbrukSchema } from "~/seksjon/egen-næring/v1/egen-næring.schema";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function GårdsbrukModal({ ref }: IProps) {
  const { gårdsbruk, setGårdsbruk, gårdsbrukModalData, setGårdsbrukModalData } =
    useEgenNæringContext();

  const form = useForm({
    submitSource: "state",
    schema: leggTilGårdsbrukSchema,
    defaultValues: gårdsbrukModalData?.etGårdsbruk ?? {},
    handleSubmit: (etGårdsbruk) => {
      if (
        gårdsbrukModalData?.operasjon !== ModalOperasjon.LeggTil &&
        gårdsbrukModalData?.operasjon !== ModalOperasjon.Rediger
      ) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (gårdsbrukModalData?.operasjon === ModalOperasjon.LeggTil) {
        setGårdsbruk([...gårdsbruk, etGårdsbruk as Gårdsbruk]);
      }

      if (
        gårdsbrukModalData?.gårdsbrukIndex !== undefined &&
        gårdsbrukModalData?.operasjon === ModalOperasjon.Rediger
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

  const modalOperasjon =
    gårdsbrukModalData?.operasjon === ModalOperasjon.LeggTil ? "Legg til" : "Rediger";

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setGårdsbrukModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">{modalOperasjon} gårdsbruk</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {leggTilGårdsbrukKomponenter.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={spørsmål.id}
                  props={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof LeggTilGårdsbrukSvar)}
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
