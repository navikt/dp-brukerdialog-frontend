import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentAlleSeksjoner } from "~/models/hent-alle-seksjoner.server";
import OppsummeringView from "~/seksjon/oppsummering/OppsummeringView";
import { sendSøknad } from "~/models/send-søknad.server";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";

type Oppsummering = {
  seksjoner: OppsummeringSeksjon[];
  dokumentasjonskrav: string[];
};

type OppsummeringSeksjon = {
  seksjonId: string;
  data: string;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<Oppsummering | null> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const alleSeksjonerResponse = await hentAlleSeksjoner(request, params.soknadId);

  if (alleSeksjonerResponse.ok) {
    const alleDokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);
    return {
      seksjoner: await alleSeksjonerResponse.json(),
      dokumentasjonskrav: alleDokumentasjonskravResponse.ok
        ? await alleDokumentasjonskravResponse.json()
        : undefined,
    };
  }

  return null;
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const nesteSeksjonId = "kvittering";

  const response = await sendSøknad(request, params.soknadId);

  if (response.status === 200) {
    return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
  } else {
    return {
      error: "Noe gikk galt ved innsending av søknaden. Vennligst prøv på nytt.",
    };
  }
}

export default function Oppsummering() {
  const loaderData = useLoaderData<typeof loader>();

  if (!loaderData) {
    return <div>Kunne ikke hente seksjoner</div>;
  }

  return <OppsummeringView />;
}
