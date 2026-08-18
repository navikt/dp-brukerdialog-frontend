import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { ModalOperasjon } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  Gårdsbruk,
  lagLeggTilGårdsbrukKomponenter,
  LeggTilGårdsbrukSvar,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { leggTilGårdsbrukSchema } from "~/seksjon/egen-næring/v1/egen-næring.schema";
import { useEffect, useRef, useState } from "react";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function GårdsbrukModal({ ref }: IProps) {
  const endringerErIkkeLagretModalRef = useRef<HTMLDialogElement>(null);
  const [stengModalSelvOmDetErUlagredeEndringer, setStengModalSelvOmDetErUlagredeEndringer] =
    useState(false);
  const { gårdsbruk, setGårdsbruk, gårdsbrukModalData, setGårdsbrukModalData } =
    useEgenNæringContext();
  const { t } = useVersjonertTranslation("egen-næring", 1);
  const leggTilGårdsbrukKomponenter = lagLeggTilGårdsbrukKomponenter(t);

  const form = useForm({
    submitSource: "state",
    schema: leggTilGårdsbrukSchema,
    defaultValues: gårdsbrukModalData?.etGårdsbruk ?? {},
    handleSubmit: (etGårdsbruk) => {
      if (
        gårdsbrukModalData?.operasjon !== ModalOperasjon.LeggTil &&
        gårdsbrukModalData?.operasjon !== ModalOperasjon.Rediger
      ) {
        console.error("Ugyldig operasjonstype for barnetilleggmodal");
        return;
      }

      if (gårdsbrukModalData?.operasjon === ModalOperasjon.LeggTil) {
        setGårdsbruk([...gårdsbruk, etGårdsbruk as Gårdsbruk]);
      }

      if (
        gårdsbrukModalData?.gårdsbrukIndex !== undefined &&
        gårdsbrukModalData?.operasjon === ModalOperasjon.Rediger
      ) {
        const oppdatertListe = [...gårdsbruk];
        oppdatertListe[gårdsbrukModalData.gårdsbrukIndex] = etGårdsbruk as Gårdsbruk;
        setGårdsbruk(oppdatertListe);
      }
    },
    onSubmitSuccess() {
      setGårdsbrukModalData(undefined);
      ref.current?.close();
    },
    resetAfterSubmit: true,
  });

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

  useNullstillSkjulteFelter<LeggTilGårdsbrukSvar>(form, leggTilGårdsbrukKomponenter);

  const modalOperasjon =
    gårdsbrukModalData?.operasjon === ModalOperasjon.LeggTil
      ? t("gårdsbruk.modal.leggTilTittel")
      : t("gårdsbruk.modal.redigerTittel");

  useEffect(() => {
    if (stengModalSelvOmDetErUlagredeEndringer) {
      setGårdsbrukModalData(undefined);
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
        onClose={() => setGårdsbrukModalData(undefined)}
      >
        <Modal.Header>
          <Heading level="1" size="medium" id="modal-heading">
            <HStack gap="space-8">{modalOperasjon}</HStack>
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <Form id={formId} action={formAction}>
            <VStack gap="space-24">
              {leggTilGårdsbrukKomponenter.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(formValues)) {
                  return null;
                }

                return (
                  <Komponent
                    key={spørsmål.id}
                    props={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof LeggTilGårdsbrukSvar)}
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
