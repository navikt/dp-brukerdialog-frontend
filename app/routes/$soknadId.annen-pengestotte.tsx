import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Alert,
  BodyShort,
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  FileObject,
  HStack,
  List,
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
import { ActionFunctionArgs, Form, redirect, useActionData } from "react-router";
import invariant from "tiny-invariant";
import { z } from "zod";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { requireField } from "~/utils/validering.utils";
import { useState } from "react";
import Dokumentasjonskrav from "~/components/Dokumentasjonskrav";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "annen-pengestotte";
  const nesteSeksjonId = "egen-naring";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

const requiredErrorText = "Du må svare på dette spørsmålet";
const mottattPengestøtteFraAndreEØSLand = "mottatt-pengestøtte-fra-andre-eøs-land";
const mottattPengestøtteFraNorge = "mottatt-pengestøtte-fra-norge";
const lønnEllerAndreGoderFraTidligereArbeidsgiver =
  "lønn-eller-andre-goder-fra-tidligere-arbeidsgiver";
const beskrivGodeFraTidligereArbeidsgiver = "beskriv-goder-fra-tidligere-arbeidsgiver";
const dokumenterGoderNå = "dokumenter-goder-nå";
const dokumenterGoderIEtterkantBegrunnelse =
  "jeg-ønsker-å-sende-dette-inn-i-etterkant-begrunnelse";
const goderDokumentertTidligereBegrunnelse = "jeg-har-sendt-i-tidligere-søknad-begrunnelse";
const dokumentererIkkeGoderBegrgunnelse = "jeg-sender-ikke-begrunnelse";
const hvilkeUtenlandskeYtelserHarDuMottatt = "hvilke-utenlandske-ytelser-har-du-mottatt";
const fraHvilketLandMottokDuTrygdeytelser = "fra-hvilket-land-mottok-du-trygdeytelser";
const ytelserFraUtlandetDatoFra = "ytelser-fra-utlandet-dato-fra";
const ytelserFraUtlandetDatoTil = "ytelser-fra-utlandet-dato-til";

