import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { PersonaliaView } from "~/seksjon/personalia/PersonaliaView";

export type Personalia = {
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

export async function loader({ request }: LoaderFunctionArgs): Promise<Personalia | undefined> {
  const response = await hentPersonalia(request);

  if (response.status !== 200) {
    return undefined;
  }

  return await response.json();
}

export async function action({ params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const nesteSeksjonId = "bostedsland";

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function PersonaliaRoute() {
  return <PersonaliaView />;
}
