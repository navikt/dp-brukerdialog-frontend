import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Alert,
  BodyShort,
  Button,
  DatePicker,
  HStack,
  Page,
  Radio,
  RadioGroup,
  ReadMore,
  Select,
  Textarea,
  useDatepicker,
  VStack,
} from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { formatISO } from "date-fns";
import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router";
import invariant from "tiny-invariant";
import { z } from "zod";
import { LANDLISTE } from "~/constants";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "din-situasjon";
  const nesteSeksjonId = "tilleggsopplysninger";
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
    bodstedsland: z.string().optional(),
    "reist-tilbake-til-bostedslandet": z.enum(["ja", "nei"]).optional(),
    "reiste-du-hjem-til-landet-du-bor-i": z.enum(["ja", "nei"]).optional(),
    "reiste-du-i-takt-med-rotasjon": z.enum(["ja", "nei"]).optional(),
    "avreise-dato-fra": z.string({ error: "Du må velge en dato" }).optional(),
    "avreise-dato-til": z.string({ error: "Du må velge en dato" }).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.bodstedsland) {
      ctx.addIssue({
        path: ["bodstedsland"],
        code: "custom",
        message: "Du må svare på dette spørsmålet",
      });
    }

    if (data.bodstedsland) {
      if (data.bodstedsland.length < 2) {
        ctx.addIssue({
          path: ["bodstedsland"],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }

      if (data.bodstedsland === "NO") {
        return;
      }

      if (!data["reist-tilbake-til-bostedslandet"]) {
        ctx.addIssue({
          path: ["reist-tilbake-til-bostedslandet"],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }

      if (data["reist-tilbake-til-bostedslandet"] === "ja") {
        if (!data["avreise-dato-fra"]) {
          ctx.addIssue({
            path: ["avreise-dato-fra"],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }

        if (!data["avreise-dato-til"]) {
          ctx.addIssue({
            path: ["avreise-dato-til"],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }
      }

      if (data["reist-tilbake-til-bostedslandet"] === "nei") {
        if (!data["reiste-du-hjem-til-landet-du-bor-i"]) {
          ctx.addIssue({
            path: ["reiste-du-hjem-til-landet-du-bor-i"],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }

        if (data["reiste-du-hjem-til-landet-du-bor-i"] === "ja") {
          return;
        }

        if (
          data["reist-tilbake-til-bostedslandet"] === "nei" &&
          !data["reiste-du-i-takt-med-rotasjon"]
        ) {
          ctx.addIssue({
            path: ["reiste-du-i-takt-med-rotasjon"],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }
      }
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

  const { datepickerProps: avreiseDatoFraProps, inputProps: avreiseDatoFraInputProps } =
    useDatepicker({
      onDateChange: (date) => {
        form.setValue("avreise-dato-fra", date ? formatISO(date, { representation: "date" }) : "");
        form.validate();
      },
    });

  const {
    datepickerProps: avreiseDatoTilProps,
    inputProps: { ...avreiseDatoTilInputProps },
  } = useDatepicker({
    onDateChange: (date) => {
      form.setValue("avreise-dato-til", date ? formatISO(date, { representation: "date" }) : "");
      form.validate();
    },
  });

  return (
    <Page className="brukerdialog">
      <h2>Bodstedsland</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <Select
                label="Velg bostedsland"
                name="bodstedsland"
                error={form.error("bodstedsland")}
              >
                <option value="">Velg et land</option>
                {LANDLISTE.map((land) => (
                  <option key={land.value} value={land.value}>
                    {land.label}
                  </option>
                ))}
              </Select>
              <ReadMore header="For deg som her pendlet mellom EØS-Land og Sveits">
                Hvis du bor i et EØS-land og jobber i et annet, er du en EØS-pendler. Det er egne
                regler for hvor du skal søke om penger hvis du blir arbeidsledig eller permittert og
                du har tilknytning til flere EØS-land.
                <br />
                <br />
                Hvilket land du skal søke om penger fra avhenger av
                <ul>
                  <li>hvilket land du sist jobbet i</li>
                  <li>hvilket land du bor i </li>
                  <li>
                    om du er permittert eller delvis arbeidsledig, eller om du er helt arbeidsledig
                    Er du usikker på hva du skal svare, kan du lese mer om hvor du skal søke penger
                    fra.
                  </li>
                </ul>
                Er du usikker på hva du skal svare, kan du lese{" "}
                <Link to="/eksempel">mer om hvor du skal søke penger fra.</Link>
              </ReadMore>

              {form.value("bodstedsland") && form.value("bodstedsland") !== "NO" && (
                <RadioGroup
                  name="reist-tilbake-til-bostedslandet"
                  legend="Har du reist tilbake til bostedslandet ditt etter at du ble arbeidsledig eller permittert?"
                  error={form.error("reist-tilbake-til-bostedslandet")}
                >
                  <Radio value="ja">Ja</Radio>
                  <Radio value="nei">Nei</Radio>
                </RadioGroup>
              )}

              {form.value("reist-tilbake-til-bostedslandet") === "ja" && (
                <VStack gap="4">
                  <BodyShort weight="semibold">Dato for avreise</BodyShort>
                  <VStack className="left-border" gap="4">
                    <DatePicker
                      {...avreiseDatoFraProps}
                      fromDate={new Date()}
                      toDate={new Date("31 Dec 2025")}
                    >
                      <DatePicker.Input
                        {...avreiseDatoFraInputProps}
                        name="dato"
                        error={form.error("avreise-dato-fra")}
                        placeholder="DD.MM.ÅÅÅÅ"
                        label="Fra dato"
                      />
                    </DatePicker>
                    <DatePicker
                      {...avreiseDatoTilProps}
                      fromDate={new Date()}
                      toDate={new Date("31 Dec 2025")}
                    >
                      <DatePicker.Input
                        {...avreiseDatoTilInputProps}
                        name="dato"
                        error={form.error("avreise-dato-til")}
                        placeholder="DD.MM.ÅÅÅÅ"
                        label="Til dato"
                      />
                    </DatePicker>
                  </VStack>
                </VStack>
              )}

              {form.value("reist-tilbake-til-bostedslandet") === "nei" && (
                <RadioGroup
                  name="reiste-du-hjem-til-landet-du-bor-i"
                  legend="Reiste du hjem til landet du bor i en gang i uken eller mer, mens du jobbet i Norge?"
                  error={form.error("reiste-du-hjem-til-landet-du-bor-i")}
                >
                  <Radio value="ja">Ja</Radio>
                  <Radio value="nei">Nei</Radio>
                </RadioGroup>
              )}

              {form.value("reiste-du-hjem-til-landet-du-bor-i") &&
                form.value("reiste-du-hjem-til-landet-du-bor-i") === "nei" && (
                  <RadioGroup
                    name="reiste-du-i-takt-med-rotasjon"
                    legend="Reiste du i takt med rotasjon?"
                    error={form.error("reiste-du-i-takt-med-rotasjon")}
                  >
                    <Radio value="ja">Ja</Radio>
                    <Radio value="nei">Nei</Radio>
                  </RadioGroup>
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
