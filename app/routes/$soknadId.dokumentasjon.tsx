import { LoaderFunctionArgs, redirect, useLoaderData, useParams } from "react-router";
import invariant from "tiny-invariant";
import { hentDokumentasjonskrav } from "~/models/hent-dokumentasjonskrav.server";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { DokumentasjonskravProvider } from "~/seksjon/dokumentasjon/v1/dokumentasjonskrav.context";
import { DokumentasjonViewV1 } from "~/seksjon/dokumentasjon/v1/DokumentasjonViewV1";
import { hentSeksjonKonfig } from "~/seksjon/seksjoner.konfig";

export type DokumentasjonskravSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
  };
  dokumentasjonskrav: Dokumentasjonskrav[];
};

const { seksjonId, nyesteVersjon, nesteSeksjonId } = hentSeksjonKonfig("dokumentasjon");

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<DokumentasjonskravSeksjon | Response> {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  invariant(nesteSeksjonId, `Mangler neste seksjon for ${seksjonId}`);

  const dokumentasjonskravResponse = await hentDokumentasjonskrav(request, params.soknadId);
  const seksjonResponse = await hentSeksjon(request, params.soknadId, seksjonId);

  if (!dokumentasjonskravResponse.ok) {
    return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
  }

  const dokumentasjonJson = await dokumentasjonskravResponse.json();
  const parsedDokumentasjonskrav = dokumentasjonJson.flatMap((krav: string) => JSON.parse(krav));

  if (dokumentasjonJson === null) {
    return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
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
      seksjonId,
      versjon: nyesteVersjon,
    },
    dokumentasjonskrav: parsedDokumentasjonskrav,
  };
}

export default function DokumentasjonSide() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? nyesteVersjon) {
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
