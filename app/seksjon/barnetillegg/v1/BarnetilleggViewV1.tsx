import { PersonPlusIcon } from "@navikt/aksel-icons";
import { Button, Heading, HStack, InlineMessage, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import invariant from "tiny-invariant";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader, SeksjonSvar } from "~/routes/$soknadId.barnetillegg";
import {
  ModalOperasjon,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  barnetilleggForklarendeTekst,
  barnetilleggKomponenter,
  BarnetilleggSvar,
  BarnFraPdl,
  barnFraPdlSpørsmål,
  BarnLagtManuelt,
  forsørgerDuBarnet,
  forsørgerDuBarnSomIkkeVisesHer,
  leggTilBarnManueltSpørsmål,
  seksjonsvar,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { barnetilleggSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import { BarnFraPdlKomponent } from "~/seksjon/barnetillegg/v1/komponenter/BarnFraPdlKomponent";
import { BarnLagtManueltKomponent } from "~/seksjon/barnetillegg/v1/komponenter/BarnLagtManueltKomponent";
import { BarnModal } from "~/seksjon/barnetillegg/v1/komponenter/BarnModal";
import { pdfGrunnlag } from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { handling } from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

export function BarnetilleggViewV1() {
  const seksjonnavn = "Barnetillegg";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const ref = useRef<HTMLDialogElement>(null);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
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
  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barnetilleggSchema,
    defaultValues: { ...loaderData.seksjon?.seksjonsvar, versjon: loaderData.seksjon?.versjon },
  });

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

  function handleSubmit() {
    form.setValue(handling, Seksjonshandling.neste);
    form.validate();

    if (forsørgerDuBarnSomIkkeVisesHerSvar === "ja" && barnLagtManuelt.length === 0) {
      setVisLeggTilBarnFeilmelding(true);
      return;
    }

    const harUbesvartBarnFraPdl = barnFraPdl.some((barn: BarnFraPdl) => !barn[forsørgerDuBarnet]);
    setValiderBarnFraPdl(harUbesvartBarnFraPdl);

    if (!harUbesvartBarnFraPdl && forsørgerDuBarnSomIkkeVisesHerSvar !== undefined) {
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
      navn: "Barnetillegg",
      spørsmål: [
        ...barnFraPdl.map((barn) => lagSeksjonPayload(barnFraPdlSpørsmål, barn)),
        ...lagSeksjonPayload(barnetilleggKomponenter, form.transient.value()),
        ...barnLagtManuelt.map((barn) => lagSeksjonPayload(leggTilBarnManueltSpørsmål, barn)),
      ],
    };
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <Heading size="medium" level="2">
        {seksjonnavn}
      </Heading>
      <VStack gap="6">
        {barnetilleggForklarendeTekst.map((komponent) => {
          if (komponent.visHvis && !komponent.visHvis(form.value())) {
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

        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={loaderData.seksjon?.versjon} />
          {barnetilleggKomponenter.map((spørsmål) => {
            if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
              return null;
            }

            return (
              <Komponent
                key={spørsmål.id}
                props={spørsmål}
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
              Legg til barn du forsørger
            </Button>
          </HStack>
        )}

        {visLeggTilBarnFeilmelding && (
          <InlineMessage status="error">Du må legge til barn du forsørger</InlineMessage>
        )}

        {actionData && (
          <SeksjonTekniskFeil
            tittel="Det har oppstått en teknisk feil"
            beskrivelse={actionData.error}
          />
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

      <SøknadFooter
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
