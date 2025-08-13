import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { useEffect } from "react";
import { ActionFunctionArgs, Form, redirect, useActionData, useNavigate } from "react-router";
import invariant from "tiny-invariant";
import { z } from "zod";
import { bostedslandSporsmal, BostedslandSvar } from "~/components/regelsett/bostedsland";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "bostedsland";
  const nesteSeksjonId = "tilleggsopplysninger";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  console.log(`🔥 seksjonsData :`, seksjonsData);

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av din situasjon",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

type PeriodeType = {
  fom?: string;
  tom?: string;
};

const bostedsland = "bostedsland";
const reistTilbakeTilBostedslandet = "reist-tilbake-til-bostedslandet";
const reisteDuHjemTilLandetDuBorI = "reiste-du-hjem-til-landet-du-bor-i";
const reisteDuITaktMedRotasjon = "reiste-du-i-takt-med-rotasjon";
const avreiseDato = "avreise-dato";
const hvorforReistDuFraNorge = "hvorfor-reist-du-fra-norge";

const schema = z
  .object({
    [bostedsland]: z.string().optional(),
    [reistTilbakeTilBostedslandet]: z.enum(["ja", "nei"]).optional(),
    [reisteDuHjemTilLandetDuBorI]: z.enum(["ja", "nei"]).optional(),
    [reisteDuITaktMedRotasjon]: z.enum(["ja", "nei"]).optional(),
    [avreiseDato]: z
      .object({
        fom: z.string().optional(),
        tom: z.string().optional(),
      })
      .optional(),
    [hvorforReistDuFraNorge]: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    bostedslandSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof BostedslandSvar;
      const svar = data[sporsmalId];

      if (sporsmal.type === "periode") {
        const periodeSvar = svar as PeriodeType | undefined;

        if (!periodeSvar?.fom) {
          ctx.addIssue({
            path: [`${sporsmal.id}.fom`],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }

        if (!sporsmal.tom.optional && !periodeSvar?.tom) {
          ctx.addIssue({
            path: [`${sporsmal.id}.tom`],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }
      }

      if (synlig && !svar) {
        ctx.addIssue({
          path: [sporsmal.id],
          code: "custom",
          message: "Du må svare på dette spørsmålet",
        });
      }
    });
  });

export default function Bostedsland() {
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

  // Fjern verdier for alle felter som ikke er synlige (basert på visHvis).
  // Dette sikrer at kun relevante svar sendes til backend og at formData ikke inneholder "gamle" eller skjulte felt.
  // Kalles automatisk hver gang formverdier endres.
  useEffect(() => {
    const values = form.value();

    bostedslandSporsmal.forEach((sporsmal) => {
      const sporsmalId = sporsmal.id as keyof BostedslandSvar;
      if (sporsmal.visHvis && !sporsmal.visHvis(values) && values[sporsmalId] !== undefined) {
        form.setValue(sporsmalId, undefined);
      }
    });
  }, [form.value()]);

  return (
    <Page className="brukerdialog">
      <h2>Bostedsland</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {bostedslandSporsmal.map((sporsmal) => {
                // Skip rendering if the question should not be shown based on current answers
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Sporsmal
                    key={sporsmal.id}
                    sporsmal={sporsmal}
                    // @ts-ignore
                    formScope={form.scope(sporsmal.id as keyof BostedslandSvar)}
                  />
                );
              })}

              {actionData && (
                <Alert variant="error" className="mt-4">
                  {actionData.error}
                </Alert>
              )}
            </VStack>

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
