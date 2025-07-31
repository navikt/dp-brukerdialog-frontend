import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Button, HStack, Label, Page, VStack } from "@navikt/ds-react";
import { ActionFunctionArgs, redirect, useNavigate, useParams } from "react-router";
import invariant from "tiny-invariant";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { Route } from "../../.react-router/types/app/routes/+types/_index";

interface IPersonalia {
  person: IPerson;
  kontonummer: string;
}

interface IPerson {
  fornavn: string;
  mellomnavn: string;
  etternavn: string;
  fodselsdato: string;
  ident: string;
  postAdresse: IAdresse;
  folkeregistrertAdresse: IAdresse;
}

interface IAdresse {
  adresselinje1: string;
  adresselinje2: string;
  adresselinje3: string;
  postnummer: string;
  poststed: string;
  landkode: string;
  land: string;
}

export async function loader({ request }: Route.LoaderArgs) {
  const response = await hentPersonalia(request);
  return await response.json();
}

export async function action({ params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const nesteSeksjonId = "bostedsland";
  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

// noinspection JSUnusedGlobalSymbols
export default function Personalia({ loaderData }: Route.ComponentProps) {
  const { soknadId } = useParams<{ soknadId: string }>();
  const navigate = useNavigate();
  const personalia = loaderData as IPersonalia;

  return (
    <Page className="brukerdialog">
      <h2>Personalia</h2>
      <VStack gap="20">
        <VStack gap="4">
          <p>
            Hvis opplysningene vi har om deg ikke stemmer, må du endre disse hos Folkeregisteret.
            Kontonummer kan du legge til eller endre på <a href="https://www.nav.no/">Min side</a>.
          </p>

          <VStack gap="0">
            <p>
              <Label>Navn</Label>
              <br />
              {personalia.person.fornavn} {personalia.person.mellomnavn}{" "}
              {personalia.person.etternavn}
            </p>

            <p>
              <Label>Fødselsnummer</Label>
              <br />
              {personalia.person.ident.replace(/(.{6})(.{5})/, `$1 $2`)}
            </p>

            <p>
              <Label>Folkeregistrert adresse</Label>
              <br />
              {personalia.person.folkeregistrertAdresse && (
                <>
                  {personalia.person.folkeregistrertAdresse.adresselinje1}{" "}
                  {personalia.person.folkeregistrertAdresse.adresselinje1 && <br />}
                  {personalia.person.folkeregistrertAdresse.adresselinje2}{" "}
                  {personalia.person.folkeregistrertAdresse.adresselinje2 && <br />}
                  {personalia.person.folkeregistrertAdresse.adresselinje3}{" "}
                  {personalia.person.folkeregistrertAdresse.adresselinje3 && <br />}
                  {personalia.person.folkeregistrertAdresse.postnummer}{" "}
                  {personalia.person.folkeregistrertAdresse.poststed}{" "}
                  {personalia.person.folkeregistrertAdresse.land && <br />}
                  {personalia.person.folkeregistrertAdresse.land}
                </>
              )}
              {!personalia.person.folkeregistrertAdresse && personalia.person.postAdresse && (
                <>
                  {personalia.person.postAdresse.adresselinje1}{" "}
                  {personalia.person.postAdresse.adresselinje1 && <br />}
                  {personalia.person.postAdresse.adresselinje2}{" "}
                  {personalia.person.postAdresse.adresselinje2 && <br />}
                  {personalia.person.postAdresse.adresselinje3}{" "}
                  {personalia.person.postAdresse.adresselinje3 && <br />}
                  {personalia.person.postAdresse.postnummer}{" "}
                  {personalia.person.postAdresse.poststed}{" "}
                  {personalia.person.postAdresse.land && <br />}
                  {personalia.person.postAdresse.land}
                </>
              )}
              {!personalia.person.folkeregistrertAdresse && !personalia.person.postAdresse && (
                <>Det er ikke registert adresse på deg i Folkeregisteret.</>
              )}
            </p>

            <p>
              <Label>Kontonummer</Label>
              <br />
              {(personalia.kontonummer &&
                personalia.kontonummer.replace(/(.{4})(.{2})(.{5})/, "$1 $2 $3")) || (
                <span>
                  Vi har ikke registrert kontonummeret ditt, og anbefaler at du legger det inn på{" "}
                  <a href="https://www.nav.no/">Min side</a>.
                </span>
              )}
            </p>
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
              onClick={() => navigate(`/${soknadId}/bodstedsland`)}
            >
              Neste steg
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </Page>
  );
}
