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
import {
  BarnetilleggProvider,
  Dokumentasjonskrav,
} from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  Barn,
  BarnetilleggSvar,
  erTilbakenavigering,
  forsørgerDuBarnSomIkkeVisesHer,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnetilleggViewV1 } from "~/seksjon/barnetillegg/v1/BarnetilleggViewV1";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

type BarnetilleggResponseType = {
  versjon: number;
  seksjon?: BarnetilleggResponse;
  dokumentkravList?: Dokumentasjonskrav[];
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

    const barnfraPdlResponseData: Barn[] = await barnFraPdlResponse.json();
    const barnFraPdl: Barn[] = barnfraPdlResponseData.map((barn: Barn) => ({
      ...barn,
      id: crypto.randomUUID(),
    }));

    return {
      versjon: NYESTE_VERSJON,
      seksjon: {
        [forsørgerDuBarnSomIkkeVisesHer]: undefined,
        barnLagtManuelt: [],
        barnFraPdl: barnFraPdl,
      },
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "barnetillegg";
  const nesteSeksjonId = "reell-arbeidssoker";
  const forrigeSeksjonId = "utdanning";
  const payload = formData.get("payload");
  const versjon = formData.get("versjon");

  const data = {
    seksjon: JSON.parse(payload as string),
    versjon: Number(versjon),
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, data);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  if (formData.get(erTilbakenavigering) === "true") {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function BarntilleggRoute() {
  const loaderData: BarnetilleggResponseType = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={loaderData?.seksjon?.barnFraPdl || []}
          barnLagtManuelt={loaderData?.seksjon?.barnLagtManuelt || []}
          dokumentkravList={loaderData?.dokumentkravList || []}
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
          dokumentkravList={loaderData?.dokumentkravList || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
  }
}
