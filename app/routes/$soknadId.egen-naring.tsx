import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData, useParams } from "react-router";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hent-seksjon.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/dokumentasjon.types";
import { EgenNæringViewV1 } from "~/seksjon/egen-næring/v1/EgenNæringViewV1";
import { EgenNæringProvider } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  EgenNæringSvar,
  gårdsbruk,
  Gårdsbruk,
  Næringsvirksomhet,
  næringsvirksomheter,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { navigerEtterLagring, normaliserFormData } from "~/utils/action.utils.server";
import { seksjonshandlingSchema } from "~/utils/Seksjonshandling";
import { hentSeksjonConfig } from "~/seksjon/seksjoner.config";

const { seksjonId, nyesteVersjon, nesteSeksjonId, forrigeSeksjonId } =
  hentSeksjonConfig("egen-naring");

export type SeksjonSvar = EgenNæringSvar & {
  [næringsvirksomheter]?: Næringsvirksomhet[] | null;
  [gårdsbruk]?: Gårdsbruk[] | null;
};

export type EgenNæringSeksjon = {
  seksjon: {
    seksjonId: string;
    versjon: number;
    seksjonsvar?: SeksjonSvar;
  };
  dokumentasjonskrav: Dokumentasjonskrav[] | null;
};

export async function loader({ request, params }: LoaderFunctionArgs): Promise<EgenNæringSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, seksjonId);

  if (response.ok) {
    return await response.json();
  }

  return {
    seksjon: {
      seksjonId: seksjonId,
      versjon: nyesteVersjon,
    },
    dokumentasjonskrav: null,
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonsvar = formData.get("seksjonsvar");
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");
  const handling = seksjonshandlingSchema.parse(formData.get("handling"));

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: seksjonId,
      seksjonsvar: normaliserFormData(JSON.parse(seksjonsvar as string)),
      versjon: Number(versjon),
    }),
    dokumentasjonskrav: null,
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

export default function EgenNæringSeksjon() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon.versjon ?? nyesteVersjon) {
    case 1:
      return (
        <EgenNæringProvider
          næringsvirksomheter={seksjon.seksjonsvar?.næringsvirksomheter ?? []}
          gårdsbruk={seksjon.seksjonsvar?.gårdsbruk ?? []}
        >
          <EgenNæringViewV1 />
        </EgenNæringProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon?.versjon} for søknadId: ${soknadId} i seksjonId: ${seksjon?.seksjonId}`
      );
      return (
        <EgenNæringProvider
          næringsvirksomheter={seksjon.seksjonsvar?.næringsvirksomheter ?? []}
          gårdsbruk={seksjon.seksjonsvar?.gårdsbruk ?? []}
        >
          <EgenNæringViewV1 />
        </EgenNæringProvider>
      );
  }
}
