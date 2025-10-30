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
import { erTilbakenavigering, UtdanningSvar } from "~/seksjon/utdanning/v1/utdanning.spørsmål";
import { UtdanningViewV1 } from "~/seksjon/utdanning/v1/UtdanningViewV1";

const NYESTE_VERSJON = 1;
type UtdanningSvarType = {
  versjon: number;
  seksjon: UtdanningSvar | undefined;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "utdanning");

  if (response.status !== 200) {
    return {
      seksjon: undefined,
      versjon: NYESTE_VERSJON,
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonId = "utdanning";
  const nesteSeksjonId = "barnetillegg";
  const forrigeSeksjonId = "verneplikt";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== "undefined" &&
      key !== "versjon" &&
      key !== erTilbakenavigering
  );
  const seksjonData = Object.fromEntries(filtrertEntries);
  const versjon = formData.get("versjon");

  const seksjonDataMedVersjon = {
    versjon: Number(versjon),
    seksjon: seksjonData,
  } as UtdanningSvar;

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonDataMedVersjon);
  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av utdanning" };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function UtdanningRoute() {
  const loaderData: UtdanningSvarType = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <UtdanningViewV1 />;
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.versjon} for utdanning for søknaden ${soknadId}`
      );
      return <UtdanningViewV1 />;
  }
}
