import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { UtdanningSvar } from "~/seksjon/utdanning/v1/utdanning.spørsmål";
import { UtdanningViewV1 } from "~/seksjon/utdanning/v1/UtdanningViewV1";

const NYESTE_VERSJON = 1;
type UtdanningSvarType = {
  versjon: number;
  seksjon: UtdanningSvar | undefined;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "utdanning");

  if (response.status !== 200) {
    return {
      seksjon: undefined,
      versjon: NYESTE_VERSJON,
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "utdanning";
  const nesteSeksjonId = "barnetillegg";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== "versjon"
  );
  const seksjonData = Object.fromEntries(filtrertEntries);
  const versjon = formData.get("versjon");

  const seksjonDataMedVersjon = {
    versjon: Number(versjon),
    seksjon: seksjonData,
  } as UtdanningSvar;

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonDataMedVersjon);
  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av utdanning" };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function UtdanningRoute() {
  const loaderData: UtdanningSvarType = useLoaderData<typeof loader>();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <UtdanningViewV1 />;
    default:
      throw new Error(`Ukjent versjon: ${loaderData.versjon}`);
  }
}
