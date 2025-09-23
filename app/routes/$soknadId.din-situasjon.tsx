import { ActionFunctionArgs, data, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { DinSituasjonView } from "~/seksjon/din-situasjon/v1/DinSituasjonView";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "din-situasjon");

  if (!response.ok) {
    if (response.status === 404) {
      return undefined;
    }

    throw data(response.statusText, { status: response.status });
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "din-situasjon";
  const nesteSeksjonId = "personalia";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([_, value]) => value !== undefined && value !== "undefined"
  );
  const seksjonData = Object.fromEntries(filtrertEntries);
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function DinSituasjonRoute() {
  return <DinSituasjonView />;
}
