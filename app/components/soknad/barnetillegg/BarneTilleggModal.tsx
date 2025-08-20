import { Button, Modal, VStack } from "@navikt/ds-react";
import { Form } from "react-router";
import { ZodObject } from "zod";
import { FormScope, useForm } from "@rvf/react-router";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import {
  BarneSvar,
  leggTilBarnSporsmal,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.sporsmal";

type BarneTilleggModalProps = {
  barn: BarneSvar | undefined;
  barneSchema: ZodObject;
  ref: React.RefObject<HTMLDialogElement | null>;
  leggTil: (barn: BarneSvar) => void;
  redigereBarnManuelt: (barn: BarneSvar, index: number) => void;
  index: number;
};

export default function BarneTilleggModal({
  barn,
  barneSchema,
  ref,
  leggTil,
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
    defaultValues: barn ? barn : {},
    handleSubmit: (data) => {
      const validering = form.validate();
      const harFeil = Object.keys(validering).length > 0;

      if (harFeil) {
        return;
      }
      if (index >= 0) {
        redigereBarnManuelt(data as BarneSvar, index);
      } else {
        leggTil(data as BarneSvar);
      }
      ref.current?.close();
    },
  });

  return (
    <Modal ref={ref} header={{ heading: "Legg til barn" }}>
      <Modal.Body>
        <VStack gap="20">
          <VStack gap="6">
            <Form {...form.getFormProps()}>
              <VStack gap="8">
                {leggTilBarnSporsmal.map((sporsmal) => {
                  if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                    return null;
                  }

                  return (
                    <Sporsmal
                      key={sporsmal.id}
                      sporsmal={sporsmal}
                      formScope={form.scope(sporsmal.id as keyof BarneSvar) as FormScope<string | undefined>}
                    />
                  );
                })}
              </VStack>
              <Button variant="primary" type="submit">
                Legg til barn
              </Button>
            </Form>
          </VStack>
        </VStack>
      </Modal.Body>
    </Modal>
  );
}
