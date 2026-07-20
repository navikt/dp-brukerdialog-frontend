import {
  ArrowRightIcon,
  ExclamationmarkTriangleIcon,
  InformationSquareIcon,
} from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Button,
  ExpansionCard,
  Heading,
  HStack,
  InfoCard,
  LocalAlert,
  ReadMore,
  Tag,
  VStack,
} from "@navikt/ds-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLoaderData, useParams, useSearchParams } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { stegISøknaden } from "~/routes/$soknadId";
import { loader } from "~/routes/$soknadId.kvittering";
import { DokumentasjonskravSomErSendtAvDeg } from "~/seksjon/kvittering/DokumentasjonSomErSendtAvDeg";
import { DokumentasjonSomIkkeSkalSendes } from "~/seksjon/kvittering/DokumentasjonSomIkkeSkalSendes";
import { Oppsummering } from "~/seksjon/oppsummering/Oppsummering";
import { getEnv } from "~/utils/env.utils";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import {
  dokumentkravEttersendt,
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSenderSenere,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
} from "../dokumentasjon/v1/dokumentasjonskrav.komponenter";
import { DokumentasjonSomSkalSendesAvDeg } from "./DokumentasjonSomSkalSendesAvDeg";

export default function KvitteringView() {
  const { t } = useTranslation("kvittering");
  const { soknadId } = useParams();
  const [searchParams] = useSearchParams();
  const loaderData = useLoaderData<typeof loader>();
  const dokumentasjonskrav = loaderData?.dokumentasjonskrav || [];
  const seksjoner =
    (loaderData?.seksjoner ?? []).filter(
      (s: any) => s.seksjonId !== "dokumentasjon" && s.seksjonId !== "startside"
    ) || [];

  useEffect(() => {
    if (searchParams.get("reload") === "true") {
      window.location.href = `${getEnv("BASE_PATH")}/${soknadId}/kvittering`;
    }
  }, [searchParams, soknadId]);

  const dokumentasjonSomErSendtAvDeg: Dokumentasjonskrav[] = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSendNå || krav.svar === dokumentkravEttersendt
  );

  const dokumentasjonSomSkalSendesAvDeg: Dokumentasjonskrav[] = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) => krav.svar === dokumentkravSvarSenderSenere
  );

  const dokumentasjonSomIkkeSkalSendes: Dokumentasjonskrav[] = dokumentasjonskrav.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSenderIkke || krav.svar === dokumentkravSvarSendtTidligere
  );

  return (
    <div className="innhold">
      <title>{t("side.tittel")}</title>
      <VStack gap="space-32">
        <VStack gap="space-32">
          <HStack justify="space-between">
            <VStack>
              <Heading size="medium">{t("side.overskrift")}</Heading>
            </VStack>
            {dokumentasjonSomSkalSendesAvDeg.length > 0 && (
              <Tag variant="warning" size="xsmall">
                {t("tag.manglerDokumentasjon")}
              </Tag>
            )}
          </HStack>

          {dokumentasjonSomSkalSendesAvDeg.length > 0 && (
            <BodyLong>
              {t("intro.medMangler.forLenke")}{" "}
              <EksterneLenke
                href="https://www.nav.no/saksbehandlingstider#dagpenger"
                tekst={t("intro.saksbehandlingstidLenke")}
              />{" "}
              {t("intro.etterLenke")}
            </BodyLong>
          )}

          {dokumentasjonSomSkalSendesAvDeg.length === 0 && (
            <BodyLong>
              {t("intro.utenMangler.forLenke")}{" "}
              <EksterneLenke
                href="https://www.nav.no/saksbehandlingstider#dagpenger"
                tekst={t("intro.saksbehandlingstidLenke")}
              />{" "}
              {t("intro.etterLenke")}
            </BodyLong>
          )}

          {loaderData.erRegistrertArbeidssøker === true && (
            <InfoCard data-color="info">
              <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                <InfoCard.Title>{t("arbeidssoker.registrert.tittel")}</InfoCard.Title>
              </InfoCard.Header>
              <InfoCard.Content>
                <BodyLong>{t("arbeidssoker.registrert.beskrivelse")}</BodyLong>
              </InfoCard.Content>
            </InfoCard>
          )}

          {loaderData.erRegistrertArbeidssøker === false && (
            <InfoCard data-color="warning">
              <InfoCard.Header icon={<ExclamationmarkTriangleIcon aria-hidden />}>
                <InfoCard.Title>{t("arbeidssoker.ikkeRegistrert.tittel")}</InfoCard.Title>
              </InfoCard.Header>
              <InfoCard.Content>
                <BodyLong>
                  {t("arbeidssoker.ikkeRegistrert.forLenke")}{" "}
                  <EksterneLenke
                    href="https://arbeidssokerregistrering.nav.no/"
                    tekst={t("arbeidssoker.registrerLenke")}
                  />
                  .
                </BodyLong>
              </InfoCard.Content>
            </InfoCard>
          )}

          {loaderData.erRegistrertArbeidssøker === "ERROR" && (
            <LocalAlert status="error">
              <LocalAlert.Header>
                <LocalAlert.Title>{t("arbeidssoker.oppslagFeilet.tittel")}</LocalAlert.Title>
              </LocalAlert.Header>
              <LocalAlert.Content>
                <BodyShort spacing>{t("arbeidssoker.oppslagFeilet.beskrivelse")}</BodyShort>
                <BodyShort>
                  {t("arbeidssoker.oppslagFeilet.forLenke")}{" "}
                  <EksterneLenke
                    href="https://arbeidssokerregistrering.nav.no/"
                    tekst={t("arbeidssoker.registrerLenke")}
                  />
                </BodyShort>
              </LocalAlert.Content>
            </LocalAlert>
          )}

          <VStack gap="space-16">
            <Heading size="medium">{t("dokumentasjon.heading")}</Heading>
            <InfoCard data-color="info">
              <InfoCard.Header icon={<InformationSquareIcon aria-hidden />}>
                <InfoCard.Title>{t("dokumentasjon.infoCard.tittel")}</InfoCard.Title>
              </InfoCard.Header>
              <InfoCard.Content>
                <BodyLong spacing weight="semibold">
                  {t("dokumentasjon.infoCard.frist")}
                </BodyLong>
                <BodyLong>{t("dokumentasjon.infoCard.beskrivelse")}</BodyLong>
              </InfoCard.Content>
            </InfoCard>

            <ReadMore header={t("dokumentasjon.manglendeOpplysninger.header")}>
              {t("dokumentasjon.manglendeOpplysninger.forDokumentliste")}{" "}
              <EksterneLenke
                href="https://www.nav.no/arbeid/dagpenger/mine-dagpenger#dokumentliste"
                tekst={t("dokumentasjon.manglendeOpplysninger.dokumentlisteLenke")}
              />
              {t("dokumentasjon.manglendeOpplysninger.mellomLenker")}{" "}
              <EksterneLenke
                href="https://www.nav.no/dagpenger/dialog/generell-innsending/"
                tekst={t("dokumentasjon.manglendeOpplysninger.innsendingLenke")}
              />
              .
            </ReadMore>
          </VStack>

          {dokumentasjonSomErSendtAvDeg.length > 0 && (
            <VStack gap="space-16">
              <Heading size="small">{t("dokumenter.sendtInn.heading")}</Heading>
              {dokumentasjonSomErSendtAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonskravSomErSendtAvDeg key={krav.id} dokumentasjonskrav={krav} />
              ))}
            </VStack>
          )}

          {dokumentasjonSomSkalSendesAvDeg.length > 0 && (
            <VStack gap="space-16">
              <Heading size="small">{t("dokumenter.skalSendes.heading")}</Heading>
              {dokumentasjonSomSkalSendesAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonSomSkalSendesAvDeg key={krav.id} dokumentasjonskrav={krav} />
              ))}
            </VStack>
          )}

          <HStack>
            <Link to={`/${soknadId}/ettersending`}>
              <Button variant="secondary">{t("knapper.sendInnDokumenter")}</Button>
            </Link>
          </HStack>

          {dokumentasjonSomIkkeSkalSendes.length > 0 && (
            <VStack gap="space-16">
              <Heading size="small">{t("dokumenter.ikkeSkalSendes.heading")}</Heading>
              {dokumentasjonSomIkkeSkalSendes.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonSomIkkeSkalSendes key={krav.id} dokummentasjonskrav={krav} />
              ))}
            </VStack>
          )}

          <VStack gap="space-16">
            <ExpansionCard aria-label={t("dineSvar.ariaLabel")}>
              <ExpansionCard.Header>
                <ExpansionCard.Title>{t("dineSvar.tittel")}</ExpansionCard.Title>
              </ExpansionCard.Header>
              <ExpansionCard.Content>
                <VStack gap="space-24">
                  {stegISøknaden.map((seksjon) => {
                    const seksjonsData = seksjoner?.find((s: any) => s.seksjonId === seksjon.path);
                    if (!seksjonsData) return null;
                    return (
                      <Oppsummering
                        key={seksjonsData.seksjonId}
                        seksjonsId={seksjon.path}
                        seksjonsUrl={`/${soknadId}/${seksjonsData.seksjonId}`}
                        seksjonsData={seksjonsData.data}
                        redigerbar={false}
                      />
                    );
                  })}
                </VStack>
              </ExpansionCard.Content>
            </ExpansionCard>
            <HStack>
              <Button
                variant="primary"
                className="mt-32"
                icon={<ArrowRightIcon aria-hidden />}
                iconPosition="right"
                onClick={() => {
                  window.location.href = getEnv("DP_MINE_DAGPENGER_URL");
                }}
              >
                {t("knapper.mineDagpenger")}
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </VStack>
    </div>
  );
}
