import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { ArbeidsforholdView } from "~/seksjon/arbeidsforhold/ArbeidsforholdView";
import { ArbeidsforholdProvider } from "~/seksjon/arbeidsforhold/arbeidsforhold.context";
import { erTilbakenavigering } from "~/seksjon/arbeidsforhold/arbeidsforhold.spørsmål";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "arbeidsforhold");

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonId = "arbeidsforhold";
  const nesteSeksjonId = "annen-pengestotte";
  const forrigeSeksjonId = "bostedsland";
  const payload = formData.get("payload");
  const seksjonsData = JSON.parse(payload as string);

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

export default function ArbeidsforholdRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <ArbeidsforholdProvider registrerteArbeidsforhold={loaderData?.registrerteArbeidsforhold || []}>
      <ArbeidsforholdView />
    </ArbeidsforholdProvider>
  );
}
