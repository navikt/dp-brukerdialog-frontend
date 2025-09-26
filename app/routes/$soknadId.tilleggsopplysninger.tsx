import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { TilleggsopplysningerView } from "~/seksjon/tilleggsopplysninger/v1/TilleggopplysningerView";
import { TilleggsopplysningerSvar } from "~/seksjon/tilleggsopplysninger/v1/tilleggsopplysninger.spørsmål";

const NYESTE_VERSJON = 1;
type TilleggsopplysningerSvarType = {
  skjema: TilleggsopplysningerSvar | undefined;
  versjon: number;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<TilleggsopplysningerSvarType> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "tilleggsopplysninger");

  if (response.status !== 200) {
    return {
      versjon: NYESTE_VERSJON,
      skjema: undefined,
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "tilleggsopplysninger";
  const nesteSeksjonId = "oppsummering";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== "versjon"
  );
  const seksjonData = Object.fromEntries(filtrertEntries);

  const versjon = formData.get("versjon");
  const seksjonDataMedVersjon = {
    skjema: seksjonData,
    versjon: Number(versjon),
  };
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonDataMedVersjon);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function TilleggsopplysningerRoute() {
  const loaderData: TilleggsopplysningerSvarType = useLoaderData<typeof loader>();
  loaderData.versjon = loaderData.versjon ?? NYESTE_VERSJON;

  switch (loaderData.versjon) {
    case 1:
      return <TilleggsopplysningerView />;
    default:
      throw new Error(`Unknown versjon: ${loaderData.versjon}`);
  }
}
