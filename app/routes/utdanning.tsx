import {
  Alert,
  FileObject,
  FileRejected,
  FileRejectionReason,
  FileUpload,
  Heading,
  Page,
  Radio,
  RadioGroup,
  VStack,
} from "@navikt/ds-react";
import { useState } from "react";
import JaNeiFaktum from "~/components/sporsmal/jaNeiFaktum";

interface Utdanning {
  tarUtdanningEllerOpplæring?: boolean;
  avsluttetUtdanningSiste6Måneder?: boolean;
  dokumenterAvsluttetUtdanningSiste6MånederNå?: boolean;
  starteEllerFullføreUtdanningSamtidigSomMottarDagpenger?: boolean;
}

export default function Utdanning() {
  const [utdanning, setUtdanning] = useState<Utdanning>({
    tarUtdanningEllerOpplæring: undefined,
    avsluttetUtdanningSiste6Måneder: undefined,
    dokumenterAvsluttetUtdanningSiste6MånederNå: undefined,
    starteEllerFullføreUtdanningSamtidigSomMottarDagpenger: undefined,
  });

  const [avsluttetUtdanningSiste6MånederFiles, setAvsluttetUtdanningSiste6MånederFiles] = useState<
    FileObject[]
  >([]);

  function removeFile(fileToRemove: FileObject) {
    setAvsluttetUtdanningSiste6MånederFiles(
      avsluttetUtdanningSiste6MånederFiles.filter((file) => file !== fileToRemove)
    );
  }
  const acceptedFiles = avsluttetUtdanningSiste6MånederFiles.filter((file) => !file.error);
  const rejectedFiles = avsluttetUtdanningSiste6MånederFiles.filter(
    (f): f is FileRejected => f.error
  );

  const errors: Record<FileRejectionReason, string> = {
    fileType: "Filformatet støttes ikke",
    fileSize: `Filen er større enn 1 MB`,
  };

  return (
    <main id="maincontent" tabIndex={-1}>
      <Page className="brukerdialog">
        <VStack gap="6">
          <h2>Utdanning</h2>
          <JaNeiFaktum
            ledetekst="Tar du utdanning eller opplæring?"
            beskrivelse="Som hovedregel har du ikke rett til dagpenger når du er under utdanning eller opplæring."
            verdi={utdanning.tarUtdanningEllerOpplæring}
            vedEndring={(value: boolean) => {
              setUtdanning({
                tarUtdanningEllerOpplæring: value,
                avsluttetUtdanningSiste6Måneder: undefined,
                dokumenterAvsluttetUtdanningSiste6MånederNå: undefined,
                starteEllerFullføreUtdanningSamtidigSomMottarDagpenger: undefined,
              });
              setAvsluttetUtdanningSiste6MånederFiles([]);
            }}
            aktiv={true}
          />

          <JaNeiFaktum
            ledetekst="Avsluttet du utdanning i løpet av de siste seks månedene?"
            verdi={utdanning.avsluttetUtdanningSiste6Måneder}
            vedEndring={(value: boolean) => {
              setUtdanning({ ...utdanning, avsluttetUtdanningSiste6Måneder: value });
            }}
            aktiv={utdanning.tarUtdanningEllerOpplæring === false}
          />

          {utdanning.avsluttetUtdanningSiste6Måneder === true && (
            <>
              <Alert variant="info">
                Du må dokumentere sluttdatoen. Du kan legge ved bekreftelse på når du avla siste
                avsluttende eksamen eller aktivitet. Hvis du har avbrutt skolegangen, kan du legge
                ved bekreftelse fra skolen på dette.
              </Alert>
              <RadioGroup
                legend="Ønsker du å dokumentere dette nå?"
                value={utdanning.dokumenterAvsluttetUtdanningSiste6MånederNå}
                onChange={(value: boolean) => {
                  setUtdanning({
                    ...utdanning,
                    dokumenterAvsluttetUtdanningSiste6MånederNå: value,
                  });
                }}
              >
                <Radio value={true}>Ja</Radio>
                <Radio value={false}>Nei, jeg ønsker å sende dette inn i etterkant</Radio>
              </RadioGroup>

              {utdanning.dokumenterAvsluttetUtdanningSiste6MånederNå === true && (
                <VStack gap="6">
                  <FileUpload.Dropzone
                    label="Last opp filer til søknaden"
                    description={`Du kan laste opp Word- og PDF-filer. Maks 3 filer. Maks størrelse 1 MB.`}
                    accept=".doc,.docx,.pdf"
                    maxSizeInBytes={1024 * 1024}
                    fileLimit={{ max: 3, current: acceptedFiles.length }}
                    onSelect={(newFiles) =>
                      setAvsluttetUtdanningSiste6MånederFiles([
                        ...avsluttetUtdanningSiste6MånederFiles,
                        ...newFiles,
                      ])
                    }
                  />

                  {acceptedFiles.length > 0 && (
                    <VStack gap="2">
                      <Heading level="3" size="xsmall">
                        {`Vedlegg (${acceptedFiles.length})`}
                      </Heading>
                      <VStack as="ul" gap="3">
                        {acceptedFiles.map((file, index) => (
                          <FileUpload.Item
                            as="li"
                            key={index}
                            file={file.file}
                            button={{
                              action: "delete",
                              onClick: () => removeFile(file),
                            }}
                          />
                        ))}
                      </VStack>
                    </VStack>
                  )}
                  {rejectedFiles.length > 0 && (
                    <VStack gap="2">
                      <Heading level="3" size="xsmall">
                        Vedlegg med feil
                      </Heading>
                      <VStack as="ul" gap="3">
                        {rejectedFiles.map((rejected, index) => (
                          <FileUpload.Item
                            as="li"
                            key={index}
                            file={rejected.file}
                            // error={errors[rejected.reasons[0]]}
                            button={{
                              action: "delete",
                              onClick: () => removeFile(rejected),
                            }}
                          />
                        ))}
                      </VStack>
                    </VStack>
                  )}
                </VStack>
              )}
            </>
          )}

          <JaNeiFaktum
            ledetekst="Planlegger du å starte eller fullføre utdanning eller opplæring samtidig som du mottar dagpenger?"
            verdi={utdanning.starteEllerFullføreUtdanningSamtidigSomMottarDagpenger}
            vedEndring={(value: boolean) => {
              setUtdanning({
                ...utdanning,
                starteEllerFullføreUtdanningSamtidigSomMottarDagpenger: value,
              });
            }}
            aktiv={utdanning.tarUtdanningEllerOpplæring === false}
          />

          {(utdanning.tarUtdanningEllerOpplæring === true ||
            utdanning.starteEllerFullføreUtdanningSamtidigSomMottarDagpenger === true) && (
            <Alert variant="warning">
              <VStack gap="5">
                <div>
                  For å få innvilget dagpenger mens du tar utdanning eller opplæring, må du sende
                  inn{" "}
                  <a href="https://www.nav.no/fyllut/nav040605">
                    Søknad om å beholde dagpengene mens du tar utdanning eller opplæring - NAV
                    04-06.05
                  </a>
                  , i tillegg til å sende inn denne søknaden om dagpenger.
                </div>
                <div>
                  Hvis du ikke sender søknaden om å beholde dagpengene mens du tar utdanning eller
                  opplæring, kan vi avslå søknaden din om dagpenger.
                </div>
              </VStack>
            </Alert>
          )}
        </VStack>
      </Page>
    </main>
  );
}
