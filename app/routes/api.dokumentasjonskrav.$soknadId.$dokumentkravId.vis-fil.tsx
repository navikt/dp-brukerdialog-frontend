import { LoaderFunctionArgs } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { hentMellomlagringOboToken } from "~/utils/auth.utils.server";
import { getEnv } from "~/utils/env.utils";

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(params.dokumentkravId, "Dokumentkrav ID er påkrevd");

  const kravResponse = await hentDokumentasjonskrav(request, params.soknadId);

  if (!kravResponse.ok) {
    throw new Response("Kunne ikke hente dokumentasjonskrav", {
      status: kravResponse.status,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const dokumentasjonskravJson: string[] = await kravResponse.json();
  const dokumentasjonskravene: Dokumentasjonskrav[] = dokumentasjonskravJson.flatMap((krav) =>
    JSON.parse(krav)
  );
  const krav = dokumentasjonskravene.find((krav) => krav.id === params.dokumentkravId);

  if (!krav?.bundle?.filsti) {
    throw new Response("Fant ikke dokumentet", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const token = await hentMellomlagringOboToken(request);
  const response = await fetch(`${getEnv("DP_MELLOMLAGRING_URL")}/vedlegg/${krav.bundle.filsti}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Response("Kunne ikke hente dokumentet", {
      status: response.status,
      headers: { "Cache-Control": "no-store" },
    });
  }

  return new Response(response.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="dokument.pdf"',
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
