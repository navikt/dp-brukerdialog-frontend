import { BodyLong, BodyShort, List, ReadMore, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { EksterneLenke } from "~/components/EksterneLenke";
import { DokumentasjonskravType } from "../dokumentasjon.types";

interface IProps {
  type: DokumentasjonskravType;
}

const SLUTTARSAK_SKJEMA_URL =
  "https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf";

const ARBEIDSAVTALE_SKJEMA_URL =
  "https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb4398396949d8c6efbb439839694b04dd5.pdf";

const PERMITTERING_SKJEMA_URL =
  "https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/4f473293d31eee48921daecc72b1157e2a06542f.pdf";

export function DokumentasjonskravInnhold({ type }: IProps) {
  const { t } = useTranslation("dokumentasjon");

  const k = (key: string) => `dokumentasjonskravInnhold.${key}`;

  const renderListe = (keys: string[]) => (
    <List as="ul">
      {keys.map((key) => (
        <List.Item key={key}>{t(k(key))}</List.Item>
      ))}
    </List>
  );

  const renderPengestotteKrav = (introKey: string) => (
    <VStack gap="space-8">
      <BodyLong>{t(k(introKey))}</BodyLong>
      <ReadMore header={t(k("felles.readMoreHeader"))}>
        <VStack gap="space-8">
          <BodyShort>{t(k("felles.dokumentasjonSomViser"))}</BodyShort>
          {renderListe([
            "felles.pengestotteListe.hvilkenPengestotte",
            "felles.pengestotteListe.hvemUtbetaler",
            "felles.pengestotteListe.hvorMye",
            "felles.pengestotteListe.periode",
          ])}
        </VStack>
      </ReadMore>
    </VStack>
  );

  function renderDokumentasjonskravInnhold() {
    switch (type) {
      case DokumentasjonskravType.Barn:
        return <BodyLong>{t(k("barn.description"))}</BodyLong>;

      case DokumentasjonskravType.ArbeidsforholdArbeidsavtale:
        return (
          <VStack gap="space-8">
            <BodyShort>{t(k("arbeidsavtale.intro"))}</BodyShort>
            <ReadMore header={t(k("felles.readMoreHeader"))}>
              <VStack gap="space-8">
                <BodyShort>{t(k("arbeidsavtale.arbeidsavtalenMaInneholde"))}</BodyShort>
                {renderListe([
                  "arbeidsavtale.liste.startdato",
                  "arbeidsavtale.liste.arbeidstid",
                  "arbeidsavtale.liste.sluttdato",
                ])}
                <BodyLong>
                  {t(k("arbeidsavtale.skjema.førLenke"))}{" "}
                  <EksterneLenke
                    href={ARBEIDSAVTALE_SKJEMA_URL}
                    tekst={t(k("felles.skjemaSluttarsakLink"))}
                  />
                  {t(k("arbeidsavtale.skjema.etterLenke"))}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp:
        return (
          <VStack gap="space-8">
            <BodyShort>{t(k("oppsagt.intro"))}</BodyShort>
            <ReadMore header={t(k("felles.readMoreHeader"))}>
              <VStack gap="space-8">
                <BodyShort>{t(k("felles.dokumentasjonSomViser"))}</BodyShort>
                {renderListe(["oppsagt.liste.dato", "oppsagt.liste.arsak"])}
                <BodyLong>
                  {t(k("oppsagt.skjema.førLenke"))}{" "}
                  <EksterneLenke
                    href={SLUTTARSAK_SKJEMA_URL}
                    tekst={t(k("felles.skjemaSluttarsakLink"))}
                  />
                  {t(k("oppsagt.skjema.etterLenke"))}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdJegHarSagtOppSelv:
        return (
          <VStack gap="space-8">
            <BodyShort>{t(k("sagtOppSelv.intro"))}</BodyShort>
            <ReadMore header={t(k("felles.readMoreHeader"))}>
              <VStack gap="space-8">
                <BodyShort>{t(k("felles.dokumentasjonSomViser"))}</BodyShort>
                {renderListe(["sagtOppSelv.liste.dato", "sagtOppSelv.liste.arsak"])}
                <BodyLong>
                  {t(k("sagtOppSelv.skjema.førLenke"))}{" "}
                  <EksterneLenke
                    href={SLUTTARSAK_SKJEMA_URL}
                    tekst={t(k("felles.skjemaSluttarsakLink"))}
                  />
                  {t(k("sagtOppSelv.skjema.etterLenke"))}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdAvskjedigelse:
        return (
          <VStack gap="space-8">
            <BodyShort>{t(k("avskjedigelse.intro"))}</BodyShort>
            <ReadMore header={t(k("felles.readMoreHeader"))}>
              <VStack gap="space-8">
                <BodyShort>{t(k("felles.dokumentasjonSomViser"))}</BodyShort>
                {renderListe(["avskjedigelse.liste.dato", "avskjedigelse.liste.arsak"])}
                <BodyLong>
                  {t(k("avskjedigelse.skjema.førLenke"))}{" "}
                  <EksterneLenke
                    href={SLUTTARSAK_SKJEMA_URL}
                    tekst={t(k("felles.skjemaSluttarsakLink"))}
                  />
                  {t(k("avskjedigelse.skjema.etterLenke"))}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdRedusertArbeidstid:
        return (
          <VStack gap="space-8">
            <BodyShort>{t(k("redusertArbeidstid.intro"))}</BodyShort>
            <ReadMore header={t(k("felles.readMoreHeader"))}>
              <VStack gap="space-8">
                <BodyShort>{t(k("felles.dokumentasjonSomViser"))}</BodyShort>
                {renderListe([
                  "redusertArbeidstid.liste.dato",
                  "redusertArbeidstid.liste.arsak",
                  "redusertArbeidstid.liste.hvorMye",
                ])}
                <BodyLong>
                  {t(k("redusertArbeidstid.skjema.førLenke"))}{" "}
                  <EksterneLenke
                    href={SLUTTARSAK_SKJEMA_URL}
                    tekst={t(k("felles.skjemaSluttarsakLink"))}
                  />
                  {t(k("redusertArbeidstid.skjema.etterLenke"))}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter:
        return (
          <VStack gap="space-8">
            <BodyShort>{t(k("konkursOppsigelse.intro"))}</BodyShort>
            <ReadMore header={t(k("felles.readMoreHeader"))}>
              <VStack gap="space-8">
                <BodyShort>{t(k("felles.dokumentasjonSomViser"))}</BodyShort>
                {renderListe([
                  "konkursOppsigelse.liste.konkurs",
                  "konkursOppsigelse.liste.dato",
                  "konkursOppsigelse.liste.boetTrerIkkeInn",
                ])}
                <BodyLong>{t(k("konkursOppsigelse.signert"))}</BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdPermitteringsvarsel:
        return (
          <VStack gap="space-8">
            <BodyShort>{t(k("permitteringsvarsel.intro"))}</BodyShort>
            <ReadMore header={t(k("felles.readMoreHeader"))}>
              <VStack gap="space-8">
                <BodyShort>{t(k("permitteringsvarsel.inneholde"))}</BodyShort>
                {renderListe([
                  "permitteringsvarsel.liste.arsak",
                  "permitteringsvarsel.liste.grad",
                  "permitteringsvarsel.liste.startOgSlutt",
                  "permitteringsvarsel.liste.dato",
                  "permitteringsvarsel.liste.enighet",
                ])}
                <BodyShort>{t(k("permitteringsvarsel.gjelderDeg"))}</BodyShort>
                <BodyLong>
                  {t(k("permitteringsvarsel.skjema.førLenke"))}{" "}
                  <EksterneLenke
                    href={PERMITTERING_SKJEMA_URL}
                    tekst={t(k("felles.skjemaPermitteringLink"))}
                  />
                  {t(k("permitteringsvarsel.skjema.etterLenke"))}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdRotasjon:
        return <BodyLong>{t(k("rotasjon.description"))}</BodyLong>;

      case DokumentasjonskravType.Tjenestebevis:
        return <BodyLong>{t(k("tjenestebevis.description"))}</BodyLong>;

      case DokumentasjonskravType.Utdanning:
        return <BodyLong>{t(k("utdanning.description"))}</BodyLong>;

      case DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid:
        return <BodyLong>{t(k("reellArbeidssoker.deltid.description"))}</BodyLong>;

      case DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeleNorge:
        return <BodyLong>{t(k("reellArbeidssoker.heleNorge.description"))}</BodyLong>;

      case DokumentasjonskravType.ReellArbeidssøkerKanIkkeTaAlleTyperArbeid:
        return (
          <>
            <BodyLong>{t(k("reellArbeidssoker.alleTyperArbeid.description"))}</BodyLong>
            <BodyLong>{t(k("reellArbeidssoker.alleTyperArbeid.dokumentasjon"))}</BodyLong>
          </>
        );

      case DokumentasjonskravType.AndreUtbetalingerEllerGoderFraTidligereArbeidsgiver:
        return renderPengestotteKrav("andreUtbetalingerEllerGoder.description");

      case DokumentasjonskravType.AnnenPengestøtteFraAndreEøsLand:
        return renderPengestotteKrav("annenPengestotte.eos.description");

      case DokumentasjonskravType.AnnenPengestøtteFraNorgePensjonFraAndre:
        return renderPengestotteKrav("annenPengestotte.pensjon.description");

      case DokumentasjonskravType.AnnenPengestøtteFraNorgePengestøtteFraGff:
        return renderPengestotteKrav("annenPengestotte.gff.description");

      default:
        console.error(`Ukjent dokumentasjonskrav: ${type}`);
        return <p>{t(k("ukjent"))}</p>;
    }
  }

  return renderDokumentasjonskravInnhold();
}
