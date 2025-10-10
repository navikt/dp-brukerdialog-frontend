import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "react-router";
import invariant from "tiny-invariant";
import { hentOppsummering } from "~/models/hent-oppsummering.server";
import OppsummeringView from "~/seksjon/oppsummering/OppsummeringView";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { sendSøknad } from "~/models/send-søknad.server";

type OppsummeringSeksjon = {
  seksjonsUrl: string;
  seksjonId: string;
  data: string;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<OppsummeringSeksjon[] | undefined> {
  invariant(params.soknadId, "Søknad ID er påkrevd");
  let oppsummering = undefined;

  const response = await hentOppsummering(request, params.soknadId);

  if (response.status === 200) {
    oppsummering = await response.json();
    oppsummering = oppsummering.map((seksjon: any) => ({
      seksjonsUrl: `/${params.soknadId}/${seksjon.seksjonId}`,
      seksjonId: seksjon.seksjonId,
      data: seksjon.data,
    }));
  }

  const personaliaResponse = await hentPersonalia(request);
  if (personaliaResponse.status !== 200) {
    console.error("Feil ved henting av personalia");
    return oppsummering;
  }

  const personaliaResponseJson = await personaliaResponse.json();
  const { fornavn, mellomnavn, etternavn, ident, folkeregistrertAdresse } =
    personaliaResponseJson.person;
  const personalia = {
    navn: fornavn + (mellomnavn ? ` ${mellomnavn}` : "") + ` ${etternavn}`,
    personnummer: ident,
    folkeregistrertAdresse: folkeregistrertAdresse.adresselinje1,
    folkeregistrertPostnummer: folkeregistrertAdresse.postnummer,
    folkeregistrertPoststed: folkeregistrertAdresse.poststed,
  };

  oppsummering = [
    ...oppsummering,
    {
      seksjonsUrl: `/${params.soknadId}/personalia`,
      seksjonId: "personalia",
      data: JSON.stringify(personalia),
    },
  ];
  return oppsummering;
}

function genererBase64BruttoHtml(soknadId: string) {
  return btoa("Hello, Base64");
  /**
   * Alt 1:
   * 1. Traverser over alle spørsmål, bytt ut ID med labels (og kanskje description skal med også)
   *    fra Sanity
   * 2. Transformer til HTML
   *
   * Ulemper:
   * 1. Må ta hensyn til versjoner. Det er en sannsynlighet for at vi har gjort en endring på en
   *    seksjon fra bruker lagrer seksjon til bruker sender inn og
   * 2. Dersom tekster er endret i Sanity, vil HTML lages med andre tekster enn det bruker så da
   *    spørsmålet ble besvart.
   * 3. Mye greier som må skje, risiko for kaos.
   * Fordeler:
   * 1. Trenger ikke å lagre noe mer i backend enn det som lagres i dag.
   *
   *
   * Alt 2:
   * 1. Hent alle bruttoversjoner fra backend (som er lagret der når bruker lagrer en seksjon). Hver
   *    lagring er kanskje 2 kall? Eller en JSON-struktur med både netto- og brutto-versjonene som lagres
   *    i forskjellige tabeller? Kanskje brutto-versjonerkan slettes når PDF er lagd (da er den
   *    arkiverte PDFen "fastit").
   * 2. Transformer til HTML
   *
   * Ulemper:
   * 1. Tekster som skal med i HTMLen må også lagres i backend. Brutto-versjonen kan bli ganske, stor
   *    og den har ingen historisk verdi etter at søknaden er sendt inn. Men da kan den også
   *    kanskje slettes etter at søknaden er sendt inn?
   * Fordeler:
   * 1. Ikke noe ekstra jobb å grave opp tekster på tidspunktet hvor HTMLen skal opprettes.
   * 2. Bruker får tekster i PDFen som er de samme som bruker har sett i søknaden.
   *
   *
   * Alt 3:
   * 1. Backend utfører alternativ 2 når frontend sender inn søknad.
   *
   * Ulemper:
   * 1. HTML lages ikke i frontend (men hva var grunnen til at vi ville det)?
   * Fordeler:
   * 1. Frontend trenger bare å signalisere at bruker har sendt inn søknad, den har ingen jobb med
   *    å generere HTML.
   */
}

function genererBase64NettoHtml(soknadId: string) {
  /**
   * Alt 1:
   * 1. Hent alle seksjoner fra backend
   * 2. Traverser over seksjoner fra backend, bytt ut ID med labels (og kanskje description
   *    skal med også) fra Sanity
   * 3. Transformer til HTML
   *
   * Ulemper:
   * 1. Må ta hensyn til versjoner. Det er en sannsynlighet for at vi har gjort en endring på en
   *    seksjon fra bruker lagrer seksjon til bruker sender inn og
   * 2. Dersom tekster er endret i Sanity, vil HTML lages med andre tekster enn det bruker så da
   *    spørsmålet ble besvart.
   * 3. Mye greier som må skje, risiko for kaos.
   * Fordeler:
   * 1. Trenger ikke å lagre noe mer i backend enn det som lagres i dag.
   *
   *
   * Alt 2:
   * 1. Hente alle seksjoner fra backend (hvor ledetekster allerede er lagret)
   * 2. Transformer til HTML
   *
   * Ulemper:
   * 1. Tekster som skal med i HTMLen må også lagres i seksjonene.
   * Fordeler:
   * 1. Ikke noe ekstra jobb å grave opp tekster på tidspunktet hvor HTMLen skal opprettes.
   * 2. Bruker får tekster i PDFen som er de samme som bruker har sett i søknaden.
   *
   *
   * Alt 3:
   * 1. Backend utfører alternativ 2 når frontend sender inn søknad.
   *
   * Ulemper:
   * 1. HTML lages ikke i frontend (men hva var grunnen til at vi ville det)?
   * Fordeler:
   * 1. Frontend trenger bare å signalisere at bruker har sendt inn søknad, den har ingen jobb med
   *    å generere HTML.
   *
   */
  return btoa("Hello, Base64");
}

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "SøknadId er påkrevd");
  const nesteSeksjonId = "kvittering";

  const response = await sendSøknad(request, params.soknadId, {
    søknadId: params.soknadId,
    bruttoBase64Html: genererBase64BruttoHtml(params.soknadId),
    nettoBase64Html: genererBase64NettoHtml(params.soknadId),
  });

  console.log(response);

  if (response.status === 200) {
    return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
  } else {
    return {
      error: "Noe gikk galt ved innsending av søknaden.",
    };
  }
}

export default function Oppsummering() {
  return <OppsummeringView />;
}
