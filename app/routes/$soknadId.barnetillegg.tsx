import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentPdlBarn } from "~/models/hent-barnPdlBarn.server";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjonV2 } from "~/models/lagreSeksjon.server";
import { BarnetilleggProvider } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  BarnetilleggSvar,
  BarnFraPdlType,
  BarnLagtManueltType,
  erTilbakenavigering,
  forsørgerDuBarnSomIkkeVisesHer,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnetilleggViewV1 } from "~/seksjon/barnetillegg/v1/BarnetilleggViewV1";
import { DokumentasjonskravType } from "~/seksjon/dokumentasjon/Dokumentasjonskrav";
import { normaliserFormData } from "~/utils/action.utils.server";

export type SeksjonSvar = BarnetilleggSvar & {
  barnFraPdl?: BarnFraPdlType[];
  barnLagtManuelt?: BarnLagtManueltType[];
};

type BarnetilleggSeksjon = {
  id: string;
  svar?: SeksjonSvar;
  dokumentasjonskrav?: DokumentasjonskravType[];
  versjon: number;
};

export type BarnFraPdlResponse = {
  id: string;
  fornavnOgMellomnavn: string;
  etternavn: string;
  fødselsdato: string;
  bostedsland: string;
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

  const response = await hentSeksjon(request, params.soknadId, SEKSJON_ID);

  if (!response.ok) {
    const barnFraPdlResponse = await hentPdlBarn(request);

    if (!barnFraPdlResponse.ok) {
      return {
        id: SEKSJON_ID,
        svar: undefined,
        versjon: NYESTE_VERSJON,
      };
    }

    const barnFraPdl: BarnFraPdlType[] = await barnFraPdlResponse.json();

    return {
      id: SEKSJON_ID,
      svar: {
        barnLagtManuelt: [],
        barnFraPdl: barnFraPdl,
        [forsørgerDuBarnSomIkkeVisesHer]: undefined,
      },
      versjon: NYESTE_VERSJON,
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
      id: SEKSJON_ID,
      svar: normaliserFormData(JSON.parse(seksjonsvar as string)),
      dokumentasjonskrav: JSON.parse(dokumentasjonskrav as string),
      versjon: Number(versjon),
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
  const { versjon, svar, dokumentasjonskrav } = useLoaderData<typeof loader>();

  switch (versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={svar?.barnFraPdl || []}
          barnLagtManuelt={svar?.barnLagtManuelt || []}
          dokumentasjonskrav={dokumentasjonskrav || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
    default:
      console.error(`Ukjent versjonsnummer: ${versjon} for barnetillegg for søknaden ${soknadId}`);
      return (
        <BarnetilleggProvider
          barnFraPdl={svar?.barnFraPdl || []}
          barnLagtManuelt={svar?.barnLagtManuelt || []}
          dokumentasjonskrav={dokumentasjonskrav || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
  }
}
