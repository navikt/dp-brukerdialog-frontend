import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  leggTilNæringsvirksomhetSpørsmål,
  LeggTilNæringsvirksomhetSvar,
  Næringsvirksomhet,
} from "~/seksjon/egen-næring/egen-næring.spørsmål";
import { leggTilNæringsvirksomhetSchema } from "~/seksjon/egen-næring/egen-næring.schema";
import { ModalOperasjonEnum } from "~/seksjon/barnetillegg/barnetillegg.context";
import { useEgenNæringContext } from "~/seksjon/egen-næring/egen-næring.context";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function NæringsvirksomhetModal({ ref }: Readonly<IProps>) {
  const {
    næringsvirksomheter,
    setNæringsvirksomheter,
    næringsvirksomhetModalData,
    setNæringsvirksomhetModalData,
  } = useEgenNæringContext();

  const form = useForm({
    submitSource: "state",
    schema: leggTilNæringsvirksomhetSchema,
    defaultValues: næringsvirksomhetModalData?.næringsvirksomhet ?? {},
    handleSubmit: (næringsvirksomhet) => {
      if (
        næringsvirksomhetModalData?.operasjon !== ModalOperasjonEnum.LeggTil &&
        næringsvirksomhetModalData?.operasjon !== ModalOperasjonEnum.Rediger
      ) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (næringsvirksomhetModalData?.operasjon === ModalOperasjonEnum.LeggTil) {
        setNæringsvirksomheter([
          ...næringsvirksomheter,
          næringsvirksomhet as Næringsvirksomhet,
        ]);
      }

      if (
        næringsvirksomhetModalData?.næringsvirksomhetIndex !== undefined &&
        næringsvirksomhetModalData?.operasjon === ModalOperasjonEnum.Rediger
      ) {
        const oppdatertListe = [...næringsvirksomheter];
        oppdatertListe[næringsvirksomhetModalData.næringsvirksomhetIndex] =
          næringsvirksomhet as Næringsvirksomhet;
        setNæringsvirksomheter(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setNæringsvirksomhetModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setNæringsvirksomhetModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">Legg til næringsvirksomhet</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {leggTilNæringsvirksomhetSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof LeggTilNæringsvirksomhetSvar)}
                />
              );
            })}

            <HStack className="mt-4" justify="end">
              <Button
                type={"submit"}
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
