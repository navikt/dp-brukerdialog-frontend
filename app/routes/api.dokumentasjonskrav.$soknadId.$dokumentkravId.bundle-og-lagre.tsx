import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import {
  hentMellomlagringOboToken,
  hentSoknadOrkestratorOboToken,
} from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

type MellomlagringBundle = {
  soknadId: string;
  bundleNavn: string;
  filer: Urn[];
};

type Urn = {
  urn: string;
};

type MellomlagringBundleResponse = {
  filnavn: string;
  urn: string;
  filsti: string;
  storrelse: number;
  tidspunkt: string;
};

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.dokumentkravId, "Dokumentkrav ID er påkrevd");

  const søknadId = params.soknadId;
  const dokumentkravId = params.dokumentkravId;

  const formData = await request.formData();
  const dokumentasjonskravFiler = formData.get("dokumentasjonskravFiler") as string;
  const dokumentasjonskravFilerUrn: Urn[] = JSON.parse(dokumentasjonskravFiler).map((fil: Urn) => {
    return { urn: fil.urn };
  });

  const bundleBody: MellomlagringBundle = {
    soknadId: søknadId,
    bundleNavn: dokumentkravId,
    filer: dokumentasjonskravFilerUrn,
  };

  const mellomlagringBundleUrl = `${getEnv("DP_MELLOMLAGRING_URL")}/pdf/bundle`;
  const mellomlagringOboToken = await hentMellomlagringOboToken(request);

  const bundlingResponse = await fetch(mellomlagringBundleUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${mellomlagringOboToken}`,
    },
    body: JSON.stringify(bundleBody),
  });

  if (!bundlingResponse.ok) {
    console.error("Feil ved bundling av dokumentasjonskrav filer");
    return new Response("Feil ved bundling av dokumentasjonskrav filer", { status: 500 });
  }

  const { urn }: MellomlagringBundleResponse = await bundlingResponse.json();

  const lagreBundleUrl = `${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/soknad/${søknadId}/dokumentasjonskrav/${dokumentkravId}/bundle`;
  const orkestratorOboToken = await hentSoknadOrkestratorOboToken(request);

  return await fetch(lagreBundleUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${orkestratorOboToken}`,
    },
    body: JSON.stringify({ urn }),
  });
}
