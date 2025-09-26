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
import { BarnetilleggView } from "~/seksjon/barnetillegg/v1/BarnetilleggView";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

type BarnetilleggResponseType = {
  versjon: number;
  skjema: BarnetilleggResponse | undefined;
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
        skjema: undefined,
      };
    }

    return {
      versjon: NYESTE_VERSJON,
      skjema: {
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
    skjema: seksjonsData,
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
  const skjema: BarnetilleggResponse = loaderData?.skjema ?? {};
  loaderData.versjon = loaderData?.versjon ?? NYESTE_VERSJON;

  switch (loaderData.versjon) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={skjema?.barnFraPdl || []}
          barnLagtManuelt={skjema?.barnLagtManuelt || []}
        >
          <BarnetilleggView />
        </BarnetilleggProvider>
      );
    default:
      throw new Error(`Ukjent versjon: ${loaderData.versjon}`);
  }
}
