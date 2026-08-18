import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useParams } from "react-router";
import invariant from "tiny-invariant";
import { hentBarnFraPdl } from "~/models/hent-barn-fra-pdl.server";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { BarnetilleggProvider } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  BarnetilleggSvar,
  BarnFraPdl,
  BarnLagtManuelt,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { BarnetilleggViewV1 } from "~/seksjon/barnetillegg/v1/BarnetilleggViewV1";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { navigerEtterLagring } from "~/utils/action.utils.server";
import { seksjonshandlingSchema } from "~/utils/Seksjonshandling";
import { hentSeksjonConfig } from "~/seksjon/seksjoner.config";

export type SeksjonSvar = BarnetilleggSvar & {
  barnFraPdl?: BarnFraPdl[] | null;
  barnLagtManuelt?: BarnLagtManuelt[] | null;
};

export type BarnetilleggSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: SeksjonSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

const { seksjonId, nyesteVersjon, nesteSeksjonId, forrigeSeksjonId } =
  hentSeksjonConfig("barnetillegg");

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<BarnetilleggSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const seksjonResponse = await hentSeksjon(request, params.soknadId, seksjonId);

  if (seksjonResponse.ok) {
    return await seksjonResponse.json();
  }

  const barnFraPdlResponse = await hentBarnFraPdl(request);

  if (!barnFraPdlResponse.ok) {
    return {
      seksjon: {
        seksjonId,
        versjon: nyesteVersjon,
      },
      dokumentasjonskrav: null,
    };
  }

  const barnFraPdl: BarnFraPdl[] = await barnFraPdlResponse.json();

  return {
    seksjon: {
      seksjonId,
      versjon: nyesteVersjon,
      seksjonsvar: {
        barnFraPdl: barnFraPdl,
      },
    },
    dokumentasjonskrav: null,
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonsvar = formData.get("seksjonsvar") as string;
  const pdfGrunnlag = formData.get("pdfGrunnlag") as string;
  const dokumentasjonskrav = formData.get("dokumentasjonskrav") as string;
  const versjon = formData.get("versjon") as string;
  const handling = seksjonshandlingSchema.parse(formData.get("handling"));

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId,
      versjon: Number(versjon),
      seksjonsvar: JSON.parse(seksjonsvar),
    }),
    dokumentasjonskrav: dokumentasjonskrav === "null" ? null : dokumentasjonskrav,
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, putSeksjonRequestBody);

  if (response.status !== 200) {
    return {
      error: "Vi klarte ikke å lagre dine svar. Vennligst prøv igjen.",
    };
  }

  invariant(nesteSeksjonId, `Mangler neste seksjon for ${seksjonId}`);
  invariant(forrigeSeksjonId, `Mangler forrige seksjon for ${seksjonId}`);

  return navigerEtterLagring(params.soknadId, handling, nesteSeksjonId, forrigeSeksjonId);
}

export default function BarntilleggSeksjon() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon, dokumentasjonskrav } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? nyesteVersjon) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjon?.seksjonsvar?.barnFraPdl ?? []}
          barnLagtManuelt={seksjon?.seksjonsvar?.barnLagtManuelt ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon?.versjon} for søknadId: ${soknadId} i seksjonId: ${seksjon?.seksjonId}`
      );
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjon?.seksjonsvar?.barnFraPdl ?? []}
          barnLagtManuelt={seksjon?.seksjonsvar?.barnLagtManuelt ?? []}
          dokumentasjonskrav={dokumentasjonskrav ?? []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
  }
}
