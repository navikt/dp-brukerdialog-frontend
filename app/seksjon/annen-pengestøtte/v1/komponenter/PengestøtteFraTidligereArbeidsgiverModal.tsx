import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { pengestøtteFraAndreEøsLandModalKomponenter } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { pengestøtteFraTidligereArbeidsgiverSchema } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.schema";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import {
  hvemMottarDuUtbetalingerEllerGoderFra,
  pengestøtteFraTidligereArbeidsgiverModalKomponenter,
  PengestøtteFraTidligereArbeidsgiverModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  spørsmålId: string;
  seksjonId: string;
}

export type PengestøtteFraTidligereArbeidsgiver = PengestøtteFraTidligereArbeidsgiverModalSvar & {
  id: string;
  dokumentasjonskrav?: string[];
};

export function PengestøtteFraTidligereArbeidsgiverModal({ ref, spørsmålId, seksjonId }: IProps) {
  const {
    pengestøtteFraTidligereArbeidsgiver,
    setPengestøtteFraTidligereArbeidsgiver,
    pengestøtteFraTidligereArbeidsgiverModalData,
    setPengestøtteFraTidligereArbeidsgiverModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useAnnenPengestøtteContext();

  const form = useForm({
    submitSource: "state",
    schema: pengestøtteFraTidligereArbeidsgiverSchema,
    defaultValues:
      pengestøtteFraTidligereArbeidsgiverModalData?.pengestøtteFraTidligereArbeidsgiver ?? {},
    handleSubmit: (skjemaData) => {
      if (pengestøtteFraTidligereArbeidsgiverModalData?.operasjon === undefined) {
        console.error("Ugyldig operasjonstype for PengestøtteFraTidligereArbeidsgiverModal");
        return;
      }

      const dokumentasjonskravTittel = `Avtalen om sluttvederlag, etterlønn eller andre økonomiske goder - ${skjemaData[hvemMottarDuUtbetalingerEllerGoderFra]}  `;

      if (pengestøtteFraTidligereArbeidsgiverModalData?.operasjon === ModalOperasjon.LeggTil) {
        leggTilPengestøtteFraTidligereArbeidsgiver(skjemaData, dokumentasjonskravTittel);
      }

      if (pengestøtteFraTidligereArbeidsgiverModalData?.operasjon === ModalOperasjon.Rediger) {
        redigerPengestøtteFraTidligereArbeidsgiver(skjemaData, dokumentasjonskravTittel);
      }
    },
    onSubmitSuccess() {
      setPengestøtteFraTidligereArbeidsgiverModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  function leggTilPengestøtteFraTidligereArbeidsgiver(
    pengestøtteProps: PengestøtteFraTidligereArbeidsgiverModalSvar,
    dokumentasjonskravTittel: string
  ) {
    const dokumentasjonskravId = crypto.randomUUID();

    const nyttDokumentkrav: Dokumentasjonskrav = {
      id: dokumentasjonskravId,
      seksjonId: seksjonId,
      spørsmålId: spørsmålId,
      skjemakode: "K1",
      tittel: dokumentasjonskravTittel,
      type: DokumentasjonskravType.AnnenPengestøtteFraAndreEøsLand,
    };

    const nyPengestøtteFraAndreEøsLand: PengestøtteFraTidligereArbeidsgiver = {
      ...pengestøtteProps,
      id: crypto.randomUUID(),
      dokumentasjonskrav: [dokumentasjonskravId],
    };

    setDokumentasjonskrav([...dokumentasjonskrav, nyttDokumentkrav]);
    setPengestøtteFraTidligereArbeidsgiver([
      ...pengestøtteFraTidligereArbeidsgiver,
      nyPengestøtteFraAndreEøsLand,
    ]);
  }

  function redigerPengestøtteFraTidligereArbeidsgiver(
    pengestøtteProps: PengestøtteFraTidligereArbeidsgiverModalSvar,
    dokumentasjonskravTittel: string
  ) {
    const oppdatertPengestøtteFraAndreEøsLand: PengestøtteFraTidligereArbeidsgiver[] =
      pengestøtteFraTidligereArbeidsgiver?.map((pengestøtte) =>
        pengestøtte.id ===
        pengestøtteFraTidligereArbeidsgiverModalData?.pengestøtteFraTidligereArbeidsgiver?.id
          ? {
              ...pengestøtteProps,
              id: pengestøtte.id,
              dokumentasjonskrav: pengestøtte.dokumentasjonskrav,
            }
          : pengestøtte
      );

    const oppdatertDokumentasjonskrav = dokumentasjonskrav.map((krav) =>
      pengestøtteFraTidligereArbeidsgiverModalData?.pengestøtteFraTidligereArbeidsgiver?.dokumentasjonskrav?.includes(
        krav.id
      )
        ? {
            ...krav,
            tittel: dokumentasjonskravTittel,
          }
        : krav
    );

    setDokumentasjonskrav(oppdatertDokumentasjonskrav);
    setPengestøtteFraTidligereArbeidsgiver(oppdatertPengestøtteFraAndreEøsLand);
  }

  useNullstillSkjulteFelter<PengestøtteFraTidligereArbeidsgiverModalSvar>(
    form,
    pengestøtteFraAndreEøsLandModalKomponenter
  );

  return (
    <Modal
      ref={ref}
      width={700}
      aria-labelledby="modal-heading"
      onClose={() => setPengestøtteFraTidligereArbeidsgiverModalData(undefined)}
    >
      <Modal.Header>
        <Heading level="1" size="medium" id="modal-heading">
          <HStack gap="2">Utbetalinger eller goder fra tidligere arbeidsgiver</HStack>
        </Heading>
      </Modal.Header>
      <Modal.Body>
        <Form {...form.getFormProps()}>
          <VStack gap="4" className="mt-4">
            {pengestøtteFraTidligereArbeidsgiverModalKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formScope={form.scope(
                    komponent.id as keyof PengestøtteFraTidligereArbeidsgiverModalSvar
                  )}
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
