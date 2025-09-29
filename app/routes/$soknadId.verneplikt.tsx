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
import { VernepliktSvar } from "~/seksjon/verneplikt/v1/verneplikt.spørsmål";
import VernepliktViewV1 from "~/seksjon/verneplikt/v1/VernepliktViewV1";

const NYESTE_VERSJON = 1;

type VernepliktLoaderDataType = {
  versjon: number;
  seksjon: VernepliktSvar | undefined;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "SøknadID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "verneplikt");
  if (!response.ok) {
    return {
      seksjon: undefined,
      versjon: NYESTE_VERSJON,
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "verneplikt";
  const nesteSeksjonId = "utdanning";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== "versjon"
  );
  const seksjonData = Object.fromEntries(filtrertEntries);
  const versjon = formData.get("versjon");

  const seksjonDataMedVersjon = {
    versjon: Number(versjon),
    seksjon: seksjonData,
  } as VernepliktSvar;

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonDataMedVersjon);
  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av verneplikt" };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function VernepliktRoute() {
  const loaderData: VernepliktLoaderDataType = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <VernepliktViewV1 />;
    default:
      console.error(
        `Ukjent versjon nummer: ${loaderData.versjon} for verneplikt for søknaden ${soknadId}`
      );
      return <VernepliktViewV1 />;
  }
}
