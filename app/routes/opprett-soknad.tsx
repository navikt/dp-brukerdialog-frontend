import { ArrowRightIcon } from "@navikt/aksel-icons";
import { Box, Button, Checkbox, Heading, LocalAlert, VStack } from "@navikt/ds-react";
import { PortableText } from "@portabletext/react";
import { useForm } from "@rvf/react-router";
import { Form, redirect, useActionData, useNavigation } from "react-router";
import { z } from "zod";
import { KomponentType } from "~/components/Komponent.types";
import { SøknadIkon } from "~/components/SøknadIkon";
import { useSanity } from "~/hooks/useSanity";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import { SanityReadMore } from "~/sanity/components/SanityReadMore";
import { portableTextToKomponenter } from "~/utils/sanity.utils";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Route } from "./+types/opprett-soknad";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";

const SEKSJON_ID = "startside";
const SEKSJON_NAVN = "Startside";

export async function action({ request }: Route.ActionArgs) {
  const opprettSøknadResponse = await opprettSoknad(request);

  if (!opprettSøknadResponse.ok) {
    return {
      error: "Feil ved opprettelse av søknad",
    };
  }

  const soknadId = await opprettSøknadResponse.text();
  const formData = await request.formData();
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
    return {
      error: "Feil ved lagring av seksjon",
    };
  }

  return redirect(`/${soknadId}/personalia`);
}

export default function OpprettSoknadSide() {
  const { hentInfosideTekst } = useSanity();
  const { state } = useNavigation();
  const actionData = useActionData<typeof action>();

  const innhold = hentInfosideTekst("infoside.opprett-søknad");
  const bekreftVilkårTekst = "Jeg bekrefter at jeg vil svare så riktig som jeg kan";

  function opprettSøknad() {
    if (!innhold?.body) return;

    const bekreftVilkårKomponent: KomponentType = {
      id: crypto.randomUUID(),
      type: "forklarendeTekst",
      label: bekreftVilkårTekst,
    };

    const pdfGrunnlag = {
      navn: SEKSJON_NAVN,
      spørsmål: [
        ...lagSeksjonPayload(portableTextToKomponenter(innhold.body), {}),
        ...lagSeksjonPayload([bekreftVilkårKomponent], {}),
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
        {innhold?.body && (
          <PortableText value={innhold.body} components={{ types: { readMore: SanityReadMore } }} />
        )}

        <VStack gap="8" className="mt-14">
          <Form {...form.getFormProps()}>
            <Box.New
              padding="4"
              background={!!form.value("bekreftVilkår") ? "success-moderate" : "sunken"}
              borderRadius="medium"
            >
              <Checkbox name="bekreftVilkår" error={!!form.error("bekreftVilkår")}>
                {bekreftVilkårTekst}
              </Checkbox>
            </Box.New>

            {actionData && actionData.error && (
              <LocalAlert status="error" className="mt-4">
                <LocalAlert.Header>
                  <LocalAlert.Title>Det har oppstått en teknisk feil</LocalAlert.Title>
                </LocalAlert.Header>
                <LocalAlert.Content>{actionData.error}</LocalAlert.Content>
              </LocalAlert>
            )}

            <Button
              iconPosition="right"
              className="mt-8"
              icon={<ArrowRightIcon aria-hidden />}
              onClick={() => opprettSøknad()}
              loading={state === "submitting" || state === "loading"}
            >
              Start søknad
            </Button>
          </Form>
        </VStack>
      </div>
    </main>
  );
}