const schema = z
  .object({
    [mottattPengestøtteFraAndreEØSLand]: z.enum(["ja", "nei"]).optional(),
    [mottattPengestøtteFraNorge]: z.enum(["ja", "nei"]).optional(),
    [lønnEllerAndreGoderFraTidligereArbeidsgiver]: z.enum(["ja", "nei"]).optional(),
    [beskrivGodeFraTidligereArbeidsgiver]: z.string().optional(),
    [dokumenterGoderNå]: z
      .enum(["ja", "lastOppIEtterkant", "lastetOppTidligere", "nei"])
      .optional(),
    [dokumenterGoderIEtterkantBegrunnelse]: z.string().max(200, "Maks 200 tegn").optional(),
    [goderDokumentertTidligereBegrunnelse]: z.string().max(200, "Maks 200 tegn").optional(),
    [dokumentererIkkeGoderBegrgunnelse]: z.string().max(200, "Maks 200 tegn").optional(),
    [hvilkeUtenlandskeYtelserHarDuMottatt]: z
      .array(
        z.enum([
          "sykepenger",
          "foreldrepenger-svangerskapspenger",
          "dagpengerArbeidsledighetstrygd",
          "pleiepengerOmsorgspengerOpplæringspenger",
        ])
      )
      .optional(),
    [fraHvilketLandMottokDuTrygdeytelser]: z.string().optional(),
    [ytelserFraUtlandetDatoFra]: z.string().optional(),
    [ytelserFraUtlandetDatoTil]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data[mottattPengestøtteFraAndreEØSLand]) {
      requireField(data, ctx, mottattPengestøtteFraAndreEØSLand, requiredErrorText);
    } else if (data[mottattPengestøtteFraAndreEØSLand] === "ja") {
      if (
        !data[hvilkeUtenlandskeYtelserHarDuMottatt] ||
        data[hvilkeUtenlandskeYtelserHarDuMottatt]?.length === 0
      ) {
        requireField(data, ctx, hvilkeUtenlandskeYtelserHarDuMottatt, requiredErrorText);
      }
      if (
        !data[fraHvilketLandMottokDuTrygdeytelser] ||
        data[fraHvilketLandMottokDuTrygdeytelser] === ""
      ) {
        requireField(data, ctx, fraHvilketLandMottokDuTrygdeytelser, requiredErrorText);
      }
      if (!data[ytelserFraUtlandetDatoFra]) {
        requireField(data, ctx, ytelserFraUtlandetDatoFra, requiredErrorText);
      }
      if (!data[ytelserFraUtlandetDatoTil]) {
        requireField(data, ctx, ytelserFraUtlandetDatoTil, requiredErrorText);
      }
    }

    if (!data[mottattPengestøtteFraNorge]) {
      requireField(data, ctx, mottattPengestøtteFraNorge, requiredErrorText);
    }

    if (!data[lønnEllerAndreGoderFraTidligereArbeidsgiver]) {
      requireField(data, ctx, lønnEllerAndreGoderFraTidligereArbeidsgiver, requiredErrorText);
    } else {
      if (
        !data[beskrivGodeFraTidligereArbeidsgiver] ||
        data[beskrivGodeFraTidligereArbeidsgiver].length === 0
      ) {
        requireField(data, ctx, beskrivGodeFraTidligereArbeidsgiver, requiredErrorText);
      }

      if (!data[dokumenterGoderNå]) {
        requireField(data, ctx, dokumenterGoderNå, requiredErrorText);
      } else if (
        data[dokumenterGoderNå] === "lastOppIEtterkant" &&
        !data[dokumenterGoderIEtterkantBegrunnelse]
      ) {
        requireField(data, ctx, dokumenterGoderIEtterkantBegrunnelse, requiredErrorText);
      } else if (
        data[dokumenterGoderNå] === "lastetOppTidligere" &&
        !data[goderDokumentertTidligereBegrunnelse]
      ) {
        requireField(data, ctx, goderDokumentertTidligereBegrunnelse, requiredErrorText);
      } else if (data[dokumenterGoderNå] === "nei" && !data[dokumentererIkkeGoderBegrgunnelse]) {
        requireField(data, ctx, dokumentererIkkeGoderBegrgunnelse, requiredErrorText);
      }
    }
  });

