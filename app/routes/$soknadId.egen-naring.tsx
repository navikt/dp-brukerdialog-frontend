import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { EgenNæringView } from "~/seksjon/egen-næring/EgenNæringView";
import { EgenNæringProvider } from "~/seksjon/egen-næring/egen-næring.context";
import { EgenNæringResponse } from "~/seksjon/egen-næring/egen-næring.spørsmål";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<EgenNæringResponse | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "egen-naring");

  if (!response.ok) {
    return undefined;
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "egen-naring";
  const nesteSeksjonId = "verneplikt";
  const payload = formData.get("payload");
  const seksjonsData = JSON.parse(payload as string);

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function EgenNæringRoute() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <EgenNæringProvider
      næringsvirksomheter={loaderData?.næringsvirksomheter || []}
      gårdsbruk={loaderData?.gårdsbruk || []}
    >
      <EgenNæringView />
    </EgenNæringProvider>
  );

}
