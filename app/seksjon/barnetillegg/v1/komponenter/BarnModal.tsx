import { FloppydiskIcon, PersonPencilIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form } from "react-router";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";
import { Komponent } from "~/components/Komponent";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import {
  ModalOperasjon,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  BarnLagtManuelt,
  etternavn,
  fornavnOgMellomnavn,
  lagLeggTilBarnManueltModalKomponenter,
  LeggTilBarnManueltSvar,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { leggTilBarnManueltSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  spørsmålId: string;
  seksjonId: string;
}

export function BarnModal({ ref, spørsmålId, seksjonId }: IProps) {
  const endringerErIkkeLagretModalRef = useRef<HTMLDialogElement>(null);
  const [stengModalSelvOmDetErUlagredeEndringer, setStengModalSelvOmDetErUlagredeEndringer] =
    useState(false);
  const {
    barnLagtManuelt,
    setBarnLagtManuelt,
    modalData,
    setModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useBarnetilleggContext();

  const { t } = useVersjonertTranslation("barnetillegg", 1);
  const leggTilBarnManueltSpørsmål = lagLeggTilBarnManueltModalKomponenter(t);

  const form = useForm({
    submitSource: "state",
    schema: leggTilBarnManueltSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
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

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

  useEffect(() => {
    if (stengModalSelvOmDetErUlagredeEndringer) {
      setModalData(undefined);
    }
  }, [stengModalSelvOmDetErUlagredeEndringer]);

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
      tittel: t("dokumentasjonskrav.leggTilBarn", {
        navn: `${barnProps[fornavnOgMellomnavn]} ${barnProps[etternavn]}`,
      }),
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
            tittel: t("dokumentasjonskrav.redigerBarn", {
              navn: `${barnProps[fornavnOgMellomnavn]} ${barnProps[etternavn]}`,
            }),
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

  const modalOperasjon =
    modalData?.operasjon === ModalOperasjon.LeggTil ? t("modal.leggTil") : t("modal.rediger");

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
        onClose={() => setModalData(undefined)}
      >
        <Modal.Header>
          <Heading level="1" size="medium" id="modal-heading">
            <HStack gap="space-8">
              {modalIkon}
              {t("modal.tittel", { operasjon: modalOperasjon })}
            </HStack>
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <Form id={formId} action={formAction}>
            <VStack gap="space-16" className="mt-16">
              {leggTilBarnManueltSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(formValues)) {
                  return null;
                }

                return (
                  <Komponent
                    key={spørsmål.id}
                    props={spørsmål}
                    formValues={formValues}
                    formScope={form.scope(spørsmål.id as keyof LeggTilBarnManueltSvar)}
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
