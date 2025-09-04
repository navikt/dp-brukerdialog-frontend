import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { ReellArbeidssøkerSvar } from "~/seksjon/reell-arbeidssøker/reell-arbeidssøker.spørsmål";
import { ReellArbeidssøkerView } from "~/seksjon/reell-arbeidssøker/ReellArbeidsøkerView";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ReellArbeidssøkerSvar | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "reell-arbeidssøker");

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "reell-arbeidssoker";
  const nesteSeksjonId = "tilleggsopplysninger";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([_, value]) => value !== undefined && value !== "undefined"
  );
  const seksjonData = Object.fromEntries(filtrertEntries);

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonData);

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
