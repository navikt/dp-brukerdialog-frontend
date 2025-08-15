import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { data, Form, LoaderFunctionArgs, redirect, useActionData, useNavigate } from "react-router";
import { useForm } from "@rvf/react-router";
import { z } from "zod";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { vernepliktSporsmal, VernepliktSvar } from "~/regelsett/verneplikt";

export async function action({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "SøknadID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "verneplikt";
  const nesteSeksjonId = "utdanning";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);
  if (response.status !== 200) {
    return { error: "Noe gikk galt ved lagring av verneplikt" };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "SøknadID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "verneplikt");
  if (response.status === 200) {
    return await response.json();
  }

  return data({
    avtjentVerneplikt: undefined,
    dokumenterAvtjentVernepliktNå: undefined,
    lasteOppSenereBegrunnelse: undefined,
    naarSendtDokumentasjonTidligere: undefined,
    senderIkkeDokumentasjonBegrunnelse: undefined,
  });
}

const schema = z
  .object({
    avtjentVerneplikt: z.enum(["ja", "nei"]).optional(),
    dokumenterAvtjentVernepliktNå: z
      .enum(["ja", "lastOppIEtterkant", "lastetOppTidligere", "nei"])
      .optional(),
    lasteOppSenereBegrunnelse: z.string().optional(),
    naarSendtDokumentasjonTidligere: z.string().optional(),
    senderIkkeDokumentasjonBegrunnelse: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    vernepliktSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof VernepliktSvar;
      const svar = data[sporsmalId];

      if (synlig && !svar) {
        ctx.addIssue({
          path: [sporsmal.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });

export default function Verneplikt() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: schema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: {},
  });

  useEffect(() => {
    const values = form.value();

    vernepliktSporsmal.forEach((sporsmal) => {
      const sporsmalId = sporsmal.id as keyof VernepliktSvar;
      if (sporsmal.visHvis && !sporsmal.visHvis(values) && values[sporsmalId] !== undefined) {
        form.setValue(sporsmalId, undefined);
      }
    });
  }, [form.value()]);

  return (
    <Page className="brukerdialog">
      <h2>Verneplikt</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {vernepliktSporsmal.map((sporsmal) => {
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                  return null;
                }

                return (
                  <>
                    <Sporsmal
                      key={sporsmal.id}
                      sporsmal={sporsmal}
                      formScope={form.scope(sporsmal.id as keyof VernepliktSvar)}
                    />

                    {sporsmal.id === "dokumenterAvtjentVernepliktNå" &&
                      form.value("dokumenterAvtjentVernepliktNå") === "nei" && (
                        <Alert variant="warning">
                          Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn
                          dokumentene vi trenger for å behandle saken din. Ta kontakt med NAV hvis
                          du ikke får tak i dokumentet
                        </Alert>
                      )}
                  </>
                );
              })}
            </VStack>

            {actionData && (
              <Alert variant="error" className="mt-4">
                {actionData.error}
              </Alert>
            )}

            <HStack gap="4" className="mt-8">
              <Button
                variant="secondary"
                icon={<ArrowLeftIcon title="a11y-title" fontSize="1.5rem" />}
                onClick={() => navigate(-1)}
              >
                Forrige steg
              </Button>
              <Button
                variant="primary"
                type="submit"
                iconPosition="right"
                icon={<ArrowRightIcon />}
              >
                Neste steg
              </Button>
            </HStack>
          </Form>
        </VStack>
      </VStack>
    </Page>
  );
}
