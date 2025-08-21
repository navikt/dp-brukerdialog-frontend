import { Box } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { Form } from "react-router";
import { z } from "zod";
import { Envalg } from "~/components/spørsmål/Envalg";
import { EnvalgSpørsmål } from "~/components/spørsmål/spørsmål.types";
import { Barn, forsørgerduBarnet } from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";

interface IProps {
  barn: Barn;
  shouldValidate: boolean;
}

export const pdlBarnSpørsmål: EnvalgSpørsmål = {
  id: forsørgerduBarnet,
  type: "envalg",
  label: "Forsørger du barnet som ikke vises her?",
  options: [
    { value: "ja", label: "Ja" },
    { value: "nei", label: "Nei" },
  ],
};

export const schema = z
  .object({
    [forsørgerduBarnet]: z.enum(["ja", "nei"]).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data[forsørgerduBarnet]) {
      ctx.addIssue({
        path: [forsørgerduBarnet],
        code: "custom",
        message: "Du må svare på dette spørsmålet",
      });
    }
  });

export function BarnFraPdl({ barn, shouldValidate }: IProps) {
  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: schema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {
      forsørgerduBarnet:
        typeof barn.forsørgerduBarnet === "boolean"
          ? barn.forsørgerduBarnet
            ? "ja"
            : "nei"
          : undefined,
    },
  });

  useEffect(() => {
    if (shouldValidate) {
      form.validate();
    }
  }, [shouldValidate]);

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3>
        {barn.fornavnOgMellomnavn} {barn.etternavn}
      </h3>
      <p>{barn.fodselsnummer.toString()}</p>

      <Form {...form.getFormProps()}>
        <Envalg spørsmål={pdlBarnSpørsmål} formScope={form.scope(forsørgerduBarnet)} />
      </Form>
    </Box>
  );
}
