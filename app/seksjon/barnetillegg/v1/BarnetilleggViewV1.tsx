import { PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, InlineMessage, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { useTranslation } from "react-i18next";
import { action, loader, SeksjonSvar } from "~/routes/$soknadId.barnetillegg";
import {
  ModalOperasjon,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  BarnetilleggSvar,
  BarnFraPdl,
  lagBarnetilleggForklarendeTekst,
  lagBarnetilleggKomponenter,
  lagBarnFraPdlKomponenter,
  BarnLagtManuelt,
  forsørgerDuBarnet,
  forsørgerDuBarnSomIkkeVisesHer,
  lagLeggTilBarnManueltModalKomponenter,
  seksjonsvar,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { barnetilleggSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import { BarnFraPdlKomponent } from "~/seksjon/barnetillegg/v1/komponenter/BarnFraPdlKomponent";
import { BarnLagtManueltKomponent } from "~/seksjon/barnetillegg/v1/komponenter/BarnLagtManueltKomponent";
import { BarnModal } from "~/seksjon/barnetillegg/v1/komponenter/BarnModal";
import { pdfGrunnlag } from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { useSoknad } from "~/seksjon/soknad.context";
import { handling } from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { validerSvar } from "~/utils/validering.utils";

export function BarnetilleggViewV1() {
  const ref = useRef<HTMLDialogElement>(null);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { t } = useTranslation("barnetillegg/v1");
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();
  const [visLeggTilBarnFeilmelding, setVisLeggTilBarnFeilmelding] = useState(false);
  const {
    barnFraPdl,
    barnLagtManuelt,
    setBarnLagtManuelt,
    setValiderBarnFraPdl,
    modalData,
    setModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useBarnetilleggContext();

  const barnetilleggForklarendeTekst = lagBarnetilleggForklarendeTekst(t);
  const barnetilleggKomponenter = lagBarnetilleggKomponenter(t);
  const barnFraPdlKomponenter = lagBarnFraPdlKomponenter(t);
  const leggTilBarnManueltModalKomponenter = lagLeggTilBarnManueltModalKomponenter(t);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barnetilleggSchema,
    defaultValues: { ...loaderData.seksjon?.seksjonsvar, versjon: loaderData.seksjon?.versjon },
  });

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

  useNullstillSkjulteFelter<BarnetilleggSvar>(form, barnetilleggKomponenter);

  useEffect(() => {
    if (modalData) {
      ref.current?.showModal();
    }
  }, [modalData]);

  const forsørgerDuBarnSomIkkeVisesHerSvar = form.value(forsørgerDuBarnSomIkkeVisesHer);

  useEffect(() => {
    setVisLeggTilBarnFeilmelding(
      forsørgerDuBarnSomIkkeVisesHerSvar !== "ja" && barnLagtManuelt.length > 0
    );
    if (forsørgerDuBarnSomIkkeVisesHerSvar === "nei") {
      setBarnLagtManuelt([]);
      setDokumentasjonskrav([]);
    }
  }, [forsørgerDuBarnSomIkkeVisesHerSvar, barnLagtManuelt.length]);

  function handleMellomlagring(ønsketHandling: Seksjonshandling) {
    form.setValue(handling, ønsketHandling);
    form.setValue(seksjonsvar, JSON.stringify(lagSeksjonsvar()));
    form.setValue(pdfGrunnlag, JSON.stringify(lagPdfGrunnlag()));
    form.setValue(
      "dokumentasjonskrav",
      JSON.stringify(dokumentasjonskrav.length > 0 ? dokumentasjonskrav : null)
    );
    form.submit();
  }

  async function handleSubmit() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

    if (forsørgerDuBarnSomIkkeVisesHerSvar === "ja" && barnLagtManuelt.length === 0) {
      setVisLeggTilBarnFeilmelding(true);
      return;
    }

    const harUbesvartBarnFraPdl = barnFraPdl.some((barn: BarnFraPdl) => !barn[forsørgerDuBarnet]);
    setValiderBarnFraPdl(harUbesvartBarnFraPdl);

    if (
      klarTilLagring &&
      !harUbesvartBarnFraPdl &&
      forsørgerDuBarnSomIkkeVisesHerSvar !== undefined
    ) {
      form.setValue(handling, Seksjonshandling.neste);
      form.setValue(seksjonsvar, JSON.stringify(lagSeksjonsvar()));
      form.setValue(pdfGrunnlag, JSON.stringify(lagPdfGrunnlag()));
      form.setValue(
        "dokumentasjonskrav",
        JSON.stringify(dokumentasjonskrav.length > 0 ? dokumentasjonskrav : null)
      );

      form.submit();
    }
  }

  function lagSeksjonsvar(): SeksjonSvar {
    return {
      barnFraPdl: barnFraPdl.length > 0 ? barnFraPdl : null,
      [forsørgerDuBarnSomIkkeVisesHer]: forsørgerDuBarnSomIkkeVisesHerSvar,
      barnLagtManuelt: barnLagtManuelt.length > 0 ? barnLagtManuelt : null,
    };
  }

  function lagPdfGrunnlag() {
    return {
      navn: t("side.overskrift"),
      spørsmål: [
        ...barnFraPdl.map((barn) => lagSeksjonPayload(barnFraPdlKomponenter, barn)),
        ...lagSeksjonPayload(barnetilleggKomponenter, form.transient.value()),
        ...barnLagtManuelt.map((barn) =>
          lagSeksjonPayload(leggTilBarnManueltModalKomponenter, barn)
        ),
      ],
    };
  }

  return (
    <div className="innhold">
      <title>{t("side.tittel")}</title>
      <Heading size="medium" level="2">
        {t("side.overskrift")}
      </Heading>
      <VStack gap="space-24">
        {barnetilleggForklarendeTekst.map((komponent) => {
          if (komponent.visHvis && !komponent.visHvis(formValues)) {
            return null;
          }

          return (
            <Komponent
              key={komponent.id}
              props={komponent}
              formScope={form.scope(komponent.id as keyof BarnetilleggSvar)}
            />
          );
        })}

        {barnFraPdl?.map((barn: BarnFraPdl) => (
          <BarnFraPdlKomponent key={barn.id} barn={barn} />
        ))}

        <Form id={formId} action={formAction}>
          <input type="hidden" name="versjon" value={loaderData.seksjon?.versjon} />
          {barnetilleggKomponenter.map((spørsmål) => {
            if (spørsmål.visHvis && !spørsmål.visHvis(formValues)) {
              return null;
            }

            return (
              <Komponent
                key={spørsmål.id}
                props={spørsmål}
                formValues={formValues}
                formScope={form.scope(spørsmål.id as keyof BarnetilleggSvar)}
              />
            );
          })}
        </Form>

        {barnLagtManuelt?.map((barn: BarnLagtManuelt) => (
          <BarnLagtManueltKomponent key={barn.id} barn={barn} />
        ))}

        {forsørgerDuBarnSomIkkeVisesHerSvar === "ja" && (
          <HStack>
            <Button
              variant="secondary"
              type="button"
              icon={<PersonPlusIcon aria-hidden />}
              onClick={() => {
                setModalData({ operasjon: ModalOperasjon.LeggTil });
              }}
            >
              {t("leggTilBarn.knapp")}
            </Button>
          </HStack>
        )}

        {visLeggTilBarnFeilmelding && (
          <InlineMessage status="error">{t("leggTilBarn.feil")}</InlineMessage>
        )}

        {actionData && (
          <SeksjonTekniskFeil tittel={t("tekniskFeil.tittel")} beskrivelse={actionData.error} />
        )}
      </VStack>

      {modalData && (
        <BarnModal
          ref={ref}
          seksjonId={loaderData.seksjon?.seksjonId}
          spørsmålId={forsørgerDuBarnSomIkkeVisesHer}
        />
      )}

      <SeksjonNavigasjon
        onForrigeSteg={() => handleMellomlagring(Seksjonshandling.tilbakenavigering)}
        onNesteSteg={handleSubmit}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)} />
    </div>
  );
}
