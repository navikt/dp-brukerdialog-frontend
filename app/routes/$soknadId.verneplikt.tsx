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
import { handling, VernepliktSvar } from "~/seksjon/verneplikt/v1/verneplikt.komponenter";
import VernepliktViewV1 from "~/seksjon/verneplikt/v1/VernepliktViewV1";
import { normaliserFormData } from "~/utils/action.utils.server";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "verneplikt";
const NESTE_SEKSJON_ID = "utdanning";
const FORRIGE_SEKSJON_ID = "egen-naring";

export type BarnetilleggSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: VernepliktSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<BarnetilleggSeksjon> {
  invariant(params.soknadId, "SøknadID er påkrevd");

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
  invariant(params.soknadId, "SøknadID er påkrevd");

  const formData = await request.formData();
  const filtrertEntries = Array.from(formData.entries()).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== "undefined" &&
      key !== "versjon" &&
      key !== handling &&
      key !== "pdfGrunnlag"
  );
  const seksjonsData = Object.fromEntries(filtrertEntries);
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");
  const dokumentasjonskrav = formData.get("dokumentasjonskrav");

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      seksjonsvar: normaliserFormData(seksjonsData),
      versjon: Number(versjon),
    }),
    dokumentasjonskrav: dokumentasjonskrav === "null" ? null : dokumentasjonskrav,
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjon(request, params.soknadId, SEKSJON_ID, putSeksjonRequestBody);

  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av seksjonen" };
  }

  if (formData.get(handling) === Seksjonshandling.fortsettSenere) {
    return null;
  }

  if (formData.get(handling) === Seksjonshandling.tilbakenavigering) {
    return redirect(`/${params.soknadId}/${FORRIGE_SEKSJON_ID}`);
  }

  return redirect(`/${params.soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function VernepliktRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { soknadId } = useParams();

  switch (loaderData?.seksjon?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <VernepliktViewV1 />;
    default:
      console.error(
        `Ukjent versjonsnummer: ${loaderData.seksjon?.versjon} for verneplikt for søknaden ${soknadId}`
      );
      return <VernepliktViewV1 />;
  }
}
