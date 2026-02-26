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
import { normaliserFormData } from "~/utils/action.utils.server";
import { handling } from "~/seksjon/din-situasjon/v1/din-situasjon.komponenter";
import { Seksjonshandling } from "~/utils/Seksjonshandling";

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

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "egen-naring";
const NESTE_SEKSJON_ID = "verneplikt";
const FORRIGE_SEKSJON_ID = "annen-pengestotte";

export async function loader({ request, params }: LoaderFunctionArgs): Promise<EgenNæringSeksjon> {
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
  const seksjonsvar = formData.get("seksjonsvar");
  const pdfGrunnlag = formData.get("pdfGrunnlag");
  const versjon = formData.get("versjon");

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      seksjonsvar: normaliserFormData(JSON.parse(seksjonsvar as string)),
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

  if (formData.get(handling) === Seksjonshandling.fortsettSenere) {
    return null;
  }

  if (formData.get(handling) === Seksjonshandling.tilbakenavigering) {
    return redirect(`/${params.soknadId}/${FORRIGE_SEKSJON_ID}`);
  }

  return redirect(`/${params.soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function EgenNæringSeksjon() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon.versjon ?? NYESTE_VERSJON) {
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
        `Ukjent versjonsnummer: ${seksjon.versjon} for egen-næring for søknaden ${soknadId}`
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
