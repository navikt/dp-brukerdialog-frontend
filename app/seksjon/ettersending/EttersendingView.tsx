import { Accordion, BodyLong, BodyShort, Heading, ReadMore, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { EksterneLenke } from "~/components/EksterneLenke";
import { EttersendingFilOpplasting } from "~/components/filOpplasting/EttersendingFilOpplasting";
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
  const seksjonnavn = t("side.overskrift");
  const seksjonHeadTitle = t("side.tittel");
  const { ettersendingene, dokumentasjonskravene } = useEttersending();

  const dokumentasjonSomErSendtAvDeg: Dokumentasjonskrav[] = dokumentasjonskravene.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSendNå || krav.svar === dokumentkravEttersendt
  );

  const dokumentasjonSomIkkeSkalSendes: Dokumentasjonskrav[] = dokumentasjonskravene.filter(
    (krav: Dokumentasjonskrav) =>
      krav.svar === dokumentkravSvarSenderIkke || krav.svar === dokumentkravSvarSendtTidligere
  );

  return (
    <div className="innhold">
      <title>{seksjonHeadTitle}</title>
      <VStack gap="space-32">
        <Heading size="large" level="2">
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

              {ettersendingene.length > 0 && (
                <VStack gap="space-16" className="mt-32">
                  <Heading size="medium" level="3">
                    {t("side.ettersendHeader")}
                  </Heading>
                  <Accordion>
                    {ettersendingene.map((ettersending: Dokumentasjonskrav, index: number) => (
                      <Accordion.Item key={index} defaultOpen={index === 0}>
                        <Accordion.Header>
                          {ettersending.tittel || t("opplasting.dokumentasjon")}
                        </Accordion.Header>
                        <Accordion.Content>
                          <EttersendingFilOpplasting ettersending={ettersending} />
                        </Accordion.Content>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </VStack>
              )}
            </VStack>
          </>
        )}

        <VStack gap="space-16">
          {dokumentasjonSomErSendtAvDeg.length > 0 && (
            <VStack gap="space-16">
              <Heading size="small">{t("dokumenter.sendt")}</Heading>
              {dokumentasjonSomErSendtAvDeg.map((krav: Dokumentasjonskrav) => (
                <DokumentasjonskravSomErSendtAvDeg key={krav.id} dokumentasjonskrav={krav} />
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
      </VStack>
    </div>
  );
}
