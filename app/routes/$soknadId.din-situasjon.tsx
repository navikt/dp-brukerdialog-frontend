import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Alert,
  Button,
  DatePicker,
  HStack,
  Page,
  Radio,
  RadioGroup,
  Textarea,
  useDatepicker,
  VStack,
} from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { formatISO } from "date-fns";
import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router";
import invariant from "tiny-invariant";
import { z } from "zod";
import { dinSituasjonSporsmal } from "~/components/seksjon-sporsmal/din-situasjon";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "din-situasjon";
  const nesteSeksjonId = "personalia";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

const schema = z
  .object({
    mottatt: z.enum(["ja", "nei", "vetikke"]).optional(),
    arsak: z.string().max(500, "Maks 500 tegn").optional(),
    dato: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    dinSituasjonSporsmal.forEach((q) => {
      const visible = !q.visHvis || q.visHvis(data);
      if (visible && !data[q.key]) {
        ctx.addIssue({
          path: [q.key],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });

export default function DinSituasjon() {
  const actionData = useActionData<typeof action>();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: schema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {},
  });

  const { datepickerProps, inputProps } = useDatepicker({
    onDateChange: (date) => {
      form.setValue("dato", date ? formatISO(date, { representation: "date" }) : "");
      form.validate();
    },
  });

  return (
    <Page className="brukerdialog">
      <h2>Din situasjon</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {dinSituasjonSporsmal.map((sporsmal) => {
                // Skip rendering if the question should not be shown based on current answers
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) return null;

                if (sporsmal.type === "radio") {
                  return (
                    <RadioGroup
                      {...form.getInputProps(sporsmal.key)}
                      legend={sporsmal.label}
                      key={sporsmal.key}
                      error={form.error(sporsmal.key)}
                    >
                      {sporsmal.options?.map((opt) => (
                        <Radio key={opt.value} value={opt.value}>
                          {opt.label}
                        </Radio>
                      ))}
                    </RadioGroup>
                  );
                }
                if (sporsmal.type === "textarea") {
                  return (
                    <Textarea
                      {...form.getInputProps(sporsmal.key)}
                      label={sporsmal.label}
                      key={sporsmal.key}
                      maxLength={sporsmal.maxLength}
                      error={form.error(sporsmal.key)}
                    />
                  );
                }
                if (sporsmal.type === "datepicker") {
                  return (
                    <DatePicker {...datepickerProps}>
                      <DatePicker.Input
                        {...inputProps}
                        name={sporsmal.key}
                        key={sporsmal.key}
                        placeholder="DD.MM.ÅÅÅÅ"
                        error={form.error(sporsmal.key)}
                        description={sporsmal.description}
                        label={sporsmal.label}
                      />
                    </DatePicker>
                  );
                }

                // If the question type is not recognized, return null
                console.warn(`Ukjent spørsmålstype: ${sporsmal}`);
                return null;
              })}

              {actionData && (
                <Alert variant="error" className="mt-4">
                  {actionData.error}
                </Alert>
              )}
            </VStack>

            <HStack gap="4" className="mt-8">
              <Button
                variant="secondary"
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
              >
                Forrige steg
              </Button>
              <Button
                variant="primary"
                type="submit"
                iconPosition="right"
                icon={<ArrowRightIcon />}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
    </Page>
  );
}
