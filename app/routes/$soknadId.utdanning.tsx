import { LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { UtdanningSvar } from "~/seksjon/utdanning/utdanning.spørsmål";
import { UtdanningView } from "~/seksjon/utdanning/UtdanningView";
import { parseLoaderData } from "~/utils/loader.utils";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<UtdanningSvar | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "utdanning");

  if (response.status !== 200) {
    return undefined;
  }

  const loaderData = await response.json();
  return parseLoaderData(loaderData);
}

export async function action({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "utdanning";
  const nesteSeksjonId = "barnetillegg";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);
  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av utdanning" };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function UtdanningRoute() {
  return <UtdanningView />;
}
