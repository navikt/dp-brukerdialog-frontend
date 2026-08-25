import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, Modal, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Komponent } from "~/components/Komponent";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { useTranslation } from "react-i18next";
import {
  ModalOperasjon,
  useArbeidsforholdContext,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  arbeidsforholdetErIkkeEndret,
  ArbeidsforholdModalSvar,
  ArbeidsforholdSvar,
  arbeidsgiverenMinHarSagtMegOpp,
  arbeidsgiverErKonkurs,
  arbeidstidenErRedusert,
  harDuJobbetSkiftTurnusEllerRotasjon,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  jegErPermittert,
  jegHarFåttAvskjed,
  jegHarSagtOppSelv,
  kontraktenErUtgått,
  lagArbeidsforholdForklarendeTekstKomponenter,
  lagArbeidsforholdModalKomponenter,
  lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter,
  navnetPåBedriften,
  rotasjon,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { lagArbeidsforholdModalArbeidstidenErRedusertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import { lagArbeidsforholdModalJegHarFåttAvskjedKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import { lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import { lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import { lagArbeidsforholdModalJegHarSagtOppSelvKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import { lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import { lagArbeidsforholdModalKontraktenErUtgåttKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
import { lagArbeidsforholdModalJegErPermittertKomponenter } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { arbeidsforholdModalSchema } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.schema";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { EndringerErIkkeLagretModal } from "~/components/EndringerErIkkeLagretModal";
import { useEffect, useRef, useState } from "react";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
}

export function ArbeidsforholdModal({ ref }: IProps) {
  const endringerErIkkeLagretModalRef = useRef<HTMLDialogElement>(null);
  const [stengModalSelvOmDetErUlagredeEndringer, setStengModalSelvOmDetErUlagredeEndringer] =
    useState(false);
  const {
    registrerteArbeidsforhold,
    setRegistrerteArbeidsforhold,
    modalData,
    setModalData,
    setDokumentasjonskrav,
    dokumentasjonskrav,
  } = useArbeidsforholdContext();
  const { t } = useTranslation("arbeidsforhold/v1");

  const arbeidsforholdForklarendeTekstKomponenter = lagArbeidsforholdForklarendeTekstKomponenter(t);

  const alleModalKomponenter = lagArbeidsforholdModalKomponenter(t)
    .concat(lagArbeidsforholdModalArbeidsgiverenMinHarSagtMegOppKomponenter(t))
    .concat(lagArbeidsforholdModalJegHarSagtOppSelvKomponenter(t))
    .concat(lagArbeidsforholdModalJegHarFåttAvskjedKomponenter(t))
    .concat(lagArbeidsforholdModalKontraktenErUtgåttKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidstidenErRedusertKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidsgiverErKonkursKomponenter(t))
    .concat(lagArbeidsforholdModalJegErPermittertKomponenter(t))
    .concat(lagArbeidsforholdModalArbeidsforholdetErIkkeEndretKomponenter(t))
    .concat(lagArbeidsforholdModalSkiftTurnusRotasjonKomponenter(t));

  const form = useForm({
    submitSource: "state",
    schema: arbeidsforholdModalSchema,
    defaultValues: modalData?.arbeidsforhold ?? {},
    handleSubmit: (skjemaData) => {
      if (modalData?.operasjon === undefined) {
        console.error("Ugyldig operasjonstype for arbeidsforholdmodal");
        return;
      }

      if (modalData?.operasjon === ModalOperasjon.LeggTil) {
        leggTilArbeidsforhold(skjemaData);
      }

      if (modalData?.operasjon === ModalOperasjon.Rediger) {
        redigerArbeidsforhold(skjemaData);
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

  useNullstillSkjulteFelter<ArbeidsforholdModalSvar>(form, alleModalKomponenter);

  useEffect(() => {
    if (stengModalSelvOmDetErUlagredeEndringer) {
      setModalData(undefined);
    }
  }, [stengModalSelvOmDetErUlagredeEndringer]);

  function leggTilArbeidsforhold(skjemaData: ArbeidsforholdModalSvar) {
    const jobbetSkiftTurnusEllerRotasjon = skjemaData[harDuJobbetSkiftTurnusEllerRotasjon] || "";
    const arbeidsforholdSituasjon = skjemaData[hvordanHarDetteArbeidsforholdetEndretSeg] || "";
    const bedriftNavn = skjemaData[navnetPåBedriften] || "";

    const nyttDokumentkrav = lagDokumentasjonskrav(
      jobbetSkiftTurnusEllerRotasjon,
      arbeidsforholdSituasjon,
      bedriftNavn
    );

    const nyttArbeidsforhold = {
      ...skjemaData,
      id: crypto.randomUUID(),
      dokumentasjonskrav: nyttDokumentkrav.map((krav) => krav.id),
    };

    setDokumentasjonskrav([...dokumentasjonskrav, ...nyttDokumentkrav]);
    setRegistrerteArbeidsforhold([...registrerteArbeidsforhold, nyttArbeidsforhold]);
  }

  function redigerArbeidsforhold(skjemaData: ArbeidsforholdModalSvar) {
    if (!modalData?.arbeidsforhold) {
      console.error("Mangler arbeidsforhold for redigering");
      return;
    }

    const gammeltArbeidsforhold = modalData.arbeidsforhold;
    const jobbetSkiftTurnusEllerRotasjon = skjemaData[harDuJobbetSkiftTurnusEllerRotasjon] || "";
    const arbeidsforholdSituasjon = skjemaData[hvordanHarDetteArbeidsforholdetEndretSeg] || "";
    const bedriftNavn = skjemaData[navnetPåBedriften] || "";

    const oppdaterteDokumentasjonskrav = dokumentasjonskrav.filter(
      (krav) => !gammeltArbeidsforhold.dokumentasjonskrav?.includes(krav.id)
    );

    const nyeDokumentkrav = lagDokumentasjonskrav(
      jobbetSkiftTurnusEllerRotasjon,
      arbeidsforholdSituasjon,
      bedriftNavn
    );

    const oppdatertArbeidsforhold = {
      ...skjemaData,
      id: gammeltArbeidsforhold.id,
      dokumentasjonskrav: nyeDokumentkrav.map((krav) => krav.id),
    };

    const oppdatertArbeidsforholdListe = registrerteArbeidsforhold.map((arbeidsforhold) =>
      arbeidsforhold.id === gammeltArbeidsforhold.id ? oppdatertArbeidsforhold : arbeidsforhold
    );

    setDokumentasjonskrav([...oppdaterteDokumentasjonskrav, ...nyeDokumentkrav]);
    setRegistrerteArbeidsforhold(oppdatertArbeidsforholdListe);
  }

  function lagDokumentasjonskrav(
    jobbetSkiftTurnusEllerRotasjon: string,
    arbeidsforholdSituasjon: string,
    bedriftNavn: string
  ): Dokumentasjonskrav[] {
    const dokumentasjonskrav = new Array<Dokumentasjonskrav>();

    switch (arbeidsforholdSituasjon) {
      case arbeidsgiverenMinHarSagtMegOpp:
        dokumentasjonskrav.push(
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "O2",
            tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
          },
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "T8",
            tittel: t("dokumentasjonskrav.oppsigelse", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp,
          }
        );
        break;
      case jegHarSagtOppSelv:
        dokumentasjonskrav.push(
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "O2",
            tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
          },
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "T8",
            tittel: t("dokumentasjonskrav.oppsigelse", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdJegHarSagtOppSelv,
          }
        );
        break;
      case jegHarFåttAvskjed:
        dokumentasjonskrav.push(
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "O2",
            tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
          },
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "T8",
            tittel: t("dokumentasjonskrav.avskjedigelse", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdAvskjedigelse,
          }
        );
        break;
      case kontraktenErUtgått:
      case arbeidsforholdetErIkkeEndret:
        dokumentasjonskrav.push({
          id: crypto.randomUUID(),
          seksjonId: "arbeidsforhold",
          spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
          skjemakode: "O2",
          tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
          type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
        });
        break;
      case arbeidstidenErRedusert:
        dokumentasjonskrav.push(
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "O2",
            tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
          },
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "T8",
            tittel: t("dokumentasjonskrav.redusertArbeidstid", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdRedusertArbeidstid,
          }
        );
        break;
      case arbeidsgiverErKonkurs:
        dokumentasjonskrav.push(
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "O2",
            tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
          },
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "M7",
            tittel: t("dokumentasjonskrav.oppsigelseFraBostyrer", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter,
          }
        );
        break;
      case jegErPermittert:
        dokumentasjonskrav.push(
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "O2",
            tittel: t("dokumentasjonskrav.arbeidsavtale", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdArbeidsavtale,
          },
          {
            id: crypto.randomUUID(),
            seksjonId: "arbeidsforhold",
            spørsmålId: hvordanHarDetteArbeidsforholdetEndretSeg,
            skjemakode: "T6",
            tittel: t("dokumentasjonskrav.permitteringsvarsel", { bedrift: bedriftNavn }),
            type: DokumentasjonskravType.ArbeidsforholdPermitteringsvarsel,
          }
        );
        break;
    }

    if (jobbetSkiftTurnusEllerRotasjon === rotasjon) {
      dokumentasjonskrav.push({
        id: crypto.randomUUID(),
        seksjonId: "arbeidsforhold",
        spørsmålId: harDuJobbetSkiftTurnusEllerRotasjon,
        skjemakode: "M6",
        tittel: t("dokumentasjonskrav.rotasjonsordning", { bedrift: bedriftNavn }),
        type: DokumentasjonskravType.ArbeidsforholdRotasjon,
      });
    }

    return dokumentasjonskrav;
  }

  const modalTittel =
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
            {modalTittel}
          </Heading>
        </Modal.Header>
        <Modal.Body>
          {modalData?.form &&
            arbeidsforholdForklarendeTekstKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(modalData.form?.value())) {
                return null;
              }

              if (modalData?.form) {
                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formValues={formValues}
                    formScope={modalData.form.scope(komponent.id as keyof ArbeidsforholdSvar)}
                  />
                );
              }
            })}
          <Form id={formId} action={formAction}>
            <VStack gap="space-24" className="mt-16">
              {alleModalKomponenter.map((komponent) => {
                if (komponent.visHvis && !komponent.visHvis(formValues)) {
                  return null;
                }

                return (
                  <Komponent
                    key={komponent.id}
                    props={komponent}
                    formValues={formValues}
                    formScope={form.scope(komponent.id as keyof ArbeidsforholdModalSvar)}
                  />
                );
              })}

              <HStack className="mt-16" justify="end">
                <Button
                  type="button"
                  onClick={() => form.submit()}
                  icon={<FloppydiskIcon aria-hidden />}
                >
                  {t("navigasjon.lagreOgLukk")}
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
