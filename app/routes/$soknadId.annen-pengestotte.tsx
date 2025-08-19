import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, Page, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { ActionFunctionArgs, Form, redirect, useActionData, useNavigate } from "react-router";
import invariant from "tiny-invariant";
import { z } from "zod";
import { lagreSeksjon } from "~/models/lagreSeksjon.server";
import { useEffect } from "react";
import {
  AnnenPengestøtteSvar,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver,
  harMottattPengestøtteFraAndreEØSLand,
  hvemUtbetalerEtterlønnen,
  hvemUtbetalerPengestøtten,
  hvemUtbetalerPensjonen,
  hvilkenAnnenPengestøtteMottas,
  hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed,
  hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed,
  hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed,
  hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed,
  hvilkenPeriodeGjelderEtterlønnenForFraOgMed,
  hvilkenPeriodeGjelderEtterlønnenForTilOgMed,
  hvilkenPeriodeGjelderPensjonenForFraOgMed,
  hvilkenPeriodeGjelderPensjonenForTilOgMed,
  hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed,
  hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed,
  hvilketEøsLandUtbetalerDagpengene,
  hvilkeUtenlandskeYtelserHarDuMottatt,
  hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav,
  mottarEllerHarSøktOmPengestøtteFraAndreEnnNav,
  skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver,
} from "~/components/regelsett/annen-pengestøtte/annen-pengestøtte-svar";
import { pengestøtteFraAndreEøsLand } from "~/components/regelsett/annen-pengestøtte/annen-pengestøtte-eøs";
import {
  annenPengestøtteFraAndreEnnNav,
  dagpengerFraEtAnnetEøsLandSpørsmål,
  etterlønnFraArbeidsgiverSpørsmål,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
  pengestøtteFraNorgeSpørsmål,
  pensjonFraAndreEnnNavSpørsmål,
  utbetalingFraGarantikassenForFiskere,
} from "~/components/regelsett/annen-pengestøtte/annen-pengestøtte-norge";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import styles from "~/components/regelsett/annen-pengestøtte/annen-pengestøtte.module.css";

