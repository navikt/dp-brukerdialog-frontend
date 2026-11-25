import {
  BodyLong,
  BodyShort,
  Box,
  Button,
  ErrorMessage,
  Heading,
  HStack,
  LinkCard,
  ReadMore,
  VStack,
} from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { EttersendingFilOpplasting } from "~/components/filOpplasting/EttersendingFilOpplasting";
import { getEnv } from "~/utils/env.utils";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";
import {
  dokumentkravEttersendt,
  dokumentkravSvarSenderIkke,
  dokumentkravSvarSendNå,
  dokumentkravSvarSendtTidligere,
} from "../dokumentasjon/v1/dokumentasjonskrav.komponenter";
import { DokumentasjonSomIkkeSkalSendes } from "../kvittering/DokumentasjonSomIkkeSkalSendes";
import { useEttersending } from "./ettersending.context";
import { ArrowLeftIcon } from "@navikt/aksel-icons";

export function EttersendingView() {
  const { t } = useTranslation("ettersending");
  const { soknadId } = useParams();
  const seksjonnavn = t("side.overskrift");
  const seksjonHeadTitle = t("side.tittel");
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
      <title>{seksjonHeadTitle}</title>
      <VStack gap="space-32">
        <Heading size="medium" level="2">
          {seksjonnavn}
        </Heading>

        {ettersendingene.length > 0 && (
          <>
            <VStack gap="space-16">
              <BodyShort weight="semibold">{t("innhold.frist")}</BodyShort>
              <BodyLong>{t("innhold.beskrivelse")}</BodyLong>

              <ReadMore header={t("innhold.brevTittel")}>
                <BodyLong>
                  {t("innhold.brev")}{" "}
                  <EksterneLenke
                    href="https://www.nav.no/arbeid/dagpenger/mine-dagpenger#dokumentliste"
                    tekst={t("innhold.dokumentlisteLenke")}
                  />
                  . {t("innhold.brevMellom")}{" "}
                  <EksterneLenke
                    href="https://www.nav.no/dagpenger/dialog/generell-innsending/"
                    tekst={t("innhold.sendInnLenke")}
                  />
                </BodyLong>
              </ReadMore>

              {ettersendingene.map((ettersending: Dokumentasjonskrav) => (
                <Box key={ettersending.id} padding="space-16" background="sunken" borderRadius="12">
                  <EttersendingFilOpplasting ettersending={ettersending} />
                </Box>
              ))}

              {!lagrer && harTekniskFeil && <ErrorMessage>{t("feil.teknisk")}</ErrorMessage>}

              {valideringStartet && !harLastetOppFil && (
                <ErrorMessage>{t("feil.manglerFil")}</ErrorMessage>
              )}
            </VStack>

            <HStack gap="space-16">
              <Button type="button" loading={lagrer} onClick={() => validerOgLagre()}>
                {t("navigasjon.sendInnDokumenter")}
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
                {t("navigasjon.avbryt")}
              </Button>
            </HStack>
          </>
        )}

        <VStack gap="space-16" className="mt-32">
          {dokumentasjonSomErSendtAvDeg.length > 0 && (
            <VStack gap="space-16">
              <Heading size="small">{t("dokumenter.sendt")}</Heading>
              {dokumentasjonSomErSendtAvDeg.map((krav: Dokumentasjonskrav) => (
                <LinkCard key={krav.id}>
                  <LinkCard.Title>
                    {krav.bundle?.filsti ? (
                      <LinkCard.Anchor
                        href={`${getEnv("BASE_PATH")}/api/dokumentasjonskrav/vis-fil?${new URLSearchParams(
                          { filsti: krav.bundle.filsti }
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {krav.tittel}
                      </LinkCard.Anchor>
                    ) : (
                      krav.tittel
                    )}
                  </LinkCard.Title>
                  <LinkCard.Description>
                    {krav.bundle?.tidspunkt && (
                      <>Sendt av deg {formaterNorskDato(new Date(krav.bundle.tidspunkt))}</>
                    )}
                  </LinkCard.Description>
                </LinkCard>
              ))}
            </VStack>
          )}

          {dokumentasjonSomIkkeSkalSendes.length > 0 && (
            <VStack gap="space-16">
              <Heading size="small">{t("dokumenter.skalIkkeSendes")}</Heading>
              {dokumentasjonSomIkkeSkalSendes.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonSomIkkeSkalSendes key={krav.id} dokummentasjonskrav={krav} />
              ))}
            </VStack>
          )}
        </VStack>

        <VStack gap="space-16">
          <Heading size="small" level="3">
            {t("innhold.andreDokumenter")}
          </Heading>
          <BodyLong>{t("innhold.andreDokumenterBeskrivelse")}</BodyLong>
          <EksterneLenke
            href={getEnv("GENERELL_INNSENDING_URL")}
            tekst={t("innhold.sendAndreDokumenter")}
          />
        </VStack>

        <HStack className="mt-32" gap="space-8">
          <Link to={`/${soknadId}/kvittering`}>
            <Button variant="secondary" icon={<ArrowLeftIcon aria-hidden />}>
              {t("navigasjon.kvittering")}
            </Button>
          </Link>

          <Button
            onClick={() => {
              window.location.href = getEnv("DP_MINE_DAGPENGER_URL");
            }}
          >
            {t("navigasjon.gåTilMineDagpenger")}
          </Button>
        </HStack>
      </VStack>
    </div>
  );
}
