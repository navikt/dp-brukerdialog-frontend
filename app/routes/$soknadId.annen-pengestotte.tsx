import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useParams } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { AnnenPengestøtteProvider } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { AnnenPengestøtteSvar } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.komponent";
import { AnnenPengestøtteViewV1 } from "~/seksjon/annen-pengestøtte/v1/AnnenPengestøtteViewV1";
import { PengestøtteFraAndreEøsLand } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraAndreEøsLandModal";
import { PengestøtteFraNorge } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraNorgeModal";
import { PengestøtteFraTidligereArbeidsgiver } from "~/seksjon/annen-pengestøtte/v1/komponenter/PengestøtteFraTidligereArbeidsgiverModal";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { navigerEtterLagring, normaliserFormData } from "~/utils/action.utils.server";
import { seksjonshandlingSchema } from "~/utils/Seksjonshandling";

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "annen-pengestotte";
const NESTE_SEKSJON_ID = "egen-naring";
const FORRIGE_SEKSJON_ID = "arbeidsforhold";

export type SeksjonSvar = AnnenPengestøtteSvar & {
  pengestøtteFraTidligereArbeidsgiver?: PengestøtteFraTidligereArbeidsgiver[];
  pengestøtteFraAndreEøsLand?: PengestøtteFraAndreEøsLand[];
  pengestøtteFraNorge?: PengestøtteFraNorge[];
};

export type AnnenPengestøtteSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: SeksjonSvar;
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
      seksjon: {
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
  const seksjonsvar = formData.get("seksjonsvar");
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const dokumentasjonskrav = formData.get("dokumentasjonskrav") as string;
  const versjon = formData.get("versjon");
  const handling = seksjonshandlingSchema.parse(formData.get("handling"));

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      seksjonsvar: normaliserFormData(JSON.parse(seksjonsvar as string)),
      versjon: Number(versjon),
    }),
    dokumentasjonskrav: dokumentasjonskrav === "null" ? null : dokumentasjonskrav,
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

export default function AnnenPengestøtteSeksjon() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <AnnenPengestøtteProvider
          pengestøtteFraTidligereArbeidsgiver={
            seksjon?.seksjonsvar?.pengestøtteFraTidligereArbeidsgiver ?? []
          }
          pengestøtteFraAndreEøsLand={seksjon?.seksjonsvar?.pengestøtteFraAndreEøsLand ?? []}
          pengestøtteFraNorge={seksjon?.seksjonsvar?.pengestøtteFraNorge ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
        >
          <AnnenPengestøtteViewV1 />
        </AnnenPengestøtteProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon?.versjon} for søknadId: ${soknadId} i seksjonId: ${seksjon?.seksjonId}`
      );
      return (
        <AnnenPengestøtteProvider
          pengestøtteFraTidligereArbeidsgiver={
            seksjon?.seksjonsvar?.pengestøtteFraTidligereArbeidsgiver ?? []
          }
          pengestøtteFraAndreEøsLand={seksjon?.seksjonsvar?.pengestøtteFraAndreEøsLand ?? []}
          pengestøtteFraNorge={seksjon?.seksjonsvar?.pengestøtteFraNorge ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
        >
          <AnnenPengestøtteViewV1 />
        </AnnenPengestøtteProvider>
      );
  }
}
