import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useParams } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { ArbeidsforholdProvider } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  Arbeidsforhold,
  ArbeidsforholdSvar,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { ArbeidsforholdViewV1 } from "~/seksjon/arbeidsforhold/v1/ArbeidsforholdViewV1";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { navigerEtterLagring, normaliserFormData } from "~/utils/action.utils.server";
import { seksjonshandlingSchema } from "~/utils/Seksjonshandling";
import { ArbeidsforholdViewV2 } from "~/seksjon/arbeidsforhold/v2/ArbeidsforholdViewV2";
import { ArbeidsforholdProviderV2 } from "~/seksjon/arbeidsforhold/v2/arbeidsforhold.context";
import { hentSeksjonConfig, hentSeksjonNavigasjon } from "~/seksjon/seksjoner.config";

export type SeksjonSvar = ArbeidsforholdSvar & {
  registrerteArbeidsforhold?: Arbeidsforhold[];
};

export type ArbeidsforholdSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: SeksjonSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

const { seksjonId, nyesteVersjon } = hentSeksjonConfig("arbeidsforhold");
const { nesteSeksjonId, forrigeSeksjonId } = hentSeksjonNavigasjon(seksjonId);

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ArbeidsforholdSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, seksjonId);

  if (!response.ok) {
    return {
      seksjon: {
        seksjonId,
        versjon: nyesteVersjon,
        seksjonsvar: undefined,
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
  const versjon = formData.get("versjon");
  const handling = seksjonshandlingSchema.parse(formData.get("handling"));
  const dokumentasjonskrav = formData.get("dokumentasjonskrav") as string;

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId,
      seksjonsvar: normaliserFormData(JSON.parse(seksjonsvar as string)),
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

export default function ArbeidsforholdSeksjon() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? nyesteVersjon) {
    case 1:
      return (
        <ArbeidsforholdProvider
          registrerteArbeidsforhold={seksjon?.seksjonsvar?.registrerteArbeidsforhold ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
        >
          <ArbeidsforholdViewV1 />
        </ArbeidsforholdProvider>
      );
    case 2:
      return (
        <ArbeidsforholdProviderV2
          registrerteArbeidsforhold={seksjon?.seksjonsvar?.registrerteArbeidsforhold ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
        >
          <ArbeidsforholdViewV2 />
        </ArbeidsforholdProviderV2>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon?.versjon} for søknadId: ${soknadId} i seksjonId: ${seksjon?.seksjonId}`
      );
      return (
        <ArbeidsforholdProviderV2
          registrerteArbeidsforhold={seksjon?.seksjonsvar?.registrerteArbeidsforhold ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
        >
          <ArbeidsforholdViewV2 />
        </ArbeidsforholdProviderV2>
      );
  }
}
