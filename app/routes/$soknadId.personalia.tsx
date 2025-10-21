import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { PersonaliaViewV1 } from "~/seksjon/personalia/v1/PersonaliaViewV1";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { PersonaliaSvar } from "~/seksjon/personalia/v1/personalia.spørsmål";

const NYESTE_VERSJON = 1;

export type Personalia = {
  person: Person;
  kontonummer: string | null;
};

type Person = {
  fornavn: string;
  mellomnavn: string;
  etternavn: string;
  fødselsdato: string;
  alder: number;
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

type PersonaliaLoaderDataType = {
  versjon: number;
  personalia?: Personalia;
  seksjon?: PersonaliaSvar;
};

export async function loader({ params, request }: LoaderFunctionArgs): Promise<any> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const personaliaResponse = await hentPersonalia(request);
  const seksjonResponse = await hentSeksjon(request, params.soknadId, "personalia");

  if (!personaliaResponse.ok) {
    return {
      error: "Noe gikk under uthenting av personalia.",
    };
  }

  if (!seksjonResponse.ok) {
    return {
      versjon: NYESTE_VERSJON,
      personalia: await personaliaResponse.json(),
      seksjon: {},
    };
  }

  const personaliaSeksjonData = await seksjonResponse.json();
  return {
    versjon: personaliaSeksjonData.versjon,
    personalia: await personaliaResponse.json(),
    seksjon: personaliaSeksjonData.seksjon,
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const formData = await request.formData();
  const seksjonId = "personalia";
  const nesteSeksjonId = "din-situasjon";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== "versjon"
  );
  const seksjonsData = Object.fromEntries(filtrertEntries);
  const versjon = formData.get("versjon");
  const payload = {
    versjon: Number(versjon),
    seksjon: seksjonsData,
  };
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, payload);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function PersonaliaRoute() {
  const loaderData: PersonaliaLoaderDataType = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <PersonaliaViewV1 />;
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.versjon} for din situasjon for søknaden ${soknadId}`
      );
      return <PersonaliaViewV1 />;
  }
}
