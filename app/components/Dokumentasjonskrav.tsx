import {
  Alert,
  FileObject,
  FileUpload,
  Radio,
  RadioGroup,
  TextField,
  VStack,
} from "@navikt/ds-react";
import { FormApi } from "@rvf/react-router";

interface IDokumentasjonskravProps {
  files: FileObject[];
  setFiles(files: FileObject[]): void;
  maksAntallFiler: number;
  legend: string;
  description?: string;
  uploadLegend: string;
  uploadDescription?: string;
  form: FormApi<any>;
  dokumenterNå: string;
  ettersenderDokumentasjonBegrunnelse: string;
  dokumentasjonSendtTidligereBegrunnelse: string;
  senderIkkeDokumentasjonBegrunnelse: string;
}

export default function Dokumentasjonskrav({
  files,
  setFiles,
  maksAntallFiler,
  legend,
  description,
  uploadLegend,
  uploadDescription,
  form,
  dokumenterNå,
  ettersenderDokumentasjonBegrunnelse,
  dokumentasjonSendtTidligereBegrunnelse,
  senderIkkeDokumentasjonBegrunnelse,
}: Readonly<IDokumentasjonskravProps>) {
  return (
    <>
      <RadioGroup
        name={dokumenterNå}
        value={form.value(dokumenterNå)}
        legend={legend}
        description={description}
        error={form.error(dokumenterNå)}
      >
        <Radio value="ja">Ja, jeg vil laste opp nå</Radio>
        <Radio value="lastOppIEtterkant">Nei, jeg ønsker å sende dette inn i etterkant</Radio>
        <Radio value="lastetOppTidligere">
          Jeg har sendt dette i en tidligere søknad om dagpenger
        </Radio>
        <Radio value="nei">Jeg sender det ikke</Radio>
      </RadioGroup>

      {form.value(dokumenterNå) === "ja" && (
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
            label={uploadLegend}
            description={`${uploadDescription || ""} Du kan laste opp ${maksAntallFiler} fil${maksAntallFiler > 1 ? "er" : ""} i JPEG, PNG eller PDF-format. Filen${maksAntallFiler > 1 ? "e" : ""} kan være opptil 10MB.`}
            accept=".jpg,.jpeg,.png,.pdf"
            fileLimit={{ max: maksAntallFiler, current: files.length }}
            multiple={maksAntallFiler !== 1}
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

      {form.value(dokumenterNå) === "lastOppIEtterkant" && (
        <TextField
          {...form.getInputProps(ettersenderDokumentasjonBegrunnelse)}
          label="Hva er grunnen til at du sender dokumentasjonen senere?"
          error={form.error(ettersenderDokumentasjonBegrunnelse)}
        />
      )}

      {form.value(dokumenterNå) === "lastetOppTidligere" && (
        <TextField
          {...form.getInputProps(dokumentasjonSendtTidligereBegrunnelse)}
          label="Når sendte du dokumentasjonen?"
          description="Er du usikker på om du har sendt dokumentasjonen i en tidligere søknad om dagpenger, bør du sende det på nytt."
          error={form.error(dokumentasjonSendtTidligereBegrunnelse)}
        />
      )}

      {form.value(dokumenterNå) === "nei" && (
        <VStack gap="4">
          <Alert variant="warning">
            Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn dokumentasjonen vi
            trenger for å behandle saken din. Ta kontakt med NAV hvis du ikke får tak i
            dokumentasjonen.
          </Alert>
          <TextField
            {...form.getInputProps(senderIkkeDokumentasjonBegrunnelse)}
            label="Hva er grunnen til at du ikke sender inn dokumentasjonen?"
            error={form.error(senderIkkeDokumentasjonBegrunnelse)}
          />
        </VStack>
      )}
    </>
  );
}
