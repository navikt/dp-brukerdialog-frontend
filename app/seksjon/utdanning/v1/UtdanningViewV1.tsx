import { Heading, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import invariant from "tiny-invariant";
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
  pdfGrunnlag,
  utdanningKomponenter,
  UtdanningSvar,
} from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { utdanningSchema } from "~/seksjon/utdanning/v1/utdanning.schema";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { validerOgSettFørstUgyldigSpørsmålIdTilFokus } from "~/utils/validering.utils";

export function UtdanningViewV1() {
  const seksjonnavn = "Utdanning";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { state } = useNavigation();
  const { soknadId } = useParams();
  const { setSpørsmålIdTilFokus, økeSubmitTeller } = useSoknad();

  invariant(soknadId, "SøknadID er påkrevd");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: utdanningSchema,
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  useNullstillSkjulteFelter<UtdanningSvar>(form, utdanningKomponenter);

  function genererPdfGrunnlag() {
    const pdfPayload = {
      navn: seksjonnavn,
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
      tittel: "Dokumentasjon av sluttdato for utdanning",
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

  function lagreSvar() {
    validerOgSettFørstUgyldigSpørsmålIdTilFokus(form, økeSubmitTeller, setSpørsmålIdTilFokus);

    form.setValue(handling, Seksjonshandling.neste);
    form.setValue(pdfGrunnlag, genererPdfGrunnlag());
    form.setValue("dokumentasjonskrav", hentDokumentasjonskrav());
    form.submit();
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="6">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>
        <Form {...form.getFormProps()}>
          <VStack gap="6">
            <input type="hidden" name="versjon" value={loaderData.seksjon.versjon} />
            {utdanningKomponenter.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }
              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formScope={form.scope(komponent.id as keyof UtdanningSvar)}
                />
              );
            })}

            {actionData && (
              <SeksjonTekniskFeil
                tittel="Det har oppstått en teknisk feil"
                beskrivelse={actionData.error}
              />
            )}
          </VStack>
        </Form>
      </VStack>

      <SeksjonNavigasjon
        onForrigeSteg={() => mellomlagreSvar(Seksjonshandling.tilbakenavigering)}
        onNesteSteg={lagreSvar}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter
        søknadId={soknadId}
        onFortsettSenere={() => mellomlagreSvar(Seksjonshandling.fortsettSenere)}
      />
    </div>
  );
}
