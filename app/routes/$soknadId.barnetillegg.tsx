import {
  Alert,
  Box,
  Button,
  DatePicker,
  FileObject,
  FileUpload,
  HStack,
  Modal,
  Page,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  useDatepicker,
  VStack,
} from "@navikt/ds-react";
import { useRef, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  FloppydiskIcon,
  PencilIcon,
  PersonPlusIcon,
  TrashIcon,
} from "@navikt/aksel-icons";
import { Route } from "../../.react-router/types/app/routes/+types/_index";
import { hentBarn } from "~/models/hent-barn.server";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { LoaderFunctionArgs } from "react-router";
import JaNeiFaktum from "~/components/spørsmål/jaNeiFaktum";

interface IBarnetillegg {
  barn?: IBarn[];
  forsørgerBarnSomIkkeLiggerIPdl?: boolean;
}

interface IBarn {
  fornavnOgMellomnavn?: string;
  etternavn?: string;
  fodselsdato?: Date;
  bostedsland?: string;
  forsørgerDuBarnet?: boolean;
  dokumentereForsørgerNå?: string;
  dokumententasjonGrunn?: string;
  hentetFraPdl?: boolean;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const response = await hentBarn(request);
  return await response.json();
}

// noinspection JSUnusedGlobalSymbols
export default function Barntillegg({ loaderData }: Route.ComponentProps) {
  const barnModalRef = useRef<HTMLDialogElement>(null);

  const [barnetillegg, setBarnetillegg] = useState<IBarnetillegg>({
    barn: loaderData as IBarn[],
    forsørgerBarnSomIkkeLiggerIPdl: undefined,
  });

  const [barn, setBarn] = useState<IBarn>({
    fornavnOgMellomnavn: undefined,
    etternavn: undefined,
    fodselsdato: undefined,
    bostedsland: undefined,
    forsørgerDuBarnet: undefined,
    hentetFraPdl: undefined,
    dokumentereForsørgerNå: undefined,
    dokumententasjonGrunn: undefined,
  });

  const fødselsdato = useDatepicker({
    onDateChange: (date) => setBarn({ ...barn, fodselsdato: date }),
  });

  const [files, setFiles] = useState<FileObject[]>([]);

  function leggTilBarn() {
    const registrerteBarn = barnetillegg.barn;
    registrerteBarn?.push({
      fornavnOgMellomnavn: barn.fornavnOgMellomnavn,
      etternavn: barn.etternavn,
      fodselsdato: barn.fodselsdato,
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
      fodselsdato: undefined,
      bostedsland: "",
      forsørgerDuBarnet: undefined,
      dokumentereForsørgerNå: "",
      dokumententasjonGrunn: "",
      hentetFraPdl: false,
    });
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <Page className="brukerdialog">
        <h2>Barnetillegg</h2>
        <VStack gap="6">
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
          <VStack gap={"2"}>
            {barnetillegg.barn
              ?.filter((barn) => barn.hentetFraPdl === true)
              .map((barn, index) => (
                <Box
                  key={index}
                  background="surface-alt-3-subtle"
                  padding="4"
                  shadow="medium"
                  borderRadius="xlarge"
                >
                  <h2 style={{ marginBottom: "10px", marginTop: "0" }}>
                    {barn.fornavnOgMellomnavn} {barn.etternavn}
                  </h2>
                  <h5 style={{ margin: "5px auto" }}>
                    Født {formaterNorskDato(barn.fodselsdato!!)}
                  </h5>
                  <p style={{ margin: "5px auto", textTransform: "uppercase" }}>
                    Bor i {barn.bostedsland} (TODO: MAP TIL LAND)
                  </p>
                  <p style={{ marginBottom: "0" }}>
                    <RadioGroup legend="Forsørger du barnet?" value={barn.forsørgerDuBarnet}>
                      <Stack gap="0 6" direction={{ xs: "column", sm: "row" }} wrap={false}>
                        <Radio value="1">Ja</Radio>
                        <Radio value="0">Nei</Radio>
                      </Stack>
                    </RadioGroup>
                  </p>
                </Box>
              ))}
          </VStack>
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
            header={{ heading: "Legg til barn du forsørger", icon: <PersonPlusIcon aria-hidden /> }}
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
                        barn.fodselsdato !== undefined
                          ? barn.fodselsdato.toLocaleDateString()
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
                    <option value="NOR">Norge</option>
                    <option value="SWE">Sverige</option>
                    <option value="DEN">Danmark</option>
                    <option value="todo">TODO: Gjør listen uttømmende</option>
                  </Select>
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
            {barnetillegg.barn
              ?.filter((barn) => barn.hentetFraPdl === false)
              .map((barn, index) => (
                <Box
                  key={index}
                  background="surface-alt-3-subtle"
                  padding="4"
                  shadow="medium"
                  borderRadius="xlarge"
                >
                  <h2 style={{ marginBottom: "10px", marginTop: "0" }}>
                    {barn.fornavnOgMellomnavn} {barn.etternavn}
                  </h2>
                  <h5 style={{ margin: "5px auto" }}>
                    Født {formaterNorskDato(barn.fodselsdato!!)}
                  </h5>
                  <p style={{ margin: "5px auto", textTransform: "uppercase" }}>
                    Bor i {barn.bostedsland} (TODO: MAP TIL LAND)
                  </p>
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
        </VStack>
      </Page>
    </main>
  );
}
