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
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { requireField } from "~/utils/validering.utils";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "din-situasjon";
  const nesteSeksjonId = "bodstedsland";
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
    if (!data.mottatt) {
      requireField(data, ctx, "mottatt", "Du må svare på dette spørsmålet");
      return;
    }

    if (data.mottatt === "ja") {
      requireField(data, ctx, "arsak", "Du må svare på dette spørsmålet");
      return;
    }

    if (data.mottatt === "nei" || data.mottatt === "vetikke") {
      requireField(data, ctx, "dato", "Du må velge en dato");
      return;
    }
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
      // Dette er en workaround
      // Feilmelding sitter igjen etter at dato er valgt, må tvinge en ny validering
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
              <RadioGroup
                {...form.getInputProps("mottatt")}
                legend="Har du mottatt dagpenger fra NAV i løpet av de siste 52 ukene?"
                error={form.error("mottatt")}
              >
                <Radio value="ja">Ja</Radio>
                <Radio value="nei">Nei</Radio>
                <Radio value="vetikke">Vet ikke</Radio>
              </RadioGroup>

              {form.value("mottatt") === "ja" && (
                <Textarea
                  {...form.getInputProps("arsak")}
                  label="Skriv årsaken til at dagpengene ble stanset (Maks 500 tegn)"
                  description="For eksempel om du har vært syk, på ferie, glemt å sende meldekort, vært i utdanning eller hatt foreldrepermisjon."
                  maxLength={500}
                  error={form.error("arsak")}
                />
              )}

              {(form.value("mottatt") === "nei" || form.value("mottatt") === "vetikke") && (
                <DatePicker {...datepickerProps} fromDate={new Date()}>
                  <DatePicker.Input
                    {...inputProps}
                    name="dato" // name må settes manuelt fordi datepicker er controlled field
                    error={form.error("dato")} // error må settes manuelt fordi datepicker er controlled field
                    placeholder="DD.MM.ÅÅÅÅ"
                    label="Hvilken dato søker du dagpenger fra?"
                    description="Du kan få dagpenger fra første dag du er helt eller delvis arbeidsledig eller permittert og tidligst fra den dagen du sender inn søknaden. Datoen du søker om dagpenger fra har betydning for beregning av dagpengene dine."
                  />
                </DatePicker>
              )}

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
