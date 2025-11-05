import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjonV2 } from "~/models/lagre-seksjon.server";
import { erTilbakenavigering } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";
import { ArbeidsforholdViewV1 } from "~/seksjon/arbeidsforhold/v1/ArbeidsforholdViewV1";
import { ArbeidsforholdProvider } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import { normaliserFormData } from "~/utils/action.utils.server";

const NYESTE_VERSJON = 1;

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "arbeidsforhold");

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
  const seksjonId = "arbeidsforhold";
  const nesteSeksjonId = "annen-pengestotte";
  const forrigeSeksjonId = "din-situasjon";
  const seksjonsvar = formData.get("seksjonsvar");
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");

  const putSeksjonRequestBody = {
    seksjonsvar: JSON.stringify({
      seksjonId,
      seksjon: normaliserFormData(JSON.parse(seksjonsvar as string)),
      versjon: Number(versjon),
    }),
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjonV2(request, params.soknadId, seksjonId, putSeksjonRequestBody);

  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av seksjonen" };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function ArbeidsforholdRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <ArbeidsforholdProvider
          registrerteArbeidsforhold={loaderData?.seksjon?.registrerteArbeidsforhold || []}
        >
          <ArbeidsforholdViewV1 />
        </ArbeidsforholdProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.versjon} for arbeidsforhold for søknaden ${soknadId}`
      );
      return (
        <ArbeidsforholdProvider
          registrerteArbeidsforhold={loaderData?.seksjon?.registrerteArbeidsforhold || []}
        >
          <ArbeidsforholdViewV1 />
        </ArbeidsforholdProvider>
      );
  }
}
