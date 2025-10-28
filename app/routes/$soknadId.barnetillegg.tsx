import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentBarn } from "~/models/hent-barn.server";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { BarnetilleggProvider } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  Barn,
  BarnetilleggSvar,
  erTilbakenavigering,
  forsørgerDuBarnSomIkkeVisesHer,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnetilleggViewV1 } from "~/seksjon/barnetillegg/v1/BarnetilleggViewV1";
import { DokumentasjonskravType } from "~/seksjon/dokumentasjon/Dokumentasjonskrav";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

type BarnetilleggResponseType = {
  seksjonsId?: string;
  seksjon?: BarnetilleggResponse;
  dokumentasjonskrav?: DokumentasjonskravType[];
  versjon: number;
};

const NYESTE_VERSJON = 1;

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<BarnetilleggResponseType> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "barnetillegg");

  if (!response.ok) {
    const barnFraPdlResponse = await hentBarn(request);

    if (!barnFraPdlResponse.ok) {
      return {
        versjon: NYESTE_VERSJON,
        seksjon: undefined,
      };
    }

    return {
      versjon: NYESTE_VERSJON,
      seksjon: {
        [forsørgerDuBarnSomIkkeVisesHer]: undefined,
        barnLagtManuelt: [],
        barnFraPdl: await barnFraPdlResponse.json(),
      },
    };
  }

  return response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonId = "barnetillegg";
  const nesteSeksjonId = "reell-arbeidssoker";
  const forrigeSeksjonId = "utdanning";
  const payload = formData.get("payload");
  const versjon = formData.get("versjon");
  const dokumentasjonskrav = formData.get("dokumentasjonskrav");

  const seksjonsdata = {
    seksjonId,
    seksjon: JSON.parse(payload as string),
    dokumentasjonskrav: JSON.parse(dokumentasjonskrav as string),
    versjon: Number(versjon),
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsdata);

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

export default function BarntilleggRoute() {
  const loaderData: BarnetilleggResponseType = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  console.log(`🔥 loaderData :`, loaderData);

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={loaderData?.seksjon?.barnFraPdl || []}
          barnLagtManuelt={loaderData?.seksjon?.barnLagtManuelt || []}
          dokumentasjonskrav={loaderData?.dokumentasjonskrav || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.versjon} for barnetillegg for søknaden ${soknadId}`
      );
      return (
        <BarnetilleggProvider
          barnFraPdl={loaderData?.seksjon?.barnFraPdl || []}
          barnLagtManuelt={loaderData?.seksjon?.barnLagtManuelt || []}
          dokumentasjonskrav={loaderData?.dokumentasjonskrav || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
  }
}
