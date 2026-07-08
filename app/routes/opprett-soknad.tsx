import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, Button, Checkbox, Heading, LocalAlert, VStack } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useForm } from "@rvf/react-router";
import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router";
import { z } from "zod";
import { KomponentType } from "~/components/Komponent.types";
import { SøknadIkon } from "~/components/SøknadIkon";
import { useSanity } from "~/hooks/useSanity";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import {
  hentAlleSeksjoner,
  prefillPersonaliaFraForrigeSøknad,
  hentSistInnsendteSøknadSomHarSeksjoner,
  prefillSeksjoner,
} from "~/models/prefill-soknad.server";
import { SanityReadMore } from "~/sanity/components/SanityReadMore";
import { getEnv } from "~/utils/env.utils";
import { portableTextToKomponenter } from "~/utils/sanity.utils";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Route } from "./+types/opprett-soknad";

const SEKSJON_ID = "startside";
const SEKSJON_NAVN = "Startside";
const NESTE_SEKSJON_ID = "personalia";
const PREFILL_NESTE_SEKSJON_ID = "oppsummering";

export function loader() {
  return {
    erIDev: getEnv("IS_LOCALHOST") === "true" || getEnv("NAIS_CLUSTER_NAME") !== "prod-gcp",
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const handling = formData.get("handling");

  if (handling === "prefill") {
    const forrigeSøknadId = await hentSistInnsendteSøknadSomHarSeksjoner(request);

    if (!forrigeSøknadId) {
      return {
        error: "Fant ingen tidligere søknad å forhåndsutfylle fra.",
      };
    }

    const opprettSøknadResponse = await opprettSoknad(request);

    if (!opprettSøknadResponse.ok) {
      return {
        error: "Feil ved opprettelse av søknad",
      };
    }

    const soknadId = await opprettSøknadResponse.text();
    const seksjoner = await hentAlleSeksjoner(request, forrigeSøknadId);
    const antallPrefylteSeksjoner = await prefillSeksjoner(
      request,
      forrigeSøknadId,
      soknadId,
      seksjoner
    );
    const personaliaPrefylt = await prefillPersonaliaFraForrigeSøknad(request, soknadId, seksjoner);

    if (antallPrefylteSeksjoner === 0 || !personaliaPrefylt) {
      return {
        error: "Klarte ikke å forhåndsutfylle søknaden fra tidligere søknad.",
      };
    }

    return redirect(`/${soknadId}/${PREFILL_NESTE_SEKSJON_ID}`);
  }

  const opprettSøknadResponse = await opprettSoknad(request);

  if (!opprettSøknadResponse.ok) {
    return {
      error: "Feil ved opprettelse av søknad",
    };
  }

  const soknadId = await opprettSøknadResponse.text();
  const pdfGrunnlag = formData.get("pdfGrunnlag");

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      versjon: 1,
    }),
    pdfGrunnlag: pdfGrunnlag,
  };

  const lagreSeksjonResponse = await lagreSeksjon(
    request,
    soknadId,
    SEKSJON_ID,
    putSeksjonRequestBody
  );

  if (!lagreSeksjonResponse.ok) {
    console.error("Klarte ikke lagre pdfGrunnlag for startside. SøknadId:", soknadId);
  }

  return redirect(`/${soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function OpprettSoknadSide() {
  const { hentInfosideTekst } = useSanity();
  const { state, formData } = useNavigation();
  const { erIDev } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const vilkårTekst = hentInfosideTekst("infoside.opprett-søknad");
  const bekreftVilkårTekst = "Jeg bekrefter at jeg vil svare så riktig som jeg kan";
  const prefillPågår = state === "submitting" && formData?.get("handling") === "prefill";
  const vanligOpprettingPågår =
    (state === "submitting" || state === "loading") && formData?.get("handling") !== "prefill";

  function opprettSøknad() {
    if (!vilkårTekst?.body) return;

    const bekreftVilkårKomponent: KomponentType = {
      id: "bekreftVilkår",
      type: "envalg",
      label: bekreftVilkårTekst,
      options: [
        { value: "ja", label: "Ja" },
        { value: "nei", label: "Nei" },
      ],
    };

    const pdfGrunnlag = {
      navn: SEKSJON_NAVN,
      spørsmål: [
        ...portableTextToKomponenter(vilkårTekst.body),
        ...lagSeksjonPayload([{ ...bekreftVilkårKomponent, id: "bekreftVilkår" }], {
          bekreftVilkår: form.transient.value().bekreftVilkår ? "ja" : "nei",
        }),
      ],
    };

    form.setValue("pdfGrunnlag", JSON.stringify(pdfGrunnlag));
    form.submit();
  }

  const form = useForm({
    method: "POST",
    submitSource: "state",
    schema: z.object({
      bekreftVilkår: z.boolean().refine((val) => val, {
        message: "Du må godta vilkårene",
      }),
      pdfGrunnlag: z.string().optional(),
    }),
    defaultValues: {
      bekreftVilkår: false,
    },
  });

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>Søknad om dagpenger</title>
      <div className="soknad-header">
        <SøknadIkon />
        <Heading size="large" level="1">
          Søknad om dagpenger
        </Heading>
      </div>
      <div className="innhold">
        {vilkårTekst?.body && (
          <PortableText
            value={vilkårTekst.body}
            components={{ types: { readMore: SanityReadMore } }}
          />
        )}

        <VStack gap="space-32" className="mt-56">
          <Form {...form.getFormProps()}>
            <Box
              padding="space-16"
              background={!!form.value("bekreftVilkår") ? "success-moderate" : "sunken"}
              borderRadius="8"
            >
              <Checkbox name="bekreftVilkår" error={!!form.error("bekreftVilkår")}>
                {bekreftVilkårTekst}
              </Checkbox>
            </Box>

            {actionData && actionData.error && (
              <LocalAlert status="error" className="mt-16">
                <LocalAlert.Header>
                  <LocalAlert.Title>Det har oppstått en teknisk feil</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>{actionData.error}</LocalAlert.Content>
              </LocalAlert>
            )}

            <Button
              iconPosition="right"
              className="mt-32"
              icon={<ArrowRightIcon aria-hidden />}
              onClick={() => opprettSøknad()}
              loading={vanligOpprettingPågår}
            >
              Start søknad
            </Button>
          </Form>

          {erIDev && (
            <Form method="POST">
              <input type="hidden" name="handling" value="prefill" />
              <Button variant="secondary" loading={prefillPågår}>
                Fyll ut fra forrige søknad
              </Button>
            </Form>
          )}
        </VStack>
      </div>
    </main>
  );
}
