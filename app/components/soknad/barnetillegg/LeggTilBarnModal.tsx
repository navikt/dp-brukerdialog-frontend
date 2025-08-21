import { Button, Modal, VStack } from "@navikt/ds-react";
import { Form } from "react-router";
import {
  BarneSvar,
  leggTilBarnSporsmal,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.sporsmal";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { FormScope, useForm } from "@rvf/react-router";
import { ZodObject } from "zod";

type LeggTilBarnModalProps = {
  barneSchema: ZodObject;
  ref: React.RefObject<HTMLDialogElement | null>;
  leggTil: (barn: BarneSvar) => void;
  setVisLeggTilModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LeggTilBarnModal({
  barneSchema,
  ref,
  leggTil,
  setVisLeggTilModal,
}: LeggTilBarnModalProps) {
  console.log("Legg til barn modal", barneSchema);
  const form = useForm({
    id: "schema",
    schema: barneSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {},
    handleSubmit: (data) => {
      const validering = form.validate();
      const harFeil = Object.keys(validering).length > 0;

      if (harFeil) {
        return;
      }
      leggTil(data as BarneSvar);
      ref.current?.close();
      setVisLeggTilModal(false);
    },
  });

  function håndtereAvbryt() {
    setVisLeggTilModal(false);
    ref.current?.close();
  }

  return (
    <Modal
      ref={ref}
      header={{ heading: "Legg til barn", closeButton: false }}
      onCancel={(e) => {
        e.preventDefault();
        håndtereAvbryt();
      }}
    >
      <Modal.Body>
        <VStack gap="20">
          <VStack gap="6">
            <Form {...form.getFormProps()}>
              <VStack gap="8">
                {leggTilBarnSporsmal.map((sporsmal) => {
                  return (
                    <Sporsmal
                      key={sporsmal.id}
                      sporsmal={sporsmal}
                      formScope={
                        form.scope(sporsmal.id as keyof BarneSvar) as FormScope<string | undefined>
                      }
                    />
                  );
                })}
              </VStack>
            </Form>
          </VStack>
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            console.log("Legg til barn:", form.value());
            form.submit();
          }}
        >
          Legg til barn
        </Button>
        <Button
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            håndtereAvbryt();
          }}
        >
          Avbryt
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
