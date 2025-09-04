import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";
import { AnnenPengestøtteView } from "~/seksjon/annen-pengestøtte/AnnenPengestøtteView";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<AnnenPengestøtteSvar | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "annen-pengestøtte");

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "annen-pengestotte";
  const nesteSeksjonId = "egen-naring";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([_, value]) => value !== undefined && value !== "undefined"
  );
  const seksjonsData = Object.fromEntries(filtrertEntries);

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
