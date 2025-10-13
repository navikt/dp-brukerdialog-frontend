import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack, VStack } from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form, useActionData, useLoaderData, useNavigate, useNavigation } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { action, loader } from "~/routes/$soknadId.din-situasjon";
import { dinSituasjonSchema } from "~/seksjon/din-situasjon/v1/din-situasjon.schema";
import { dinSituasjonSpørsmål, DinSituasjonSvar } from "./din-situasjon.spørsmål";

export function DinSituasjonViewV1() {
  const { state } = useNavigation();
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const form = useForm({
    method: "PUT",
    submitSource: "state",
    schema: dinSituasjonSchema,
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    defaultValues: { ...loaderData.seksjon, versjon: loaderData.versjon },
  });

  useNullstillSkjulteFelter<DinSituasjonSvar>(form, dinSituasjonSpørsmål);

  return (
    <div className="innhold">
      <h2>Din situasjon</h2>
      <VStack gap="20">
        <VStack gap="6">
          <Form {...form.getFormProps()}>
            <input type="hidden" name="versjon" value={loaderData.versjon} />
            <VStack gap="8">
              {dinSituasjonSpørsmål.map((spørsmål) => {
                if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                  return null;
                }

                return (
                  <Spørsmål
                    key={spørsmål.id}
                    spørsmål={spørsmål}
                    formScope={form.scope(spørsmål.id as keyof DinSituasjonSvar)}
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
    </div>
  );
}
