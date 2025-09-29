import {
  ActionFunctionArgs,
  data,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { DinSituasjonViewV1 } from "~/seksjon/din-situasjon/v1/DinSituasjonViewV1";

const NYESTE_VERSJON = 1;

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "din-situasjon");

  if (!response.ok) {
    if (response.status === 404) {
      return {
        versjon: NYESTE_VERSJON,
        seksjon: undefined,
      };
    }

    throw data(response.statusText, { status: response.status });
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "din-situasjon";
  const nesteSeksjonId = "personalia";

  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== "versjon"
  );
  const seksjonData = Object.fromEntries(filtrertEntries);

  const versjon = formData.get("versjon");
  const payload = {
    versjon: Number(versjon),
    seksjon: seksjonData,
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, payload);
  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function DinSituasjonRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <DinSituasjonViewV1 />;
    default:
      console.error(
        `Ukjent versjon nummer: ${loaderData.versjon} for din situasjon for søknaden ${soknadId}`
      );
      return <DinSituasjonViewV1 />;
  }
}