export async function action({ request, params }: ActionFunctionArgs) {
  invariant(params.soknadId, "Søknad ID er påkrevd");

  const formData = await request.formData();
  const seksjonId = "annen-pengestotte";
  const nesteSeksjonId = "egen-naring";
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
export default function AnnenPengestøtte() {
  const kortTekstMaksLengde = 200;

  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const komplettSchema = pengestøtteFraAndreEøsLand
    .concat(pengestøtteFraNorgeSpørsmål)
    .concat(pensjonFraAndreEnnNavSpørsmål)
    .concat(utbetalingFraGarantikassenForFiskere)
    .concat(etterlønnFraArbeidsgiverSpørsmål)
    .concat(dagpengerFraEtAnnetEøsLandSpørsmål)
    .concat(annenPengestøtteFraAndreEnnNav)
    .concat(fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål);

  const schema = z
    .object({
      [harMottattPengestøtteFraAndreEØSLand]: z.enum(["ja", "nei"]).optional(),
      [hvilkeUtenlandskeYtelserHarDuMottatt]: z
        .array(
          z.enum([
            "sykepenger",
            "foreldrepengerEllerSvangerskapspenger",
            "dagpengerEllerArbeidsledighetstrygd",
            "pleiepengerOmsorgspengerEllerOpplæringspenger",
          ])
        )
        .optional(),
      [mottarEllerHarSøktOmPengestøtteFraAndreEnnNav]: z.enum(["ja", "nei"]).optional(),
      [hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav]: z
        .array(
          z.enum([
            "pensjonFraAndreEnnNav",
            "etterlønnFraArbeidsgiver",
            "garantiLottForFiskere",
            "dagpengerFraAnnetEøsLand",
            "annenYtelse",
          ])
        )
        .optional(),
      [hvemUtbetalerPensjonen]: z
        .string()
        .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
        .optional(),
      [hvilkenPeriodeGjelderPensjonenForFraOgMed]: z.string().optional(),
      [hvilkenPeriodeGjelderPensjonenForTilOgMed]: z.string().optional(),
      [hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForFraOgMed]: z.string().optional(),
      [hvilkenPeriodeGjelderUtbetalingFraGarantikassenForFiskereForTilOgMed]: z.string().optional(),
      [hvemUtbetalerEtterlønnen]: z
        .string()
        .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
        .optional(),
      [hvilkenPeriodeGjelderEtterlønnenForFraOgMed]: z.string().optional(),
      [hvilkenPeriodeGjelderEtterlønnenForTilOgMed]: z.string().optional(),
      [hvilketEøsLandUtbetalerDagpengene]: z.string().optional(),
      [hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForFraOgMed]: z.string().optional(),
      [hvilkenPeriodeGjelderDagpengeneFraAnnetEøsLandForTilOgMed]: z.string().optional(),
      [hvilkenAnnenPengestøtteMottas]: z
        .string()
        .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
        .optional(),
      [hvemUtbetalerPengestøtten]: z
        .string()
        .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
        .optional(),
      [hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForFraOgMed]: z.string().optional(),
      [hvilkenPeriodeGjelderAnnenPengestøtteFraAndreEnnNavForTilOgMed]: z.string().optional(),
      [fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiver]: z
        .enum(["ja", "nei"])
        .optional(),
      [skrivInnHvaDuFårBeholdeFraTidligereArbeidsgiver]: z
        .string()
        .max(kortTekstMaksLengde, `Maks ${kortTekstMaksLengde} tegn.`)
        .optional(),
    })
    .superRefine((data, ctx) => {
      komplettSchema.forEach((spørsmål) => {
        const synlig = !spørsmål.visHvis || spørsmål.visHvis(data);
        const spørsmålId = spørsmål.id as keyof AnnenPengestøtteSvar;
        const svar = data[spørsmålId];

        if (synlig && (!svar || svar?.length === 0)) {
          ctx.addIssue({
            path: [spørsmål.id],
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
    komplettSchema.forEach((spørsmål) => {
      const spørsmålId = spørsmål.id as keyof AnnenPengestøtteSvar;
      if (spørsmål.visHvis && !spørsmål.visHvis(values) && values[spørsmålId] !== undefined) {
        form.setValue(spørsmålId, undefined);
      }
    });
  }, [form.value()]);

  const render = (spørsmål: KomponentType) => {
    if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
      return null;
    }

    return (
      <Spørsmål
        key={spørsmål.id}
        spørsmål={spørsmål}
        formScope={form.scope(spørsmål.id as keyof AnnenPengestøtteSvar)}
      />
    );
  };

  return (
    <Page className="brukerdialog">
      <h2>Annen pengstøtte</h2>
      <VStack gap="20">
        <Form {...form.getFormProps()}>
          <VStack gap="8">
            <h3>Pengestøtte fra andre EØS land</h3>
            {pengestøtteFraAndreEøsLand.map((spørsmål) => {
              return render(spørsmål);
            })}

            <h3>Pengestøtte fra Norge</h3>
            {pengestøtteFraNorgeSpørsmål.map((spørsmål) => render(spørsmål))}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes("pensjonFraAndreEnnNav") && (
                <>
                  <Alert variant="info">
                    Du må legge ved dokumentasjon på hvem som utbetaler pensjonen, og hvilken
                    periode den gjelder for.
                  </Alert>
                  <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                    <h4>Pensjon fra andre enn Nav</h4>
                    {pensjonFraAndreEnnNavSpørsmål.map((spørsmål) => render(spørsmål))}
                  </VStack>
                </>
              )}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes("garantiLottForFiskere") && (
                <>
                  <Alert variant="info">
                    Du må dokumentasjon hvilken periode Garantikassen for fiskere utbetaler ytelsen.
                  </Alert>
                  <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                    <h4>
                      Pengestøtte under arbeidsløshet eller garantilott fra Garantikassen for
                      fiskere (GFF)
                    </h4>
                    {utbetalingFraGarantikassenForFiskere.map((spørsmål) => render(spørsmål))}
                  </VStack>
                </>
              )}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes("etterlønnFraArbeidsgiver") && (
                <>
                  <Alert variant="info">
                    Etterlønn er en ytelse som helt eller delvis dekker bortfall av inntekt for en
                    periode du ikke er omfattet av arbeidsavtalen.
                    <br />
                    <br />
                    Dette er ikke etterlønn:
                    <ul>
                      <li>Vanlig oppsigelsestid.</li>
                      <li>
                        Godtgjørelse som avtales i forbindelse med opphør av arbeidsforholdet.
                      </li>
                      <li>Erstatning for usaklig oppsigelse, som ikke er lønn.</li>
                      <li>Sluttvederlag etter tariffavtale.</li>
                    </ul>
                    Du må legge ved dokumentasjon av hvem som utbetaler etterlønnen, og hvilken
                    periode den gjelder for.
                  </Alert>
                  <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                    <h4>Etterlønn fra arbeidsgiver</h4>
                    {etterlønnFraArbeidsgiverSpørsmål.map((spørsmål) => render(spørsmål))}
                  </VStack>
                </>
              )}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes("dagpengerFraAnnetEøsLand") && (
                <>
                  <Alert variant="info">
                    Du må legge ved dokumentasjon av hvilket land som utbetaler dagpengene, og
                    hvilken periode den gjelder for.
                  </Alert>
                  <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                    <h4>Dagpenger fra et annet EØS-land</h4>
                    {dagpengerFraEtAnnetEøsLandSpørsmål.map((spørsmål) => render(spørsmål))}
                  </VStack>
                </>
              )}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes("annenYtelse") && (
                <>
                  <Alert variant="info">
                    Du må legge ved dokumentasjon på hvem som utbetaler pensjonen, og hvilken
                    periode den gjelder for.
                  </Alert>
                  <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                    <h4>Annen pengestøtte fra andre enn Nav</h4>
                    {annenPengestøtteFraAndreEnnNav.map((spørsmål) => render(spørsmål))}
                  </VStack>
                </>
              )}

            {fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål.map(
              (spørsmål) => render(spørsmål)
            )}

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
