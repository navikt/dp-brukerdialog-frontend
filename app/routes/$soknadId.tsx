import { FormProgress, Heading } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { LoaderFunctionArgs, Outlet, redirect, useLoaderData, useLocation } from "react-router";
import invariant from "tiny-invariant";
import { SøknadIkon } from "~/components/SøknadIkon";
import { hentSøknadFremgangInfo } from "~/models/hent-søknad-fremgrang-info.server";
import { hentSøknadSistOppdatert } from "~/models/hent-søknad-sist-oppdatert";
import { hentSøknader } from "~/models/hent-søknader";
import { Søknad } from "~/models/hent-søknader-for-ident";
import { SeksjonKonfig, seksjonKonfig } from "~/seksjon/seksjoner.konfig";
import { SoknadProvider } from "~/seksjon/soknad.context";

type FremgangSteg = SeksjonKonfig & {
  fullført?: boolean;
};

type StegResponse = {
  seksjoner: string[];
};

export type SoknadIdRoute = {
  søknadProgress: FremgangSteg[];
  aktivSteg: number;
  sistOppdatert?: Date;
  søknadId: string;
};

const SIDER_TILGJENGELIG_ETTER_INNSENDING = ["kvittering", "ettersending"];

export function hentStegISøknaden(): FremgangSteg[] {
  return seksjonKonfig.map((seksjon) => ({ ...seksjon, fullført: false }));
}

export async function loader({
  request,
  params,
}: LoaderFunctionArgs): Promise<SoknadIdRoute | Response> {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const seksjonId = new URL(request.url).pathname.split("/").at(-1)!;

  const [progressResponse, sistOppdatertResponse, søknaderResponse] = await Promise.all([
    hentSøknadFremgangInfo(request, params.soknadId),
    hentSøknadSistOppdatert(request, params.soknadId),
    hentSøknader(request),
  ]);

  if (søknaderResponse.ok) {
    const søknader: Søknad[] = await søknaderResponse.json();
    const søknad = søknader.find((s) => s.søknadId === params.soknadId);
    const søknadFullført = søknad?.status === "INNSENDT" || søknad?.status === "JOURNALFØRT";
    const erPåKvitteringEllerEttersending = SIDER_TILGJENGELIG_ETTER_INNSENDING.includes(seksjonId);

    if (!erPåKvitteringEllerEttersending && søknadFullført) {
      return redirect(`/${params.soknadId}/kvittering`);
    }

    if (erPåKvitteringEllerEttersending && !søknadFullført) {
      return redirect(`/${params.soknadId}/personalia`);
    }
  }

  function finnAktivSteg(seksjoner: FremgangSteg[], urlPath: string) {
    const url = new URL(urlPath);
    const pathParts = url.pathname.split("/");
    const seksjonsIdFraUrl = pathParts[pathParts.length - 1];

    const seksjonIndeks = seksjoner.findIndex((seksjon) => seksjon.seksjonId === seksjonsIdFraUrl);

    if (seksjonIndeks === -1) {
      return seksjoner.findIndex((data) => data.fullført === false);
    }
    return seksjonIndeks;
  }

  const sistOppdatert = sistOppdatertResponse.ok
    ? new Date(await sistOppdatertResponse.json())
    : undefined;

  if (!progressResponse.ok) {
    return {
      søknadProgress: hentStegISøknaden(),
      aktivSteg: 1,
      sistOppdatert: sistOppdatert,
      søknadId: params.soknadId,
    };
  }

  const { seksjoner }: StegResponse = await progressResponse.json();
  const fullførtSøknaden = seksjoner.includes("oppsummering");

  if (fullførtSøknaden) {
    return redirect(`/${params.soknadId}/kvittering`);
  }

  const søknadSeksjoner: FremgangSteg[] = hentStegISøknaden().map((step) => ({
    ...step,
    fullført:
      seksjoner.includes(step.seksjonId) ||
      (step.seksjonId == "dokumentasjon" && seksjonId == "oppsummering"),
  }));

  return {
    søknadProgress: søknadSeksjoner,
    aktivSteg: finnAktivSteg(søknadSeksjoner, request.url) + 1,
    sistOppdatert: sistOppdatert,
    søknadId: params.soknadId,
  };
}

export default function SoknadIdLayoutSide() {
  const { t } = useTranslation("felles");
  const loaderData = useLoaderData<typeof loader>();
  const progressData = loaderData?.søknadProgress;
  const location = useLocation();
  const erEttersending = location.pathname.includes("/ettersending");

  return (
    <SoknadProvider>
      <main id="maincontent" tabIndex={-1}>
        <div className="søknad-header">
          <SøknadIkon />
          <Heading size="large" level="1">
            {t("søknadTittel")}
          </Heading>
        </div>
        {!erEttersending && (
          <div className="progressbar">
            <FormProgress totalSteps={seksjonKonfig.length} activeStep={loaderData.aktivSteg}>
              {progressData.map((steg) => (
                <FormProgress.Step
                  href={steg.seksjonId}
                  completed={steg.fullført}
                  interactive={false}
                >
                  {t(steg.tittel)}
                </FormProgress.Step>
              ))}
            </FormProgress>
          </div>
        )}
        <Outlet />
      </main>
    </SoknadProvider>
  );
}
