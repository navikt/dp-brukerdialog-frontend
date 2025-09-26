import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { ArbeidsforholdViewV1 } from "~/seksjon/arbeidsforhold/v1/ArbeidsforholdViewV1";
import { ArbeidsforholdProvider } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";

const NYESTE_VERSJON = 1;

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "arbeidsforhold");

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
  const seksjonId = "arbeidsforhold";
  const nesteSeksjonId = "annen-pengestotte";
  const payload = formData.get("payload");
  const seksjonsData = JSON.parse(payload as string);

  const versjon = formData.get("versjon");
  const seksjonsPayload = {
    versjon: Number(versjon),
    skjema: seksjonsData,
  };
  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsPayload);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function ArbeidsforholdRoute() {
  const loaderData = useLoaderData<typeof loader>();
  loaderData.versjon = loaderData?.versjon ?? NYESTE_VERSJON;

  switch (loaderData.versjon) {
    case 1:
      return (
        <ArbeidsforholdProvider
          registrerteArbeidsforhold={loaderData?.skjema?.registrerteArbeidsforhold || []}
        >
          <ArbeidsforholdViewV1 />
        </ArbeidsforholdProvider>
      );
    default:
      throw new Error(`Ukjent versjon: ${loaderData.versjon}`);
  }
}
