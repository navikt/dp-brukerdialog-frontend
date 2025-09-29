import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentBarn } from "~/models/hent-barn.server";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { BarnetilleggProvider } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  Barn,
  BarnetilleggSvar,
  forsørgerDuBarnSomIkkeVisesHer,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnetilleggViewV1 } from "~/seksjon/barnetillegg/v1/BarnetilleggViewV1";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

type BarnetilleggResponseType = {
  versjon: number;
  seksjon: BarnetilleggResponse | undefined;
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

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "barnetillegg";
  const nesteSeksjonId = "reell-arbeidssoker";
  const payload = formData.get("payload");
  const seksjonsData = JSON.parse(payload as string);

  const versjon = formData.get("versjon");
  const seksjonsDataMedVersjon = {
    seksjon: seksjonsData,
    versjon: Number(versjon),
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsDataMedVersjon);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function BarntilleggRoute() {
  const loaderData: BarnetilleggResponseType = useLoaderData<typeof loader>();
  const seksjon: BarnetilleggResponse = loaderData?.seksjon ?? {};
  loaderData.versjon = loaderData?.versjon ?? NYESTE_VERSJON;

  switch (loaderData.versjon) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjon?.barnFraPdl || []}
          barnLagtManuelt={seksjon?.barnLagtManuelt || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
    default:
      throw new Error(`Ukjent versjon: ${loaderData.versjon}`);
  }
}
