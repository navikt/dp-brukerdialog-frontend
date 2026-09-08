import { BodyLong, Box, Heading, Link, List } from "@navikt/ds-react";
import type { TFunction } from "i18next";
import type { KomponentType } from "~/components/Komponent.types";
import type { Person } from "~/routes/$soknadId.personalia";
import { hentOgFormatterNavn } from "~/utils/personalia.utils";

export const pdfGrunnlag = "pdfGrunnlag";
export const bekreftVilkår = "bekreftVilkår";

type LagPersonaliaProps = Person | null | undefined;

export function lagPersonaliaKomponenter(
  t: TFunction,
  personalia: LagPersonaliaProps
): KomponentType[] {
  if (!personalia) {
    return [];
  }

  return [
    {
      id: "personalia.overskrift",
      type: "forklarendeTekst",
      description: (
        <Box padding="space-16" borderColor="info" borderWidth="2" borderRadius="12">
          <BodyLong>
            <Heading size="medium" level="2" spacing>
              {t("personalia.hilsen", {
                navn: hentOgFormatterNavn(personalia),
              })}
            </Heading>
            {t("personalia.tekst")}{" "}
            <Link href={t("personalia.lenkeUrl")}>{t("personalia.lenkeTekst")}</Link>
          </BodyLong>
        </Box>
      ),
    },
  ];
}

export function lagOpprettSøknadKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: "krav.overskrift",
      type: "forklarendeTekst",
      description: (
        <Heading size="medium" level="2" spacing>
          {t("krav.overskrift")}
        </Heading>
      ),
    },
    {
      id: "krav.liste",
      type: "forklarendeTekst",
      description: (
        <List as="ul">
          <List.Item>{t("krav.liste.dagpengerFraSøknadsdato")}</List.Item>
          <List.Item>{t("krav.liste.meldekort")}</List.Item>
          <List.Item>{t("krav.liste.søkeFørLønnOpphører")}</List.Item>
          <List.Item>{t("krav.liste.oppholdINorge")}</List.Item>
          <List.Item>{t("krav.liste.dokumentasjon")}</List.Item>
          <List.Item>{t("krav.liste.tidsbruk")}</List.Item>
          <List.Item>{t("krav.liste.saksbehandlingstid")}</List.Item>
        </List>
      ),
    },
  ];
}

export function lagLesmerKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: "lesMer.lagreUnderveis",
      type: "lesMer",
      label: t("lesMer.lagreUnderveis.tittel"),
      description: <BodyLong>{t("lesMer.lagreUnderveis.tekst")}</BodyLong>,
    },
    {
      id: "lesMer.informasjonenViHenterOgDelerOmDeg",
      type: "lesMer",
      label: t("lesMer.informasjonenViHenterOgDelerOmDeg.tittel"),
      description: (
        <div>
          <BodyLong>{t("lesMer.informasjonenViHenterOgDelerOmDeg.tekst")}</BodyLong>
          <BodyLong>{t("lesMer.informasjonenViHenterOgDelerOmDeg.henterFra")}</BodyLong>
          <List as="ul">
            <List.Item>
              {t("lesMer.informasjonenViHenterOgDelerOmDeg.henter.folkeregisteret")}
            </List.Item>
            <List.Item>
              {t("lesMer.informasjonenViHenterOgDelerOmDeg.henter.skatteetaten")}
            </List.Item>
            <List.Item>
              {t("lesMer.informasjonenViHenterOgDelerOmDeg.henter.arbeidsforhold")}
            </List.Item>
            <List.Item>{t("lesMer.informasjonenViHenterOgDelerOmDeg.henter.eøs")}</List.Item>
            <List.Item>{t("lesMer.informasjonenViHenterOgDelerOmDeg.henter.egenNæring")}</List.Item>
          </List>
        </div>
      ),
    },
    {
      id: "lesMer.slikBehandlerViPersonopplysningeneDine",
      type: "lesMer",
      label: t("lesMer.slikBehandlerViPersonopplysningeneDine.tittel"),
      description: (
        <div>
          <BodyLong>{t("lesMer.slikBehandlerViPersonopplysningeneDine.delerMed")}</BodyLong>
          <List as="ul">
            <List.Item>
              {t("lesMer.slikBehandlerViPersonopplysningeneDine.deler.skatteetaten")}
            </List.Item>
            <List.Item>{t("lesMer.slikBehandlerViPersonopplysningeneDine.deler.ssb")}</List.Item>
            <List.Item>
              {t("lesMer.slikBehandlerViPersonopplysningeneDine.deler.lånekassen")}
            </List.Item>
            <List.Item>
              {t("lesMer.slikBehandlerViPersonopplysningeneDine.deler.pensjonskasser")}
            </List.Item>
          </List>
          <BodyLong>{t("lesMer.slikBehandlerViPersonopplysningeneDine.annenBruk")}</BodyLong>
          <BodyLong>
            <Link href={t("lesMer.slikBehandlerViPersonopplysningeneDine.personvernLenkeUrl")}>
              {t("lesMer.slikBehandlerViPersonopplysningeneDine.personvernLenkeTekst")}
            </Link>
          </BodyLong>
        </div>
      ),
    },
    {
      id: "lesMer.automatiskSaksbehandling",
      type: "lesMer",
      label: t("lesMer.automatiskSaksbehandling.tittel"),
      description: (
        <BodyLong>
          {t("lesMer.automatiskSaksbehandling.tekst")}{" "}
          <Link href={t("lesMer.automatiskSaksbehandling.rettigheterLenkeUrl")}>
            {t("lesMer.automatiskSaksbehandling.rettigheterLenkeTekst")}
          </Link>
        </BodyLong>
      ),
    },
  ];
}

export function lagRiktigeOpplysningerKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: "riktigeOpplysninger",
      type: "forklarendeTekst",
      description: (
        <BodyLong>
          <strong>{t("riktigeOpplysninger.overskrift")}</strong>
          <br />
          {t("riktigeOpplysninger.tekst")}{" "}
          <Link href={t("riktigeOpplysninger.lenkeUrl")}>
            {t("riktigeOpplysninger.lenkeTekst")}
          </Link>
        </BodyLong>
      ),
    },
  ];
}

export function lagBekreftVilkårKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: bekreftVilkår,
      type: "envalg",
      label: t("vilkår.bekreftelse"),
      options: [
        { value: "ja", label: t("vilkår.ja") },
        { value: "nei", label: t("vilkår.nei") },
      ],
    },
  ];
}
