import { FileObject, FileUpload, Page, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import { useState } from "react";
import JaNeiFaktum from "~/components/sporsmal/jaNeiFaktum";

interface Verneplikt {
  avtjentVerneplikt?: boolean;
  dokumenterAvtjentVernepliktNå?: boolean;
}

export default function Verneplikt() {
  const [verneplikt, setVerneplikt] = useState<Verneplikt>({
    avtjentVerneplikt: undefined,
    dokumenterAvtjentVernepliktNå: undefined,
  });

  const [files, setFiles] = useState<FileObject[]>([]);

  return (
    <main id="maincontent" tabIndex={-1}>
      <Page className="brukerdialog">
        <VStack gap="6">
          <h2>Verneplikt</h2>
          <JaNeiFaktum
            ledetekst="Har du avtjent verneplikt i minst tre måneder de siste tolv månedene?"
            beskrivelse="Du kan ha rett til dagpenger hvis du har avtjent militærtjeneste eller obligatorisk sivilforsvarstjeneste i minst tre av de siste tolv månedene."
            verdi={verneplikt.avtjentVerneplikt}
            vedEndring={(value: boolean) => {
              setVerneplikt({ ...verneplikt, avtjentVerneplikt: value });
            }}
            aktiv={true}
          />

          {verneplikt.avtjentVerneplikt === true && (
            <RadioGroup
              legend="Ønsker du å dokumentere dette nå?"
              value={verneplikt.dokumenterAvtjentVernepliktNå}
              onChange={(value: boolean) => {
                setVerneplikt({ ...verneplikt, dokumenterAvtjentVernepliktNå: value });
              }}
            >
              <Radio value={true}>Ja</Radio>
              <Radio value={false}>Nei, jeg ønsker å sende dette inn i etterkant</Radio>
            </RadioGroup>
          )}

          {verneplikt.avtjentVerneplikt === true &&
            verneplikt.dokumenterAvtjentVernepliktNå === true && (
              <VStack gap="6">
                <FileUpload.Dropzone
                  label="Last opp dokumentasjon for verneplikt."
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
        </VStack>
      </Page>
    </main>
  );
}
