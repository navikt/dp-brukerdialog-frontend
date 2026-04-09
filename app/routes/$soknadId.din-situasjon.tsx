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
import { DinSituasjonSvar, handling } from "~/seksjon/din-situasjon/v1/din-situasjon.komponenter";
import { DinSituasjonViewV1 } from "~/seksjon/din-situasjon/v1/DinSituasjonViewV1";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import {
  filtrerSeksjonsvar,
  navigerEtterLagring,
  normaliserFormData,
} from "~/utils/action.utils.server";
import { Seksjonshandling, seksjonshandlingSchema } from "~/utils/Seksjonshandling";

export type DinSituasjonSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: DinSituasjonSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "din-situasjon";
const NESTE_SEKSJON_ID = "arbeidsforhold";
const FORRIGE_SEKSJON_ID = "personalia";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<DinSituasjonSeksjon> {
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
  const seksjonsvar = filtrerSeksjonsvar(formData);
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");
  const handling = seksjonshandlingSchema.parse(formData.get("handling"));

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      seksjonsvar: normaliserFormData(seksjonsvar),
      versjon: Number(versjon),
    }),
    dokumentasjonskrav: null,
    pdfGrunnlag: pdfGrunnlag,
  };

  const response = await lagreSeksjon(request, params.soknadId, SEKSJON_ID, putSeksjonRequestBody);

  if (response.status !== 200) {
    return {
      error: "Vi klarte ikke å lagre dine svar. Vennligst prøv igjen.",
    };
  }

  return navigerEtterLagring(params.soknadId, handling, NESTE_SEKSJON_ID, FORRIGE_SEKSJON_ID);
}

export default function DinSituasjonSeksjon() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return <DinSituasjonViewV1 />;
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon?.versjon} for søknadId: ${soknadId} i seksjonId: ${seksjon?.seksjonId}`
      );
      return <DinSituasjonViewV1 />;
  }
}
