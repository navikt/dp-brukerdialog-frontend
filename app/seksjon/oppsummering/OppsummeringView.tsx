import { useTranslation } from "react-i18next";
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
import { Form, useActionData, useLoaderData, useNavigate, useNavigation } from "react-router";
import { z } from "zod";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { stegISøknaden } from "~/routes/$soknadId";
import { action, loader } from "~/routes/$soknadId.oppsummering";
import { DokumentasjonOppsummering } from "~/seksjon/dokumentasjon/v1/DokumentasjonOppsummering";
import { Oppsummering } from "~/seksjon/oppsummering/Oppsummering";
import { getEnv } from "~/utils/env.utils";

const schema = z.object({});

export function OppsummeringView() {
  const { t } = useTranslation("oppsummering");
  const { søknadId } = useTypedRouteLoaderData("routes/$soknadId");
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema,
    defaultValues: {},
  });

  if (!loaderData) {
    return null;
  }

  const seksjoner = loaderData.seksjoner ?? [];

  return (
    <div className="innhold">
      <title>{t("side.tittel")}</title>
      <VStack gap="space-80">
        <VStack gap="space-24">
          <Heading size="medium" level="2">
            {t("side.overskrift")}
          </Heading>

          <InfoCard data-color="warning">
            <InfoCard.Header icon={<ExclamationmarkTriangleIcon aria-hidden />}>
              <InfoCard.Title>{t("ikkeSendt.tittel")}</InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
              <BodyLong>{t("ikkeSendt.beskrivelse")}</BodyLong>
            </InfoCard.Content>
          </InfoCard>

          <BodyLong>{t("intro.seOverSvar")}</BodyLong>

          <BodyLong>{t("intro.kvittering")}</BodyLong>

          <Heading size="medium" level="2">
            {t("dineSvar.overskrift")}
          </Heading>

          {stegISøknaden.map((seksjon) => {
            const seksjonsData = seksjoner.find((s) => s.seksjonId === seksjon.path);
            if (!seksjonsData) return null;

            const seksjonUrl = `${getEnv("BASE_PATH")}/${søknadId}/${seksjon.path}`;

            return (
              <Oppsummering
                key={seksjon.path}
                seksjonsId={seksjon.path}
                seksjonsUrl={seksjonUrl}
                seksjonsData={seksjonsData.data}
              />
            );
          })}

          {loaderData.dokumentasjonskrav && loaderData.dokumentasjonskrav.length > 0 && (
            <DokumentasjonOppsummering dokumentasjonskrav={loaderData.dokumentasjonskrav} />
          )}

          {actionData?.error && (
            <ErrorMessage showIcon aria-live="polite">
              {actionData.error}
            </ErrorMessage>
          )}

          <Form {...form.getFormProps()}>
            <HStack gap="space-16" className="mt-32">
              <Button
                type="button"
                disabled={state === "submitting" || state === "loading"}
                variant="secondary"
                icon={<ArrowLeftIcon aria-hidden />}
                onClick={() => navigate(-1)}
              >
                {t("knapper.forrigeSteg")}
              </Button>
              <Button type="submit" disabled={state === "submitting" || state === "loading"}>
                {t("knapper.sendSoknad")}
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
    </div>
  );
}
