import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { pengestøtteFraAndreEøsLandSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import {
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalSpørsmål,
  PengestøtteFraAndreEøsLandModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import { useEffect } from "react";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function PengestøtteFraAndreEøsLandModal({ ref }: IProps) {
  const {
    pengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLand,
    pengestøtteFraAndreEøsLandModalData,
    setPengestøtteFraAndreEøsLandModalData,
  } = useAnnenPengestøtteContext();

  const form = useForm({
    submitSource: "state",
    schema: pengestøtteFraAndreEøsLandSchema,
    defaultValues: pengestøtteFraAndreEøsLandModalData?.pengestøtteFraAndreEøsLandSvar ?? {},
    handleSubmit: (enPengestøtteFraAndreEøsLand) => {
      if (
        pengestøtteFraAndreEøsLandModalData?.operasjon !== ModalOperasjon.LeggTil &&
        pengestøtteFraAndreEøsLandModalData?.operasjon !== ModalOperasjon.Rediger
      ) {
        console.error("Ugyldig operasjonstype for PengestøtteFraAndreEøsLandModal");
        return;
      }

      if (pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.LeggTil) {
        setPengestøtteFraAndreEøsLand([
          ...pengestøtteFraAndreEøsLand,
          enPengestøtteFraAndreEøsLand as PengestøtteFraAndreEøsLandModalSvar,
        ]);
      }

      if (
        pengestøtteFraAndreEøsLandModalData?.pengestøtteFraAndreEøsLandSvarIndex !== undefined &&
        pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.Rediger
      ) {
        const oppdatertListe = [...pengestøtteFraAndreEøsLand];
        oppdatertListe[pengestøtteFraAndreEøsLandModalData.pengestøtteFraAndreEøsLandSvarIndex] =
          enPengestøtteFraAndreEøsLand as PengestøtteFraAndreEøsLandModalSvar;
        setPengestøtteFraAndreEøsLand(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setPengestøtteFraAndreEøsLandModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  useNullstillSkjulteFelter<PengestøtteFraAndreEøsLandModalSvar>(
    form,
    pengestøtteFraAndreEøsLandModalSpørsmål
  );

  useEffect(() => {
    if (form.value(mottarDuFortsattPengestøttenFraAndreEøsLand) === "ja") {
      form.setValue(iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed, "");
      form.setValue(iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed, "");
    } else if (form.value(mottarDuFortsattPengestøttenFraAndreEøsLand) === "nei") {
      form.setValue(fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed, "");
    }
  }, [form.value(mottarDuFortsattPengestøttenFraAndreEøsLand)]);

  const modalTittel =
    pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjon.LeggTil
      ? "Legg til pengestøtte fra andre EØS-land"
      : "Rediger pengestøtte fra andre EØS-land";

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setPengestøtteFraAndreEøsLandModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">{modalTittel}</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {pengestøtteFraAndreEøsLandModalSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof PengestøtteFraAndreEøsLandModalSvar)}
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
