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
import { normaliserFormData } from "~/utils/action.utils.server";
import { EgenNæringViewV1 } from "~/seksjon/egen-næring/v1/EgenNæringViewV1";
import { EgenNæringProvider } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  EgenNæringResponse,
  erTilbakenavigering,
} from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";

const NYESTE_VERSJON = 1;

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "egen-naring");

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
  const payload = formData.get("payload");
  const seksjonsData = normaliserFormData(JSON.parse(payload as string));

  const versjon = formData.get("versjon");
  const seksjonsDataMedVersjon = {
    seksjon: seksjonsData,
    versjon: Number(versjon),
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsDataMedVersjon);

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
        `Ukjent versjon nummer: ${loaderData.versjon} for egen-næring for søknaden ${soknadId}`
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
