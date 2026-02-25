import { ArrowLeftIcon, ExclamationmarkTriangleIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Button,
  ErrorMessage,
  Heading,
  HStack,
  InfoCard,
  VStack,
} from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router";
import { z } from "zod";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { stegISøknaden } from "~/routes/$soknadId";
import { action, loader } from "~/routes/$soknadId.oppsummering";
import { DokumentasjonOppsummering } from "~/seksjon/dokumentasjon/DokumentasjonOppsummering";
import { Oppsummering } from "~/seksjon/oppsummering/Oppsummering";

const schema = z.object({});

export function OppsummeringView() {
  const seksjonnavn = "Se over før du sender inn";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const { søknadId } = useTypedRouteLoaderData("routes/$soknadId");
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: schema,
    defaultValues: {},
  });

  if (!loaderData) {
    return null;
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="20">
        <VStack gap="6">
          <Heading size="medium" level="2">
            {seksjonnavn}
          </Heading>
          <InfoCard data-color="warning">
            <InfoCard.Header icon={<ExclamationmarkTriangleIcon aria-hidden />}>
              <InfoCard.Title>Søknaden din er ikke sendt enda</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
              <BodyLong>Husk å trykke på "Send søknad" nederst på siden før du avslutter.</BodyLong>
            </InfoCard.Content>
          </InfoCard>
          <BodyLong>
            Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre
            opplysningene.
          </BodyLong>
          <BodyLong>
            Når du har sendt inn søknaden kommer du til en kvitteringsside med informasjon om veien
            videre. Der kan du også ettersende dokumentasjon som mangler.
          </BodyLong>
          <Heading size="medium" level="2">
            Dine svar
          </Heading>

          {stegISøknaden.map((seksjon) => {
            const seksjonsData = loaderData.seksjoner.find((s) => s.seksjonId === seksjon.path);
            if (!seksjonsData) return null;

            return (
              <Oppsummering
                key={seksjon.path}
                seksjonsId={seksjon.path}
                seksjonsUrl={`/${søknadId}/${seksjon.path}`}
                seksjonsData={seksjonsData.data}
              />
            );
          })}

          <DokumentasjonOppsummering dokumentasjonskrav={loaderData.dokumentasjonskrav} />

          {actionData?.error && (
            <ErrorMessage showIcon aria-live="polite">
              {actionData.error}
            </ErrorMessage>
          )}

          <Form {...form.getFormProps()}>
            <HStack gap="4" className="mt-8">
              <Button
                loading={state === "submitting" || state === "loading"}
                variant="secondary"
                icon={<ArrowLeftIcon aria-hidden />}
                onClick={() => navigate(-1)}
              >
                Forrige steg
              </Button>
              <Button loading={state === "submitting" || state === "loading"}>Send søknad</Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
    </div>
  );
}
