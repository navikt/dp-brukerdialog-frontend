import { id } from "date-fns/locale";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import {
  lagreSøknadPersonalia,
  PutSøknadPersonaliaRequestBody,
} from "~/models/lagre-søknad-personalia.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import {
  adresselinje1FraPdl,
  adresselinje2FraPdl,
  adresselinje3FraPdl,
  alderFraPdl,
  etternavnFraPdl,
  fornavnFraPdl,
  kontonummerFraKontoregister,
  landFraPdl,
  landkodeFraPdl,
  mellomnavnFraPdl,
  PersonaliaSvar,
  postnummerFraPdl,
  poststedFraPdl,
} from "~/seksjon/personalia/v1/personalia.komponenter";
import { PersonaliaViewV1 } from "~/seksjon/personalia/v1/PersonaliaViewV1";
import { normaliserFormData } from "~/utils/action.utils.server";

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "personalia";
const NESTE_SEKSJON_ID = "din-situasjon";

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

export type PersonaliaSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: PersonaliaSvar;
  };
  personalia?: Personalia | null;
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

export async function loader({ params, request }: LoaderFunctionArgs): Promise<PersonaliaSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const personaliaResponse = await hentPersonalia(request);
  const seksjonResponse = await hentSeksjon(request, params.soknadId, SEKSJON_ID);

  if (!personaliaResponse.ok) {
    return {
      seksjon: {
        seksjonId: SEKSJON_ID,
        versjon: NYESTE_VERSJON,
      },
      personalia: null,
      dokumentasjonskrav: null,
    };
  }

  if (!seksjonResponse.ok) {
    return {
      seksjon: {
        seksjonId: SEKSJON_ID,
        versjon: NYESTE_VERSJON,
      },
      personalia: await personaliaResponse.json(),
      dokumentasjonskrav: null,
    };
  }

  const seksjonsdata = await seksjonResponse.json();

  return {
    ...seksjonsdata,
    personalia: await personaliaResponse.json(),
    dokumentasjonskrav: null,
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const formData = await request.formData();

  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) =>
      value !== undefined && value !== "undefined" && key !== "versjon" && key !== "pdfGrunnlag"
  );
  const seksjonsvar = Object.fromEntries(filtrertEntries);
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      id: SEKSJON_ID,
      seksjonsvar: normaliserFormData(seksjonsvar),
      versjon: Number(versjon),
    }),
    dokumentasjonskrav: null,
    pdfGrunnlag: pdfGrunnlag,
  };

  const lagreSeksjonResponse = await lagreSeksjon(
    request,
    params.soknadId,
    SEKSJON_ID,
    putSeksjonRequestBody
  );

  if (lagreSeksjonResponse.status !== 200) {
    return { error: "Noe gikk galt ved lagring av seksjonen" };
  }

  const putSøknadPersonaliaRequestBody: PutSøknadPersonaliaRequestBody = {
    fornavn: formData.get(fornavnFraPdl)?.toString() || "Ukjent fornavn",
    mellomnavn: formData.get(mellomnavnFraPdl)?.toString(),
    etternavn: formData.get(etternavnFraPdl)?.toString() || "Ukjent etternavn",
    alder: formData.get(alderFraPdl)?.toString() || "0",
    adresselinje1: formData.get(adresselinje1FraPdl)?.toString(),
    adresselinje2: formData.get(adresselinje2FraPdl)?.toString(),
    adresselinje3: formData.get(adresselinje3FraPdl)?.toString(),
    postnummer: formData.get(postnummerFraPdl)?.toString(),
    poststed: formData.get(poststedFraPdl)?.toString(),
    landkode: formData.get(landkodeFraPdl)?.toString(),
    land: formData.get(landFraPdl)?.toString(),
    kontonummer: formData.get(kontonummerFraKontoregister)?.toString(),
  };

  const lagreSøknadPersonaliaResponse = await lagreSøknadPersonalia(
    request,
    params.soknadId,
    putSøknadPersonaliaRequestBody
  );

  if (lagreSøknadPersonaliaResponse.status !== 200) {
    return { error: "Noe gikk galt ved lagring av personalia" };
  }

  return redirect(`/${params.soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function PersonaliaRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.seksjon?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <PersonaliaViewV1 />;
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.seksjon?.versjon} for din situasjon for søknaden ${soknadId}`
      );
      return <PersonaliaViewV1 />;
  }
}
