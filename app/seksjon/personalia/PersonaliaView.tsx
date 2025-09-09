import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Button, HStack, Label, VStack } from "@navikt/ds-react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import { loader } from "~/routes/$soknadId.personalia";

export function PersonaliaView() {
  const { soknadId } = useParams<{ soknadId: string }>();
  const personalia = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  if (!personalia) {
    return <h1>Ingen personalia funnet</h1>;
  }

  const { fornavn, mellomnavn, etternavn, ident, folkeregistrertAdresse, postAdresse } =
    personalia.person;

  const formattertIdent = ident.replace(/(.{6})(.{5})/, `$1 $2`);
  const formattertKontonummer =
    personalia.kontonummer && personalia.kontonummer.replace(/(.{4})(.{2})(.{5})/, "$1 $2 $3");

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
              <Label as="p">Fødselsnummer</Label>
              <BodyShort>{formattertIdent}</BodyShort>
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
                {!folkeregistrertAdresse && postAdresse && (
                  <>
                    {postAdresse.adresselinje1} {postAdresse.adresselinje1 && <br />}
                    {postAdresse.adresselinje2} {postAdresse.adresselinje2 && <br />}
                    {postAdresse.adresselinje3} {postAdresse.adresselinje3 && <br />}
                    {postAdresse.postnummer} {postAdresse.poststed} {postAdresse.land && <br />}
                    {postAdresse.land}
                  </>
                )}
                {!folkeregistrertAdresse && !postAdresse && (
                  <>Det er ikke registert adresse på deg i Folkeregisteret.</>
                )}
              </BodyShort>
            </div>
            <div className="mb-4">
              <Label as="p">Kontonummer</Label>
              <BodyShort>
                {formattertKontonummer || (
                  <span>
                    Vi har ikke registrert kontonummeret ditt, og anbefaler at du legger det inn på
                    <a href="https://www.nav.no/">Min side</a>.
                  </span>
                )}
              </BodyShort>
            </div>
          </VStack>

          <HStack gap="4" className="mt-8">
            <Button
              variant="secondary"
              icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
              onClick={() => navigate(`/${soknadId}/din-situasjon`)}
            >
              Forrige steg
            </Button>
            <Button
              variant="primary"
              iconPosition="right"
              icon={<ArrowRightIcon />}
              onClick={() => navigate(`/${soknadId}/bostedsland`)}
            >
              Neste steg
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
