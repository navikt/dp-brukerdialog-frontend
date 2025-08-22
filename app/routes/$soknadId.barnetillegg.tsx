import { ArrowLeftIcon, ArrowRightIcon, PersonPlusIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useRef, useState } from "react";
import {
  ActionFunctionArgs,
  data,
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
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { barnetilleggSchema } from "~/seksjon-regelsett/barnetillegg/barnetillegg.schema";
import {
  Barn,
  barnetilleggSpørsmål,
  BarnetilleggSvar,
  forsørgerDuBarnetSomIkkeVisesHer,
} from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "barnetillegg");

  if (response.status !== 200) {
    return data(undefined);
  }

  const loaderData: BarnetilleggResponse = await response.json();

  return data(loaderData);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "barnetillegg";
  const nesteSeksjonId = "personalia";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([_, value]) => value !== undefined && value !== "undefined"
  );
  const seksjonsData = JSON.stringify(Object.fromEntries(filtrertEntries));
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function Barntillegg() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const leggTilBarnModalRef = useRef<HTMLDialogElement>(null);

  const [barnFraPdlList, setBarnFraPdlList] = useState(loaderData?.barnFraPdl || []);
  const [barnLagtManueltList, setBarnLagtManueltList] = useState(loaderData?.barnLagtManuelt || []);
  const [validerBarnFraPdl, setValiderBarnFraPdl] = useState(false);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: barnetilleggSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {
      forsørgerDuBarnetSomIkkeVisesHer: loaderData?.forsørgerDuBarnetSomIkkeVisesHer,
    },
  });

  useNullstillSkjulteFelter<BarnetilleggSvar>(form, barnetilleggSpørsmål);

  function handleSubmit() {
    form.validate();

    const harUbesvartBarnFraPdl = barnFraPdlList.some((barn) => !barn.forsørgerDuBarnet);
    setValiderBarnFraPdl(harUbesvartBarnFraPdl);

    const ubesvartForsørgerDuBarnetSomIkkeVisesHer =
      form.value(forsørgerDuBarnetSomIkkeVisesHer) === undefined;

    if (!harUbesvartBarnFraPdl && !ubesvartForsørgerDuBarnetSomIkkeVisesHer) {
      console.log("lagrer data");
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
            {barnFraPdlList.map((barn, index) => (
              <BarnFraPdl
                key={index}
                barn={barn}
                barnIndex={index}
                validerBarnFraPdl={validerBarnFraPdl}
                barnFraPdlList={barnFraPdlList}
                setBarnFraPdlList={setBarnFraPdlList}
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
            {barnLagtManueltList?.map((barn, index) => (
              <BarnLagtManuelt
                key={index}
                index={index}
                barn={barn}
                barnLagtManueltList={barnLagtManueltList}
                setBarnLagtManueltList={setBarnLagtManueltList}
              />
            ))}
          </VStack>

          {form.value(forsørgerDuBarnetSomIkkeVisesHer) === "ja" && (
            <HStack>
              <Button
                variant="secondary"
                type="submit"
                icon={<PersonPlusIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={() => {
                  leggTilBarnModalRef.current?.showModal();
                }}
              >
                Legg til barn
              </Button>
            </HStack>
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
            leggTilBarnModalRef={leggTilBarnModalRef}
            barnLagtManueltList={barnLagtManueltList}
            setBarnLagtManueltList={setBarnLagtManueltList}
          />
        </VStack>
      </Page>
    </main>
  );
}
