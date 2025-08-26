import { ArrowLeftIcon, ArrowRightIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Alert, BodyShort, Button, ErrorMessage, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef, useState } from "react";
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
import { BarnetilleggInnhold } from "~/components/seksjon/barnetillegg/BarnetilleggInnhold";
import { BarnFraPdl } from "~/components/seksjon/barnetillegg/BarnFraPdl";
import { BarnLagtManuelt } from "~/components/seksjon/barnetillegg/BarnLagtManuelt";
import { LeggTilBarnModal } from "~/components/seksjon/barnetillegg/LeggTilBarnModal";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { hentBarn } from "~/models/hent-barn.server";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { barnetilleggSchema } from "~/seksjon-regelsett/barnetillegg/barnetillegg.schema";
import {
  Barn,
  barnetilleggSpørsmål,
  BarnetilleggSvar,
  forsørgerDuBarnetSomIkkeVisesHer,
  payload,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";
import { parseLoaderData } from "~/utils/loader.utils";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const seksjonResponse = await hentSeksjon(request, params.soknadId, "barnetillegg");

  if (!seksjonResponse.ok) {
    const barnFraPdlResponse = await hentBarn(request);

    if (!barnFraPdlResponse.ok) {
      return undefined;
    }

    const loaderData: BarnetilleggResponse = {
      forsørgerDuBarnetSomIkkeVisesHer: undefined,
      barnLagtManuelt: [],
      barnFraPdl: await barnFraPdlResponse.json(),
    };

    return loaderData;
  }

  const loaderData: BarnetilleggResponse = await seksjonResponse.json();
  return parseLoaderData(loaderData);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "barnetillegg";
  const nesteSeksjonId = "personalia";
  const seksjonsData = formData.get("payload") as string;

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function Barntillegg() {
  const navigate = useNavigate();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const modalRef = useRef<HTMLDialogElement>(null);

  const [barnFraPdl, setbarnFraPdl] = useState(loaderData?.barnFraPdl || []);
  const [barnLagtManuelt, setbarnLagtManuelt] = useState(loaderData?.barnLagtManuelt || []);
  const [validerBarnFraPdl, setValiderBarnFraPdl] = useState(false);

  const [harEnFeil, setHarEnFeil] = useState(false);
  const [harEnVarsel, setHarEnVarsel] = useState(false);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barnetilleggSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: loaderData ?? {},
  });

  useNullstillSkjulteFelter<BarnetilleggSvar>(form, barnetilleggSpørsmål);

  const forsørgerDuBarnetSomIkkeVisesHerSvar = form.value(forsørgerDuBarnetSomIkkeVisesHer);

  useEffect(() => {
    if (forsørgerDuBarnetSomIkkeVisesHerSvar === undefined) {
      return;
    }

    // Kan jeg droppe å bruke useEffekt her?
    setHarEnVarsel(forsørgerDuBarnetSomIkkeVisesHerSvar === "nei" && barnLagtManuelt.length > 0);
    setHarEnFeil(forsørgerDuBarnetSomIkkeVisesHerSvar === "ja" && barnLagtManuelt.length === 0);
  }, [forsørgerDuBarnetSomIkkeVisesHerSvar, barnLagtManuelt.length]);

  function handleSubmit() {
    form.validate();

    if (harEnFeil || harEnVarsel) {
      return;
    }

    const harUbesvartBarnFraPdl = barnFraPdl.some((barn: Barn) => !barn.forsørgerDuBarnet);
    setValiderBarnFraPdl(harUbesvartBarnFraPdl);

    if (!harUbesvartBarnFraPdl && forsørgerDuBarnetSomIkkeVisesHerSvar !== undefined) {
      const data: BarnetilleggResponse = {
        barnFraPdl: barnFraPdl,
        barnLagtManuelt: barnLagtManuelt,
        forsørgerDuBarnetSomIkkeVisesHer: forsørgerDuBarnetSomIkkeVisesHerSvar,
      };

      form.setValue(payload, JSON.stringify(data));
      form.submit();
    }
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <Page className="brukerdialog">
        <h2>Barnetillegg</h2>
        <BarnetilleggInnhold />
        <VStack gap="10">
          <VStack gap="space-16">
            {barnFraPdl.map((barn: Barn, index: number) => (
              <BarnFraPdl
                key={index}
                barn={barn}
                barnIndex={index}
                validerBarnFraPdl={validerBarnFraPdl}
                barnFraPdl={barnFraPdl}
                setbarnFraPdl={setbarnFraPdl}
              />
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
            {barnLagtManuelt?.map((barn: Barn, index: number) => (
              <BarnLagtManuelt
                key={index}
                index={index}
                barn={barn}
                barnLagtManuelt={barnLagtManuelt}
                setbarnLagtManuelt={setbarnLagtManuelt}
              />
            ))}
          </VStack>

          {forsørgerDuBarnetSomIkkeVisesHerSvar === "ja" && (
            <HStack>
              <Button
                variant="secondary"
                type="submit"
                icon={<PersonPlusIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={() => {
                  modalRef.current?.showModal();
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

          {harEnVarsel && (
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
              icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
              onClick={() => navigate(-1)}
            >
              Forrige steg
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              iconPosition="right"
              icon={<ArrowRightIcon />}
            >
              Neste steg
            </Button>
          </HStack>
          <LeggTilBarnModal
            modalRef={modalRef}
            barnLagtManuelt={barnLagtManuelt}
            setbarnLagtManuelt={setbarnLagtManuelt}
          />
        </VStack>
      </Page>
    </main>
  );
}
