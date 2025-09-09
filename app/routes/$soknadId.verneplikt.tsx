import { LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { VernepliktSvar } from "~/seksjon/verneplikt/verneplikt.spørsmål";
import VernepliktView from "~/seksjon/verneplikt/VernepliktView";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<VernepliktSvar | undefined> {
  invariant(params.soknadId, "SøknadID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "verneplikt");
  if (response.status !== 200) {
    return undefined;
  }

  return await response.json();
}

export async function action({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "SøknadID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "verneplikt";
  const nesteSeksjonId = "utdanning";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([_, value]) => value !== undefined && value !== "undefined"
  );
  const seksjonData = Object.fromEntries(filtrertEntries);

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonData);
  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av verneplikt" };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function VernepliktRoute() {
  return <VernepliktView />;
}
