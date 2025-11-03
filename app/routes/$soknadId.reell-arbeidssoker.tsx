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
import {
  erTilbakenavigering,
  ReellArbeidssøkerSvar,
} from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.spørsmål";
import { ReellArbeidssøkerViewV1 } from "~/seksjon/reell-arbeidssøker/v1/ReellArbeidssøkerViewV1";
import { normaliserFormData } from "~/utils/action.utils.server";

const NYESTE_VERSJON = 1;
type ReellArbeidssøkerSvarType = {
  versjon: number;
  seksjon: ReellArbeidssøkerSvar | undefined;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ReellArbeidssøkerSvarType> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "reell-arbeidssoker");

  if (!response.ok) {
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
  const seksjonId = "reell-arbeidssoker";
  const nesteSeksjonId = "tilleggsopplysninger";
  const forrigeSeksjonId = "barnetillegg";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== "undefined" &&
      key !== "versjon" &&
      key !== erTilbakenavigering &&
      value !== "pdfGrunnlag"
  );

  const seksjonsData = normaliserFormData(Object.fromEntries(filtrertEntries));
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
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function ReellArbeidssøkerRoute() {
  const loaderData = useLoaderData<typeof loader>();
  loaderData.versjon = loaderData?.versjon ?? NYESTE_VERSJON;
  const { soknadId } = useParams();

  switch (Number(loaderData.versjon)) {
    case 1:
      return <ReellArbeidssøkerViewV1 />;
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.versjon} for reell-arbeidssøker for søknaden ${soknadId}`
      );
      return <ReellArbeidssøkerViewV1 />;
  }
}
