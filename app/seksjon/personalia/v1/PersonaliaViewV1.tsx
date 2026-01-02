import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Alert,
  BodyLong,
  BodyShort,
  Button,
  Heading,
  HStack,
  Label,
  VStack,
} from "@navikt/ds-react";
import { Form, useActionData, useLoaderData, useNavigation, useParams } from "react-router";
import { action, loader } from "~/routes/$soknadId.personalia";
import { Komponent } from "~/components/Komponent";
import { useForm } from "@rvf/react-router";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
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
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { SøknadFooter } from "~/components/SøknadFooter";
import invariant from "tiny-invariant";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

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
    return <h1>Ingen personalia funnet</h1>;
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
  form.setValue(adresselinje1FraPdl, folkeregistrertAdresse.adresselinje1 || "");
  form.setValue(adresselinje2FraPdl, folkeregistrertAdresse.adresselinje2 || "");
  form.setValue(adresselinje3FraPdl, folkeregistrertAdresse.adresselinje3 || "");
  form.setValue(postnummerFraPdl, folkeregistrertAdresse.postnummer || "");
  form.setValue(poststedFraPdl, folkeregistrertAdresse.poststed || "");
  form.setValue(landkodeFraPdl, folkeregistrertAdresse.landkode || "");
  form.setValue(landFraPdl, folkeregistrertAdresse.land || "");
  form.setValue(alderFraPdl, alder?.toString() || "");
  form.setValue(kontonummerFraKontoregister, personalia.kontonummer || "");

  useNullstillSkjulteFelter<PersonaliaSvar>(form, personaliaBostedslandSpørsmål);

  async function handleSubmit() {
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

  function handleFortsettSenere() {
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
      <VStack gap="20">
        <VStack gap="6">
          <Heading size="medium" level="2">
            {seksjonnavn}
          </Heading>
          <BodyLong>
            Hvis opplysningene vi har om deg ikke stemmer, må du endre disse hos Folkeregisteret.
            Kontonummer kan du legge til eller endre på <a href="https://www.nav.no/">Min side</a>.
          </BodyLong>

          <VStack gap="0">
            <div className="mb-4">
              <Label as="p">Navn</Label>
              <BodyShort>
                {fornavn} {mellomnavn} {etternavn}
              </BodyShort>
            </div>
            <div className="mb-4">
              <Label as="p">Fødselsnummer</Label>
              <BodyShort>{formattertIdent}</BodyShort>
            </div>
            <div className="mb-4">
              <Label as="p">Alder</Label>
              <BodyShort>{alder}</BodyShort>
            </div>
            <div className="mb-4">
              <Label as="p">Folkeregistrert adresse</Label>
              <BodyShort>
                {folkeregistrertAdresse && (
                  <>
                    {folkeregistrertAdresse.adresselinje1}{" "}
                    {folkeregistrertAdresse.adresselinje1 && <br />}
                    {folkeregistrertAdresse.adresselinje2}{" "}
                    {folkeregistrertAdresse.adresselinje2 && <br />}
                    {folkeregistrertAdresse.adresselinje3}{" "}
                    {folkeregistrertAdresse.adresselinje3 && <br />}
                    {folkeregistrertAdresse.postnummer} {folkeregistrertAdresse.poststed}{" "}
                    {folkeregistrertAdresse.land && <br />}
                    {folkeregistrertAdresse.land}
                  </>
                )}
                {!folkeregistrertAdresse && (
                  <>Det er ikke registert en bostedsadresse på deg i Folkeregisteret</>
                )}
              </BodyShort>
            </div>
            <div className="mb-4">
              <Label as="p">Kontonummer</Label>
              <BodyShort>
                {formattertKontonummer || (
                  <span>
                    Vi har ikke registrert kontonummeret ditt, og anbefaler at du legger det inn på{" "}
                    <a href="https://www.nav.no/">Min side</a>.
                  </span>
                )}
              </BodyShort>
            </div>
          </VStack>
          <Form {...form.getFormProps()}>
            <input type="hidden" name="versjon" value={seksjon.versjon} />
            <VStack gap="8">
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
                <Alert variant="error" className="mt-4">
                  {actionData.error}
                </Alert>
              )}
            </VStack>

            <HStack gap="4" className="mt-8">
              <Button
                variant="primary"
                type="button"
                onClick={handleSubmit}
                iconPosition="right"
                icon={<ArrowRightIcon aria-hidden />}
                disabled={state === "submitting" || state === "loading"}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
      <SøknadFooter
        className="footer"
        søknadId={soknadId}
        onFortsettSenere={handleFortsettSenere}
      />
    </div>
  );
}
