import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, Checkbox, Heading, LocalAlert, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { z } from "zod";
import { Komponent } from "~/components/Komponent";
import type { KomponentType } from "~/components/Komponent.types";
import { SøknadIkon } from "~/components/SøknadIkon";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { loader } from "~/routes/opprett-soknad";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import {
  lagArbeidssøkerFeilmelding,
  lagArbeidssøkerKomponenter,
} from "../arbeidssøker/arbeidssøker.komponenter";
import {
  bekreftVilkår,
  lagBekreftVilkårKomponenter,
  lagLesmerKomponenter,
  lagOpprettSøknadKomponenter,
  lagPersonaliaKomponenter,
  lagRiktigeOpplysningerKomponenter,
  pdfGrunnlag,
} from "./opprett-søknad.komponenter";

export function OpprettSøknadView() {
  const { t } = useTranslation("opprett-søknad");
  const { t: arbeidssøkerT } = useTranslation("arbeidssøker");
  const { personalia } = useLoaderData<typeof loader>();
  const { arbeidssøkerStatus } = useTypedRouteLoaderData("root");
  const { state } = useNavigation();
  const actionData = useActionData();

  const personaliaKomponenter = lagPersonaliaKomponenter(t, personalia?.person);
  const opprettSøknadKomponenter = lagOpprettSøknadKomponenter(t);
  const lesMerKomponenter = lagLesmerKomponenter(t);
  const riktigOpplysningerKomponenter = lagRiktigeOpplysningerKomponenter(t);
  const bekreftVilkårKomponenter = lagBekreftVilkårKomponenter(t);
  const arbeidssøkerKomponenter = lagArbeidssøkerKomponenter(arbeidssøkerT);
  const arbeidssøkerFeilmeldingKomponenter = lagArbeidssøkerFeilmelding(arbeidssøkerT);

  const form = useForm({
    method: "POST",
    submitSource: "state",
    schema: z.object({
      [bekreftVilkår]: z.boolean().refine((val) => val, {
        message: t("vilkår.validering"),
      }),
      [pdfGrunnlag]: z.string().optional(),
    }),
    defaultValues: {
      [bekreftVilkår]: false,
    },
  });

  function genererArbeidssøkerPdfGrunnlag(): KomponentType[] {
    if (arbeidssøkerStatus === "REGISTRERT") {
      return [];
    }

    const arbeidssøkerPdfGrunnlag = lagSeksjonPayload(arbeidssøkerKomponenter, null);

    if (arbeidssøkerStatus === "FEIL") {
      const feilmelding = lagSeksjonPayload(arbeidssøkerFeilmeldingKomponenter, null);
      return [...feilmelding, ...arbeidssøkerPdfGrunnlag];
    }

    return arbeidssøkerPdfGrunnlag;
  }

  function genererPdfGrunnlag() {
    const arbeidssøkerPdfGrunnlag = genererArbeidssøkerPdfGrunnlag();

    const infosideKomponenter = [
      ...(personalia?.person ? personaliaKomponenter : []),
      ...opprettSøknadKomponenter,
      ...lesMerKomponenter,
      ...riktigOpplysningerKomponenter,
    ];

    const infoSidePdfGrunnlag = lagSeksjonPayload(infosideKomponenter, null);

    const bekreftVilkårPdfGrunnlag = lagSeksjonPayload(bekreftVilkårKomponenter, {
      [bekreftVilkår]: form.transient.value().bekreftVilkår ? "ja" : "nei",
    });

    return JSON.stringify({
      navn: t("side.overskrift"),
      spørsmål: [...arbeidssøkerPdfGrunnlag, ...infoSidePdfGrunnlag, ...bekreftVilkårPdfGrunnlag],
    });
  }

  function opprettSøknad() {
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.submit();
  }

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>{t("side.tittel")}</title>

      <div className="søknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          {t("side.overskrift")}
        </Heading>
      </div>

      <div className="innhold">
        <VStack className="mt-32">
          {personaliaKomponenter.map((komponent) => {
            return <Komponent key={komponent.id} props={komponent} />;
          })}
        </VStack>

        <VStack className="mt-32">
          {opprettSøknadKomponenter.map((komponent) => {
            return <Komponent key={komponent.id} props={komponent} />;
          })}
        </VStack>

        <VStack className="mt-32" gap="space-12">
          {lesMerKomponenter.map((komponent) => {
            return <Komponent key={komponent.id} props={komponent} />;
          })}
        </VStack>

        <VStack className="mt-32">
          {riktigOpplysningerKomponenter.map((komponent) => {
            return <Komponent key={komponent.id} props={komponent} />;
          })}
        </VStack>

        <VStack gap="space-32" className="mt-32">
          <Form {...form.getFormProps()}>
            <Checkbox name={bekreftVilkår} error={!!form.error(bekreftVilkår)}>
              {t("vilkår.bekreftelse")}
            </Checkbox>
            {actionData?.error && (
              <LocalAlert status="error" className="mt-16">
                <LocalAlert.Header>
                  <LocalAlert.Title>{t("tekniskFeil.melding")}</LocalAlert.Title>
                </LocalAlert.Header>

                <LocalAlert.Content>{actionData.error}</LocalAlert.Content>
              </LocalAlert>
            )}

            <Button
              type="button"
              iconPosition="right"
              className="mt-32"
              icon={<ArrowRightIcon aria-hidden />}
              onClick={opprettSøknad}
              loading={state === "submitting" || state === "loading"}
            >
              {t("knapper.startSøknad")}
            </Button>
          </Form>
        </VStack>
      </div>
    </main>
  );
}
