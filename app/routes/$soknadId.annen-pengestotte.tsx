import { ActionFunctionArgs, LoaderFunctionArgs, redirect, useLoaderData } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { AnnenPengestøtteViewV1 } from "~/seksjon/annen-pengestøtte/v1/AnnenPengestøtteViewV1";
import { AnnenPengestøtteProvider } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
const NYESTE_VERSJON = 1;

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "annen-pengestotte");

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
  const seksjonId = "annen-pengestotte";
  const nesteSeksjonId = "egen-naring";
  const payload = formData.get("payload");
  const seksjonsData = JSON.parse(payload as string);

  const versjon = formData.get("versjon");
  const seksjonsDataMedVersjon = {
    seksjon: seksjonsData,
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

export default function AnnenPengestøtteRoute() {
  const loaderData = useLoaderData<typeof loader>();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <AnnenPengestøtteProvider
          pengestøtteFraAndreEøsLand={loaderData?.seksjon?.pengestøtteFraAndreEøsLand || []}
          pengestøtteFraNorge={loaderData?.seksjon?.pengestøtteFraNorge || []}
        >
          <AnnenPengestøtteViewV1 />
        </AnnenPengestøtteProvider>
      );
    default:
      return <div>Ukjent versjon</div>;
  }
}
