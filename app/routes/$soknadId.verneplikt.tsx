import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjonV2 } from "~/models/lagreSeksjon.server";
import { erTilbakenavigering, VernepliktSvar } from "~/seksjon/verneplikt/v1/verneplikt.spørsmål";
import VernepliktViewV1 from "~/seksjon/verneplikt/v1/VernepliktViewV1";
import { normaliserFormData } from "~/utils/action.utils.server";

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
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonId = "verneplikt";
  const nesteSeksjonId = "utdanning";
  const forrigeSeksjonId = "egen-naring";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== "undefined" &&
      key !== "versjon" &&
      key !== erTilbakenavigering &&
      key !== "pdfGrunnlag"
  );
  const seksjonsData = Object.fromEntries(filtrertEntries);
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");

  const putSeksjonRequest = {
    seksjonsvar: JSON.stringify({
      seksjon: normaliserFormData(seksjonsData),
      versjon: Number(versjon),
    }),
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjonV2(request, params.soknadId, seksjonId, putSeksjonRequest);

  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av verneplikt" };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
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
        `Ukjent versjonsnummer: ${loaderData.versjon} for verneplikt for søknaden ${soknadId}`
      );
      return <VernepliktViewV1 />;
  }
}
