import { ZodObject } from "zod";
import { FormScope, useForm } from "@rvf/react-router";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import {
  BarneSvar,
  leggTilBarnSporsmal,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.sporsmal";
import { Button, Modal, VStack } from "@navikt/ds-react";
import { Form } from "react-router";

type BarneTilleggModalProps = {
  barn: BarneSvar;
  barneSchema: ZodObject;
  ref: React.RefObject<HTMLDialogElement | null>;
  setVisModal: React.Dispatch<React.SetStateAction<boolean>>;
  redigereBarnManuelt: (barn: BarneSvar, index: number) => void;
  index: number;
};

export default function RedigerBarnModal({
  barn,
  barneSchema,
  ref,
  setVisModal,
  redigereBarnManuelt,
  index,
}: BarneTilleggModalProps) {
  const form = useForm({
    id: "schema",
    schema: barneSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: barn,
    handleSubmit: (data) => {
      const validering = form.validate();
      const harFeil = Object.keys(validering).length > 0;

      if (harFeil) {
        return;
      }
      redigereBarnManuelt(data as BarneSvar, index);
      ref.current?.close();
      setVisModal(false);
    },
  });

  function håndtereAvbryt() {
    setVisModal(false);
    ref.current?.close();
  }

  return (
    <Modal
      ref={ref}
      header={{ heading: "Rediger barn", closeButton: false }}
      onCancel={(e) => håndtereAvbryt()}
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
        <Button onClick={() => form.submit()}>Legg til barn</Button>
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
