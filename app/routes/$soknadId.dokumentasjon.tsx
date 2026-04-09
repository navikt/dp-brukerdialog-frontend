import { LoaderFunctionArgs, redirect, useLoaderData, useParams } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { DokumentasjonskravProvider } from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.context";
import { DokumentasjonViewV1 } from "~/seksjon/dokumentasjon/v1/DokumentasjonViewV1";

export type DokumentasjonskravSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
  };
  dokumentasjonskrav: Dokumentasjonskrav[];
};

export const NYESTE_VERSJON = 1;
export const SEKSJON_ID = "Dokumentasjon";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<DokumentasjonskravSeksjon | Response> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);
  const seksjonResponse = await hentSeksjon(request, params.soknadId, SEKSJON_ID);

  if (!dokumentasjonskravResponse.ok) {
    return redirect(`/${params.soknadId}/oppsummering`);
  }

  const dokumentasjonJson = await dokumentasjonskravResponse.json();
  const parsedDokumentasjonskrav = dokumentasjonJson.flatMap((krav: string) => JSON.parse(krav));

  if (dokumentasjonJson === null) {
    return redirect(`/${params.soknadId}/oppsummering`);
  }

  if (dokumentasjonskravResponse.ok && seksjonResponse.ok) {
    const seksjonData = await seksjonResponse.json();

    return {
      seksjon: {
        seksjonId: seksjonData.seksjonId,
        versjon: seksjonData.versjon,
      },
      dokumentasjonskrav: parsedDokumentasjonskrav,
    };
  }

  return {
    seksjon: {
      seksjonId: SEKSJON_ID,
      versjon: NYESTE_VERSJON,
    },
    dokumentasjonskrav: parsedDokumentasjonskrav,
  };
}

export default function DokumentasjonSide() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <DokumentasjonskravProvider dokumentasjonskrav={loaderData.dokumentasjonskrav}>
          <DokumentasjonViewV1 />
        </DokumentasjonskravProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon?.versjon} for søknadId: ${soknadId} i seksjonId: ${seksjon?.seksjonId}`
      );
      return (
        <DokumentasjonskravProvider dokumentasjonskrav={loaderData.dokumentasjonskrav}>
          <DokumentasjonViewV1 />
        </DokumentasjonskravProvider>
      );
  }
}
