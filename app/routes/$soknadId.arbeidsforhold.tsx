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
import { ArbeidsforholdProvider } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  Arbeidsforhold,
  ArbeidsforholdSvar,
  erTilbakenavigering,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { ArbeidsforholdViewV1 } from "~/seksjon/arbeidsforhold/v1/ArbeidsforholdViewV1";
import { Dokumentasjonskrav } from "~/seksjon/dokumentasjon/DokumentasjonskravKomponent";
import { normaliserFormData } from "~/utils/action.utils.server";

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

const NYESTE_VERSJON = 1;
const SEKSJON_ID = "arbeidsforhold";
const NESTE_SEKSJON_ID = "annen-pengestotte";
const FORRIGE_SEKSJON_ID = "din-situasjon";

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<ArbeidsforholdSeksjon> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, SEKSJON_ID);

  if (!response.ok) {
    return {
      seksjon: {
        seksjonId: SEKSJON_ID,
        versjon: NYESTE_VERSJON,
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
  const erTilbakeknapp = formData.get(erTilbakenavigering) === "true";
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
    return { error: "Noe gikk galt ved lagring av seksjonen" };
  }

  if (erTilbakeknapp) {
    return redirect(`/${params.soknadId}/${FORRIGE_SEKSJON_ID}`);
  }

  return redirect(`/${params.soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function ArbeidsforholdRoute() {
  const loaderData = useLoaderData<typeof loader>();
  const { seksjon } = loaderData;
  const { soknadId } = useParams();

  switch (seksjon?.versjon ?? NYESTE_VERSJON) {
    case 1:
      return (
        <ArbeidsforholdProvider
          registrerteArbeidsforhold={seksjon?.seksjonsvar?.registrerteArbeidsforhold ?? []}
        >
          <ArbeidsforholdViewV1 />
        </ArbeidsforholdProvider>
      );
    default:
      console.error(
        `Ukjent versjonsnummer: ${seksjon.versjon} for arbeidsforhold for søknaden ${soknadId}`
      );
      return (
        <ArbeidsforholdProvider
          registrerteArbeidsforhold={seksjon?.seksjonsvar?.registrerteArbeidsforhold ?? []}
        >
          <ArbeidsforholdViewV1 />
        </ArbeidsforholdProvider>
      );
  }
}
