import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { erTilbakenavigering } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { AnnenPengestøtteViewV1 } from "~/seksjon/annen-pengestøtte/v1/AnnenPengestøtteViewV1";
import { AnnenPengestøtteProvider } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { normaliserFormData } from "~/utils/action.utils.server";

const NYESTE_VERSJON = 1;

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "annen-pengestotte");

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
  const seksjonId = "annen-pengestotte";
  const nesteSeksjonId = "egen-naring";
  const forrigeSeksjonId = "arbeidsforhold";
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

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, putSeksjonRequestBody);

  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av seksjonen" };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function AnnenPengestøtteRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <AnnenPengestøtteProvider
          pengestøtteFraAndreEøsLand={loaderData?.seksjon?.pengestøtteFraAndreEøsLand || []}
          pengestøtteFraNorge={loaderData?.seksjon?.pengestøtteFraNorge || []}
        >
          <AnnenPengestøtteViewV1 />
        </AnnenPengestøtteProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.versjon} for annen-pengestøtte for søknaden ${soknadId}`
      );
      return (
        <AnnenPengestøtteProvider
          pengestøtteFraAndreEøsLand={loaderData?.seksjon?.pengestøtteFraAndreEøsLand || []}
          pengestøtteFraNorge={loaderData?.seksjon?.pengestøtteFraNorge || []}
        >
          <AnnenPengestøtteViewV1 />
        </AnnenPengestøtteProvider>
      );
  }
}
