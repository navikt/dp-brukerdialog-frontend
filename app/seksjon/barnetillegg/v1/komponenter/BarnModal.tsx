import { FloppydiskIcon, PersonPencilIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  ModalOperasjon,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { leggTilBarnManueltSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  Barn,
  etternavn,
  fornavnOgMellomnavn,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

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
        modalData?.operasjon !== ModalOperasjon.LeggTil &&
        modalData?.operasjon !== ModalOperasjon.Rediger;

      if (ugyldigModalOperasjon) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (modalData.operasjon === ModalOperasjon.LeggTil) {
        const dokumentasjonskravId = crypto.randomUUID();

        const nyttBarn = {
          id: crypto.randomUUID(),
          dokumentasjonskravId: dokumentasjonskravId,
          ...barn,
        } as Barn;

        const nyttDokumentkrav: Dokumentasjonskrav = {
          id: dokumentasjonskravId,
          spørsmålId: spørsmålId,
          tittel: `Dokumentasjon for ${barn[fornavnOgMellomnavn]} ${barn[etternavn]}`,
          type: DokumentasjonskravType.Barn,
        };

        setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
        setBarnLagtManuelt([...barnLagtManuelt, nyttBarn]);
      }

      if (modalData.operasjon === ModalOperasjon.Rediger && modalData?.barn?.id) {
        const oppdatertListe = barnLagtManuelt.map((b) =>
          b.id === modalData.barn?.id
            ? { ...barn, id: b.id, dokumentasjonskravId: b.dokumentasjonskravId }
            : b
        ) as Barn[];

        const oppdatertDokumentasjonskrav = dokumentasjonskrav.map((krav: Dokumentasjonskrav) =>
          krav.id === modalData.barn?.dokumentasjonskravId
            ? {
                ...krav,
                tittel: `Dokumentasjon for ${barn[fornavnOgMellomnavn]} ${barn[etternavn]}`,
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
    modalData?.operasjon === ModalOperasjon.LeggTil ? (
      <PersonPlusIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
    ) : (
      <PersonPencilIcon title="a11y-title" fontSize="1.5rem" aria-hidden />
    );

  const modalTittel =
    modalData?.operasjon === ModalOperasjon.LeggTil ? "Legg til barn" : "Rediger barn";

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
