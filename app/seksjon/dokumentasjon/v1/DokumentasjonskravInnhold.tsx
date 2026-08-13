import { BodyLong, BodyShort, List, ReadMore, VStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { EksterneLenke } from "~/components/EksterneLenke";
import { DokumentasjonskravType } from "../dokumentasjon.types";

interface IProps {
  type: DokumentasjonskravType;
}

export function DokumentasjonskravInnhold({ type }: IProps) {
  const { t } = useTranslation("dokumentasjon");

  function pengestøtteInnhold(beskrivelse: string) {
    return (
      <VStack gap="space-8">
        <BodyLong>{beskrivelse}</BodyLong>
        <ReadMore header={t("krav.innhold")}>
          <VStack gap="space-8">
            <BodyShort>{t("krav.pengestøtteListe.innledning")}</BodyShort>
            <List as="ul">
              <List.Item>{t("krav.pengestøtteListe.hvilken")}</List.Item>
              <List.Item>{t("krav.pengestøtteListe.hvem")}</List.Item>
              <List.Item>{t("krav.pengestøtteListe.hvorMye")}</List.Item>
              <List.Item>{t("krav.pengestøtteListe.periode")}</List.Item>
            </List>
          </VStack>
        </ReadMore>
      </VStack>
    );
  }

  function renderDokumentasjonskravInnhold() {
    switch (type) {
      case DokumentasjonskravType.Barn:
        return <BodyLong>{t("krav.barn.beskrivelse")}</BodyLong>;

      case DokumentasjonskravType.ArbeidsforholdArbeidsavtale:
        return (
          <VStack gap="space-8">
            <BodyShort>{t("krav.arbeidsavtale.beskrivelse")}</BodyShort>
            <ReadMore header={t("krav.innhold")}>
              <VStack gap="space-8">
                <BodyShort>{t("krav.arbeidsavtale.innledning")}</BodyShort>
                <List as="ul">
                  <List.Item>{t("krav.arbeidsavtale.punkt1")}</List.Item>
                  <List.Item>{t("krav.arbeidsavtale.punkt2")}</List.Item>
                  <List.Item>{t("krav.arbeidsavtale.punkt3")}</List.Item>
                </List>
                <BodyLong>
                  {t("krav.arbeidsavtale.utdypningFør")}{" "}
                  <EksterneLenke
                    href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf"
                    tekst={t("krav.arbeidsavtale.lenke")}
                  />
                  {t("krav.arbeidsavtale.utdypningEtter")}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdArbeidsgiverenMinHarSagtMegOpp:
        return (
          <VStack gap="space-8">
            <BodyShort>{t("krav.sagtOpp.beskrivelse")}</BodyShort>
            <ReadMore header={t("krav.innhold")}>
              <VStack gap="space-8">
                <BodyShort>{t("krav.sagtOpp.innledning")}</BodyShort>
                <List as="ul">
                  <List.Item>{t("krav.sagtOpp.punkt1")}</List.Item>
                  <List.Item>{t("krav.sagtOpp.punkt2")}</List.Item>
                </List>
                <BodyLong>
                  {t("krav.sagtOpp.utdypningFør")}{" "}
                  <EksterneLenke
                    href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf"
                    tekst={t("krav.sagtOpp.lenke")}
                  />
                  {t("krav.sagtOpp.utdypningEtter")}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdJegHarSagtOppSelv:
        return (
          <VStack gap="space-8">
            <BodyShort>{t("krav.sagtOppSelv.beskrivelse")}</BodyShort>
            <ReadMore header={t("krav.innhold")}>
              <VStack gap="space-8">
                <BodyShort>{t("krav.sagtOppSelv.innledning")}</BodyShort>
                <List as="ul">
                  <List.Item>{t("krav.sagtOppSelv.punkt1")}</List.Item>
                  <List.Item>{t("krav.sagtOppSelv.punkt2")}</List.Item>
                </List>
                <BodyLong>
                  {t("krav.sagtOppSelv.utdypningFør")}{" "}
                  <EksterneLenke
                    href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf"
                    tekst={t("krav.sagtOppSelv.lenke")}
                  />
                  {t("krav.sagtOppSelv.utdypningEtter")}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdAvskjedigelse:
        return (
          <VStack gap="space-8">
            <BodyShort>{t("krav.avskjedigelse.beskrivelse")}</BodyShort>
            <ReadMore header={t("krav.innhold")}>
              <VStack gap="space-8">
                <BodyShort>{t("krav.avskjedigelse.innledning")}</BodyShort>
                <List as="ul">
                  <List.Item>{t("krav.avskjedigelse.punkt1")}</List.Item>
                  <List.Item>{t("krav.avskjedigelse.punkt2")}</List.Item>
                </List>
                <BodyLong>
                  {t("krav.avskjedigelse.utdypningFør")}{" "}
                  <EksterneLenke
                    href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf"
                    tekst={t("krav.avskjedigelse.lenke")}
                  />
                  {t("krav.avskjedigelse.utdypningEtter")}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdRedusertArbeidstid:
        return (
          <VStack gap="space-8">
            <BodyShort>{t("krav.redusertArbeidstid.beskrivelse")}</BodyShort>
            <ReadMore header={t("krav.innhold")}>
              <VStack gap="space-8">
                <BodyShort>{t("krav.redusertArbeidstid.innledning")}</BodyShort>
                <List as="ul">
                  <List.Item>{t("krav.redusertArbeidstid.punkt1")}</List.Item>
                  <List.Item>{t("krav.redusertArbeidstid.punkt2")}</List.Item>
                  <List.Item>{t("krav.redusertArbeidstid.punkt3")}</List.Item>
                </List>
                <BodyLong>
                  {t("krav.redusertArbeidstid.utdypningFør")}{" "}
                  <EksterneLenke
                    href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/25dc1dbc777af7749d8c6efbb439839694b04dd5.pdf"
                    tekst={t("krav.redusertArbeidstid.lenke")}
                  />
                  {t("krav.redusertArbeidstid.utdypningEtter")}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdOppsigelseFraBostyrerEllerKonkursforvalter:
        return (
          <VStack gap="space-8">
            <BodyShort>{t("krav.konkurs.beskrivelse")}</BodyShort>
            <ReadMore header={t("krav.innhold")}>
              <VStack gap="space-8">
                <BodyShort>{t("krav.konkurs.innledning")}</BodyShort>
                <List as="ul">
                  <List.Item>{t("krav.konkurs.punkt1")}</List.Item>
                  <List.Item>{t("krav.konkurs.punkt2")}</List.Item>
                  <List.Item>{t("krav.konkurs.punkt3")}</List.Item>
                </List>
                <BodyLong>{t("krav.konkurs.utdypning")}</BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdPermitteringsvarsel:
        return (
          <VStack gap="space-8">
            <BodyShort>{t("krav.permittering.beskrivelse")}</BodyShort>
            <ReadMore header={t("krav.innhold")}>
              <VStack gap="space-8">
                <BodyShort>{t("krav.permittering.innledning")}</BodyShort>
                <List as="ul">
                  <List.Item>{t("krav.permittering.punkt1")}</List.Item>
                  <List.Item>{t("krav.permittering.punkt2")}</List.Item>
                  <List.Item>{t("krav.permittering.punkt3")}</List.Item>
                  <List.Item>{t("krav.permittering.punkt4")}</List.Item>
                  <List.Item>{t("krav.permittering.punkt5")}</List.Item>
                </List>
                <BodyShort>{t("krav.permittering.gjelderDeg")}</BodyShort>
                <BodyLong>
                  {t("krav.permittering.utdypningFør")}{" "}
                  <EksterneLenke
                    href="https://cdn.sanity.io/files/gx9wf39f/soknadsveiviser-p/4f473293d31eee48921daecc72b1157e2a06542f.pdf"
                    tekst={t("krav.permittering.lenke")}
                  />
                  {t("krav.permittering.utdypningEtter")}
                </BodyLong>
              </VStack>
            </ReadMore>
          </VStack>
        );

      case DokumentasjonskravType.ArbeidsforholdRotasjon:
        return <BodyLong>{t("krav.rotasjon.beskrivelse")}</BodyLong>;

      case DokumentasjonskravType.Tjenestebevis:
        return <BodyLong>{t("krav.tjenestebevis.beskrivelse")}</BodyLong>;

      case DokumentasjonskravType.Utdanning:
        return <BodyLong>{t("krav.utdanning.beskrivelse")}</BodyLong>;

      case DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeltidOgDeltid:
        return <BodyLong>{t("krav.kanIkkeJobbeHeltidOgDeltid.beskrivelse")}</BodyLong>;

      case DokumentasjonskravType.ReellArbeidssøkerKanIkkeJobbeHeleNorge:
        return <BodyLong>{t("krav.kanIkkeJobbeHeleNorge.beskrivelse")}</BodyLong>;

      case DokumentasjonskravType.ReellArbeidssøkerKanIkkeTaAlleTyperArbeid:
        return (
          <>
            <BodyLong>{t("krav.kanIkkeTaAlleTyperArbeid.beskrivelse")}</BodyLong>
            <BodyLong>{t("krav.kanIkkeTaAlleTyperArbeid.utdypning")}</BodyLong>
          </>
        );

      case DokumentasjonskravType.AndreUtbetalingerEllerGoderFraTidligereArbeidsgiver:
        return pengestøtteInnhold(t("krav.andreUtbetalinger.beskrivelse"));

      case DokumentasjonskravType.AnnenPengestøtteFraAndreEøsLand:
        return pengestøtteInnhold(t("krav.pengestøtteEøs.beskrivelse"));

      case DokumentasjonskravType.AnnenPengestøtteFraNorgePensjonFraAndre:
        return pengestøtteInnhold(t("krav.pensjonFraAndre.beskrivelse"));

      case DokumentasjonskravType.AnnenPengestøtteFraNorgePengestøtteFraGff:
        return pengestøtteInnhold(t("krav.pengestøtteGff.beskrivelse"));

      default:
        console.error(`Ukjent dokumentasjonskrav: ${type}`);
        return <p>{t("krav.ukjent")}</p>;
    }
  }

  return renderDokumentasjonskravInnhold();
}
