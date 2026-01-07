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

export async function action({ params, request }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.dokumentkravId, "Dokumentkrav ID er påkrevd");

  const søknadId = params.soknadId;
  const dokumentkravId = params.dokumentkravId;

  const formData = await request.formData();
  const filer = formData.get("filer") as string;
  const filerUrl: Urn[] = JSON.parse(filer).map((fil: Urn) => {
    return { urn: fil.urn };
  });

  const bundleBody: MellomlagringBundle = {
    soknadId: søknadId,
    bundleNavn: dokumentkravId,
    filer: filerUrl,
  };

  const mellomlagringBundleUrl = `${getEnv("DP_MELLOMLAGRING_URL")}/pdf/bundle`;
  const mellomlagringOboToken = await hentMellomlagringOboToken(request);

  return await fetch(mellomlagringBundleUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${mellomlagringOboToken}`,
    },
    body: JSON.stringify(bundleBody),
  });
}
