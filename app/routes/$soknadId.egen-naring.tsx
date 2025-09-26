import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { EgenNæringView } from "~/seksjon/egen-næring/v1/EgenNæringView";
import { EgenNæringProvider } from "~/seksjon/egen-næring/v1/egen-næring.context";
import { EgenNæringResponse } from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";

const NYESTE_VERSJON = 1;

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "egen-naring");

  if (!response.ok) {
    return {
      skjema: undefined,
      versjon: NYESTE_VERSJON,
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  console.log(formData);
  const seksjonId = "egen-naring";
  const nesteSeksjonId = "verneplikt";
  const payload = formData.get("payload");
  const seksjonsData = JSON.parse(payload as string);

  const versjon = formData.get("versjon");
  const seksjonsDataMedVersjon = {
    skjema: seksjonsData,
    versjon: Number(versjon),
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsDataMedVersjon);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function EgenNæringRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const skjema: EgenNæringResponse = loaderData?.skjema ?? {};
  loaderData.versjon = loaderData?.versjon ?? NYESTE_VERSJON;

  switch (loaderData.versjon) {
    case 1:
      return (
        <EgenNæringProvider
          næringsvirksomheter={skjema?.næringsvirksomheter || []}
          gårdsbruk={skjema?.gårdsbruk || []}
        >
          <EgenNæringView />
        </EgenNæringProvider>
      );
    default:
      throw new Error(`Ukjent versjon: ${loaderData.versjon}`);
  }
}
