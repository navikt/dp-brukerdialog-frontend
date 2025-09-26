import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { BostedslandSvar, erTilbakenavigering } from "~/seksjon/bostedsland/bostedsland.spørsmål";
import { BostedslandView } from "~/seksjon/bostedsland/BostedslandView";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<BostedslandSvar | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "bostedsland");

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonId = "bostedsland";
  const nesteSeksjonId = "arbeidsforhold";
  const forrigeSeksjonId = "personalia";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== erTilbakenavigering
  );
  const seksjonsData = Object.fromEntries(filtrertEntries);
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

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

export default function BostedslandRoute() {
  return <BostedslandView />;
}
