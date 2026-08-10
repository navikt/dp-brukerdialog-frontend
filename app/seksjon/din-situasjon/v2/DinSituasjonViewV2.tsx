import { Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useMemo } from "react";
import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { action, loader } from "~/routes/$soknadId.din-situasjon";
import { dinSituasjonSchema } from "~/seksjon/din-situasjon/v1/din-situasjon.schema";
import { useSoknad } from "~/seksjon/soknad.context";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { validerSvar } from "~/utils/validering.utils";
import { handling, lagDinSituasjonKomponenter, pdfGrunnlag } from "./din-situasjon.komponenter";
import type { DinSituasjonSvar } from "./din-situasjon.komponenter";

export function DinSituasjonViewV2() {
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const { t } = useVersjonertTranslation("din-situasjon", loaderData.seksjon.versjon);
  const actionData = useActionData<typeof action>();
  const { setKomponentIdTilFokus, økeSubmitTeller } = useSoknad();

  const dinSituasjonKomponenter = useMemo(() => lagDinSituasjonKomponenter(t), [t]);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: dinSituasjonSchema,
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  const { formId, action: formAction } = form.formOptions;
  const formValues = form.value();

  useNullstillSkjulteFelter<DinSituasjonSvar>(form, dinSituasjonKomponenter);

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: t("side.overskrift"),
      spørsmål: [...lagSeksjonPayload(dinSituasjonKomponenter, form.transient.value())],
    };

    return JSON.stringify(pdfPayload);
  }

  function mellomlagreSvar(ønsketHandling: Seksjonshandling) {
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue(handling, ønsketHandling);
    form.submit();
  }

  async function lagreSvar() {
    const klarTilLagring = await validerSvar(form, økeSubmitTeller, setKomponentIdTilFokus);

    if (klarTilLagring) {
      form.setValue(handling, Seksjonshandling.neste);
      form.setValue(pdfGrunnlag, genererPdfGrunnlag());
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
        <Form id={formId} action={formAction}>
          <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
          <VStack gap="space-24">
            {dinSituasjonKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(formValues)) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formValues={formValues}
                  formScope={form.scope(komponent.id as keyof DinSituasjonSvar)}
                />
              );
            })}

            {actionData && (
              <SeksjonTekniskFeil tittel={t("tekniskFeil.tittel")} beskrivelse={actionData.error} />
            )}
          </VStack>
        </Form>

        <SeksjonNavigasjon
          onForrigeSteg={() => mellomlagreSvar(Seksjonshandling.tilbakenavigering)}
          onNesteSteg={lagreSvar}
          lagrer={state === "submitting" || state === "loading"}
        />
      </VStack>

      <SøknadFooter onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)} />
    </div>
  );
}
