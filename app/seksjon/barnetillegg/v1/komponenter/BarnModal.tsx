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
  BarnLagtManueltType,
  bostedsland,
  etternavn,
  fornavnOgMellomnavn,
  fødselsdato,
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

  const tomtBarn = {
    [fornavnOgMellomnavn]: "",
    [etternavn]: "",
    [fødselsdato]: "",
    [bostedsland]: "",
  };

  const form = useForm({
    submitSource: "state",
    schema: leggTilBarnManueltSchema,
    defaultValues: modalData?.barn ?? tomtBarn,
    handleSubmit: (barn) => {
      const ugyldigModalOperasjon =
        modalData?.operasjon !== ModalOperasjonEnum.LeggTil &&
        modalData?.operasjon !== ModalOperasjonEnum.Rediger;

      if (ugyldigModalOperasjon) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (modalData.operasjon === ModalOperasjonEnum.LeggTil) {
        leggTilEtBarn(barn);
      }

      if (modalData.operasjon === ModalOperasjonEnum.Rediger && modalData?.barn?.id) {
        oppdatereEtBarn(barn);
      }
    },
    onSubmitSuccess() {
      setModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  function leggTilEtBarn(barn: LeggTilBarnManueltSvar) {
    const dokumentasjonskravId = crypto.randomUUID();

    const nyttBarn = {
      id: crypto.randomUUID(),
      dokumentasjonskrav: [dokumentasjonskravId],
      ...barn,
    } as BarnLagtManueltType;

    const nyttDokumentkrav: DokumentasjonskravType = {
      id: dokumentasjonskravId,
      spørsmålId: spørsmålId,
      tittel: `Dokumentasjon for ${barn[fornavnOgMellomnavn]} ${barn[etternavn]}`,
      type: "Barn",
    };

    setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
    setBarnLagtManuelt([...barnLagtManuelt, nyttBarn]);
  }

  function oppdatereEtBarn(barn: LeggTilBarnManueltSvar) {
    const oppdatertListe = barnLagtManuelt?.map((b) =>
      b.id === modalData?.barn?.id
        ? { ...barn, id: b.id, dokumentasjonskrav: b.dokumentasjonskrav }
        : b
    ) as BarnLagtManueltType[];

    const oppdatertDokumentasjonskrav = dokumentasjonskrav.map((krav: DokumentasjonskravType) =>
      Array.isArray(modalData?.barn?.dokumentasjonskrav) &&
      modalData?.barn.dokumentasjonskrav.includes(krav.id)
        ? {
            ...krav,
            tittel: `Dokumentasjon for ${barn[fornavnOgMellomnavn]} ${barn[etternavn]}`,
          }
        : krav
    );

    setDokumentasjonskrav(oppdatertDokumentasjonskrav);
    setBarnLagtManuelt(oppdatertListe);
  }

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
