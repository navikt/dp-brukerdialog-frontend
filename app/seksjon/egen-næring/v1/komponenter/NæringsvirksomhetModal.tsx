import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { ModalOperasjon } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  lagLeggTilNæringsvirksomhetKomponenter,
  LeggTilNæringsvirksomhetSvar,
  Næringsvirksomhet,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { leggTilNæringsvirksomhetSchema } from "~/seksjon/egen-næring/v1/egen-næring.schema";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";
import { useEffect, useRef, useState } from "react";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function NæringsvirksomhetModal({ ref }: IProps) {
  const endringerErIkkeLagretModalRef = useRef<HTMLDialogElement>(null);
  const [stengModalSelvOmDetErUlagredeEndringer, setStengModalSelvOmDetErUlagredeEndringer] =
    useState(false);
  const {
    næringsvirksomheter,
    setNæringsvirksomheter,
    næringsvirksomhetModalData,
    setNæringsvirksomhetModalData,
  } = useEgenNæringContext();
  const { t } = useVersjonertTranslation("egen-næring", 1);
  const leggTilNæringsvirksomhetKomponenter = lagLeggTilNæringsvirksomhetKomponenter(t);

  const form = useForm({
    submitSource: "state",
    schema: leggTilNæringsvirksomhetSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
    defaultValues: næringsvirksomhetModalData?.næringsvirksomhet ?? {},
    handleSubmit: (næringsvirksomhet) => {
      if (
        næringsvirksomhetModalData?.operasjon !== ModalOperasjon.LeggTil &&
        næringsvirksomhetModalData?.operasjon !== ModalOperasjon.Rediger
      ) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (næringsvirksomhetModalData?.operasjon === ModalOperasjon.LeggTil) {
        setNæringsvirksomheter([...næringsvirksomheter, næringsvirksomhet as Næringsvirksomhet]);
      }

      if (
        næringsvirksomhetModalData?.næringsvirksomhetIndex !== undefined &&
        næringsvirksomhetModalData?.operasjon === ModalOperasjon.Rediger
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

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

  const modalOperasjon =
    næringsvirksomhetModalData?.operasjon === ModalOperasjon.LeggTil
      ? t("næringsvirksomhet.modal.leggTilTittel")
      : t("næringsvirksomhet.modal.redigerTittel");

  useEffect(() => {
    if (stengModalSelvOmDetErUlagredeEndringer) {
      setNæringsvirksomhetModalData(undefined);
    }
  }, [stengModalSelvOmDetErUlagredeEndringer]);

  return (
    <>
      <Modal
        ref={ref}
        width={700}
        aria-labelledby="modal-heading"
        onBeforeClose={() => {
          if (form.transient.formState.isDirty) {
            endringerErIkkeLagretModalRef.current?.showModal();
            return false;
          } else {
            return true;
          }
        }}
        onClose={() => setNæringsvirksomhetModalData(undefined)}
      >
        <Modal.Header>
          <Heading level="1" size="medium" id="modal-heading">
            <HStack gap="space-8">{modalOperasjon}</HStack>
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <Form id={formId} action={formAction}>
            <VStack gap="space-16">
              {leggTilNæringsvirksomhetKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(formValues)) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formValues={formValues}
                    formScope={form.scope(komponent.id as keyof LeggTilNæringsvirksomhetSvar)}
                  />
                );
              })}

              <HStack className="mt-16" justify="end">
                <Button
                  type="button"
                  onClick={() => form.submit()}
                  icon={<FloppydiskIcon aria-hidden />}
                >
                  {t("modal.lagreOgLukk")}
                </Button>
              </HStack>
            </VStack>
          </Form>
        </Modal.Body>
      </Modal>
      <EndringerErIkkeLagretModal
        ref={endringerErIkkeLagretModalRef}
        setStengModalSelvOmDetErUlagredeEndringer={setStengModalSelvOmDetErUlagredeEndringer}
      />
    </>
  );
}
