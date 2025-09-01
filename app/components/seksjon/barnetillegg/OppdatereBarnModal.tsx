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

export function OppdatereBarnModal({ modalRef }: IProps) {
  const { barnLagtManuelt, setBarnLagtManuelt, oppdaterBarn } = useBarnetilleggContext();

  if (!oppdaterBarn || !modalRef) {
    return null;
  }

  const form = useForm({
    submitSource: "state",
    schema: leggTilBarnManueltSchema,
    defaultValues: oppdaterBarn.barn,
    handleSubmit: (data) => {
      modalRef.current?.close();

      const oppdatertBarn: Barn = {
        fornavnOgMellomnavn: data.fornavnOgMellomnavn!,
        etternavn: data.etternavn!,
        fødselsdato: data.fødselsdato!,
        bostedsland: data.bostedsland!,
      };

      const oppdatertListe = [...barnLagtManuelt];
      oppdatertListe[oppdaterBarn?.barnIndex] = oppdatertBarn;

      setBarnLagtManuelt(oppdatertListe);
    },
    resetAfterSubmit: true,
  });

  return (
    <Modal ref={modalRef} width={700} aria-labelledby="modal-heading">
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">
            <PersonPlusIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
            Legg til barn du forsørger
          </HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()} key={oppdaterBarn.barnIndex}>
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
