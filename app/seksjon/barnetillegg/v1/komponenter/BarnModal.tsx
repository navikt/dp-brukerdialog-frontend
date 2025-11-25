import { FloppydiskIcon, PersonPencilIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { z } from "zod";
import { Komponent } from "~/components/Komponent";
import {
  ModalOperasjon,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { leggTilBarnManueltSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  BarnLagtManuelt,
  etternavn,
  fornavnOgMellomnavn,
  leggTilBarnManueltSpørsmål,
  LeggTilBarnManueltSvar,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  spørsmålId: string;
  seksjonId: string;
}

export function BarnModal({ ref, spørsmålId, seksjonId }: IProps) {
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
    handleSubmit: (skjemaData) => {
      const barn: BarnLagtManuelt = {
        id: crypto.randomUUID(),
        fornavnOgMellomnavn: skjemaData.fornavnOgMellomnavn || "",
        etternavn: skjemaData.etternavn || "",
        fødselsdato: skjemaData.fødselsdato || "",
        bostedsland: skjemaData.bostedsland || "",
      };

      if (modalData?.operasjon === undefined) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (modalData.operasjon === ModalOperasjon.LeggTil) {
        leggTilEtBarn(barn);
      }

      if (modalData.operasjon === ModalOperasjon.Rediger) {
        redigerEtBarn(barn);
      }
    },
    onSubmitSuccess() {
      setModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  function leggTilEtBarn(barnProps: BarnLagtManuelt) {
    const dokumentasjonskravId = crypto.randomUUID();

    const nyttBarn: BarnLagtManuelt = {
      dokumentasjonskrav: [dokumentasjonskravId],
      ...barnProps,
    };

    const nyttDokumentkrav: Dokumentasjonskrav = {
      id: dokumentasjonskravId,
      seksjonId: seksjonId,
      spørsmålId: spørsmålId,
      skjemakode: "X8",
      tittel: `Fødselsattest/bostedsbevis for ${barnProps[fornavnOgMellomnavn]} ${barnProps[etternavn]}`,
      type: DokumentasjonskravType.Barn,
    };

    setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
    setBarnLagtManuelt([...barnLagtManuelt, nyttBarn]);
  }

  function redigerEtBarn(barnProps: BarnLagtManuelt) {
    const oppdatertBarnLagtManuelt: BarnLagtManuelt[] = barnLagtManuelt?.map((barn) =>
      barn.id === modalData?.barn?.id
        ? { ...barnProps, id: barn.id, dokumentasjonskrav: barn.dokumentasjonskrav }
        : barn
    );

    const oppdatertDokumentasjonskrav = dokumentasjonskrav.map((krav) =>
      modalData?.barn?.dokumentasjonskrav?.includes(krav.id)
        ? {
            ...krav,
            tittel: `Dokumentasjon for ${barnProps[fornavnOgMellomnavn]} ${barnProps[etternavn]}`,
          }
        : krav
    );

    setDokumentasjonskrav(oppdatertDokumentasjonskrav);
    setBarnLagtManuelt(oppdatertBarnLagtManuelt);
  }

  const modalIkon =
    modalData?.operasjon === ModalOperasjon.LeggTil ? (
      <PersonPlusIcon aria-hidden />
    ) : (
      <PersonPencilIcon aria-hidden />
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
                <Komponent
                  key={spørsmål.id}
                  props={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof LeggTilBarnManueltSvar)}
                />
              );
            })}

            <HStack className="mt-4" justify="end">
              <Button type="submit" icon={<FloppydiskIcon aria-hidden />}>
                Lagre og lukk
              </Button>
            </HStack>
          </VStack>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
