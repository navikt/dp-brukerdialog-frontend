import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.utdanning";
import {
  Dokumentasjonskrav,
  DokumentasjonskravType,
} from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { useSoknad } from "~/seksjon/soknad.context";
import {
  avsluttetUtdanningSiste6Måneder,
  handling,
  lagUtdanningKomponenter,
  pdfGrunnlag,
} from "~/seksjon/utdanning/v1/utdanning.komponenter";
import type { UtdanningSvar } from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { utdanningSchema } from "~/seksjon/utdanning/v1/utdanning.schema";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { validerSvar } from "~/utils/validering.utils";

export function UtdanningViewV1() {
  const { t } = useTranslation("utdanning");
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();

  const utdanningKomponenter = useMemo(() => lagUtdanningKomponenter(t), [t]);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: utdanningSchema,
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<UtdanningSvar>(form, utdanningKomponenter);

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: t("side.overskrift"),
      spørsmål: [...lagSeksjonPayload(utdanningKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  }

  function hentDokumentasjonskrav() {
    const dokumentasjonskrav: Dokumentasjonskrav = {
      id: crypto.randomUUID(),
      seksjonId: "utdanning",
      spørsmålId: avsluttetUtdanningSiste6Måneder,
      skjemakode: "T2",
      tittel: t("dokumentasjonskrav.utdanning.tittel"),
      type: DokumentasjonskravType.Utdanning,
    };

    return form.transient.value(avsluttetUtdanningSiste6Måneder) === "ja"
      ? JSON.stringify([dokumentasjonskrav])
      : "null";
  }

  function mellomlagreSvar(ønsketHandling: Seksjonshandling) {
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(handling, ønsketHandling);
    form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
    form.submit();
  }

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

    if (klarTilLagring) {
      form.setValue(handling, Seksjonshandling.neste);
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
      form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
      form.submit();
    }
  }

  return (
    <div className="innhold">
      <title>{t("side.tittel")}</title>
      <VStack gap="space-24">
        <Heading size="medium" level="2">
          {t("side.overskrift")}
        </Heading>
        <Form {...form.getFormProps()}>
          <VStack gap="space-24">
            <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
            {utdanningKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formValues={form.value()}
                  formScope={form.scope(komponent.id as keyof UtdanningSvar)}
                />
              );
            })}

            {actionData && (
              <SeksjonTekniskFeil tittel={t("tekniskFeil.tittel")} beskrivelse={actionData.error} />
            )}
          </VStack>
        </Form>
      </VStack>

      <SeksjonNavigasjon
        onForrigeSteg={() => mellomlagreSvar(Seksjonshandling.tilbakenavigering)}
        onNesteSteg={lagreSvar}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)} />
    </div>
  );
}
