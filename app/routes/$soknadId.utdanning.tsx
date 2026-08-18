import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useParams } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { UtdanningSvar } from "~/seksjon/utdanning/v1/utdanning.komponenter";
import { UtdanningViewV1 } from "~/seksjon/utdanning/v1/UtdanningViewV1";
import {
  filtrerSeksjonsvar,
  navigerEtterLagring,
  normaliserFormData,
} from "~/utils/action.utils.server";
import { seksjonshandlingSchema } from "~/utils/Seksjonshandling";
import { hentSeksjonConfig, hentSeksjonNavigasjon } from "./seksjoner.config";

const { seksjonId, nyesteVersjon } = hentSeksjonConfig("utdanning");
const { nesteSeksjonId, forrigeSeksjonId } = hentSeksjonNavigasjon(seksjonId);

type UtdanningSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: UtdanningSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

export async function loader({ request, params }: LoaderFunctionArgs): Promise<UtdanningSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, seksjonId);

  if (response.ok) {
    return await response.json();
  }

  return {
    seksjon: {
      seksjonId,
      versjon: nyesteVersjon,
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
  const dokumentasjonskrav = formData.get("dokumentasjonskrav");
  const handling = seksjonshandlingSchema.parse(formData.get("handling"));

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId,
      seksjonsvar: normaliserFormData(seksjonsvar),
      versjon: Number(versjon),
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

export default function UtdanningSeksjon() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? nyesteVersjon) {
    case 1:
      return <UtdanningViewV1 />;
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon?.versjon} for søknadId: ${soknadId} i seksjonId: ${seksjon?.seksjonId}`
      );
      return <UtdanningViewV1 />;
  }
}
