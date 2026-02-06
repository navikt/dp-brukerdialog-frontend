import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
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
import { handling } from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

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

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "barnetillegg";
const NESTE_SEKSJON_ID = "reell-arbeidssoker";
const FORRIGE_SEKSJON_ID = "utdanning";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<BarnetilleggSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const seksjonResponse = await hentSeksjon(request, params.soknadId, SEKSJON_ID);

  if (seksjonResponse.ok) {
    return await seksjonResponse.json();
  }

  const barnFraPdlResponse = await hentBarnFraPdl(request);

  if (!barnFraPdlResponse.ok) {
    return {
      seksjon: {
        seksjonId: SEKSJON_ID,
        versjon: NYESTE_VERSJON,
      },
      dokumentasjonskrav: null,
    };
  }

  const barnFraPdl: BarnFraPdl[] = await barnFraPdlResponse.json();

  return {
    seksjon: {
      seksjonId: SEKSJON_ID,
      versjon: NYESTE_VERSJON,
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

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      versjon: Number(versjon),
      seksjonsvar: JSON.parse(seksjonsvar),
    }),
    dokumentasjonskrav: dokumentasjonskrav === "null" ? null : dokumentasjonskrav,
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjon(request, params.soknadId, SEKSJON_ID, putSeksjonRequestBody);

  if (response.status !== 200) {
    return {
      error:
        "Det har oppstått en teknisk feil. Vi klarte ikke å lagre dine svar. Vennligst prøv igjen.",
    };
  }

  if (formData.get(handling) === Seksjonshandling.fortsettSenere) {
    return null;
  }

  if (formData.get(handling) === Seksjonshandling.tilbakenavigering) {
    return redirect(`/${params.soknadId}/${FORRIGE_SEKSJON_ID}`);
  }

  return redirect(`/${params.soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function BarntilleggRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon, dokumentasjonskrav } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? NYESTE_VERSJON) {
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
        `Ukjent versjonsnummer: ${seksjon?.versjon} for barnetillegg for søknaden ${soknadId}`
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
