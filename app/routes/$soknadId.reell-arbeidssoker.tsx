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
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import {
  erTilbakenavigering,
  ReellArbeidssøkerSvar,
} from "~/seksjon/reell-arbeidssøker/v1/reell-arbeidssøker.komponenter";
import { ReellArbeidssøkerViewV1 } from "~/seksjon/reell-arbeidssøker/v1/ReellArbeidssøkerViewV1";
import { normaliserFormData } from "~/utils/action.utils.server";

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "reell-arbeidssoker";
const NESTE_SEKSJON_ID = "tilleggsopplysninger";
const FORRIGE_SEKSJON_ID = "barnetillegg";

type ReellArbeidssøkereksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: ReellArbeidssøkerSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ReellArbeidssøkereksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, SEKSJON_ID);

  if (response.ok) {
    return await response.json();
  }

  return {
    seksjon: {
      seksjonId: SEKSJON_ID,
      versjon: NYESTE_VERSJON,
    },
    dokumentasjonskrav: null,
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== "undefined" &&
      key !== "versjon" &&
      key !== erTilbakenavigering &&
      value !== "pdfGrunnlag"
  );

  const seksjonsData = normaliserFormData(Object.fromEntries(filtrertEntries));
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      seksjonsvar: normaliserFormData(seksjonsData),
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

export default function ReellArbeidssøkerRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.seksjon.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <ReellArbeidssøkerViewV1 />;
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.seksjon.versjon} for reell-arbeidssøker for søknaden ${soknadId}`
      );
      return <ReellArbeidssøkerViewV1 />;
  }
}
