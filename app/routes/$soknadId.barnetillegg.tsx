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
  erTilbakenavigering,
} from "~/seksjon/barnetillegg/v1/barnetillegg.komponenter";
import { BarnetilleggViewV1 } from "~/seksjon/barnetillegg/v1/BarnetilleggViewV1";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";

export type SeksjonSvar = BarnetilleggSvar & {
  barnFraPdl?: BarnFraPdl[];
  barnLagtManuelt?: BarnLagtManuelt[];
};

export type BarnetilleggSeksjon = {
  seksjonsvar: {
    seksjonId: string;
    versjon: number;
    seksjon?: SeksjonSvar;
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
    const { seksjonsvar, dokumentasjonskrav } = await seksjonResponse.json();

    return {
      seksjonsvar: seksjonsvar,
      dokumentasjonskrav: dokumentasjonskrav,
    };
  }

  const barnFraPdlResponse = await hentBarnFraPdl(request);

  if (!barnFraPdlResponse.ok) {
    return {
      seksjonsvar: {
        seksjonId: SEKSJON_ID,
        versjon: NYESTE_VERSJON,
      },
      dokumentasjonskrav: null,
    };
  }

  const barnFraPdl: BarnFraPdl[] = await barnFraPdlResponse.json();

  return {
    seksjonsvar: {
      seksjonId: SEKSJON_ID,
      versjon: NYESTE_VERSJON,
      seksjon: {
        barnFraPdl: barnFraPdl,
      },
    },
    dokumentasjonskrav: null,
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonsvar = formData.get("seksjonsvar");
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");
  const dokumentasjonskrav = formData.get("dokumentasjonskrav");

  const putSeksjonRequestBody = {
    seksjonsvar: JSON.stringify({
      seksjonId: SEKSJON_ID,
      versjon: Number(versjon),
      seksjon: seksjonsvar ? JSON.parse(seksjonsvar as string) : undefined,
    }),
    dokumentasjonskrav: dokumentasjonskrav,
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjon(request, params.soknadId, SEKSJON_ID, putSeksjonRequestBody);

  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av seksjonen" };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${FORRIGE_SEKSJON_ID}`);
  }

  return redirect(`/${params.soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function BarntilleggRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjonsvar, dokumentasjonskrav } = loaderData;
  const { soknadId } = useParams();

  switch (seksjonsvar?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjonsvar?.seksjon?.barnFraPdl ?? []}
          barnLagtManuelt={seksjonsvar?.seksjon?.barnLagtManuelt ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjonsvar?.versjon} for barnetillegg for søknaden ${soknadId}`
      );
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjonsvar?.seksjon?.barnFraPdl ?? []}
          barnLagtManuelt={seksjonsvar?.seksjon?.barnLagtManuelt ?? []}
          dokumentasjonskrav={dokumentasjonskrav ?? []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
  }
}
