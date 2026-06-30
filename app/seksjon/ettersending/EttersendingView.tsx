import { ArrowLeftIcon } from "@navikt/aksel-icons";
import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  ErrorMessage,
  Heading,
  HStack,
  ReadMore,
  VStack,
} from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { EttersendingFilOpplasting } from "~/components/EttersendingFilOpplasting";
import { getEnv } from "~/utils/env.utils";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import {
  dokumentkravEttersendt,
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
} from "../dokumentasjon/v1/dokumentasjonskrav.komponenter";
import { DokumentasjonskravSomErSendtAvDeg } from "../kvittering/DokumentasjonSomErSendtAvDeg";
import { DokumentasjonSomIkkeSkalSendes } from "../kvittering/DokumentasjonSomIkkeSkalSendes";
import { useEttersending } from "./ettersending.context";

export function EttersendingView() {
  const { t } = useTranslation("ettersending");
  const { soknadId } = useParams();
  const navigate = useNavigate();

  const {
    ettersendingene,
    lagrer,
    validerOgLagre,
    harTekniskFeil,
    dokumentasjonskravene,
    valideringStartet,
  } = useEttersending();

  const dokumentasjonSomErSendtAvDeg: Dokumentasjonskrav[] = dokumentasjonskravene.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSendNå || krav.svar === dokumentkravEttersendt
  );

  const dokumentasjonSomIkkeSkalSendes: Dokumentasjonskrav[] = dokumentasjonskravene.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSenderIkke || krav.svar === dokumentkravSvarSendtTidligere
  );

  const harLastetOppFil = ettersendingene.some(
    (krav: Dokumentasjonskrav) => krav.filer && krav.filer.length > 0
  );

  return (
    <div className="innhold">
      <title>{t("side.tittel")}</title>
      <VStack gap="space-32">
        <Heading size="medium" level="2">
          {t("side.overskrift")}
        </Heading>

        {ettersendingene.length > 0 && (
          <>
            <VStack gap="space-16">
              <BodyShort weight="semibold">{t("frist")}</BodyShort>
              <BodyLong>{t("beskrivelse")}</BodyLong>

              <ReadMore header={t("manglendeOpplysninger.header")}>
                <BodyLong>
                  {t("manglendeOpplysninger.førDokumentliste")}{" "}
                  <EksterneLenke
                    href="https://www.nav.no/arbeid/dagpenger/mine-dagpenger#dokumentliste"
                    tekst={t("manglendeOpplysninger.dokumentlisteLenke")}
                  />
                  {t("manglendeOpplysninger.mellomLenker")}{" "}
                  <EksterneLenke
                    href="https://www.nav.no/dagpenger/dialog/generell-innsending/"
                    tekst={t("manglendeOpplysninger.innsendingLenke")}
                  />{" "}
                  {t("manglendeOpplysninger.etterInnsendingLenke")}
                </BodyLong>
              </ReadMore>

              {ettersendingene.map((ettersending: Dokumentasjonskrav) => (
                <Box key={ettersending.id} padding="space-16" background="sunken" borderRadius="12">
                  <EttersendingFilOpplasting ettersending={ettersending} />
                </Box>
              ))}

              {!lagrer && harTekniskFeil && <ErrorMessage>{t("feil.tekniskFeil")}</ErrorMessage>}

              {valideringStartet && !harLastetOppFil && (
                <ErrorMessage>{t("feil.manglerFil")}</ErrorMessage>
              )}
            </VStack>

            <HStack gap="space-16">
              <Button type="button" loading={lagrer} onClick={() => validerOgLagre()}>
                {t("knapper.sendInnDokumenter")}
              </Button>
              <Button
                variant="secondary"
                type="button"
                iconPosition="right"
                disabled={lagrer}
                onClick={() => {
                  navigate(`../kvittering`);
                }}
              >
                {t("knapper.avbryt")}
              </Button>
            </HStack>
          </>
        )}

        <VStack gap="space-16">
          {dokumentasjonSomErSendtAvDeg.length > 0 && (
            <VStack gap="space-16">
              <Heading size="small">{t("dokumenterSendtInn.heading")}</Heading>
              {dokumentasjonSomErSendtAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonskravSomErSendtAvDeg key={krav.id} dokumentasjonskrav={krav} />
              ))}
            </VStack>
          )}

          {dokumentasjonSomIkkeSkalSendes.length > 0 && (
            <VStack gap="space-16">
              <Heading size="small">{t("dokumenterIkkeSendes.heading")}</Heading>
              {dokumentasjonSomIkkeSkalSendes.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonSomIkkeSkalSendes key={krav.id} dokummentasjonskrav={krav} />
              ))}
            </VStack>
          )}
        </VStack>

        <VStack gap="space-16">
          <Heading size="small" level="3">
            {t("andreDokumenter.heading")}
          </Heading>
          <BodyLong>{t("andreDokumenter.description")}</BodyLong>
          <EksterneLenke
            href={getEnv("GENERELL_INNSENDING_URL")}
            tekst={t("andreDokumenter.lenke")}
          />
        </VStack>

        <HStack className="mt-32" gap="space-8">
          <Link to={`/${soknadId}/kvittering`}>
            <Button variant="secondary" icon={<ArrowLeftIcon aria-hidden />}>
              {t("knapper.kvittering")}
            </Button>
          </Link>

          <Button
            onClick={() => {
              window.location.href = getEnv("DP_MINE_DAGPENGER_URL");
            }}
          >
            {t("knapper.mineDagpenger")}
          </Button>
        </HStack>
      </VStack>
    </div>
  );
}
