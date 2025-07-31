import {
  Alert,
  Box,
  Button,
  DatePicker,
  FileObject,
  FileUpload,
  Modal,
  Page,
  Radio,
  RadioGroup,
  Select,
  TextField,
  useDatepicker,
  VStack,
} from "@navikt/ds-react";
import { useRef, useState } from "react";
import JaNeiFaktum from "~/components/sporsmal/jaNeiFaktum";
import { FloppydiskIcon, PencilIcon, PersonPlusIcon, TrashIcon } from "@navikt/aksel-icons";

interface IBarnetillegg {
  barn?: IBarn[];
  forsørgerBarnSomIkkeLiggerIPdl?: boolean;
}

interface IBarn {
  fornavnOgMellomnavn?: string;
  etternavn?: string;
  fødselsdato?: Date;
  bostedsland?: string;
  forsørgerDuBarnet?: boolean;
  dokumentereForsørgerNå?: string;
  dokumententasjonGrunn?: string;
  hentetFraPdl?: boolean;
}

export default function Barntillegg() {
  const barnModalRef = useRef<HTMLDialogElement>(null);

  const [barnetillegg, setBarnetillegg] = useState<IBarnetillegg>({
    barn: [],
    forsørgerBarnSomIkkeLiggerIPdl: undefined,
  });

  const [barn, setBarn] = useState<IBarn>({
    fornavnOgMellomnavn: undefined,
    etternavn: undefined,
    fødselsdato: undefined,
    bostedsland: undefined,
    forsørgerDuBarnet: undefined,
    hentetFraPdl: undefined,
    dokumentereForsørgerNå: undefined,
    dokumententasjonGrunn: undefined,
  });

  const fødselsdato = useDatepicker({
    onDateChange: (date) => setBarn({ ...barn, fødselsdato: date }),
  });

  const [files, setFiles] = useState<FileObject[]>([]);

  function leggTilBarn() {
    console.info("hello");
    const registrerteBarn = barnetillegg.barn;
    registrerteBarn?.push({
      fornavnOgMellomnavn: barn.fornavnOgMellomnavn,
      etternavn: barn.etternavn,
      fødselsdato: barn.fødselsdato,
      bostedsland: barn.bostedsland,
      forsørgerDuBarnet: barn.forsørgerDuBarnet,
      hentetFraPdl: false,
      dokumentereForsørgerNå: barn.dokumentereForsørgerNå,
      dokumententasjonGrunn: barn.dokumententasjonGrunn,
    });
    setBarnetillegg({ ...barnetillegg, barn: registrerteBarn });
    setBarn({
      fornavnOgMellomnavn: "",
      etternavn: "",
      fødselsdato: undefined,
      bostedsland: "",
      forsørgerDuBarnet: undefined,
      dokumentereForsørgerNå: "",
      dokumententasjonGrunn: "",
    });
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <Page className="brukerdialog">
        <VStack gap="6">
          <h2>Barnetillegg</h2>
          <div>
            <p>
              Hvis du forsørger barn under 18 år, eller er bidragspliktig, kan du få barnetillegg
              uavhengig av om barnet bor hos deg.
            </p>
            <p>
              Barnet må være bosatt i Norge, et annet EØS-land, Sveits eller Storbritannia. Du får
              ikke barnetillegg hvis barnet oppholder seg utenfor disse områdene mer enn 90 dager i
              løpet av 12 måneder.
            </p>
            <p>Hvis vi har registrert noen barn på deg vises de under.</p>
          </div>
          <JaNeiFaktum
            ledetekst="Forsørger du barn som ikke vises her?"
            beskrivelse="Hvis du har forsørgeransvar for barn under 18 år som ikke vises her, kan du legge dem til."
            verdi={barnetillegg.forsørgerBarnSomIkkeLiggerIPdl}
            vedEndring={(value: boolean) => {
              setBarnetillegg({ ...barnetillegg, forsørgerBarnSomIkkeLiggerIPdl: value });
            }}
            aktiv={true}
          />

          {barnetillegg.forsørgerBarnSomIkkeLiggerIPdl === true && (
            <Button
              variant="secondary"
              icon={<PersonPlusIcon aria-hidden />}
              onClick={() => barnModalRef.current?.showModal()}
            >
              Legg til barn
            </Button>
          )}

          <Modal
            ref={barnModalRef}
            header={{ heading: "Legg til barn", icon: <PersonPlusIcon aria-hidden /> }}
            width={600}
          >
            <Modal.Body>
              <form
                method="dialog"
                id="barn"
                onSubmit={() => {
                  leggTilBarn();
                }}
              >
                <VStack gap="5">
                  <TextField
                    value={barn.fornavnOgMellomnavn}
                    label="Fornavn og mellomnavn"
                    onChange={(value) => {
                      setBarn({
                        ...barn,
                        fornavnOgMellomnavn: value.target.value,
                      });
                    }}
                  />
                  <TextField
                    value={barn.etternavn}
                    label="Etternavn"
                    onChange={(value) => {
                      setBarn({
                        ...barn,
                        etternavn: value.target.value,
                      });
                    }}
                  />
                  <DatePicker {...fødselsdato.datepickerProps}>
                    <DatePicker.Input
                      {...fødselsdato.inputProps}
                      placeholder="DD.MM.ÅÅÅÅ"
                      label="Velg dato"
                      value={
                        barn.fødselsdato !== undefined
                          ? barn.fødselsdato.toLocaleDateString()
                          : undefined
                      }
                    />
                  </DatePicker>
                  <Select
                    label="Hvilket land bor barnet i?"
                    value={barn.bostedsland}
                    onChange={(value) => {
                      setBarn({ ...barn, bostedsland: value.target.value });
                    }}
                  >
                    <option value="">- Velg land -</option>
                    <option value="norge">Norge</option>
                    <option value="sverige">Sverige</option>
                    <option value="danmark">Danmark</option>
                    <option value="todo">TODO: Gjør listen uttømmende</option>
                  </Select>
                  <JaNeiFaktum
                    ledetekst="Forsørger du barnet?"
                    verdi={barn.forsørgerDuBarnet}
                    vedEndring={(value: boolean) => {
                      setBarn({ ...barn, forsørgerDuBarnet: value });
                    }}
                    aktiv={true}
                  />
                  {barn.forsørgerDuBarnet === true && (
                    <VStack>
                      <RadioGroup
                        legend="Ønsker du å dokumentere dette nå?"
                        description="Du kan laste opp fødselsattest eller annen dokumentasjon som viser at du forsørger barnet."
                        value={barn.dokumentereForsørgerNå}
                        onChange={(value: string) => {
                          setBarn({ ...barn, dokumentereForsørgerNå: value });
                        }}
                      >
                        <Radio value={"lastOppNaa"}>Ja, jeg vil laste opp nå</Radio>
                        <Radio value={"lastOppEtterkant"}>
                          Nei, jeg ønsker å sende inn dette i etterkant
                        </Radio>
                        <Radio value={"lastetOppTidligere"}>
                          Jeg har sendt dette i en tidligere søknad om dagpenger
                        </Radio>
                        <Radio value={"nei"}>Jeg sender det ikke</Radio>
                      </RadioGroup>

                      {barn.dokumentereForsørgerNå === "lastOppNaa" && (
                        <VStack gap="6">
                          <FileUpload.Dropzone
                            label="Last opp fødselsattest"
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

                      {barn.dokumentereForsørgerNå === "lastOppEtterkant" && (
                        <TextField
                          value={barn.dokumententasjonGrunn}
                          label="Hva er grunnen til at du sender dokumentasjonen senere?"
                          onChange={(value) => {
                            setBarn({
                              ...barn,
                              dokumententasjonGrunn: value.target.value,
                            });
                          }}
                        />
                      )}
                      {barn.dokumentereForsørgerNå === "lastetOppTidligere" && (
                        <TextField
                          value={barn.dokumententasjonGrunn}
                          label="Når sendte du dokumentet?"
                          description="Er du usikker på om du har sendt dokumentet i en tidligere søknad om dagpenger, bør du sende det på nytt."
                          onChange={(value) => {
                            setBarn({
                              ...barn,
                              dokumententasjonGrunn: value.target.value,
                            });
                          }}
                        />
                      )}

                      {barn.dokumentereForsørgerNå === "nei" && (
                        <VStack gap="4">
                          <Alert variant="warning">
                            Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn
                            dokumentene vi trenger for å behandle saken din. Ta kontakt med NAV hvis
                            du ikke får tak i dokumentet
                          </Alert>
                          <TextField
                            value={barn.dokumententasjonGrunn}
                            label="Hva er grunnen til at du ikke sender inn dokumentet?"
                            description="Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn dokumentene vi trenger for å behandle saken din. Ta kontakt med NAV hvis du ikke får tak i dokumentet."
                            onChange={(value) => {
                              setBarn({
                                ...barn,
                                dokumententasjonGrunn: value.target.value,
                              });
                            }}
                          />
                        </VStack>
                      )}
                    </VStack>
                  )}
                </VStack>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button form="barn" icon={<FloppydiskIcon aria-hidden />}>
                Lagre og lukk
              </Button>
            </Modal.Footer>
          </Modal>
          <VStack gap={"2"}>
            {barnetillegg.barn?.map((barn, index) => (
              <Box
                key={index}
                background="surface-alt-3-subtle"
                padding="4"
                shadow="medium"
                borderRadius="xlarge"
              >
                <h2 style={{ marginBottom: "10px" }}>
                  {barn.fornavnOgMellomnavn} {barn.etternavn}
                </h2>
                <h5 style={{ margin: "5px auto" }}>Født {barn.fødselsdato?.getDate()}</h5>
                <p style={{ margin: "5px auto" }}>Bor i {barn.bostedsland}</p>
                <div>
                  <Button icon={<PencilIcon />} variant="secondary" size="small">
                    Endre svar
                  </Button>
                  <Button icon={<TrashIcon />} variant="tertiary" size="small">
                    Slett
                  </Button>
                </div>
              </Box>
            ))}
          </VStack>
        </VStack>
      </Page>
    </main>
  );
}
