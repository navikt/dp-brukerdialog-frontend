import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { TilleggsopplysningerViewV1 } from "~/seksjon/tilleggsopplysninger/v1/TilleggsopplysningerView";
import { erTilbakenavigering, TilleggsopplysningerSvar } from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.spørsmål";

const NYESTE_VERSJON = 1;
type TilleggsopplysningerSvarType = {
  seksjon: TilleggsopplysningerSvar | undefined;
  versjon: number;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<TilleggsopplysningerSvarType> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "tilleggsopplysninger");

  if (response.status !== 200) {
    return {
      versjon: NYESTE_VERSJON,
      seksjon: undefined,
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonId = "tilleggsopplysninger";
  const nesteSeksjonId = "oppsummering";
  const forrigeSeksjonId = "reell-arbeidssoker";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== "versjon" && key !== erTilbakenavigering
  );
  const seksjonData = Object.fromEntries(filtrertEntries);

  const versjon = formData.get("versjon");
  const seksjonDataMedVersjon = {
    seksjon: seksjonData,
    versjon: Number(versjon),
  };
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonDataMedVersjon);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function TilleggsopplysningerRoute() {
  const loaderData: TilleggsopplysningerSvarType = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <TilleggsopplysningerViewV1 />;
    default:
      console.error(
        `Ukjent versjon nummer: ${loaderData.versjon} for tilleggsopplysninger for søknaden ${soknadId}`
      );
      return <TilleggsopplysningerViewV1 />;
  }
}
