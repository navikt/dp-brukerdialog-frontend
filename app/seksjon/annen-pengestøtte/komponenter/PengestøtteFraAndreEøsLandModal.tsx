import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import {
  ModalOperasjonEnum,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte.context";
import { pengestøtteFraAndreEøsLandSchema } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.schema";
import {
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
  mottarDuFortsattPengestøttenFraAndreEøsLand,
  pengestøtteFraAndreEøsLandModalSpørsmål,
  PengestøtteFraAndreEøsLandModalSvar,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte-eøs.spørsmål";
import { useEffect } from "react";

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
        pengestøtteFraAndreEøsLandModalData?.operasjon !== ModalOperasjonEnum.LeggTil &&
        pengestøtteFraAndreEøsLandModalData?.operasjon !== ModalOperasjonEnum.Rediger
      ) {
        console.error("Ugyldig operasjonstype for PengestøtteFraAndreEøsLandModal");
        return;
      }

      if (pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjonEnum.LeggTil) {
        setPengestøtteFraAndreEøsLand([
          ...pengestøtteFraAndreEøsLand,
          enPengestøtteFraAndreEøsLand as PengestøtteFraAndreEøsLandModalSvar,
        ]);
      }

      if (
        pengestøtteFraAndreEøsLandModalData?.pengestøtteFraAndreEøsLandSvarIndex !== undefined &&
        pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjonEnum.Rediger
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

  useEffect(() => {
    if (form.value(mottarDuFortsattPengestøttenFraAndreEøsLand) === "ja") {
      form.setValue(iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed, "");
      form.setValue(iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed, "");
    } else if (form.value(mottarDuFortsattPengestøttenFraAndreEøsLand) === "nei") {
      form.setValue(fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed, "");
    }
  }, [form.value(mottarDuFortsattPengestøttenFraAndreEøsLand)]);

  const modalTittel =
    pengestøtteFraAndreEøsLandModalData?.operasjon === ModalOperasjonEnum.LeggTil
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
