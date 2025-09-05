import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { AnnenPengestøtteResponse } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";
import { AnnenPengestøtteView } from "~/seksjon/annen-pengestøtte/AnnenPengestøtteView";
import { AnnenPengestøtteProvider } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.context";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<AnnenPengestøtteResponse | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "annen-pengestotte");

  if (!response.ok) {
    return undefined;
  }

  const newVar = await response.json();
  console.info(newVar);
  return newVar;
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "annen-pengestotte";
  const nesteSeksjonId = "egen-naring";
  const payload = formData.get("payload");
  const seksjonsData = JSON.parse(payload as string);

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function AnnenPengestøtteRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <AnnenPengestøtteProvider
      pengestøtteFraAndreEøsLand={loaderData?.pengestøtteFraAndreEøsLand || []}
      pengestøtteFraNorge={loaderData?.pengestøtteFraNorge || []}
    >
      <AnnenPengestøtteView />
    </AnnenPengestøtteProvider>
  );
}
