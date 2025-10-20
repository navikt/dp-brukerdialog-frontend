import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, BodyLong, BodyShort, Button, HStack, Label, VStack } from "@navikt/ds-react";
import { Form, useActionData, useLoaderData } from "react-router";
import { action, loader } from "~/routes/$soknadId.personalia";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useForm } from "@rvf/react-router";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  folkeregistrertAdresseErNorgeStemmerDet,
  fødselsnummerFraPdl,
  kontonummerFraKontoregister,
  landFraPdl,
  navnFraPdl,
  personaliaFolkeregistrertAdresseErNorgeSpørsmål,
  personaliaSpørsmål,
  PersonaliaSvar,
  postnummerFraPdl,
  poststedFraPdl,
} from "~/seksjon/personalia/v1/personalia.spørsmål";
import { personaliaSchema } from "~/seksjon/personalia/v1/personalia.schema";

export function PersonaliaViewV1() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  if (!loaderData.personalia) {
    return <h1>Ingen personalia funnet</h1>;
  }

  const { fornavn, mellomnavn, etternavn, ident, alder, folkeregistrertAdresse } =
    loaderData.personalia.person;

  const formattertIdent = ident.replace(/(.{6})(.{5})/, `$1 $2`);
  const formattertKontonummer = loaderData.personalia.kontonummer?.replace(
    /(.{4})(.{2})(.{5})/,
    "$1 $2 $3"
  );

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: personaliaSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
  });

  form.setValue(navnFraPdl, `${fornavn} ${mellomnavn} ${etternavn}`);
  form.setValue(fødselsnummerFraPdl, formattertIdent || "");
  form.setValue(adresselinje1FraPdl, folkeregistrertAdresse.adresselinje1 || "");
  form.setValue(adresselinje2FraPdl, folkeregistrertAdresse.adresselinje2 || "");
  form.setValue(adresselinje3FraPdl, folkeregistrertAdresse.adresselinje3 || "");
  form.setValue(postnummerFraPdl, folkeregistrertAdresse.postnummer || "");
  form.setValue(poststedFraPdl, folkeregistrertAdresse.poststed || "");
  form.setValue(landFraPdl, folkeregistrertAdresse.land || "");
  form.setValue(alderFraPdl, alder?.toString() || "");
  form.setValue(kontonummerFraKontoregister, formattertKontonummer || "");

  useNullstillSkjulteFelter<PersonaliaSvar>(form, personaliaSpørsmål);

  return (
    <div className="innhold">
      <h2>Personalia</h2>
      <VStack gap="20">
        <VStack gap="4">
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
                  <>Det er ikke registert adresse på deg i Folkeregisteret.</>
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
            <input type="hidden" name="versjon" value={loaderData.versjon} />
            <VStack gap="8">
              {personaliaFolkeregistrertAdresseErNorgeSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof PersonaliaSvar)}
                  />
                );
              })}

              {(form.value(folkeregistrertAdresseErNorgeStemmerDet) === "nei" ||
                form.value(landFraPdl) !== "NORGE") && <h2>Bostedsland</h2>}

              {personaliaSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
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
                type="submit"
                iconPosition="right"
                icon={<ArrowRightIcon />}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
    </div>
  );
}
