import { LoaderFunctionArgs, Outlet, redirect, useLoaderData } from "react-router";
import { SoknadIkon } from "~/components/illustrasjon/soknadIkon";
import { FormProgress } from "@navikt/ds-react";
import invariant from "tiny-invariant";
import { hentSøknadFremgangInfo } from "~/models/hent-progress-info.server";

type Steg = {
  tittel: string;
  path: string;
};

type FremgangSteg = Steg & {
  interaktiv: boolean;
  fullført?: boolean;
};

type StegResponse = {
  seksjoner: string[];
};

export const stegerISøknaden: Steg[] = [
  { tittel: "Din situasjon", path: "din-situasjon" },
  { tittel: "Personalia", path: "personalia" },
  { tittel: "Bostedsland", path: "bostedsland" },
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
];

function fyllTommeSteger(): FremgangSteg[] {
  return stegerISøknaden.map((step) => {
    return { ...step, interaktiv: false, fullført: false };
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const progressResponse = await hentSøknadFremgangInfo(request, params.soknadId);
  if (!progressResponse.ok) {
    return {
      søknadProgress: fyllTommeSteger(),
      aktivSteg: 1,
    };
  }
  const { seksjoner }: StegResponse = await progressResponse.json();

  const fullførtSøknaden = seksjoner.includes("oppsummering");

  if (fullførtSøknaden) {
    return redirect(`/${params.soknadId}/kvittering`);
  }

  const soknadSections: FremgangSteg[] = stegerISøknaden.map((step) => ({
    ...step,
    interaktiv: !fullførtSøknaden,
    fullført: seksjoner.includes(step.path),
  }));

  return {
    søknadProgress: soknadSections,
    aktivSteg: finnAktivSteg(soknadSections, request.url) + 1,
  };
}

export default function SoknadIdIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const progressData = loaderData?.søknadProgress;

  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="soknad-header">
        <SoknadIkon />
        <h1>Søknad om dagpenger</h1>
      </div>
      <div>
        <FormProgress totalSteps={14} activeStep={loaderData?.aktivSteg || 1}>
          {progressData.map((steg) => (
            <FormProgress.Step
              href={steg.path}
              completed={steg.fullført}
              interactive={steg.interaktiv}
            >
              {steg.tittel}
            </FormProgress.Step>
          ))}
          <FormProgress.Step interactive={false}>Kvittering</FormProgress.Step>
        </FormProgress>
      </div>
      <Outlet />
    </main>
  );
}
