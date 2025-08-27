import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  leggTilNæringsvirksomhetSpørsmål,
  LeggTilNæringsvirksomhetSvar,
  Næringsvirksomhet,
  organisasjonsnummer,
} from "~/seksjon-regelsett/egen-næring/egen-næring.spørsmål";
import { leggTilNæringsvirksomhetSchema } from "~/seksjon-regelsett/egen-næring/egen-næring.schema";

interface IProps {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  registrerteNæringsvirksomheter: Næringsvirksomhet[];
  setRegistrerteNæringsvirksomheter: (næringsvirksomheter: Næringsvirksomhet[]) => void;
  index: number;
  næringsvirksomhet: Næringsvirksomhet;
}

export function OppdaterNæringsvirksomhetModal({
  modalRef,
  setRegistrerteNæringsvirksomheter,
  registrerteNæringsvirksomheter,
  index,
  næringsvirksomhet,
}: IProps) {
  const form = useForm({
    submitSource: "state",
    schema: leggTilNæringsvirksomhetSchema,
    defaultValues: næringsvirksomhet,
    handleSubmit: (data) => {
      const oppdatertNæringsvirksomhet: Næringsvirksomhet = {
        [organisasjonsnummer]: data[organisasjonsnummer]!,
        [hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]:
          data[hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]!,
        [hvorMangeTimerJobbetPerUkeNå]: data[hvorMangeTimerJobbetPerUkeNå]!,
      };

      const oppdatertListe = [...registrerteNæringsvirksomheter]
      oppdatertListe[index] = oppdatertNæringsvirksomhet

      setRegistrerteNæringsvirksomheter(oppdatertListe);
      modalRef.current?.close();
    },
    resetAfterSubmit: true,
  });

  return (
    <Modal ref={modalRef} width={700} aria-labelledby="modal-heading">
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">Oppdater næringsvirksomhet</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {leggTilNæringsvirksomhetSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof LeggTilNæringsvirksomhetSvar)}
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