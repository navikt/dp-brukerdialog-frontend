import { ArrowLeftIcon, ArrowRightIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Alert, BodyShort, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import { Komponent } from "~/components/Komponent";
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
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { handling } from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { SøknadFooter } from "~/components/SøknadFooter";
import invariant from "tiny-invariant";

enum BarnLagtManueltVarsel {
  MÅ_LEGGE_TIL_BARN = "må-legge-til-barn",
  MÅ_FJERNE_BARN = "må-fjerne-barn",
}

export function BarnetilleggViewV1() {
  const seksjonnavn = "Barnetillegg";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const ref = useRef<HTMLDialogElement>(null);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const [varsel, setVarsel] = useState<BarnLagtManueltVarsel | undefined>(undefined);
  const {
    barnFraPdl,
    barnLagtManuelt,
    setValiderBarnFraPdl,
    modalData,
    setModalData,
    dokumentasjonskrav,
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
    if (forsørgerDuBarnSomIkkeVisesHerSvar === "nei") {
      setVarsel(barnLagtManuelt.length > 0 ? BarnLagtManueltVarsel.MÅ_FJERNE_BARN : undefined);
      return;
    }

    if (forsørgerDuBarnSomIkkeVisesHerSvar === "ja" && barnLagtManuelt.length === 0) {
      setVarsel(BarnLagtManueltVarsel.MÅ_LEGGE_TIL_BARN);
      return;
    }

    setVarsel(undefined);
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

    if (varsel) {
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

  function hentVarselTekst(varsel: BarnLagtManueltVarsel) {
    switch (varsel) {
      case BarnLagtManueltVarsel.MÅ_LEGGE_TIL_BARN:
        return "Du må legge til et barn for å kunne gå videre i søknaden.";
      case BarnLagtManueltVarsel.MÅ_FJERNE_BARN:
        return "Du må fjerne barnet for å kunne gå videre i søknaden.";
      default:
        console.error("Ukjent varseltype:", varsel);
        return null;
    }
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <Heading size="medium" level="2">
        {seksjonnavn}
      </Heading>
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
      <VStack gap="10">
        <VStack gap="space-16">
          {barnFraPdl?.map((barn: BarnFraPdl) => (
            <BarnFraPdlKomponent key={barn.id} barn={barn} />
          ))}
        </VStack>
        <Form {...form.getFormProps()}>
          <VStack gap="8">
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
          </VStack>
        </Form>
        <VStack gap="space-16">
          {barnLagtManuelt?.map((barn: BarnLagtManuelt) => (
            <BarnLagtManueltKomponent key={barn.id} barn={barn} />
          ))}
        </VStack>
        {forsørgerDuBarnSomIkkeVisesHerSvar === "ja" && (
          <HStack>
            <Button
              variant="secondary"
              type="submit"
              icon={<PersonPlusIcon title="a11y-title" fontSize="1.5rem" />}
              onClick={() => {
                setModalData({ operasjon: ModalOperasjon.LeggTil });
              }}
            >
              Legg til barn du forsørger
            </Button>
          </HStack>
        )}

        {varsel && (
          <Alert variant="warning" className="mt-4">
            <BodyShort className="validation--warning">{hentVarselTekst(varsel)}</BodyShort>
          </Alert>
        )}

        {actionData && (
          <Alert variant="error" className="mt-4">
            {actionData.error}
          </Alert>
        )}

        <HStack gap="4" className="mt-8">
          <Button
            variant="secondary"
            type="button"
            icon={<ArrowLeftIcon aria-hidden />}
            onClick={() => handleMellomlagring(Seksjonshandling.tilbakenavigering)}
            disabled={state === "submitting" || state === "loading"}
          >
            Forrige steg
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            iconPosition="right"
            icon={<ArrowRightIcon aria-hidden />}
            disabled={state === "submitting" || state === "loading"}
          >
            Neste steg
          </Button>
        </HStack>
        {modalData && (
          <BarnModal
            ref={ref}
            seksjonId={loaderData.seksjon?.seksjonId}
            spørsmålId={forsørgerDuBarnSomIkkeVisesHer}
          />
        )}
      </VStack>
      <SøknadFooter
        className="footer"
        søknadId={soknadId}
        onFortsettSenere={() => handleMellomlagring(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
