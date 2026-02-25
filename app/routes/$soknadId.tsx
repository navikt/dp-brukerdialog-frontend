import { FormProgress, Heading } from "@navikt/ds-react";
import { LoaderFunctionArgs, Outlet, redirect, useLoaderData, useLocation } from "react-router";
import invariant from "tiny-invariant";
import { SøknadIkon } from "~/components/SøknadIkon";
import { hentSøknadFremgangInfo } from "~/models/hent-søknad-fremgrang-info.server";
import { hentSøknadSistOppdatert } from "~/models/hent-søknad-sist-oppdatert";
import { SoknadProvider } from "~/seksjon/soknad.context";

type Steg = {
  tittel: string;
  path: string;
};

type FremgangSteg = Steg & {
  fullført?: boolean;
};

type StegResponse = {
  seksjoner: string[];
};

export const stegISøknaden: Steg[] = [
  { tittel: "Personalia", path: "personalia" },
  { tittel: "Din situasjon", path: "din-situasjon" },
  { tittel: "Arbeidsforhold", path: "arbeidsforhold" },
  { tittel: "Annen pengestøtte", path: "annen-pengestotte" },
  { tittel: "Egen næring", path: "egen-naring" },
  { tittel: "Verneplikt", path: "verneplikt" },
  { tittel: "Utdanning", path: "utdanning" },
  { tittel: "Barnetillegg", path: "barnetillegg" },
  { tittel: "Reell arbeidssøker", path: "reell-arbeidssoker" },
  { tittel: "Tilleggsopplysninger", path: "tilleggsopplysninger" },
  { tittel: "Dokumentasjon", path: "dokumentasjon" },
  { tittel: "Oppsummering", path: "oppsummering" },
  { tittel: "Kvittering", path: "kvittering" },
];

function fyllTommeSteger(): FremgangSteg[] {
  return stegISøknaden.map((step) => {
    return { ...step, fullført: false };
  });
}

function finnAktivSteg(seksjoner: FremgangSteg[], urlPath: string) {
  const url = new URL(urlPath);
  const pathParts = url.pathname.split("/");
  const seksjonsIdFraUrl = pathParts[pathParts.length - 1];

  let seksjonIndeks = seksjoner.findIndex((seksjon) => seksjon.path === seksjonsIdFraUrl);

  if (seksjonIndeks === -1) {
    return seksjoner.findIndex((data) => data.fullført === false);
  }
  return seksjonIndeks;
}

export type SoknadIdRoute = {
  søknadProgress: FremgangSteg[];
  aktivSteg: number;
  sistOppdatert?: Date;
};

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<SoknadIdRoute | Response> {
  const url = new URL(request.url);
  const pathParts = url.pathname.split("/");
  const seksjonsIdFraUrl = pathParts[pathParts.length - 1];

  invariant(params.soknadId, "Søknad ID er påkrevd");

  const progressResponse = await hentSøknadFremgangInfo(request, params.soknadId);
  const sistOppdatertResponse = await hentSøknadSistOppdatert(request, params.soknadId);

  let sistOppdatert = sistOppdatertResponse.ok
    ? JSON.parse(await sistOppdatertResponse.text())
    : undefined;

  if (!progressResponse.ok) {
    return {
      søknadProgress: fyllTommeSteger(),
      aktivSteg: 1,
      sistOppdatert: sistOppdatert ? new Date(sistOppdatert) : undefined,
    };
  }

  const { seksjoner }: StegResponse = await progressResponse.json();
  const fullførtSøknaden = seksjoner.includes("oppsummering");

  if (fullførtSøknaden) {
    return redirect(`/${params.soknadId}/kvittering`);
  }

  const soknadSections: FremgangSteg[] = stegISøknaden.map((step) => ({
    ...step,
    fullført:
      seksjoner.includes(step.path) ||
      (step.path == "dokumentasjon" && seksjonsIdFraUrl == "oppsummering"),
  }));

  return {
    søknadProgress: soknadSections,
    aktivSteg: finnAktivSteg(soknadSections, request.url) + 1,
    sistOppdatert: sistOppdatert ? new Date(sistOppdatert) : undefined,
  };
}

export default function SoknadIdIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const progressData = loaderData?.søknadProgress;
  const location = useLocation();
  const erEttersending = location.pathname.includes("/ettersending");

  return (
    <SoknadProvider>
      <main id="maincontent" tabIndex={-1}>
        <div className="soknad-header">
          <SøknadIkon />
          <Heading size="large" level="1">
            Søknad om dagpenger
          </Heading>
        </div>
        <div className="progressbar">
          {!erEttersending && (
            <FormProgress totalSteps={stegISøknaden.length} activeStep={loaderData?.aktivSteg || 1}>
              {progressData.map((steg) => (
                <FormProgress.Step href={steg.path} completed={steg.fullført} interactive={false}>
                  {steg.tittel}
                </FormProgress.Step>
              ))}
            </FormProgress>
          )}
        </div>
        <Outlet />
      </main>
    </SoknadProvider>
  );
}
