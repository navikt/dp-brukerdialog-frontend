import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentBarn } from "~/models/hent-barn.server";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { BarnetilleggProvider } from "~/seksjon/barnetillegg/v1/barnetillegg.context";
import {
  Barn,
  barnetilleggSpørsmål,
  BarnetilleggSvar,
  erTilbakenavigering,
  forsørgerDuBarnSomIkkeVisesHer,
  leggTilBarnManueltSpørsmål,
} from "~/seksjon/barnetillegg/v1/barnetillegg.spørsmål";
import { BarnetilleggViewV1 } from "~/seksjon/barnetillegg/v1/BarnetilleggViewV1";

export type BarnetilleggResponse = BarnetilleggSvar & {
  barnFraPdl?: Barn[];
  barnLagtManuelt?: Barn[];
};

type BarnetilleggResponseType = {
  versjon: number;
  seksjon: BarnetilleggResponse | undefined;
};

const NYESTE_VERSJON = 1;

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<BarnetilleggResponseType> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "barnetillegg");

  if (!response.ok) {
    const barnFraPdlResponse = await hentBarn(request);

    if (!barnFraPdlResponse.ok) {
      return {
        versjon: NYESTE_VERSJON,
        seksjon: undefined,
      };
    }

    return {
      versjon: NYESTE_VERSJON,
      seksjon: {
        [forsørgerDuBarnSomIkkeVisesHer]: undefined,
        barnLagtManuelt: [],
        barnFraPdl: await barnFraPdlResponse.json(),
      },
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonId = "barnetillegg";
  const nesteSeksjonId = "reell-arbeidssoker";
  const forrigeSeksjonId = "utdanning";
  const payload = formData.get("payload");
  const seksjonsData = JSON.parse(payload as string);

  const brutto = Object.entries(seksjonsData).map(([key, value]) => {
    const tilhørendeSpørsmål =
      barnetilleggSpørsmål.find((spørsmål) => {
        return spørsmål.id === key;
      }) ||
      leggTilBarnManueltSpørsmål.find((spørsmål) => {
        return spørsmål.id === key;
      });

    return {
      id: tilhørendeSpørsmål?.id,
      type: tilhørendeSpørsmål?.type,
      label: tilhørendeSpørsmål?.label,
      description: tilhørendeSpørsmål?.description,
      options: (tilhørendeSpørsmål as any)?.options,
      svar: value,
    };
  });

  const netto = Object.entries(seksjonsData).map(([key, value]) => {
    const tilhørendeSpørsmål =
      barnetilleggSpørsmål.find((spørsmål) => {
        return spørsmål.id === key;
      }) ||
      leggTilBarnManueltSpørsmål.find((spørsmål) => {
        return spørsmål.id === key;
      });

    return {
      id: key,
      verdi: value,
      label: tilhørendeSpørsmål?.label,
    };
  });

  const alt = {
    netto: netto,
    brutto: brutto,
  };

  console.log(JSON.stringify(alt));

  const versjon = formData.get("versjon");
  const seksjonsDataMedVersjon = {
    seksjon: seksjonsData,
    versjon: Number(versjon),
  };

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsDataMedVersjon);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${forrigeSeksjonId}`);
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export default function BarntilleggRoute() {
  const loaderData: BarnetilleggResponseType = useLoaderData<typeof loader>();
  const seksjon: BarnetilleggResponse = loaderData?.seksjon ?? {};
  const { soknadId } = useParams();

  switch (loaderData?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjon?.barnFraPdl || []}
          barnLagtManuelt={seksjon?.barnLagtManuelt || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.versjon} for barnetillegg for søknaden ${soknadId}`
      );
      return (
        <BarnetilleggProvider
          barnFraPdl={seksjon?.barnFraPdl || []}
          barnLagtManuelt={seksjon?.barnLagtManuelt || []}
        >
          <BarnetilleggViewV1 />
        </BarnetilleggProvider>
      );
  }
}
