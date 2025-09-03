import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { ReellArbeidssøkerSvar } from "~/seksjon/reell-arbeidssøker/reell-arbeidssøker.spørsmål";
import { ReellArbeidssøkerView } from "~/seksjon/reell-arbeidssøker/ReellArbeidsøkerView";
import { parseLoaderData } from "~/utils/loader.utils";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ReellArbeidssøkerSvar | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "reell-arbeidssøker");

  if (!response.ok) {
    return undefined;
  }

  const loaderData = await response.json();
  return parseLoaderData(loaderData);
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "reell-arbeidssoker";
  const nesteSeksjonId = "tilleggsopplysninger";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function ReellArbeidssøkerRoute() {
  return <ReellArbeidssøkerView />;
}
