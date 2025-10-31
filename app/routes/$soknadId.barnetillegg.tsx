import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentPdlBarn as hentBarnFraPdl } from "~/models/hent-barn.server";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjonV2 } from "~/models/lagreSeksjon.server";
import { BarnetilleggProvider } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  Barn,
  BarnetilleggSvar,
  bostedsland,
  erTilbakenavigering,
  etternavn,
  fornavnOgMellomnavn,
  forsørgerDuBarnSomIkkeVisesHer,
  fødselsdato,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnetilleggViewV1 } from "~/seksjon/barnetillegg/v1/BarnetilleggViewV1";
import { normaliserFormData } from "~/utils/action.utils.server";
import { DokumentasjonskravType } from "~/seksjon/dokumentasjon/Dokumentasjonskrav";

export type BarnFraPdl = {
  id: string;
  fornavnOgMellomnavn: string;
  etternavn: string;
  fødselsdato: string;
  bostedsland: string;
};

export type BarnetilleggSeksjon = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

type BarnetilleggResponse = {
  seksjonsId: string;
  seksjon?: BarnetilleggSeksjon;
  dokumentasjonskrav?: DokumentasjonskravType[];
  versjon: number;
};

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "barnetillegg";
const NESTE_SEKSJON_ID = "reell-arbeidssoker";
const FORRIGE_SEKSJON_ID = "utdanning";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<BarnetilleggResponse> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, SEKSJON_ID);

  if (!response.ok) {
    const barnFraPdlResponse = await hentBarnFraPdl(request);

    if (!barnFraPdlResponse.ok) {
      return {
        seksjonsId: SEKSJON_ID,
        versjon: NYESTE_VERSJON,
        seksjon: undefined,
      };
    }

    const barnFraPdlData: BarnFraPdl[] = await barnFraPdlResponse.json();
    const barnFraPdl: Barn[] = barnFraPdlData.map((barn) => {
      return {
        id: barn.id,
        [fornavnOgMellomnavn]: barn.fornavnOgMellomnavn,
        [etternavn]: barn.etternavn,
        [fødselsdato]: barn.fødselsdato,
        [bostedsland]: barn.bostedsland,
      };
    });

    return {
      seksjonsId: SEKSJON_ID,
      versjon: NYESTE_VERSJON,
      seksjon: {
        [forsørgerDuBarnSomIkkeVisesHer]: undefined,
        barnLagtManuelt: [],
        barnFraPdl: barnFraPdl,
      },
    };
  }

  return response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const versjon = formData.get("versjon");
  const seksjonsvar = formData.get("seksjonsvar");
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const dokumentasjonskrav = formData.get("dokumentasjonskrav");

  const putSeksjonRequest = {
    seksjonsvar: JSON.stringify({
      seksjonId: SEKSJON_ID,
      seksjon: normaliserFormData(JSON.parse(seksjonsvar as string)),
      versjon: Number(versjon),
      dokumentasjonskrav: JSON.parse(dokumentasjonskrav as string),
    }),
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjonV2(request, params.soknadId, SEKSJON_ID, putSeksjonRequest);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av barnetillegg",
    };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${FORRIGE_SEKSJON_ID}`);
  }

  return redirect(`/${params.soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function BarntilleggRoute() {
  const { soknadId } = useParams();
  const { versjon, seksjon, dokumentasjonskrav } = useLoaderData<typeof loader>();

  const loaderData = useLoaderData<typeof loader>();
  // console.log(`🔥 loaderData :`, loaderData);

  switch (versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjon?.barnFraPdl || []}
          barnLagtManuelt={seksjon?.barnLagtManuelt || []}
          dokumentasjonskrav={dokumentasjonskrav || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
    default:
      console.error(`Ukjent versjonsnummer: ${versjon} for barnetillegg for søknaden ${soknadId}`);
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjon?.barnFraPdl || []}
          barnLagtManuelt={seksjon?.barnLagtManuelt || []}
          dokumentasjonskrav={dokumentasjonskrav || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
  }
}