export default function AnnenPengestøtte() {
  const actionData = useActionData<typeof action>();
  const [files, setFiles] = useState<FileObject[]>([]);

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

  const {
    datepickerProps: mottattPengestøtteFraAndreEØSLandFraDatoProps,
    inputProps: mottattPengestøtteFraAndreEØSLandFraDatoInputProps,
  } = useDatepicker({
    onDateChange: (date) => {
      form.setValue(
        ytelserFraUtlandetDatoFra,
        date ? formatISO(date, { representation: "date" }) : ""
      );
      if (form.error(ytelserFraUtlandetDatoFra)) {
        form.validate();
      }
    },
  });

  const {
    datepickerProps: mottattPengestøtteFraAndreEØSLandTilDatoProps,
    inputProps: { ...mottattPengestøtteFraAndreEØSLandTilDatoInputProps },
  } = useDatepicker({
    onDateChange: (date) => {
      form.setValue(
        ytelserFraUtlandetDatoTil,
        date ? formatISO(date, { representation: "date" }) : ""
      );
      if (form.error(ytelserFraUtlandetDatoTil)) {
        form.validate();
      }
    },
  });

  return (
    <Page className="brukerdialog">
      <h2>Annen pengstøtte</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <VStack gap="16">
            <VStack gap="12">
              <VStack gap="6">
                <h3>Pengestøtte fra andre EØS-land</h3>
                <RadioGroup
                  name={mottattPengestøtteFraAndreEØSLand}
                  value={form.value(mottattPengestøtteFraAndreEØSLand)}
                  legend="Har du de siste 36 måneder motatt trygdeytelser fra EØS-land, Sveits eller Storbritania som ligner på:"
                  description={
                    <List as="ul">
                      <List.Item>Sykepenger</List.Item>
                      <List.Item>Foreldrepenger eller svangerskapspenger</List.Item>
                      <List.Item>Dagpenger / arbeidsledighetstrygd</List.Item>
                      <List.Item>Pleiepenger, omsorgspenger eller opplæringspenger</List.Item>
                    </List>
                  }
                  error={form.error(mottattPengestøtteFraAndreEØSLand)}
                >
                  <Radio value="ja">Ja</Radio>
                  <Radio value="nei">Nei</Radio>
                </RadioGroup>
                <ReadMore header="Grunnen til at vi spør om dette">
                  Med utgangspunkt i en vedvarende agenda dokumenteres oppfølgingen som en følge av
                  resultatoppnåelsen.
                </ReadMore>
                {form.value(mottattPengestøtteFraAndreEØSLand) === "ja" && (
                  <>
                    <CheckboxGroup
                      {...form.getInputProps(hvilkeUtenlandskeYtelserHarDuMottatt)}
                      legend="Hvilke av disse utenlandske trygdeytelsene har du mottatt?"
                      error={form.error(hvilkeUtenlandskeYtelserHarDuMottatt)}
                    >
                      <Checkbox value="sykepenger">Sykepenger</Checkbox>
                      <Checkbox value="foreldrepenger-svangerskapspenger">
                        Foreldrepenger eller svangerskapspenger
                      </Checkbox>
                      <Checkbox value="dagpengerArbeidsledighetstrygd">
                        Dagpenger / arbeidsledighetstrygd
                      </Checkbox>
                      <Checkbox value="pleiepengerOmsorgspengerOpplæringspenger">
                        Pleiepenger, omsorgspenger eller opplæringspenger
                      </Checkbox>
                    </CheckboxGroup>
                    <Select
                      {...form.getInputProps(fraHvilketLandMottokDuTrygdeytelser)}
                      label="Fra hvilket land mottok du trygdeytelser i løpet av de siste 36 månedene?"
                      error={form.error(fraHvilketLandMottokDuTrygdeytelser)}
                    >
                      <option value="">- Velg land -</option>
                      <option value="norge">Norge</option>
                      <option value="sverige">Sverige</option>
                      <option value="danmark">Danmark</option>
                      <option value="todo">TODO: Gjør listen uttømmende</option>
                    </Select>
                    <VStack gap="4">
                      <BodyShort weight="semibold">
                        Når mottok du trygdeytelsene EØS-land, Sveits eller Storbritania?
                      </BodyShort>
                      <VStack className="left-border" gap="4">
                        <DatePicker
                          {...mottattPengestøtteFraAndreEØSLandFraDatoProps}
                          fromDate={new Date()}
                          toDate={new Date("31 Dec 2025")}
                        >
                          <DatePicker.Input
                            {...mottattPengestøtteFraAndreEØSLandFraDatoInputProps}
                            name="dato"
                            error={form.error(ytelserFraUtlandetDatoFra)}
                            placeholder="DD.MM.ÅÅÅÅ"
                            label="Fra dato"
                          />
                        </DatePicker>
                        <DatePicker
                          {...mottattPengestøtteFraAndreEØSLandTilDatoProps}
                          fromDate={new Date()}
                          toDate={new Date("31 Dec 2025")}
                        >
                          <DatePicker.Input
                            {...mottattPengestøtteFraAndreEØSLandTilDatoInputProps}
                            name="dato"
                            error={form.error(ytelserFraUtlandetDatoTil)}
                            placeholder="DD.MM.ÅÅÅÅ"
                            label="Til dato"
                          />
                        </DatePicker>
                      </VStack>
                    </VStack>
                  </>
                )}
              </VStack>
            </VStack>
            <VStack gap="12">
              <VStack gap="6">
                <h3>Pengestøtte fra Norge</h3>
                <RadioGroup
                  name={mottattPengestøtteFraNorge}
                  value={form.value(mottattPengestøtteFraNorge)}
                  legend="Mottar du eller har du søkt om ytelser fra andre enn NAV?"
                  description={
                    <List as="ul">
                      <List.Item>Pensjon fra andre enn NAV</List.Item>
                      <List.Item>Etterlønn</List.Item>
                      <List.Item>Garantilott for fiskere</List.Item>
                      <List.Item>
                        Stønad under arbeidsløshet fra Garantikassen for fiskere
                      </List.Item>
                      <List.Item>Annen ytelse</List.Item>
                    </List>
                  }
                  error={form.error(mottattPengestøtteFraNorge)}
                >
                  <Radio value="ja">Ja</Radio>
                  <Radio value="nei">Nei</Radio>
                </RadioGroup>
                <ReadMore header="Grunnen til at vi spør om dette">
                  Sammenholdt med en integrert struktur innhentes betydningen på linje med
                  løsningen.
                </ReadMore>
              </VStack>
              <VStack gap="6">
                <RadioGroup
                  name={lønnEllerAndreGoderFraTidligereArbeidsgiver}
                  value={form.value(lønnEllerAndreGoderFraTidligereArbeidsgiver)}
                  legend="Får du eller kommer du til å få lønn eller andre økonomiske goder fra tidligere arbeidsgiver?"
                  description="Du må gi oss beskjed hvis du får lønn, sluttvederlag eller tilsvarende økonomiske goder fra arbeidsgiver. Du trenger ikke å opplyse om feriepenger."
                  error={form.error(lønnEllerAndreGoderFraTidligereArbeidsgiver)}
                >
                  <Radio value="ja">Ja</Radio>
                  <Radio value="nei">Nei</Radio>
                </RadioGroup>
                <ReadMore header="Grunnen til at vi spør om dette">
                  Du kan ikke få dagpenger samtidig som du er dekket av lønn fra arbeidsgiver. Det
                  er ikke når du får utbetalingen som er avgjørende, men hvilken periode
                  utbetalingen gjelder for.
                </ReadMore>
                {form.value(lønnEllerAndreGoderFraTidligereArbeidsgiver) === "ja" && (
                  <>
                    <TextField
                      {...form.getInputProps(beskrivGodeFraTidligereArbeidsgiver)}
                      label="Skriv inn hva du får beholde"
                      error={form.error(beskrivGodeFraTidligereArbeidsgiver)}
                    />
                    <ReadMore header="Grunnen til at vi spør om dette">
                      Etter en totalvurdering av en bærekraftig treffsikkerhet identifiseres
                      synergieffekten med sikte på visjonen.
                    </ReadMore>
                    <Dokumentasjonskrav
                      files={files}
                      setFiles={setFiles}
                      maksAntallFiler={2}
                      legend="Du må dokumentere avtale om økonomiske goder. Ønsker du å gjøre dette nå?"
                      description="Du må legge ved: Avtale om økonomiske goder."
                      uploadLegend="Last opp dokumentasjonen her"
                      form={form}
                      dokumenterNå={dokumenterGoderNå}
                      ettersenderDokumentasjonBegrunnelse={dokumenterGoderIEtterkantBegrunnelse}
                      dokumentasjonSendtTidligereBegrunnelse={goderDokumentertTidligereBegrunnelse}
                      senderIkkeDokumentasjonBegrunnelse={dokumentererIkkeGoderBegrgunnelse}
                    />
                  </>
                )}
              </VStack>
            </VStack>

            {actionData && (
              <Alert variant="error" className="mt-4">
                {actionData.error}
              </Alert>
            )}
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
          </VStack>
        </Form>
      </VStack>
    </Page>
  );
}
