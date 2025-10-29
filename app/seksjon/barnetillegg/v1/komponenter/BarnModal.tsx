import { FloppydiskIcon, PersonPencilIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  ModalOperasjonEnum,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { leggTilBarnManueltSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  Barn,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { DokumentasjonskravType } from "~/seksjon/dokumentasjon/Dokumentasjonskrav";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  spørsmålId: string;
}

export function BarnModal({ ref, spørsmålId }: Readonly<IProps>) {
  const {
    barnLagtManuelt,
    setBarnLagtManuelt,
    modalData,
    setModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useBarnetilleggContext();

  const form = useForm({
    submitSource: "state",
    schema: leggTilBarnManueltSchema,
    defaultValues: modalData?.barn ?? {},
    handleSubmit: (barn) => {
      const ugyldigModalOperasjon =
        modalData?.operasjon !== ModalOperasjonEnum.LeggTil &&
        modalData?.operasjon !== ModalOperasjonEnum.Rediger;

      if (ugyldigModalOperasjon) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (modalData.operasjon === ModalOperasjonEnum.LeggTil) {
        /*
        Barnetillegg-modalen burde hatt en dokumentasjonskravindikator (den er lagt til nå, se
        barnetillegg.spørsmål.ts). Den kan brukes for å finne ut om det er noen dokumentasjonskrav som er trigget som følge
        at bruker har svart på et tidligere spørsmål. I noen tilfeller vil det alltid være et
        dokumentasjonkrav (som feks i BarnModal), men da ligger den i spørsmål-arrayen uten "visHvis"
        definert.

        Forslag til endring her som kanskje gjør dokumentasjonskrav-logikken litt mer generisk:
        Traverser over arrayen med spørsmål for seksjonen/modalen (i dette
        tilfellet leggTilBarnManueltSpørsmål) og bruk svarene til å sjekke om komponenter av typen
        "dokumentasjonskravindikator" får sin "visHvis" evaluert til "true" (tipper det kan
        gjøres på samme måte som vi gjør det for genrering av PDF-grunnlaget.

        For hver "dokumentasjonskravindikator" som får "visHvis" evaluert til "true", kjøre koden
        under som oppretter DokumentasjonskravType og linker barnet og dokumentasjonskravet.

        Men i stedet for å sette "type"-propertyen, og bruke denne i Dokumentasjonkrav-seksjonen,
        hent ut "description"-verdien fra "dokumentasjonskravindikator" og lagre den i en property
        i DokumentasjonskravType. Det kan det hende at vi ikke trenger å versjonere
        Dokumentasjonkrav-seksjonen, men at den bare forholder seg til verdier som ligger i
        "dokumentasjonskrav"-JSON som lagres på server.

        Ideelt sett hadde koden som generer dokumentasjonskrav vært kjørt i "onSubmit", og
        håndtert både at dokumentasjonskrav kan oppstå i modaler (feks barn lagt til manuelt og
        arbeidsforhold), og på seksjonsnivå (feks i Annen Pengestøtte). Men det blir kanskje
        vanskelig å koble gitte dokumentasjonskrav til riktig "modal-objekt" (feks et gitt
        arbeidsforhold) når det gjøres på onSubmit? :thinking_face:
         */

        const dokumentasjonskravId = crypto.randomUUID();

        const nyttBarn = {
          id: crypto.randomUUID(),
          dokumentasjonskravId: dokumentasjonskravId,
          ...barn,
        } as Barn;

        const nyttDokumentkrav: DokumentasjonskravType = {
          id: dokumentasjonskravId,
          spørsmålId: spørsmålId,
          tittel: `Dokumentasjon for ${barn.fornavnOgMellomnavn} ${barn.etternavn}`,
          // beskrivelse: Ny property, "description"-feltet fra "barnLagtTilManueltDokumentasjonskravindikator" i barnetillegg.spørsmål.ts
          type: "Barn", // Fjerne denne
        };

        setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
        setBarnLagtManuelt([...barnLagtManuelt, nyttBarn]);
      }

      if (modalData.operasjon === ModalOperasjonEnum.Rediger && modalData?.barn?.id) {
        const oppdatertListe = barnLagtManuelt.map((b) =>
          b.id === modalData.barn?.id
            ? { ...barn, id: b.id, dokumentasjonskravId: b.dokumentasjonskravId }
            : b
        ) as Barn[];

        const oppdatertDokumentasjonskrav = dokumentasjonskrav.map(
          (krav: DokumentasjonskravType) =>
            krav.id === modalData.barn?.dokumentasjonskravId
              ? {
                  ...krav,
                  tittel: `Dokumentasjon for ${barn.fornavnOgMellomnavn} ${barn.etternavn}`,
                }
              : krav
        );

        setDokumentasjonskrav(oppdatertDokumentasjonskrav);
        setBarnLagtManuelt(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  const modalIkon =
    modalData?.operasjon === ModalOperasjonEnum.LeggTil ? (
      <PersonPlusIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
    ) : (
      <PersonPencilIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
    );

  const modalTittel =
    modalData?.operasjon === ModalOperasjonEnum.LeggTil ? "Legg til barn" : "Rediger barn";

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">
            {modalIkon}
            {modalTittel}
          </HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {leggTilBarnManueltSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof LeggTilBarnManueltSvar)}
                />
              );
            })}

            <HStack className="mt-4" justify="end">
              <Button
                type="submit"
                icon={<FloppydiskIcon title="a11y-title" fontSize="1.5rem" aria-hidden />}
              >
                Lagre og lukk
              </Button>
            </HStack>
          </VStack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
