import {
  Alert,
  Button,
  FileObject,
  FileUpload,
  HStack,
  Page,
  Radio,
  RadioGroup,
  TextField,
  VStack,
} from "@navikt/ds-react";
import { Form } from "react-router";
import { useForm } from "@rvf/react-router";
import { z } from "zod";
import { requireField } from "~/utils/validering.utils";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { useState } from "react";

const avtjentVerneplikt = "avtjent-verneplikt";
const dokumentereVernepliktNå = "dokumentere-nå";
const jegØnskerÅSendeDetteInnIEtterkantBegrunnelse =
  "jeg-ønsker-å-sende-dette-inn-i-etterkant-begrunnelse";
const jegHarSendtITidligereSøknadBegrunnelse = "jeg-har-sendt-i-tidligere-søknad-begrunnelse";
const jegSenderIkkeBegrunnelse = "jeg-sender-ikke-begrunnelse";
const requiredErrorText = "Du må svare på dette spørsmålet";

const schema = z
  .object({
    [avtjentVerneplikt]: z.enum(["ja", "nei"]).optional(),
    [dokumentereVernepliktNå]: z
      .enum(["ja", "lastOppIEtterkant", "lastetOppTidligere", "nei"])
      .optional(),
    [jegØnskerÅSendeDetteInnIEtterkantBegrunnelse]: z.string().max(200, "Maks 200 tegn").optional(),
    [jegHarSendtITidligereSøknadBegrunnelse]: z.string().max(200, "Maks 200 tegn").optional(),
    [jegSenderIkkeBegrunnelse]: z.string().max(200, "Maks 200 tegn").optional(),
  })
  .superRefine((data, ctx) => {
    if (!data[avtjentVerneplikt]) {
      requireField(data, ctx, avtjentVerneplikt, requiredErrorText);
      return;
    }

    if (data[avtjentVerneplikt] === "ja") {
      if (!data[dokumentereVernepliktNå]) {
        requireField(data, ctx, dokumentereVernepliktNå, requiredErrorText);
      } else if (
        data[dokumentereVernepliktNå] === "lastOppIEtterkant" &&
        !data[jegØnskerÅSendeDetteInnIEtterkantBegrunnelse]
      ) {
        requireField(data, ctx, jegØnskerÅSendeDetteInnIEtterkantBegrunnelse, requiredErrorText);
      } else if (
        data[dokumentereVernepliktNå] === "lastetOppTidligere" &&
        !data[jegHarSendtITidligereSøknadBegrunnelse]
      ) {
        requireField(data, ctx, jegHarSendtITidligereSøknadBegrunnelse, requiredErrorText);
      } else if (data[dokumentereVernepliktNå] === "nei" && !data[jegSenderIkkeBegrunnelse]) {
        requireField(data, ctx, jegSenderIkkeBegrunnelse, requiredErrorText);
      }
    }
  });

export default function Verneplikt() {
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

  return (
    <Page className="brukerdialog">
      <h2>Verneplikt</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              <RadioGroup
                name={avtjentVerneplikt}
                legend="Har du avtjent verneplikt i minst tre måneder de siste tolv månedene?"
                description="Du kan ha rett til dagpenger hvis du har avtjent militærtjeneste eller obligatorisk sivilforsvarstjeneste i minst tre av de siste tolv månedene."
                error={form.error(avtjentVerneplikt)}
              >
                <Radio value="ja">Ja</Radio>
                <Radio value="nei">Nei</Radio>
              </RadioGroup>

              {form.value(avtjentVerneplikt) === "ja" && (
                <>
                  <RadioGroup
                    name={dokumentereVernepliktNå}
                    value={form.value(dokumentereVernepliktNå)}
                    legend="Ønsker du å dokumentere dette nå?"
                    description="Du har krysset av for at du har avtjent verneplikt i minst tre av de siste tolv månedene. Du må sende inn tjenestebevis fra forsvaret der start- og sluttdato for tjenesteperioden kommer tydelig frem."
                    error={form.error(dokumentereVernepliktNå)}
                  >
                    <Radio value="ja">Ja, jeg vil laste opp nå</Radio>
                    <Radio value="lastOppIEtterkant">
                      Nei, jeg ønsker å sende dette inn i etterkant
                    </Radio>
                    <Radio value="lastetOppTidligere">
                      Jeg har sendt dette i en tidligere søknad om dagpenger
                    </Radio>
                    <Radio value="nei">Jeg sender det ikke</Radio>
                  </RadioGroup>

                  {form.value(dokumentereVernepliktNå) === "ja" && (
                    <VStack gap="6">
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        TODO BRUK AV RVF OG (KANSKJE) ZOD
                      </span>
                      <FileUpload.Dropzone
                        label="Last opp tjenestebevis fra forsvaret"
                        description="Start- og sluttdato for tjenesteperioden må komme tydelig frem. Du kan laste opp en fil i JPEG, PNG eller PDF-format."
                        accept=".jpg,.jpeg,.png,.pdf"
                        fileLimit={{ max: 1, current: files.length }}
                        multiple={false}
                        onSelect={setFiles}
                      />
                      {files.map((file) => (
                        <FileUpload.Item
                          key={file.file.name}
                          file={file.file}
                          button={{
                            action: "delete",
                            onClick: () => setFiles([]),
                          }}
                        />
                      ))}
                    </VStack>
                  )}

                  {form.value(dokumentereVernepliktNå) === "lastOppIEtterkant" && (
                    <TextField
                      {...form.getInputProps(jegØnskerÅSendeDetteInnIEtterkantBegrunnelse)}
                      label="Hva er grunnen til at du sender dokumentasjonen senere?"
                      error={form.error(jegØnskerÅSendeDetteInnIEtterkantBegrunnelse)}
                    />
                  )}

                  {form.value(dokumentereVernepliktNå) === "lastetOppTidligere" && (
                    <TextField
                      {...form.getInputProps(jegHarSendtITidligereSøknadBegrunnelse)}
                      label="Når sendte du dokumentet?"
                      description="Er du usikker på om du har sendt dokumentet i en tidligere søknad om dagpenger, bør du sende det på nytt."
                      error={form.error(jegHarSendtITidligereSøknadBegrunnelse)}
                    />
                  )}

                  {form.value(dokumentereVernepliktNå) === "nei" && (
                    <VStack gap="4">
                      <Alert variant="warning">
                        Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn
                        dokumentene vi trenger for å behandle saken din. Ta kontakt med NAV hvis du
                        ikke får tak i dokumentet
                      </Alert>
                      <TextField
                        {...form.getInputProps(jegSenderIkkeBegrunnelse)}
                        label="Hva er grunnen til at du ikke sender inn dokumentet?"
                        description="Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn dokumentene vi trenger for å behandle saken din. Ta kontakt med NAV hvis du ikke får tak i dokumentet."
                        error={form.error(jegSenderIkkeBegrunnelse)}
                      />
                    </VStack>
                  )}
                </>
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
