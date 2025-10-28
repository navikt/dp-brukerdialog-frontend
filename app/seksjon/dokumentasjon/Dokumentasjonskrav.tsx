import { FloppydiskIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  Heading,
  List,
  ReadMore,
  VStack,
} from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import { Form } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { dokumentasjonskravSchema } from "./dokumentasjonskrav.schema";
import {
  dokumentasjonskravSpørsmål,
  DokumentasjonskravSvar,
  DOKUMENTKRAV_SVAR_SEND_NAA,
  DOKUMENTKRAV_SVAR_SENDER_IKKE,
  DOKUMENTKRAV_SVAR_SENDER_SENERE,
  DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE,
  velgHvaDuVilGjøre,
} from "./dokumentasjonskrav.spørsmål";
import { FilOpplasting } from "./FilOpplasting";

export type DokumentasjonskravType = {
  id: string;
  spørsmålId: string;
  tittel?: string;
  type: "Barn" | "Arbeidsforhold";
  gyldigeValg?: GyldigDokumentkravSvar[];
  svar?: GyldigDokumentkravSvar;
  begrunnelse?: string;
  bundle?: string;
  bundleFilsti?: string;
};

export type GyldigDokumentkravSvar =
  | typeof DOKUMENTKRAV_SVAR_SEND_NAA
  | typeof DOKUMENTKRAV_SVAR_SENDER_SENERE
  | typeof DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE
  | typeof DOKUMENTKRAV_SVAR_SENDER_IKKE;

interface DokumentasjonskravProps {
  dokumentasjonskrav: DokumentasjonskravType;
  seksjon: object;
}

export function Dokumentasjonskrav({ dokumentasjonskrav, seksjon }: DokumentasjonskravProps) {
  function hentBeskrivelse(type: string) {
    switch (type) {
      case "Barn":
        return (
          <ReadMore header="Dette må dokumentasjonen inneholde">
            <VStack gap="2">
              <BodyShort>Arbeidsavtalen må inneholde</BodyShort>
              <List as="ul">
                <List.Item>datoen du startet i jobben din</List.Item>
                <List.Item>stillingsprosent eller avtalt arbeidstid</List.Item>
                <List.Item>sluttdato, hvis du har en midlertidig arbeidsavtale</List.Item>
              </List>
              <BodyLong>
                Arbeidsavtalen må inneholde datoen du startet i jobben din stillingsprosent eller
                avtalt arbeidstid avtalt oppsigelsestid sluttdato, hvis du har en midlertidig
                arbeidsavtale Hvis du ikke har arbeidsavtalen din, kan arbeidsgiveren din fylle ut
                skjemaet  "Bekreftelse på sluttårsak/nedsatt arbeidstid" (NAV 04-08.03). Du kan også
                be arbeidsgiveren din bekrefte opplysningene på en annen måte.
              </BodyLong>
            </VStack>
          </ReadMore>
        );
      case "Arbeidsforhold":
        return "Dokumentasjon for arbeidsforhold lagt til i søknaden";
      default:
        return "Dokumentasjon";
    }
  }

  const form = useForm({
    method: "POST",
    submitSource: "state",
    schema: dokumentasjonskravSchema,
    defaultValues: {},
    validationBehaviorConfig: {
      initial: "onBlur",
      whenTouched: "onBlur",
      whenSubmitted: "onBlur",
    },
    handleSubmit: (values) => {
      console.log(values);
    },
  });

  async function lagreDokumentasjonskravSvar() {
    // const dokumentasjonskravSvar: DokumentasjonskravSvar = form.value();
    // const data = {
    //   ...seksjon,
    //   dokumentasjonskrav,
    // };
    // try {
    //   const response = await fetch(
    //     `/api/lagre-dokumentasjonskrav/${soknadId}/${seksjon.seksjonId}/`,
    //     {
    //       method: "POST",
    //       // body: formData,
    //     }
    //   );
    //   if (!response.ok) {
    //     return;
    //   }
    //   return await response.text();
    // } catch (error) {
    //   console.error(error);
    // } finally {
    // }
  }

  return (
    <Box padding="space-16" background="surface-subtle" borderRadius="large" className="mt-4">
      <VStack gap="8">
        <Form {...form.getFormProps()}>
          <VStack gap="6">
            <Heading size="small" level="3">
              {dokumentasjonskrav.tittel || "Dokumentasjon"}
            </Heading>

            {dokumentasjonskrav.type && (
              <BodyLong>{hentBeskrivelse(dokumentasjonskrav.type)}</BodyLong>
            )}

            {dokumentasjonskravSpørsmål.map((spørsmål) => {
              if (spørsmål.visHvis && !spørsmål.visHvis(form.value())) {
                return null;
              }

              return (
                <Spørsmål
                  key={spørsmål.id}
                  spørsmål={spørsmål}
                  formScope={form.scope(spørsmål.id as keyof DokumentasjonskravSvar)}
                />
              );
            })}
          </VStack>

          {form.value(velgHvaDuVilGjøre) === DOKUMENTKRAV_SVAR_SEND_NAA && (
            <FilOpplasting dokumentasjonskrav={dokumentasjonskrav} />
          )}
        </Form>
      </VStack>
      <Button
        variant="secondary"
        icon={<FloppydiskIcon aria-hidden />}
        iconPosition="right"
        className="mt-8"
        type="submit"
      >
        Lagre
      </Button>
    </Box>
  );
}
