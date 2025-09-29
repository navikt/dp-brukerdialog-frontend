import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { ReellArbeidssøkerSvar } from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.spørsmål";
import { ReellArbeidssøkerViewV1 } from "~/seksjon/reell-arbeidssøker/v1/ReellArbeidsøkerView";

const NYESTE_VERSJON = 1;
type ReellArbeidssøkerSvarType = {
  versjon: number;
  seksjon: ReellArbeidssøkerSvar | undefined;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ReellArbeidssøkerSvarType> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "reell-arbeidssoker");

  if (!response.ok) {
    return {
      versjon: NYESTE_VERSJON,
      seksjon: undefined,
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "reell-arbeidssoker";
  const nesteSeksjonId = "tilleggsopplysninger";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== "versjon"
  );
  const seksjonData = Object.fromEntries(filtrertEntries);

  const versjon = formData.get("versjon");
  const seksjonDataMedVersjon = {
    seksjon: seksjonData,
    versjon: Number(versjon),
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonDataMedVersjon);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function ReellArbeidssøkerRoute() {
  const loaderData = useLoaderData<typeof loader>();
  loaderData.versjon = loaderData?.versjon ?? NYESTE_VERSJON;

  switch (Number(loaderData.versjon)) {
    case 1:
      return <ReellArbeidssøkerViewV1 />;
    default:
      throw new Error(`Ukjent versjon: ${loaderData.versjon}`);
  }
}
