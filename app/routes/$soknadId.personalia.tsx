import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { PersonaliaView } from "~/seksjon/personalia/PersonaliaView";
import { parseLoaderData } from "~/utils/loader.utils";

type Personalia = {
  person: Person;
  kontonummer: string | null;
};

type Person = {
  fornavn: string;
  mellomnavn: string;
  etternavn: string;
  fødselsdato: string;
  ident: string;
  postAdresse: Adresse;
  folkeregistrertAdresse: Adresse;
};

type Adresse = {
  adresselinje1: string;
  adresselinje2: string;
  adresselinje3: string;
  postnummer: string;
  poststed: string;
  landkode: string;
  land: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  const response = await hentPersonalia(request);
  const personalia: Personalia = await response.json();

  return parseLoaderData(personalia);
}

export async function action({ params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const nesteSeksjonId = "bostedsland";

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function PersonaliaRoute() {
  return <PersonaliaView />;
}
