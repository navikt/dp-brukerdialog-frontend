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
import { hentSeksjonKonfig } from "~/seksjon/seksjoner.konfig";
import { hentArbeidsforhold } from "~/models/hent-arbeidsforhold";
import { ArbeidsforholdProviderV3 } from "~/seksjon/arbeidsforhold/v3/arbeidsforhold.context";
import { ArbeidsforholdViewV3 } from "~/seksjon/arbeidsforhold/v3/ArbeidsforholdViewV3";

export type SeksjonSvar = ArbeidsforholdSvar & {
  registrerteArbeidsforhold?: Arbeidsforhold[];
};

export type ForhåndsfyltArbeidsforhold = {
  organisasjonsnummer: string;
  startdato: Date;
  sluttdato?: Date;
  sluttårsak?: string;
  arbeidstidsordning?: string;
};

export type ArbeidsforholdSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: SeksjonSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
  tidligereArbeidsforhold?: ForhåndsfyltArbeidsforhold[] | [];
};

const { seksjonId, nyesteVersjon, nesteSeksjonId, forrigeSeksjonId } =
  hentSeksjonKonfig("arbeidsforhold");

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ArbeidsforholdSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const [response, tidligereArbeidsforholdResponse] = await Promise.all([
    hentSeksjon(request, params.soknadId, seksjonId),
    hentArbeidsforhold(request),
  ]);

  const failedResponse = {
    seksjon: {
      seksjonId,
      versjon: nyesteVersjon,
      seksjonsvar: undefined,
    },
    dokumentasjonskrav: null,
    tidligereArbeidsforhold: [],
  };

  if (!response.ok && !tidligereArbeidsforholdResponse.ok) {
    return failedResponse;
  }
  const seksjonData = response.ok ? await response.json() : failedResponse;
  const tidligereArbeidsforholdData = tidligereArbeidsforholdResponse.ok
    ? await tidligereArbeidsforholdResponse.json()
    : [];
  return {
    ...seksjonData,
    tidligereArbeidsforhold: tidligereArbeidsforholdData,
  };
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
  const { seksjon, tidligereArbeidsforhold } = loaderData;
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
    case 3:
      return (
        <ArbeidsforholdProviderV3
          registrerteArbeidsforhold={seksjon?.seksjonsvar?.registrerteArbeidsforhold ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
          forhåndsfyltArbeidsforhold={tidligereArbeidsforhold}
        >
          <ArbeidsforholdViewV3 />
        </ArbeidsforholdProviderV3>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon?.versjon} for søknadId: ${soknadId} i seksjonId: ${seksjon?.seksjonId}`
      );
      return (
        <ArbeidsforholdProviderV3
          registrerteArbeidsforhold={seksjon?.seksjonsvar?.registrerteArbeidsforhold ?? []}
          dokumentasjonskrav={loaderData.dokumentasjonskrav ?? []}
          forhåndsfyltArbeidsforhold={tidligereArbeidsforhold}
        >
          <ArbeidsforholdViewV3 />
        </ArbeidsforholdProviderV3>
      );
  }
}
