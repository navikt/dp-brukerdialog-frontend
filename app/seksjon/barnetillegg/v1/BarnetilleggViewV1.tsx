import { ArrowLeftIcon, ArrowRightIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, BodyShort, Button, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader, SeksjonSvar } from "~/routes/$soknadId.barnetillegg";
import {
  ModalOperasjon,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { barnetilleggSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  barnetilleggForklarendeTekst,
  barnetilleggKomponenter,
  BarnetilleggSvar,
  BarnFraPdl,
  barnFraPdlSpørsmål,
  BarnLagtManuelt,
  erTilbakenavigering,
  forsørgerDuBarnet,
  forsørgerDuBarnSomIkkeVisesHer,
  leggTilBarnManueltSpørsmål,
  seksjonsvar,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnFraPdlKomponent } from "~/seksjon/barnetillegg/v1/komponenter/BarnFraPdlKomponent";
import { BarnLagtManueltKomponent } from "~/seksjon/barnetillegg/v1/komponenter/BarnLagtManueltKomponent";
import { BarnModal } from "~/seksjon/barnetillegg/v1/komponenter/BarnModal";
import { pdfGrunnlag } from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

enum BarnLagtManueltVarsel {
  MÅ_LEGGE_TIL_BARN = "må-legge-til-barn",
  MÅ_FJERNE_BARN = "må-fjerne-barn",
}

export function BarnetilleggViewV1() {
  const ref = useRef<HTMLDialogElement>(null);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [varsel, setVarsel] = useState<BarnLagtManueltVarsel | undefined>(undefined);
  const {
    barnFraPdl,
    barnLagtManuelt,
    setValiderBarnFraPdl,
    modalData,
    setModalData,
    dokumentasjonskrav,
  } = useBarnetilleggContext();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barnetilleggSchema,
    defaultValues: { ...loaderData.seksjonsvar?.svar, versjon: loaderData.seksjonsvar?.versjon },
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

  function handleTilbakenavigering() {
    form.setValue(erTilbakenavigering, true);
    form.setValue(seksjonsvar, JSON.stringify(lagSeksjonsvar()));
    form.setValue(pdfGrunnlag, JSON.stringify(lagPdfGrunnlag()));
    form.setValue("dokumentasjonskrav", JSON.stringify(dokumentasjonskrav));
    form.submit();
  }

  function handleSubmit() {
    form.validate();

    if (varsel) {
      return;
    }

    const harUbesvartBarnFraPdl = barnFraPdl.some((barn: BarnFraPdl) => !barn[forsørgerDuBarnet]);
    setValiderBarnFraPdl(harUbesvartBarnFraPdl);

    if (!harUbesvartBarnFraPdl && forsørgerDuBarnSomIkkeVisesHerSvar !== undefined) {
      form.setValue(seksjonsvar, JSON.stringify(lagSeksjonsvar()));
      form.setValue(pdfGrunnlag, JSON.stringify(lagPdfGrunnlag()));
      form.setValue("dokumentasjonskrav", JSON.stringify(dokumentasjonskrav));
      form.submit();
    }
  }

  function lagSeksjonsvar(): SeksjonSvar {
    return {
      barnFraPdl: barnFraPdl,
      [forsørgerDuBarnSomIkkeVisesHer]: forsørgerDuBarnSomIkkeVisesHerSvar,
      barnLagtManuelt: barnLagtManuelt,
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
      <h2>Barnetillegg</h2>
      {barnetilleggForklarendeTekst.map((spørsmål) => {
        if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
          return null;
        }

        return (
          <Spørsmål
            key={spørsmål.id}
            spørsmål={spørsmål}
            formScope={form.scope(spørsmål.id as keyof BarnetilleggSvar)}
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
            <input type="hidden" name="versjon" value={loaderData.seksjonsvar?.versjon} />
            {barnetilleggKomponenter.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof BarnetilleggSvar)}
                />
              );
            })}

            {actionData && (
              <Alert variant="error" className="mt-4">
                {actionData.error}
              </Alert>
            )}
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
              Legg til barn
            </Button>
          </HStack>
        )}

        {varsel && (
          <Alert variant="warning" className="mt-4">
            <BodyShort className="validation--warning">{hentVarselTekst(varsel)}</BodyShort>
          </Alert>
        )}

        <HStack gap="4" className="mt-8">
          <Button
            variant="secondary"
            type="button"
            icon={<ArrowLeftIcon aria-hidden />}
            onClick={handleTilbakenavigering}
          >
            Forrige steg
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            iconPosition="right"
            icon={<ArrowRightIcon aria-hidden />}
          >
            Neste steg
          </Button>
        </HStack>
        {modalData && <BarnModal ref={ref} spørsmålId={forsørgerDuBarnSomIkkeVisesHer} />}
      </VStack>
    </div>
  );
}
