import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  Box,
  Button,
  Checkbox,
  Heading,
  Link,
  List,
  LocalAlert,
  ReadMore,
  VStack,
} from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useTranslation } from "react-i18next";
import { Form, useActionData, useNavigation } from "react-router";
import { z } from "zod";
import { SøknadIkon } from "~/components/SøknadIkon";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import {
  bekreftVilkår,
  lagOpprettSoknadKomponenter,
  pdfGrunnlag,
} from "./opprett-soknad.komponenter";

export function OpprettSøknadView() {
  const { t } = useTranslation("opprett-soknad");
  const { state } = useNavigation();
  const actionData = useActionData() as { error?: string } | undefined;

  const opprettSoknadKomponenter = lagOpprettSoknadKomponenter(t);

  const form = useForm({
    method: "POST",
    submitSource: "state",
    schema: z.object({
      [bekreftVilkår]: z.boolean().refine((val) => val, {
        message: t("vilkar.validering"),
      }),
      [pdfGrunnlag]: z.string().optional(),
    }),
    defaultValues: {
      [bekreftVilkår]: false,
    },
  });

  function genererPdfGrunnlag() {
    return JSON.stringify({
      navn: t("side.overskrift"),
      spørsmål: lagSeksjonPayload(opprettSoknadKomponenter, {
        [bekreftVilkår]: form.transient.value().bekreftVilkår ? "ja" : "nei",
      }),
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
        <VStack gap="space-32">
          <BodyLong>
            {t("intro.tekst")} <Link href="https://www.nav.no/dagpenger">{t("intro.lenke")}</Link>
          </BodyLong>

          <section>
            <Heading size="medium" level="2" spacing>
              {t("krav.overskrift")}
            </Heading>

            <List as="ol">
              <List.Item>
                <strong>{t("krav.registrertArbeidssoker.tittel")}</strong>

                <BodyLong>{t("krav.registrertArbeidssoker.avsnitt1")}</BodyLong>
                <BodyLong>{t("krav.registrertArbeidssoker.avsnitt2")}</BodyLong>
              </List.Item>

              <List.Item>
                <strong>{t("krav.endretSituasjon.tittel")}</strong>
                <BodyLong>{t("krav.endretSituasjon.tekst")}</BodyLong>
              </List.Item>

              <List.Item>
                <strong>{t("krav.reellJobbsoker.tittel")}</strong>
                <BodyLong>{t("krav.reellJobbsoker.tekst")}</BodyLong>
              </List.Item>
            </List>
          </section>

          <section>
            <Heading size="medium" level="2" spacing>
              {t("slikSokerDu.overskrift")}
            </Heading>

            <VStack gap="space-16">
              <BodyLong>{t("slikSokerDu.avsnitt1")}</BodyLong>
              <BodyLong>{t("slikSokerDu.avsnitt2")}</BodyLong>
              <BodyLong>{t("slikSokerDu.avsnitt3")}</BodyLong>
            </VStack>
          </section>

          <section>
            <Heading size="medium" level="2" spacing>
              {t("informasjonOmDeg.overskrift")}
            </Heading>

            <BodyLong spacing>{t("informasjonOmDeg.intro")}</BodyLong>

            <ReadMore header={t("informasjonOmDeg.lesMer.tittel")} variant="ghost">
              <VStack gap="space-16">
                <BodyLong>{t("informasjonOmDeg.lesMer.intro")}</BodyLong>

                <div>
                  <BodyLong>{t("informasjonOmDeg.lesMer.henterOverskrift")}</BodyLong>

                  <List>
                    <List.Item>{t("informasjonOmDeg.lesMer.henter.personinformasjon")}</List.Item>
                    <List.Item>{t("informasjonOmDeg.lesMer.henter.inntekt")}</List.Item>
                    <List.Item>{t("informasjonOmDeg.lesMer.henter.arbeidsforhold")}</List.Item>
                    <List.Item>{t("informasjonOmDeg.lesMer.henter.egenNaring")}</List.Item>
                  </List>
                </div>

                <BodyLong>{t("informasjonOmDeg.lesMer.andreOpplysninger")}</BodyLong>

                <div>
                  <BodyLong>{t("informasjonOmDeg.lesMer.delerOverskrift")}</BodyLong>

                  <List>
                    <List.Item>{t("informasjonOmDeg.lesMer.deler.dagpenger")}</List.Item>
                    <List.Item>{t("informasjonOmDeg.lesMer.deler.lanekassen")}</List.Item>
                    <List.Item>{t("informasjonOmDeg.lesMer.deler.pensjonskasser")}</List.Item>
                  </List>
                </div>

                <BodyLong>{t("informasjonOmDeg.lesMer.annenBruk")}</BodyLong>

                <BodyLong>
                  <Link href="https://www.nav.no/personvernerklaering">
                    {t("informasjonOmDeg.lesMer.personvernLenke")}
                  </Link>
                </BodyLong>
              </VStack>
            </ReadMore>
          </section>

          <section>
            <Heading size="medium" level="2" spacing>
              {t("automatiskBehandling.overskrift")}
            </Heading>

            <BodyLong spacing>
              {t("automatiskBehandling.tekst")}{" "}
              <Link href="https://www.nav.no/personvernerklaering#dine-rettigheter">
                {t("automatiskBehandling.rettigheterLenke")}
              </Link>
            </BodyLong>

            <BodyLong>{t("automatiskBehandling.inntekt")}</BodyLong>
          </section>

          <section>
            <Heading size="medium" level="2" spacing>
              {t("riktigeOpplysninger.overskrift")}
            </Heading>

            <BodyLong>
              {t("riktigeOpplysninger.tekst")}{" "}
              <Link href="https://www.nav.no/endringer">{t("riktigeOpplysninger.lenke")}</Link>
            </BodyLong>
          </section>
        </VStack>

        <VStack gap="space-32" className="mt-56">
          <Form {...form.getFormProps()}>
            <Box
              padding="space-16"
              background={form.value(bekreftVilkår) ? "success-moderate" : "sunken"}
              borderRadius="8"
            >
              <Checkbox name={bekreftVilkår} error={!!form.error(bekreftVilkår)}>
                {t("vilkar.bekreftelse")}
              </Checkbox>
            </Box>

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
              {t("knapper.startSoknad")}
            </Button>
          </Form>
        </VStack>
      </div>
    </main>
  );
}
