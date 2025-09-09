import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigate } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.annen-pengestotte";
import { pengestøtteFraAndreEøsLand } from "~/seksjon/annen-pengestøtte/annen-pengestøtte-eøs";
import {
  annenPengestøtteFraAndreEnnNavSpørsmål,
  dagpengerFraEtAnnetEøsLandSpørsmål,
  etterlønnFraArbeidsgiverSpørsmål,
  fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål,
  pengestøtteFraNorgeSpørsmål,
  pensjonFraAndreEnnNavSpørsmål,
  utbetalingFraGarantikassenForFiskereSpørsmål,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte-norge";
import { annenPengestøtteSchema } from "~/seksjon/annen-pengestøtte/annen-pengestøtte.schema";
import {
  AnnenPengestøtteSvar,
  annenYtelse,
  dagpengerFraAnnetEøsLand,
  etterlønnFraArbeidsgiver,
  garantiLottForFiskere,
  hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav,
  pensjonFraAndreEnnNav,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte.spørsmål";
import styles from "./annen-pengestøtte.module.css";

export const annenPengestøtteAlleSpørsmål = pengestøtteFraAndreEøsLand
  .concat(pengestøtteFraNorgeSpørsmål)
  .concat(pensjonFraAndreEnnNavSpørsmål)
  .concat(utbetalingFraGarantikassenForFiskereSpørsmål)
  .concat(etterlønnFraArbeidsgiverSpørsmål)
  .concat(dagpengerFraEtAnnetEøsLandSpørsmål)
  .concat(annenPengestøtteFraAndreEnnNavSpørsmål)
  .concat(fårEllerKommerTilÅFåLønnEllerAndreGoderFraTidligereArbeidsgiverSpørsmål);

export function AnnenPengestøtteView() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: annenPengestøtteSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: loaderData ?? {},
  });

  useNullstillSkjulteFelter<AnnenPengestøtteSvar>(form, annenPengestøtteAlleSpørsmål);

  function render(spørsmål: KomponentType) {
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
  }

  return (
    <div className="innhold">
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
                ?.includes(pensjonFraAndreEnnNav) && (
                <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                  <h4>Pensjon fra andre enn Nav</h4>
                  {pensjonFraAndreEnnNavSpørsmål.map((spørsmål) => render(spørsmål))}
                </VStack>
              )}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes(garantiLottForFiskere) && (
                <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                  <h4>
                    Pengestøtte under arbeidsløshet eller garantilott fra Garantikassen for fiskere
                    (GFF)
                  </h4>
                  {utbetalingFraGarantikassenForFiskereSpørsmål.map((spørsmål) => render(spørsmål))}
                </VStack>
              )}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes(etterlønnFraArbeidsgiver) && (
                <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                  <h4>Etterlønn fra arbeidsgiver</h4>
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
                  </Alert>
                  {etterlønnFraArbeidsgiverSpørsmål.map((spørsmål) => render(spørsmål))}
                </VStack>
              )}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes(dagpengerFraAnnetEøsLand) && (
                <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                  <h4>Dagpenger fra et annet EØS-land</h4>
                  {dagpengerFraEtAnnetEøsLandSpørsmål.map((spørsmål) => render(spørsmål))}
                </VStack>
              )}

            {form.value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav) &&
              form
                .value(hvilkeYtelserMottarDuEllerHarDuSøktPåFraAndreEnnNav)
                ?.includes(annenYtelse) && (
                <VStack gap="4" className={styles.annenPengestotteDetaljer}>
                  <h4>Annen pengestøtte fra andre enn Nav</h4>
                  {annenPengestøtteFraAndreEnnNavSpørsmål.map((spørsmål) => render(spørsmål))}
                </VStack>
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
    </div>
  );
}
