import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";
import { AnnenPengestøtteView } from "~/seksjon/annen-pengestøtte/AnnenPengestøtteView";
import { parseLoaderData } from "~/utils/loader.utils";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<AnnenPengestøtteSvar | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "annen-pengestøtte");

  if (!response.ok) {
    return undefined;
  }

  const loaderData = await response.json();

  return parseLoaderData(loaderData);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "annen-pengestotte";
  const nesteSeksjonId = "egen-naring";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function AnnenPengestøtteRoute() {
  return <AnnenPengestøtteView />;
}
