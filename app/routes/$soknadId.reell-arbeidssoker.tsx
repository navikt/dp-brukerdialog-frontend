import invariant from "tiny-invariant";
import { Alert, Button, HStack, List, Page, VStack } from "@navikt/ds-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { useForm } from "@rvf/react-router";
import { ActionFunctionArgs, Form, redirect, useActionData, useNavigate } from "react-router";
import { z } from "zod";
import { useEffect } from "react";
import { Sporsmal } from "~/components/sporsmal/Sporsmal";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { ListItem } from "@navikt/ds-react/List";
import {
  erDuVilligTilÅBytteYrkeEllerGåNedILønn,
  kanDuJobbeBådeHeltidOgDeltid,
  kanDuJobbeIHeleNorge,
  kanDuTaAlleTyperArbeid,
  kanIkkeJobbeBådeHeltidOgDeltidAntallTimer,
  situasjonsbeskrivelseOmsorgForBarnUnderEttÅr,
  situasjonsbeskrivelseRedusertHelse,
  ReellArbeidssøkerSvar,
  situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
  situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
  situasjonsbeskrivelseDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
  kanIkkeJobbeBådeHeltidOgDeltidSkrivKortOmSituasjonen,
  situasjonsbeskrivelseJegErPermitert,
  situasjonsbeskrivelseHarFylt60,
  situasjonsbeskrivelseAnnenSituasjon,
  hvilkeTyperJobberKanDuTa,
  kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse,
} from "~/components/regelsett/reell-arbeidssøker/reell-arbeidssøker-svar";
import { reellArbeidssøkerSpørsmål } from "~/components/regelsett/reell-arbeidssøker/reell-arbeidssøker";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "reell-arbeidssoker";
  const nesteSeksjonId = "tilleggsopplysninger";
  const seksjonsData = JSON.stringify(Object.fromEntries(formData.entries()));

  const response = await lagreSeksjon(request, params.soknadId, seksjonId, seksjonsData);

  if (response.status !== 200) {
    return {
      error: "Noe gikk galt ved lagring av seksjonen.",
    };
  }

  return redirect(`/${params.soknadId}/${nesteSeksjonId}`);
}

// noinspection JSUnusedGlobalSymbols
export default function ReellArbeidssøker() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const schema = z
    .object({
      [kanDuTaAlleTyperArbeid]: z.enum(["ja", "nei"]).optional(),
      [hvilkeTyperJobberKanDuTa]: z.string().max(500).optional(),
      [erDuVilligTilÅBytteYrkeEllerGåNedILønn]: z.enum(["ja", "nei"]).optional(),
      [kanDuJobbeBådeHeltidOgDeltid]: z.enum(["ja", "nei"]).optional(),
      [kanIkkeJobbeBådeHeltidOgDeltidAntallTimer]: z.string().optional(),
      [kanDuJobbeIHeleNorge]: z.enum(["ja", "nei"]).optional(),
      [kanIkkeJobbeHeltidOgDeltidOgEllerkanIkkeJobbeIHeleNorgeSituasjonsbeskrivelse]: z.array(
        z
          .enum([
            situasjonsbeskrivelseRedusertHelse,
            situasjonsbeskrivelseOmsorgForBarnUnderEttÅr,
            situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnTilOgMed7Klasse,
            situasjonsbeskrivelseEneansvarEllerDeltAnsvarForBarnUnder18ÅrMedSpesielleBehov,
            situasjonsbeskrivelseDenAndreForeldrenJobberSkiftEllerLignendeOgAnsvarForBarnTilOgMed7KlasseEllerMedSpesielleBehov,
            situasjonsbeskrivelseJegErPermitert,
            situasjonsbeskrivelseHarFylt60,
            situasjonsbeskrivelseAnnenSituasjon,
          ])
      ).optional(),
      [kanIkkeJobbeBådeHeltidOgDeltidSkrivKortOmSituasjonen]: z.string().max(500).optional(),
    })
    .superRefine((data, ctx) => {
      reellArbeidssøkerSpørsmål.forEach((sporsmal) => {
        const synlig = !sporsmal.visHvis || sporsmal.visHvis(data);
        const sporsmalId = sporsmal.id as keyof ReellArbeidssøkerSvar;
        const svar = data[sporsmalId];

        if (synlig && (!svar || svar?.length === 0)) {
          ctx.addIssue({
            path: [sporsmal.id],
            code: "custom",
            message: "Du må svare på dette spørsmålet",
          });
        }
      });
    });

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

    reellArbeidssøkerSpørsmål.forEach((sporsmal) => {
      const sporsmalId = sporsmal.id as keyof ReellArbeidssøkerSvar;
      if (sporsmal.visHvis && !sporsmal.visHvis(values) && values[sporsmalId] !== undefined) {
        form.setValue(sporsmalId, undefined);
      }
    });
  }, [form.value()]);

  return (
    <Page className="brukerdialog">
      <h2>Reell arbeidssøker</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <VStack gap="8">
            <VStack>
              For å få dagpenger må du være reell arbeidssøker. Dette betyr at du som hovedregel
              <List>
                <ListItem>må være registrert som arbeidssøker</ListItem>
                <ListItem>
                  er frisk nok til å jobbe minst 50 prosent, som tilsvarer 18,75 timer i uka
                </ListItem>
                <ListItem>kan ta ethvert arbeid hvor som helst i Norge</ListItem>
              </List>
            </VStack>
            {reellArbeidssøkerSpørsmål.map((sporsmal) => {
              // Skip rendering if the question should not be shown based on current answers
              if (sporsmal.visHvis && !sporsmal.visHvis(form.value())) {
                return null;
              }

              return (
                <Sporsmal
                  key={sporsmal.id}
                  sporsmal={sporsmal}
                  formScope={form.scope(sporsmal.id as keyof ReellArbeidssøkerSvar)}
                />
              );
            })}

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
          </VStack>
        </Form>
      </VStack>
    </Page>
  );
}
