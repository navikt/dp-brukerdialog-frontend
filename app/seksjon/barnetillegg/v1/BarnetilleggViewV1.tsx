import { ArrowLeftIcon, ArrowRightIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, BodyShort, Button, ErrorMessage, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader, SeksjonSvar } from "~/routes/$soknadId.barnetillegg";
import {
  ModalOperasjonEnum,
  useBarnetilleggContext,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import { barnetilleggSchema } from "~/seksjon/barnetillegg/v1/barnetillegg.schema";
import {
  barnetilleggSpørsmål,
  BarnetilleggSvar,
  BarnFraPdlType,
  BarnLagtManueltType,
  erTilbakenavigering,
  forsørgerDuBarnet,
  forsørgerDuBarnSomIkkeVisesHer,
  leggTilBarnManueltSpørsmål,
  pdlBarnSpørsmål,
  seksjonsvar,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnModal } from "~/seksjon/barnetillegg/v1/komponenter/BarnModal";
import { BarnFraPdl } from "~/seksjon/barnetillegg/v1/komponenter/PdlBarn";
import { pdfGrunnlag } from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { BarnLagtManuelt } from "./komponenter/BarnLagtManuelt";

export function BarnetilleggViewV1() {
  const ref = useRef<HTMLDialogElement>(null);
  const { svar, versjon } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const [harEnFeil, setHarEnFeil] = useState(false);
  const [harEtVarsel, setHarEtVarsel] = useState(false);
  const actionData = useActionData<typeof action>();
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
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...svar, versjon },
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

    const barnetilleggResponse: SeksjonSvar = {
      barnFraPdl: barnFraPdl,
      barnLagtManuelt: barnLagtManuelt,
      [forsørgerDuBarnSomIkkeVisesHer]: forsørgerDuBarnSomIkkeVisesHerSvar,
    };

    const pdfPayload = {
      navn: "Barnetillegg",
      spørsmål: [
        ...barnFraPdl.map((barn) => lagSeksjonPayload(pdlBarnSpørsmål, barn)),
        ...lagSeksjonPayload(barnetilleggSpørsmål, form.transient.value()),
        ...barnLagtManuelt.map((etBarnLagtTilManuelt) =>
          lagSeksjonPayload(leggTilBarnManueltSpørsmål, etBarnLagtTilManuelt)
        ),
      ],
    };

    const dokumentasjonskravJson = JSON.stringify(dokumentasjonskrav);

    form.setValue(seksjonsvar, JSON.stringify(barnetilleggResponse));
    form.setValue(pdfGrunnlag, JSON.stringify(pdfPayload));
    form.setValue("dokumentasjonskrav", dokumentasjonskravJson);
    form.submit();
  }

  function handleSubmit() {
    form.validate();

    if (harEnFeil || harEtVarsel) {
      return;
    }

    const harUbesvartBarnFraPdl = barnFraPdl.some(
      (barn: BarnFraPdlType) => !barn[forsørgerDuBarnet]
    );
    setValiderBarnFraPdl(harUbesvartBarnFraPdl);

    if (!harUbesvartBarnFraPdl && forsørgerDuBarnSomIkkeVisesHerSvar !== undefined) {
      const barnetilleggResponse: SeksjonSvar = {
        barnFraPdl: barnFraPdl,
        [forsørgerDuBarnSomIkkeVisesHer]: forsørgerDuBarnSomIkkeVisesHerSvar,
        barnLagtManuelt: barnLagtManuelt,
      };

      const pdfPayload = {
        navn: "Barnetillegg",
        spørsmål: [
          ...barnFraPdl.map((etBarnFraPdl) => lagSeksjonPayload(pdlBarnSpørsmål, etBarnFraPdl)),
          ...lagSeksjonPayload(barnetilleggSpørsmål, form.transient.value()),
          ...barnLagtManuelt.map((etBarnLagtTilManuelt) =>
            lagSeksjonPayload(leggTilBarnManueltSpørsmål, etBarnLagtTilManuelt)
          ),
        ],
      };

      form.setValue(seksjonsvar, JSON.stringify(barnetilleggResponse));
      form.setValue(pdfGrunnlag, JSON.stringify(pdfPayload));
      form.setValue("dokumentasjonskrav", JSON.stringify(dokumentasjonskrav));
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
          {barnFraPdl.map((barn: BarnFraPdlType) => (
            <BarnFraPdl key={barn.id} barn={barn} />
          ))}
        </VStack>
        <Form {...form.getFormProps()}>
          <VStack gap="8">
            <input type="hidden" name="versjon" value={versjon} />
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
          {barnLagtManuelt?.map((barn: BarnLagtManueltType) => (
            <BarnLagtManuelt key={barn.id} barn={barn} />
          ))}
        </VStack>
        {forsørgerDuBarnSomIkkeVisesHerSvar === "ja" && (
          <HStack>
            <Button
              variant="secondary"
              type="submit"
              icon={<PersonPlusIcon title="a11y-title" aria-hidden />}
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
            icon={<ArrowLeftIcon title="a11y-title" aria-hidden />}
            onClick={handleTilbakenavigering}
            loading={state === "submitting" || state === "loading"}
          >
            Forrige steg
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            iconPosition="right"
            icon={<ArrowRightIcon aria-hidden />}
            loading={state === "submitting" || state === "loading"}
          >
            Neste steg
          </Button>
        </HStack>
        {modalData && <BarnModal ref={ref} spørsmålId={forsørgerDuBarnSomIkkeVisesHer} />}
      </VStack>
    </div>
  );
}
