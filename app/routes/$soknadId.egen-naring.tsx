import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjonDeprecated } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { normaliserFormData } from "~/utils/action.utils.server";
import { EgenNæringViewV1 } from "~/seksjon/egen-næring/v1/EgenNæringViewV1";
import { EgenNæringProvider } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  EgenNæringResponse,
  erTilbakenavigering,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";

const NYESTE_VERSJON = 1;

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjonDeprecated(request, params.soknadId, "egen-naring");

  if (!response.ok) {
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
  const seksjonId = "egen-naring";
  const nesteSeksjonId = "verneplikt";
  const forrigeSeksjonId = "annen-pengestotte";
  const seksjonsvar = formData.get("seksjonsvar");
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");

  const putSeksjonRequestBody = {
    seksjonsvar: JSON.stringify({
      seksjon: normaliserFormData(JSON.parse(seksjonsvar as string)),
      versjon: Number(versjon),
    }),
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, putSeksjonRequestBody);

  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av seksjonen" };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function EgenNæringRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const seksjon: EgenNæringResponse = loaderData?.seksjon ?? {};
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <EgenNæringProvider
          næringsvirksomheter={seksjon?.næringsvirksomheter || []}
          gårdsbruk={seksjon?.gårdsbruk || []}
        >
          <EgenNæringViewV1 />
        </EgenNæringProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.versjon} for egen-næring for søknaden ${soknadId}`
      );
      return (
        <EgenNæringProvider
          næringsvirksomheter={seksjon?.næringsvirksomheter || []}
          gårdsbruk={seksjon?.gårdsbruk || []}
        >
          <EgenNæringViewV1 />
        </EgenNæringProvider>
      );
  }
}
