import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { BostedslandSvar } from "~/seksjon/bostedsland/v1/bostedsland.spørsmål";
import { BostedslandView_V1 } from "~/seksjon/bostedsland/v1/BostedslandView_V1";
import { defaultVersjonSvar } from "~/utils/versjon.utils";

const NYESTE_VERSJON = 1;

type BostedslandLoaderDataType = {
  versjon: number;
  skjema: BostedslandSvar | undefined;
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "bostedsland");

  if (!response.ok) {
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
  const seksjonId = "bostedsland";
  const nesteSeksjonId = "arbeidsforhold";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) => value !== undefined && value !== "undefined" && key !== "versjon"
  );
  const seksjonsData = Object.fromEntries(filtrertEntries);
  const versjon = formData.get("versjon");
  const payload = {
    versjon: Number(versjon),
    skjema: seksjonsData,
  };
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, payload);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function BostedslandRoute() {
  const loaderData: BostedslandLoaderDataType = useLoaderData<typeof loader>();
  loaderData.versjon = loaderData?.versjon ?? NYESTE_VERSJON;

  switch (loaderData.versjon) {
    case 1:
      return <BostedslandView_V1 />;
    default:
      return <div>{defaultVersjonSvar()}</div>;
  }
}
