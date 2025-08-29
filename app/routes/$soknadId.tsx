import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router";
import { SoknadIkon } from "~/components/illustrasjon/soknadIkon";
import { FormProgress } from "@navikt/ds-react";
import { useState } from "react";
import invariant from "tiny-invariant";
import { hentSøknadFremgangInfo } from "~/models/hent-progress-info.server";

type StegISøknad = {
  tittel: string;
  path: string;
};

type ProgressBarSteg = StegISøknad & {
  interaktiv: boolean;
  fullført?: boolean;
};

type Stegsvar = {
  seksjoner: string[];
};

const soknadSteps: StegISøknad[] = [
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

function fyllData(): ProgressBarSteg[] {
  return soknadSteps.map((step) => {
    return { ...step, interaktiv: false, fullført: false };
  });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const progressResponse = await hentSøknadFremgangInfo(request, params.soknadId);
  if (!progressResponse.ok) {
    return undefined;
  }
  const { seksjoner }: Stegsvar = await progressResponse.json();
  const fullførtSøknaden = seksjoner.includes("oppsummering");

  const soknadSections: ProgressBarSteg[] = soknadSteps.map((step) => ({
    ...step,
    interaktiv: !fullførtSøknaden,
    fullført: seksjoner.includes(step.path),
  }));

  return soknadSections;
}

export default function SoknadIdIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const progressData = loaderData || fyllData();

  const [activeStep, setActiveStep] = useState(
    loaderData ? loaderData.findIndex((data) => data.fullført === false) + 1 : 0
  );

  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="soknad-header">
        <SoknadIkon />
        <h1>Søknad om dagpenger</h1>
      </div>
      <div>
        <FormProgress totalSteps={14} activeStep={activeStep} onStepChange={setActiveStep}>
          {progressData.map((data) => (
            <FormProgress.Step
              href={data.path}
              completed={data.fullført}
              interactive={data.interaktiv}
            >
              {data.tittel}
            </FormProgress.Step>
          ))}
          <FormProgress.Step interactive={false}>Kvittering</FormProgress.Step>
        </FormProgress>
      </div>
      <Outlet />
    </main>
  );
}
