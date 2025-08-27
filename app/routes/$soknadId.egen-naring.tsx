import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "@navikt/aksel-icons";
import { Alert, Button, ErrorMessage, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import {
  ActionFunctionArgs,
  Form,
  LoaderFunctionArgs,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
} from "react-router";
import invariant from "tiny-invariant";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import {
  driverDuEgenNæringsvirksomhet,
  driverDuEgetGårdsbruk,
  egenNæringEgenNæringsvirksomhetSpørsmål,
  egenNæringEgetGårdsbrukSpørsmål,
  EgenNæringResponse,
  EgenNæringSvar,
  Gårdsbruk,
  gårdsbruk,
  Næringsvirksomhet,
  næringsvirksomheter,
  payload,
} from "~/seksjon-regelsett/egen-næring/egen-næring.spørsmål";
import { egenNæringSchema } from "~/seksjon-regelsett/egen-næring/egen-næring.schema";
import { LeggTilNæringsvirksomhetModal } from "~/components/seksjon/egen-næring/LeggTilNæringsvirksomhetModal";
import { useEffect, useRef, useState } from "react";
import { NæringsvirksomhetDetaljer } from "~/components/seksjon/egen-næring/NæringsvirksomhetDetaljer";
import { GårdsbrukDetaljer } from "~/components/seksjon/egen-næring/GårdsbrukDetaljer";
import { LeggTilGårdsbrukModal } from "~/components/seksjon/egen-næring/LeggTilGårdsbrukModal";
import { parseLoaderData } from "~/utils/loader.utils";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "egen-næring");

  if (!response.ok) {
    return undefined;
  }

  const newVar = await response.json();
  console.info(newVar);
  console.info(parseLoaderData(newVar));
  return parseLoaderData(newVar);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "egen-næring";
  const nesteSeksjonId = "verneplikt";
  const seksjonsData = formData.get("payload") as string;

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function EgenNæring() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const leggTilNæringsvirksomhetModalRef = useRef<HTMLDialogElement>(null);
  const [registrerteNæringsvirksomheter, setRegistrerteNæringsvirksomheter] = useState<
    Næringsvirksomhet[]
  >([]);
  const [visNæringsvirksomhetFeilmelding, setVisNæringsvirksomhetFeilmelding] = useState(false);
  const leggTilGårdsbrukModalRef = useRef<HTMLDialogElement>(null);
  const [visGårdsbrukFeilmelding, setVisGårdsbrukFeilmelding] = useState(false);
  const [registrerteGårdsbruk, setRegistrerteGårdsbruk] = useState<Gårdsbruk[]>([]);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: egenNæringSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: loaderData ?? {},
  });

  useNullstillSkjulteFelter<EgenNæringSvar>(form, egenNæringEgenNæringsvirksomhetSpørsmål);

  useEffect(() => {
    setVisNæringsvirksomhetFeilmelding(
      form.value(driverDuEgenNæringsvirksomhet) !== "ja" &&
        registrerteNæringsvirksomheter.length > 0
    );
    if (form.value(driverDuEgenNæringsvirksomhet) === "nei") {
      setRegistrerteNæringsvirksomheter([]);
    }
  }, [form.value(driverDuEgenNæringsvirksomhet), registrerteNæringsvirksomheter.length]);

  useEffect(() => {
    setVisGårdsbrukFeilmelding(
      form.value(driverDuEgetGårdsbruk) !== "ja" && registrerteGårdsbruk.length > 0
    );
    if (form.value(driverDuEgetGårdsbruk) === "nei") {
      setRegistrerteGårdsbruk([]);
    }
  }, [form.value(driverDuEgetGårdsbruk), registrerteGårdsbruk.length]);

  function handleSubmit() {
    form.validate();

    const manglerRegistrertNæringsvirksomhet =
      form.value(driverDuEgenNæringsvirksomhet) === "ja" &&
      registrerteNæringsvirksomheter.length === 0;
    const manglerRegistrertGårdsbruk =
      form.value(driverDuEgetGårdsbruk) === "ja" && registrerteGårdsbruk.length === 0;

    if (manglerRegistrertNæringsvirksomhet) {
      setVisNæringsvirksomhetFeilmelding(true);
    }

    if (manglerRegistrertGårdsbruk) {
      setVisGårdsbrukFeilmelding(true);
    }

    if (visNæringsvirksomhetFeilmelding || visGårdsbrukFeilmelding) {
      return;
    }

    if (
      form.value(driverDuEgenNæringsvirksomhet) !== undefined &&
      form.value(driverDuEgetGårdsbruk) !== undefined &&
      !manglerRegistrertNæringsvirksomhet &&
      !manglerRegistrertGårdsbruk
    ) {
      const egenNæringResponse: EgenNæringResponse = {
        [driverDuEgenNæringsvirksomhet]: form.value(driverDuEgenNæringsvirksomhet),
        [næringsvirksomheter]: registrerteNæringsvirksomheter,
        [driverDuEgetGårdsbruk]: form.value(driverDuEgetGårdsbruk),
        [gårdsbruk]: registrerteGårdsbruk,
      };

      form.setValue(payload, JSON.stringify(egenNæringResponse));
      form.submit();
    }
  }

  return (
    <Page className="brukerdialog">
      <h2>Egen næring</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {egenNæringEgenNæringsvirksomhetSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }
                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof EgenNæringSvar)}
                  />
                );
              })}
              {form.value(driverDuEgenNæringsvirksomhet) === "ja" && (
                <>
                  {visNæringsvirksomhetFeilmelding && (
                    <ErrorMessage showIcon>Du må legge til en næringsvirksomhet</ErrorMessage>
                  )}
                  <VStack gap="space-16">
                    {registrerteNæringsvirksomheter?.map(
                      (næringsvirksomhet: Næringsvirksomhet, index: number) => (
                        <NæringsvirksomhetDetaljer
                          key={index}
                          index={index}
                          næringsvirksomhet={næringsvirksomhet}
                          registrerteNæringsvirksomheter={registrerteNæringsvirksomheter}
                          setRegistrerteNæringsvirksomheter={setRegistrerteNæringsvirksomheter}
                        />
                      )
                    )}
                  </VStack>
                  <HStack>
                    <Button
                      type={"button"}
                      variant={"secondary"}
                      onClick={() => {
                        leggTilNæringsvirksomhetModalRef.current?.showModal();
                      }}
                      icon={<PlusIcon />}
                      iconPosition={"left"}
                    >
                      Legg til næringsvirksomhet
                    </Button>
                  </HStack>
                </>
              )}

              {egenNæringEgetGårdsbrukSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }
                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof EgenNæringSvar)}
                  />
                );
              })}
              {form.value(driverDuEgetGårdsbruk) === "ja" && (
                <>
                  {visGårdsbrukFeilmelding && (
                    <ErrorMessage showIcon>Du må legge til et gårdsbruk</ErrorMessage>
                  )}
                  <VStack gap="space-16">
                    {registrerteGårdsbruk?.map((gårdsbruk: Gårdsbruk, index: number) => (
                      <GårdsbrukDetaljer
                        key={index}
                        index={index}
                        gårdsbruk={gårdsbruk}
                        registrerteGårdsbruk={registrerteGårdsbruk}
                        setRegistrerteGårdsbruk={setRegistrerteGårdsbruk}
                      />
                    ))}
                  </VStack>
                  <HStack>
                    <Button
                      type={"button"}
                      variant={"secondary"}
                      onClick={() => {
                        leggTilGårdsbrukModalRef.current?.showModal();
                      }}
                      icon={<PlusIcon />}
                      iconPosition={"left"}
                    >
                      Legg til gårdsbruk
                    </Button>
                  </HStack>
                </>
              )}

              {actionData && (
                <Alert variant="error" className="mt-4">
                  {actionData.error}
                </Alert>
              )}
            </VStack>

            <HStack gap="4" className="mt-8">
              <Button
                variant="secondary"
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={() => navigate(-1)}
              >
                Forrige steg
              </Button>
              <Button
                type={"button"}
                variant="primary"
                onClick={handleSubmit}
                iconPosition="right"
                icon={<ArrowRightIcon />}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
      <LeggTilNæringsvirksomhetModal
        modalRef={leggTilNæringsvirksomhetModalRef}
        registrerteNæringsvirksomheter={registrerteNæringsvirksomheter}
        setRegistrerteNæringsvirksomheter={setRegistrerteNæringsvirksomheter}
      />
      <LeggTilGårdsbrukModal
        modalRef={leggTilGårdsbrukModalRef}
        gårdsbruk={registrerteGårdsbruk}
        setGårdsbruk={setRegistrerteGårdsbruk}
      />
    </Page>
  );
}
