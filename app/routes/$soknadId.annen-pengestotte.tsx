import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useParams,
} from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { PengestøtteFraAndreEøsLandModalSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import { PengestøtteFraNorgeModalSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { AnnenPengestøtteProvider } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import {
  AnnenPengestøtteSvar,
  erTilbakenavigering,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { AnnenPengestøtteViewV1 } from "~/seksjon/annen-pengestøtte/v1/AnnenPengestøtteViewV1";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { normaliserFormData } from "~/utils/action.utils.server";

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "annen-pengestotte";
const NESTE_SEKSJON_ID = "egen-naring";
const FORRIGE_SEKSJON_ID = "arbeidsforhold";

export type SeksjonSvar = AnnenPengestøtteSvar & {
  pengestøtteFraAndreEøsLand?: PengestøtteFraAndreEøsLandModalSvar[];
  pengestøtteFraNorge?: PengestøtteFraNorgeModalSvar[];
};

export type AnnenPengestøtteSeksjon = {
  seksjonsvar: {
    seksjonId: string;
    versjon: number;
    seksjon?: SeksjonSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<AnnenPengestøtteSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, SEKSJON_ID);

  if (!response.ok) {
    return {
      seksjonsvar: {
        seksjonId: SEKSJON_ID,
        versjon: NYESTE_VERSJON,
      },
      dokumentasjonskrav: null,
    };
  }

  return await response.json();
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const seksjonsvar = formData.get("seksjonsvar");
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");

  const putSeksjonRequestBody = {
    seksjonsvar: JSON.stringify({
      seksjonId: SEKSJON_ID,
      seksjon: normaliserFormData(JSON.parse(seksjonsvar as string)),
      versjon: Number(versjon),
    }),
    dokumentasjonskrav: null,
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

export default function AnnenPengestøtteRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjonsvar } = loaderData;
  const { soknadId } = useParams();

  switch (seksjonsvar?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <AnnenPengestøtteProvider
          pengestøtteFraAndreEøsLand={seksjonsvar?.seksjon?.pengestøtteFraAndreEøsLand ?? []}
          pengestøtteFraNorge={seksjonsvar?.seksjon?.pengestøtteFraNorge ?? []}
        >
          <AnnenPengestøtteViewV1 />
        </AnnenPengestøtteProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.seksjonsvar?.versjon} for annen-pengestøtte for søknaden ${soknadId}`
      );
      return (
        <AnnenPengestøtteProvider
          pengestøtteFraAndreEøsLand={seksjonsvar?.seksjon?.pengestøtteFraAndreEøsLand ?? []}
          pengestøtteFraNorge={loaderData?.seksjonsvar?.seksjon?.pengestøtteFraNorge ?? []}
        >
          <AnnenPengestøtteViewV1 />
        </AnnenPengestøtteProvider>
      );
  }
}
