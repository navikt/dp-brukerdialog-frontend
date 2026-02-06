import { BodyLong, BodyShort, Heading, Label, LocalAlert, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import invariant from "tiny-invariant";
import { EksterneLenke } from "~/components/EksterneLenke";
import { Komponent } from "~/components/Komponent";
import { SeksjonNavigasjon } from "~/components/SeksjonNavigasjon";
import { SeksjonTekniskFeil } from "~/components/SeksjonTekniskFeil";
import { SøknadFooter } from "~/components/SøknadFooter";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.personalia";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  etternavnFraPdl,
  fornavnFraPdl,
  fødselsnummerFraPdl,
  handling,
  kontonummerFraKontoregister,
  landFraPdl,
  landkodeFraPdl,
  mellomnavnFraPdl,
  pdfGrunnlag,
  personaliaBostedslandSpørsmål,
  personaliaSpørsmål,
  PersonaliaSvar,
  postnummerFraPdl,
  poststedFraPdl,
} from "~/seksjon/personalia/v1/personalia.komponenter";
import { personaliaSchema } from "~/seksjon/personalia/v1/personalia.schema";
import { Seksjonshandling } from "~/utils/Seksjonshandling";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";

export function PersonaliaViewV1() {
  const seksjonnavn = "Personalia";
  const seksjonHeadTitle = `Søknad om dagpenger: ${seksjonnavn}`;
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();

  const { soknadId } = useParams();
  invariant(soknadId, "SøknadID er påkrevd");

  const { seksjon, personalia } = loaderData;
  const actionData = useActionData<typeof action>();

  if (!personalia) {
    return (
      <div className="innhold">
        <title>{seksjonHeadTitle}</title>
        <VStack gap="6">
          <Heading size="medium" level="2">
            {seksjonnavn}
          </Heading>
          <LocalAlert status="error">
            <LocalAlert.Header>
              <LocalAlert.Title>Det har oppstått en teknisk feil</LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>
              Vi klarte ikke å hente dine personalia opplysninger. Prøv igjen senere.
            </LocalAlert.Content>
          </LocalAlert>
        </VStack>
        <SøknadFooter søknadId={soknadId} onFortsettSenere={fortsettSenere} />
      </div>
    );
  }

  const { fornavn, mellomnavn, etternavn, ident, alder, folkeregistrertAdresse } =
    personalia.person;

  const formattertIdent = ident.replace(/(.{6})(.{5})/, `$1 $2`);
  const formattertKontonummer = personalia.kontonummer?.replace(/(.{4})(.{2})(.{5})/, "$1 $2 $3");

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: personaliaSchema,
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon.seksjonsvar, versjon: loaderData.seksjon.versjon },
  });

  form.setValue(fornavnFraPdl, fornavn || "");
  form.setValue(mellomnavnFraPdl, mellomnavn || "");
  form.setValue(etternavnFraPdl, etternavn || "");
  form.setValue(fødselsnummerFraPdl, ident || "");

  if (folkeregistrertAdresse) {
    form.setValue(adresselinje1FraPdl, folkeregistrertAdresse.adresselinje1 || "");
    form.setValue(adresselinje2FraPdl, folkeregistrertAdresse.adresselinje2 || "");
    form.setValue(adresselinje3FraPdl, folkeregistrertAdresse.adresselinje3 || "");
    form.setValue(postnummerFraPdl, folkeregistrertAdresse.postnummer || "");
    form.setValue(poststedFraPdl, folkeregistrertAdresse.poststed || "");
    form.setValue(landkodeFraPdl, folkeregistrertAdresse.landkode || "");
    form.setValue(landFraPdl, folkeregistrertAdresse.land || "");
  }

  form.setValue(alderFraPdl, alder?.toString() || "");
  form.setValue(kontonummerFraKontoregister, personalia.kontonummer || "");

  useNullstillSkjulteFelter<PersonaliaSvar>(form, personaliaBostedslandSpørsmål);

  async function lagreSvar() {
    form.setValue(handling, Seksjonshandling.neste);
    if (Object.values(await form.validate()).length === 0) {
      const pdfPayload = {
        navn: seksjonnavn,
        spørsmål: [
          ...lagSeksjonPayload(personaliaSpørsmål, form.transient.value()),
          ...lagSeksjonPayload(personaliaBostedslandSpørsmål, form.transient.value()),
        ],
      };

      form.setValue(pdfGrunnlag, JSON.stringify(pdfPayload));
      form.submit();
    }
  }

  function fortsettSenere() {
    const pdfPayload = {
      navn: seksjonnavn,
      spørsmål: [
        ...lagSeksjonPayload(personaliaSpørsmål, form.transient.value()),
        ...lagSeksjonPayload(personaliaBostedslandSpørsmål, form.transient.value()),
      ],
    };

    form.setValue(pdfGrunnlag, JSON.stringify(pdfPayload));
    form.setValue(handling, Seksjonshandling.fortsettSenere);
    form.submit();
  }

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="6">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>
        <BodyLong>
          Hvis opplysningene vi har om deg ikke stemmer, må du endre disse hos Folkeregisteret.
          Kontonummer kan du legge til eller endre på{" "}
          <EksterneLenke href="https://www.nav.no/minside" tekst=" Min side" />
        </BodyLong>

        <VStack gap="6">
          <VStack>
            <Label as="p">Navn</Label>
            <BodyShort>
              {fornavn} {mellomnavn} {etternavn}
            </BodyShort>
          </VStack>
          <VStack>
            <Label as="p">Fødselsnummer</Label>
            <BodyShort>{formattertIdent}</BodyShort>
          </VStack>
          <VStack>
            <Label as="p">Alder</Label>
            <BodyShort>{alder}</BodyShort>
          </VStack>
          {folkeregistrertAdresse && (
            <VStack>
              <Label as="p">Folkeregistrert adresse</Label>
              <BodyShort>
                {folkeregistrertAdresse.adresselinje1}{" "}
                {folkeregistrertAdresse.adresselinje1 && <br />}
                {folkeregistrertAdresse.adresselinje2}{" "}
                {folkeregistrertAdresse.adresselinje2 && <br />}
                {folkeregistrertAdresse.adresselinje3}{" "}
                {folkeregistrertAdresse.adresselinje3 && <br />}
                {folkeregistrertAdresse.postnummer} {folkeregistrertAdresse.poststed}{" "}
                {folkeregistrertAdresse.land && <br />}
                {folkeregistrertAdresse.land}
              </BodyShort>
            </VStack>
          )}
          <VStack>
            <Label as="p">Kontonummer</Label>
            <BodyShort>
              {formattertKontonummer || (
                <span>
                  Vi har ikke registrert kontonummeret ditt, og anbefaler at du legger det inn på{" "}
                  <EksterneLenke href="https://www.nav.no/minside" tekst="Min side" />.
                </span>
              )}
            </BodyShort>
          </VStack>
        </VStack>
        <Form {...form.getFormProps()}>
          <input type="hidden" name="versjon" value={seksjon.versjon} />
          <VStack gap="6">
            {personaliaSpørsmål.map((komponent) => {
              if (komponent.visHvis && !komponent.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={komponent.id}
                  props={komponent}
                  formScope={form.scope(komponent.id as keyof PersonaliaSvar)}
                />
              );
            })}

            {personaliaBostedslandSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Komponent
                  key={spørsmål.id}
                  props={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof PersonaliaSvar)}
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
        onNesteSteg={lagreSvar}
        lagrer={state === "submitting" || state === "loading"}
      />

      <SøknadFooter søknadId={soknadId} onFortsettSenere={fortsettSenere} />
    </div>
  );
}
