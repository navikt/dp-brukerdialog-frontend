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
  TextField,
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
import { requireField } from "~/utils/validering.utils";

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

const bodstedsland = "bodstedsland";
const requiredErrorText = "Du må svare på dette spørsmålet";
const reistTilbakeTilBostedslandet = "reist-tilbake-til-bostedslandet";
const reisteDuHjemTilLandetDuBorI = "reiste-du-hjem-til-landet-du-bor-i";
const reisteDuITaktMedRotasjon = "reiste-du-i-takt-med-rotasjon";
const avreiseDatoFra = "avreise-dato-fra";
const avreiseDatoTil = "avreise-dato-til";
const hvorforReistDuFraNorge = "hvorfor-reist-du-fra-norge";

const schema = z
  .object({
    [bodstedsland]: z.string().optional(),
    [reistTilbakeTilBostedslandet]: z.enum(["ja", "nei"]).optional(),
    [reisteDuHjemTilLandetDuBorI]: z.enum(["ja", "nei"]).optional(),
    [reisteDuITaktMedRotasjon]: z.enum(["ja", "nei"]).optional(),
    [avreiseDatoFra]: z.string().optional(),
    [avreiseDatoTil]: z.string().optional(),
    [hvorforReistDuFraNorge]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data[bodstedsland] || data[bodstedsland].length < 2) {
      requireField(data, ctx, bodstedsland, requiredErrorText);
      return;
    }

    if (data[bodstedsland]) {
      if (data.bodstedsland === "NO") {
        return;
      }

      if (!data[reistTilbakeTilBostedslandet]) {
        requireField(data, ctx, reistTilbakeTilBostedslandet, requiredErrorText);
        return;
      }

      if (data[reistTilbakeTilBostedslandet] === "ja") {
        if (!data[avreiseDatoFra]) {
          requireField(data, ctx, avreiseDatoFra, requiredErrorText);
          return;
        }

        if (!data[avreiseDatoTil]) {
          requireField(data, ctx, avreiseDatoTil, requiredErrorText);
          return;
        }

        if (data[hvorforReistDuFraNorge]?.length === 0) {
          requireField(data, ctx, hvorforReistDuFraNorge, requiredErrorText);
          return;
        }
      }

      if (data[reistTilbakeTilBostedslandet] === "nei") {
        if (!data[reisteDuHjemTilLandetDuBorI]) {
          requireField(data, ctx, reisteDuHjemTilLandetDuBorI, requiredErrorText);
          return;
        }

        if (data[reisteDuHjemTilLandetDuBorI] === "ja") {
          return;
        }

        if (data[reistTilbakeTilBostedslandet] === "nei" && !data[reisteDuITaktMedRotasjon]) {
          requireField(data, ctx, reisteDuITaktMedRotasjon, requiredErrorText);
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
        form.setValue(avreiseDatoFra, date ? formatISO(date, { representation: "date" }) : "");
        form.validate();
      },
    });

  const {
    datepickerProps: avreiseDatoTilProps,
    inputProps: { ...avreiseDatoTilInputProps },
  } = useDatepicker({
    onDateChange: (date) => {
      form.setValue(avreiseDatoTil, date ? formatISO(date, { representation: "date" }) : "");
      form.validate();
    },
  });

  const ikkeNorge = form.value(bodstedsland) && form.value(bodstedsland) !== "NO";

  return (
    <Page className="brukerdialog">
      <h2>Bodstedsland</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <Select label="Velg bostedsland" name={bodstedsland} error={form.error(bodstedsland)}>
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
                  <li>hvilket land du bor i</li>
                  <li>
                    om du er permittert eller delvis arbeidsledig, eller om du er helt arbeidsledig
                    Er du usikker på hva du skal svare, kan du lese mer om hvor du skal søke penger
                    fra.
                  </li>
                </ul>
                Er du usikker på hva du skal svare, kan du lese{" "}
                <Link to="/eksempel">mer om hvor du skal søke penger fra.</Link>
              </ReadMore>
              {ikkeNorge && (
                <RadioGroup
                  name={reistTilbakeTilBostedslandet}
                  legend="Har du reist tilbake til bostedslandet ditt etter at du ble arbeidsledig eller permittert?"
                  error={form.error(reistTilbakeTilBostedslandet)}
                >
                  <Radio value="ja">Ja</Radio>
                  <Radio value="nei">Nei</Radio>
                </RadioGroup>
              )}
              {form.value(reistTilbakeTilBostedslandet) === "ja" && (
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
                        error={form.error(avreiseDatoFra)}
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
                        error={form.error(avreiseDatoTil)}
                        placeholder="DD.MM.ÅÅÅÅ"
                        label="Til dato"
                      />
                    </DatePicker>
                  </VStack>
                </VStack>
              )}

              {form.value(reistTilbakeTilBostedslandet) === "ja" && (
                <TextField
                  {...form.getInputProps(hvorforReistDuFraNorge)}
                  label="Hvorfor reist du fra Norge?"
                  error={form.error(hvorforReistDuFraNorge)}
                />
              )}

              {ikkeNorge && (
                <>
                  <RadioGroup
                    name={reisteDuHjemTilLandetDuBorI}
                    legend="Reiste du hjem til landet du bor i en gang i uken eller mer, mens du jobbet i Norge?"
                    error={form.error(reisteDuHjemTilLandetDuBorI)}
                  >
                    <Radio value="ja">Ja</Radio>
                    <Radio value="nei">Nei</Radio>
                  </RadioGroup>

                  {form.value(reisteDuHjemTilLandetDuBorI) === "nei" && (
                    <RadioGroup
                      name={reisteDuITaktMedRotasjon}
                      legend="Reiste du i takt med rotasjon?"
                      error={form.error(reisteDuITaktMedRotasjon)}
                    >
                      <Radio value="ja">Ja</Radio>
                      <Radio value="nei">Nei</Radio>
                    </RadioGroup>
                  )}
                </>
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
