import { FloppydiskIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useBarnetilleggContext } from "~/seksjon/barnetillegg/barnetillegg.context";
import { leggTilBarnManueltSchema } from "~/seksjon/barnetillegg/barnetillegg.schema";
import {
  Barn,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
} from "~/seksjon/barnetillegg/barnetillegg.spørsmål";

interface IProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
}

export function BarnModal({ modalRef }: IProps) {
  const { barnLagtManuelt, setBarnLagtManuelt, modalData, setModalData } = useBarnetilleggContext();

  const form = useForm({
    submitSource: "state",
    schema: leggTilBarnManueltSchema,
    defaultValues: modalData?.barn || {},
    handleSubmit: (barn) => {
      if (modalData?.operasjon === "leggTil") {
        leggTilBarn(barn as Barn);
      }

      if (modalData?.operasjon === "rediger") {
        oppdaterBarn(barn as Barn);
      }
    },
    onSubmitSuccess() {
      setModalData(undefined);
      modalRef.current?.close();
    },
    resetAfterSubmit: true,
  });

  function leggTilBarn(data: Barn) {
    const { fornavnOgMellomnavn, etternavn, fødselsdato, bostedsland } = data;

    const nyttBarn: Barn = {
      fornavnOgMellomnavn,
      etternavn,
      fødselsdato,
      bostedsland,
    };

    setBarnLagtManuelt([...barnLagtManuelt, nyttBarn]);
  }

  function oppdaterBarn(data: Barn) {
    const { fornavnOgMellomnavn, etternavn, fødselsdato, bostedsland } = data;

    if (modalData?.barnIndex !== undefined) {
      const oppdatertBarn: Barn = {
        fornavnOgMellomnavn,
        etternavn,
        fødselsdato,
        bostedsland,
      };

      const oppdatertListe = [...barnLagtManuelt];
      oppdatertListe[modalData?.barnIndex] = oppdatertBarn;
      setBarnLagtManuelt(oppdatertListe);
    }
  }

  return (
    <Modal
      ref={modalRef}
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
