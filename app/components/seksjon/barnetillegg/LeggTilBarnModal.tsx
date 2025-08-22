import { FloppydiskIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { leggTilBarnManueltSchema } from "~/seksjon-regelsett/barnetillegg/barnetillegg.schema";
import {
  Barn,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";

interface IProps {
  leggTilBarnModalRef: React.RefObject<HTMLDialogElement | null>;
  setBarnLagtManueltList: (barn: Barn[]) => void;
  barnLagtManueltList: Barn[];
}

export function LeggTilBarnModal({
  leggTilBarnModalRef,
  setBarnLagtManueltList,
  barnLagtManueltList,
}: IProps) {
  const form = useForm({
    submitSource: "state",
    schema: leggTilBarnManueltSchema,
    defaultValues: {},
    handleSubmit: (data) => {
      const nyttBarn: Barn = {
        fornavnOgMellomnavn: data.fornavnOgMellomnavn,
        etternavn: data.etternavn,
        fødselsdato: data.fødselsdato,
        hvilkenLandBorBarnet: data.hvilkenLandBorBarnet,
      };

      setBarnLagtManueltList([...barnLagtManueltList, nyttBarn]);
      leggTilBarnModalRef.current?.close();
    },
    resetAfterSubmit: true,
  });

  return (
    <Modal ref={leggTilBarnModalRef} width={700} aria-labelledby="modal-heading">
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
