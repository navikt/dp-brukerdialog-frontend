import { Button, Modal, VStack } from "@navikt/ds-react";
import { Form } from "react-router";
import { ZodObject } from "zod";
import { useForm } from "@rvf/react-router";
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
};

export default function BarneTilleggModal({
  barn,
  barneSchema,
  ref,
  leggTil,
}: BarneTilleggModalProps) {
  const form = useForm({
    schema: barneSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: barn ? barn : {},
  });

  //console.log("Form Barn: ", form.value());
  console.log("Barn: ", barn?.fornavnOgEtternavn);

  return (
    <Modal ref={ref} header={{ heading: "Legg til barn" }}>
      <Modal.Body>
        <VStack gap="20">
          <VStack gap="6">
            <Form
              {...form.getFormProps()}
              onSubmit={(e) => {
                e.preventDefault();
                leggTil(form.value() as BarneSvar);
                ref.current?.close();
              }}
            >
              <VStack gap="8">
                {leggTilBarnSporsmal.map((sporsmal) => {
                  if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                    return null;
                  }

                  return (
                    <Sporsmal
                      key={sporsmal.id}
                      sporsmal={sporsmal}
                      formScope={form.scope(sporsmal.id as keyof BarneSvar)}
                    />
                  );
                })}
                <Button variant="primary" type="submit">
                  Legg til barn
                </Button>
              </VStack>
            </Form>
          </VStack>
        </VStack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit">
          Legg til barn
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
