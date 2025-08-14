import { z } from "zod";
import { Barn, barnetilleggSporsmal, BarnetilleggSvar } from "~/components/regelsett/barnetillegg";
import { useForm } from "@rvf/react-router";
import { useEffect, useRef } from "react";
import { Box, Button, HStack, Page, Radio, RadioGroup, VStack } from "@navikt/ds-react";
import { data, Form, LoaderFunctionArgs, useLoaderData } from "react-router";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import invariant from "tiny-invariant";
import { hentSeksjon } from "~/models/hentSeksjon.server";
import { formaterNorskDato } from "~/utils/formattering.util";
import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";

const barneSchema = z.object({
  fornavnOgEtternavn: z.string().max(100, "Maks 100 tegn"),
  etternavn: z.string().max(100, "Maks 100 tegn"),
  fodselsnummer: z.string(),
  hvilketLandBarnetBorI: z.string().optional(),
});

const schema = z
  .object({
    forsørgerBarnSomIkkeVises: z.enum(["ja", "nei"]).optional(),
    barnFraPdl: z.array(z.object(barneSchema)).optional(),
    barnLagtManuelt: z.array(z.object(barneSchema)),
  })
  .superRefine((data, ctx) => {
    barnetilleggSporsmal.forEach((sporsmal) => {
      const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
      const sporsmalId = sporsmal.id as keyof BarnetilleggSvar;
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const response = await hentSeksjon(request, params.soknadId, "barnetillegg");
  if (response.status === 200) {
    return data(await response.json());
  }

  return data({
    forsørgerBarnSomIkkeVises: undefined,
    barnFraPdl: [],
    barnLagtManuelt: [],
  });
}

export default function BarneTillegg() {
  const barnetillegg = useLoaderData<typeof loader>();

  console.log("Barnetillegg: ", barnetillegg);

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: schema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: barnetillegg,
  });

  // Fjern verdier for alle felter som ikke er synlige (basert på visHvis).
  // Dette sikrer at kun relevante svar sendes til backend og at formData ikke inneholder "gamle" eller skjulte felt.
  // Kalles automatisk hver gang formverdier endres.
  useEffect(() => {
    const values = form.value();

    barnetilleggSporsmal.forEach((sporsmal) => {
      const sporsmalId = sporsmal.id as keyof BarnetilleggSvar;
      if (sporsmal.visHvis && !sporsmal.visHvis(values) && values[sporsmalId] !== undefined) {
        form.setValue(sporsmalId, undefined);
      }
    });
  }, [form.value()]);

  return (
    <Page className="brukerdialog">
      <h2>Barnetillegg</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <VStack gap="8">
              {barnetilleggSporsmal.map((sporsmal) => {
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                  console.log("Spørsmålet er ikke synlig:", sporsmal.id);
                  return null;
                }
                if (sporsmal.id === "barnFraPdl") {
                  const pdlBarn = form.value("barnFraPdl") as Barn[];
                  if (!pdlBarn || pdlBarn.length === 0) {
                    return;
                  } else {
                    return pdlBarn.map((barn, index) => (
                      <Box
                        key={index}
                        background="surface-alt-3-subtle"
                        padding="4"
                        shadow="medium"
                        borderRadius="xlarge"
                      >
                        <h3 style={{ marginBottom: "5px", marginTop: "0" }}>
                          {barn.fornavnOgEtternavn} {barn.etternavn}
                        </h3>
                        <h5 style={{ margin: "auto" }}>Født {formaterNorskDato(new Date())}</h5>
                        <p style={{ margin: "5px auto", textTransform: "uppercase" }}>
                          Bor i {barn.hvilketLandBarnetBorI}
                        </p>

                        <RadioGroup
                          legend="Forsørger du barnet?"
                          value={barn.forsørgerDuBarnet}
                          name={`barn.${index}.forsørgerDuBarnet`}
                          size="small"
                        >
                          <HStack gap="6">
                            <Radio value="ja">Ja</Radio>
                            <Radio value="nei">Nei</Radio>
                          </HStack>
                        </RadioGroup>
                      </Box>
                    ));
                  }
                }
              })}
              {barnetilleggSporsmal.map((sporsmal) => {
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                  console.log("Spørsmålet er ikke synlig:", sporsmal.id);
                  return null;
                }

                if (sporsmal.id === "forsørgerBarnSomIkkeVises") {
                  return (
                    <Sporsmal
                      key={sporsmal.id}
                      sporsmal={sporsmal}
                      formScope={form.scope(sporsmal.id as keyof BarnetilleggSvar)}
                    />
                  );
                }
              })}
              {barnetilleggSporsmal.map((sporsmal) => {
                if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                  return null;
                }

                if (sporsmal.id === "barnLagtManuelt") {
                  const barnSvar = form.value("barnLagtManuelt") as Barn[];
                  if (!barnSvar || barnSvar.length === 0) {
                    return;
                  } else {
                    return barnSvar.map((barn, index) => (
                      <Box
                        key={index}
                        background="surface-alt-3-subtle"
                        padding="4"
                        shadow="medium"
                        borderRadius="xlarge"
                      >
                        <h3 style={{ marginBottom: "5px", marginTop: "0" }}>
                          {barn.fornavnOgEtternavn} {barn.etternavn}
                        </h3>
                        <h5 style={{ margin: "auto" }}>Født {formaterNorskDato(new Date())}</h5>
                        <p style={{ margin: "5px auto", textTransform: "uppercase" }}>
                          Bor i {barn.hvilketLandBarnetBorI}
                        </p>

                        <div>
                          <Button icon={<PencilIcon />} variant="secondary" size="small">
                            Endre svar
                          </Button>
                          <Button icon={<TrashIcon />} variant="tertiary" size="small">
                            Slett
                          </Button>
                        </div>
                      </Box>
                    ));
                  }
                }
              })}
            </VStack>
          </Form>
        </VStack>
      </VStack>
    </Page>
  );
}
