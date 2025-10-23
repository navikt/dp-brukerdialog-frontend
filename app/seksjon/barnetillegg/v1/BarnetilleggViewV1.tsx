import { ArrowLeftIcon, ArrowRightIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, BodyShort, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.barnetillegg";
import {
  ModalOperasjonEnum,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { barnetilleggSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  Barn,
  barnetilleggSpørsmål,
  BarnetilleggSvar,
  erTilbakenavigering,
  forsørgerDuBarnSomIkkeVisesHer,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnFraPdl } from "~/seksjon/barnetillegg/v1/komponenter/BarnFraPdl";
import { BarnLagtManuelt } from "~/seksjon/barnetillegg/v1/komponenter/BarnLagtManuelt";
import { BarnModal } from "~/seksjon/barnetillegg/v1/komponenter/BarnModal";

export function BarnetilleggViewV1() {
  const ref = useRef<HTMLDialogElement>(null);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const [harEnFeil, setHarEnFeil] = useState(false);
  const [harEtVarsel, setHarEtVarsel] = useState(false);
  const {
    barnFraPdl,
    barnLagtManuelt,
    setValiderBarnFraPdl,
    modalData,
    setModalData,
    dokumentkravList,
  } = useBarnetilleggContext();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barnetilleggSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: loaderData?.skjema ?? {},
  });

  useNullstillSkjulteFelter<BarnetilleggSvar>(form, barnetilleggSpørsmål);

  useEffect(() => {
    if (modalData) {
      ref.current?.showModal();
    }
  }, [modalData]);

  const forsørgerDuBarnSomIkkeVisesHerSvar = form.value(forsørgerDuBarnSomIkkeVisesHer);

  useEffect(() => {
    if (forsørgerDuBarnSomIkkeVisesHerSvar === undefined) {
      return;
    }

    setHarEtVarsel(forsørgerDuBarnSomIkkeVisesHerSvar === "nei" && barnLagtManuelt.length > 0);
    setHarEnFeil(forsørgerDuBarnSomIkkeVisesHerSvar === "ja" && barnLagtManuelt.length === 0);
  }, [forsørgerDuBarnSomIkkeVisesHerSvar, barnLagtManuelt.length]);

  function handleTilbakenavigering() {
    form.setValue(erTilbakenavigering, true);
    form.setValue("versjon", loaderData?.versjon ?? 1);
    form.setValue("barnFraPdl", JSON.stringify(barnFraPdl));
    form.setValue("barnLagtManuelt", JSON.stringify(barnLagtManuelt));
    form.setValue("dokumentkravList", JSON.stringify(dokumentkravList));
    form.submit();
  }

  function handleSubmit() {
    form.validate();

    if (harEnFeil || harEtVarsel) {
      return;
    }

    const harUbesvartBarnFraPdl = barnFraPdl.some((barn: Barn) => !barn.forsørgerDuBarnet);
    setValiderBarnFraPdl(harUbesvartBarnFraPdl);

    if (!harUbesvartBarnFraPdl && forsørgerDuBarnSomIkkeVisesHerSvar !== undefined) {
      form.setValue("versjon", loaderData?.versjon ?? 1);
      form.setValue("barnFraPdl", JSON.stringify(barnFraPdl));
      form.setValue("barnLagtManuelt", JSON.stringify(barnLagtManuelt));
      form.setValue("dokumentkravList", JSON.stringify(dokumentkravList));
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <h2>Barnetillegg</h2>
      <BodyLong spacing>
        Hvis du forsørger barn under 18 år, eller er bidragspliktig, kan du få barnetillegg
        uavhengig av om barnet bor hos deg.
        <br />
        <br />
        Barnet må være bosatt i Norge, et annet EØS-land, Sveits eller Storbritannia. Du får ikke
        barnetillegg hvis barnet oppholder seg utenfor disse områdene mer enn 90 dager i løpet av 12
        måneder.
        <br />
        <br />
        Hvis vi har registrert noen barn på deg vises de under.
      </BodyLong>
      <VStack gap="10">
        <VStack gap="space-16">
          {barnFraPdl.map((barn: Barn) => (
            <BarnFraPdl key={barn.id} barn={barn} />
          ))}
        </VStack>
        <Form {...form.getFormProps()}>
          <VStack gap="8">
            {barnetilleggSpørsmål.map((spørsmål) => {
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
          {barnLagtManuelt?.map((barn: Barn) => (
            <BarnLagtManuelt key={barn.id} barn={barn} />
          ))}
        </VStack>
        {forsørgerDuBarnSomIkkeVisesHerSvar === "ja" && (
          <HStack>
            <Button
              variant="secondary"
              type="submit"
              icon={<PersonPlusIcon title="a11y-title" fontSize="1.5rem" />}
              onClick={() => {
                setModalData({ operasjon: ModalOperasjonEnum.LeggTil });
              }}
            >
              Legg til barn
            </Button>
          </HStack>
        )}
        {harEnFeil && (
          <VStack gap="space-20">
            <ErrorMessage showIcon>Du må legge til et barn</ErrorMessage>
          </VStack>
        )}
        {harEtVarsel && (
          <Alert variant="warning" className="mt-4">
            <BodyShort className="validation--warning">
              Du har lagt til barn manuelt, men du har svar nei på spørsmålet om du forsørger
              barnet. Du må enten fjerne barnet eller endre svaret til ja for å kunne gå videre i
              søknaden.
            </BodyShort>
          </Alert>
        )}
        <HStack gap="4" className="mt-8">
          <Button
            variant="secondary"
            type="button"
            icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
            onClick={handleTilbakenavigering}
          >
            Forrige steg
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            iconPosition="right"
            icon={<ArrowRightIcon />}
          >
            Neste steg
          </Button>
        </HStack>
        {modalData && <BarnModal ref={ref} spørsmålId={forsørgerDuBarnSomIkkeVisesHer} />}
      </VStack>
    </div>
  );
}
