import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentBarn } from "~/models/hent-barn.server";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { BarnetilleggProvider } from "~/seksjon/barnetillegg/barnetillegg.context";
import { Barn, BarnetilleggSvar } from "~/seksjon/barnetillegg/barnetillegg.spørsmål";
import { BarnetilleggView } from "~/seksjon/barnetillegg/BarnetilleggView";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<BarnetilleggResponse | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "barnetillegg");

  if (!response.ok) {
    const barnFraPdlResponse = await hentBarn(request);

    if (!barnFraPdlResponse.ok) {
      return undefined;
    }

    return {
      forsørgerDuBarnSomIkkeVisesHer: undefined,
      barnLagtManuelt: [],
      barnFraPdl: await barnFraPdlResponse.json(),
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "barnetillegg";
  const nesteSeksjonId = "personalia";
  const seksjonsData = formData.get("payload");

  const response = await lagreSeksjon(
    request,
    params.soknadId,
    seksjonId,
    JSON.parse(seksjonsData as string)
  );

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function BarntilleggRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <BarnetilleggProvider
      barnFraPdl={loaderData?.barnFraPdl || []}
      barnLagtManuelt={loaderData?.barnLagtManuelt || []}
    >
      <BarnetilleggView />
    </BarnetilleggProvider>
  );
}
