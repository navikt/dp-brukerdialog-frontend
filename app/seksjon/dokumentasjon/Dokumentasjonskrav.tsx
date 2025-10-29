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
import { Form, useParams } from "react-router";
import { Spørsmål } from "~/components/spørsmål/Spørsmål";
import { useNullstillSkjulteFelter } from "~/hooks/useNullstillSkjulteFelter";
import { dokumentasjonskravSchema } from "./dokumentasjonskrav.schema";
import {
  dokumentasjonskravSpørsmål,
  DokumentasjonskravSvar,
  DOKUMENTKRAV_SVAR_SEND_NAA,
  DOKUMENTKRAV_SVAR_SENDER_IKKE,
  DOKUMENTKRAV_SVAR_SENDER_SENERE,
  DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE,
  hvaErGrunnenTilAtDuIkkeSenderDokumentet,
  hvaErGrunnenTilAtDuSenderDokumentetSenere,
  nårSendteDuDokumentet,
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
  seksjon: any;
}

export function Dokumentasjonskrav({ dokumentasjonskrav, seksjon }: DokumentasjonskravProps) {
  const { soknadId } = useParams();

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
    method: "PUT",
    submitSource: "state",
    schema: dokumentasjonskravSchema,
    defaultValues: {
      [velgHvaDuVilGjøre]: dokumentasjonskrav.svar,
      [hvaErGrunnenTilAtDuSenderDokumentetSenere]:
        dokumentasjonskrav.svar === DOKUMENTKRAV_SVAR_SENDER_SENERE
          ? dokumentasjonskrav.begrunnelse
          : undefined,
      [nårSendteDuDokumentet]:
        dokumentasjonskrav.svar === DOKUMENTKRAV_SVAR_SENDT_TIDLIGERE
          ? dokumentasjonskrav.begrunnelse
          : undefined,
      [hvaErGrunnenTilAtDuIkkeSenderDokumentet]:
        dokumentasjonskrav.svar === DOKUMENTKRAV_SVAR_SENDER_IKKE
          ? dokumentasjonskrav.begrunnelse
          : undefined,
    },
    validationBehaviorConfig: {
      initial: "onSubmit",
      whenTouched: "onSubmit",
      whenSubmitted: "onSubmit",
    },
    handleSubmit: (dokumentasjonskravSvar) => {
      const begrunnelse =
        dokumentasjonskravSvar[nårSendteDuDokumentet] ||
        dokumentasjonskravSvar[hvaErGrunnenTilAtDuIkkeSenderDokumentet] ||
        dokumentasjonskravSvar[hvaErGrunnenTilAtDuSenderDokumentetSenere] ||
        undefined;

      const svar = {
        ...dokumentasjonskrav,
        svar: dokumentasjonskravSvar[velgHvaDuVilGjøre],
        begrunnelse: begrunnelse,
      };

      lagreDokumentasjonskravSvar(svar);
    },
  });

  useNullstillSkjulteFelter<DokumentasjonskravSvar>(form, dokumentasjonskravSpørsmål);

  async function lagreDokumentasjonskravSvar(svar: DokumentasjonskravType) {
    const dokumentasjonskrav: DokumentasjonskravType[] = seksjon.dokumentasjonskrav;
    const oppdatertDokumentasjonskrav = dokumentasjonskrav.map((krav: DokumentasjonskravType) =>
      krav.id === svar.id ? svar : krav
    );

    const seksjonsdata = {
      ...seksjon,
      dokumentasjonskrav: oppdatertDokumentasjonskrav,
    };

    const formData = new FormData();
    formData.append("seksjonsdata", JSON.stringify(seksjonsdata));

    const response = await fetch(
      `/api/lagre-dokumentasjonskrav/${soknadId}/${seksjon.seksjonId}/`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      console.error("Noe gikk galt ved lagring av dokumentasjonskrav");
    }
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

          <Button
            type="submit"
            variant="secondary"
            icon={<FloppydiskIcon aria-hidden />}
            iconPosition="right"
            className="mt-8"
          >
            Lagre
          </Button>
        </Form>
      </VStack>
    </Box>
  );
}
