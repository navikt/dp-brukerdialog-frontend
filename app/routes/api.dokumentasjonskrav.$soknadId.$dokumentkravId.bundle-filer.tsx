import { ActionFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentMellomlagringOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

type MellomlagringBundle = {
  soknadId: string;
  bundleNavn: string;
  filer: Urn[];
};

type Urn = {
  urn: string;
};

// Dette er hva bundle endepunkt returnerer
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

  const formData = await request.formData();
  const dokumentasjonskravFiler = formData.get("dokumentasjonskravFiler") as string;
  const dokumentasjonskravFilerUrn: Urn[] = JSON.parse(dokumentasjonskravFiler).map((fil: Urn) => {
    return { urn: fil.urn };
  });

  const body: MellomlagringBundle = {
    soknadId: params.soknadId,
    bundleNavn: params.dokumentkravId,
    filer: dokumentasjonskravFilerUrn,
  };

  const url = `${getEnv("DP_MELLOMLAGRING_URL")}/pdf/bundle`;
  const onBehalfOfToken = await hentMellomlagringOboToken(request);

  // kanskje ikke return her, men ta være på response og bruke response data til å sendle bundle til dp-soknad
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${onBehalfOfToken}`,
    },
    body: JSON.stringify(body),
  });

  // const dpSoknadResponse = await sendBundleTilDpSoknad(
  //   uuid,
  //   dokumentkravId,
  //   urn,
  //   soknadOnBehalfOf.token,
  //   requestId
  // );
}
