import type { TFunction } from "i18next";
import type { KomponentType } from "~/components/Komponent.types";
import { getEnv } from "~/utils/env.utils";

export const pdfGrunnlag = "pdfGrunnlag";
export const bekreftVilkår = "bekreftVilkår";

export function lagOpprettSøknadKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: "intro",
      type: "forklarendeTekst",
      description:
        `<p>${t("intro.tekst")} ` +
        `<a href="https://www.nav.no/dagpenger">${t("intro.lenke")}</a></p>`,
    },
    {
      id: "kravOverskrift",
      type: "headingTekst",
      label: t("krav.overskrift"),
      størrelse: "medium",
      nivå: "2",
    },
    {
      id: "krav",
      type: "forklarendeTekst",
      description:
        "<ol>" +
        `<li><strong>${t("krav.registrertArbeidssøker.tittel")}</strong>` +
        `<p>${t("krav.registrertArbeidssøker.avsnitt1")}</p>` +
        `<p>${t("krav.registrertArbeidssøker.avsnitt2")}</p>` +
        "</li>" +
        `<li><strong>${t("krav.endretSituasjon.tittel")}</strong>` +
        `<p>${t("krav.endretSituasjon.tekst")}</p>` +
        "</li>" +
        `<li><strong>${t("krav.reellJobbsøker.tittel")}</strong>` +
        `<p>${t("krav.reellJobbsøker.tekst")}</p>` +
        "</li>" +
        "</ol>",
    },
    {
      id: "slikSokerDuOverskrift",
      type: "headingTekst",
      label: t("slikSøkerDu.overskrift"),
      størrelse: "medium",
      nivå: "2",
    },
    {
      id: "slikSokerDu",
      type: "forklarendeTekst",
      description:
        `<p>${t("slikSøkerDu.avsnitt1")}</p>` +
        `<p>${t("slikSøkerDu.avsnitt2")}</p>` +
        `<p>${t("slikSøkerDu.avsnitt3")}</p>`,
    },
    {
      id: "informasjonOmDegOverskrift",
      type: "headingTekst",
      label: t("informasjonOmDeg.overskrift"),
      størrelse: "medium",
      nivå: "2",
    },
    {
      id: "informasjonOmDeg",
      type: "forklarendeTekst",
      description: `<p>${t("informasjonOmDeg.intro")}</p>`,
    },
    {
      id: "informasjonOmDegLesMer",
      type: "lesMer",
      label: t("informasjonOmDeg.lesMer.tittel"),
      description:
        `<p>${t("informasjonOmDeg.lesMer.intro")}</p>` +
        `<p>${t("informasjonOmDeg.lesMer.henterOverskrift")}</p>` +
        "<ul>" +
        `<li>${t("informasjonOmDeg.lesMer.henter.personinformasjon")}</li>` +
        `<li>${t("informasjonOmDeg.lesMer.henter.inntekt")}</li>` +
        `<li>${t("informasjonOmDeg.lesMer.henter.arbeidsforhold")}</li>` +
        `<li>${t("informasjonOmDeg.lesMer.henter.egenNæring")}</li>` +
        "</ul>" +
        `<p>${t("informasjonOmDeg.lesMer.andreOpplysninger")}</p>` +
        `<p>${t("informasjonOmDeg.lesMer.delerOverskrift")}</p>` +
        "<ul>" +
        `<li>${t("informasjonOmDeg.lesMer.deler.dagpenger")}</li>` +
        `<li>${t("informasjonOmDeg.lesMer.deler.lånekassen")}</li>` +
        `<li>${t("informasjonOmDeg.lesMer.deler.pensjonskasser")}</li>` +
        "</ul>" +
        `<p>${t("informasjonOmDeg.lesMer.annenBruk")}</p>` +
        `<p><a href="https://www.nav.no/personvernerklaering">${t(
          "informasjonOmDeg.lesMer.personvernLenke"
        )}</a></p>`,
    },
    {
      id: "automatiskBehandlingOverskrift",
      type: "headingTekst",
      label: t("automatiskBehandling.overskrift"),
      størrelse: "medium",
      nivå: "2",
    },
    {
      id: "automatiskBehandling",
      type: "forklarendeTekst",
      description:
        `<p>${t("automatiskBehandling.tekst")} ` +
        `<a href="https://www.nav.no/personvernerklaering#dine-rettigheter">${t(
          "automatiskBehandling.rettigheterLenke"
        )}</a></p>` +
        `<p>${t("automatiskBehandling.inntekt")}</p>`,
    },
    {
      id: "riktigeOpplysningerOverskrift",
      type: "headingTekst",
      label: t("riktigeOpplysninger.overskrift"),
      størrelse: "medium",
      nivå: "2",
    },
    {
      id: "riktigeOpplysninger",
      type: "forklarendeTekst",
      description:
        `<p>${t("riktigeOpplysninger.tekst")} ` +
        `<a href="https://www.nav.no/endringer">${t("riktigeOpplysninger.lenke")}</a></p>`,
    },
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

export function lagArbeidssøkerKomponenter(t: TFunction): KomponentType[] {
  return [
    {
      id: "informasjon.overskrift",
      type: "forklarendeTekst",
      description: `<strong>${t("informasjon.overskrift")}</strong>`,
    },
    {
      id: "informasjon.beskrivelse",
      type: "forklarendeTekst",
      description: t("informasjon.beskrivelse"),
    },
    {
      id: "handlinger.registrer",
      type: "forklarendeTekst",
      description: `<a href="${getEnv("ARBEIDSSOKERREGISTRERING_URL") || "https://arbeidssokerregistrering.nav.no/"}">${t("handlinger.registrer")}</a>`,
    },
    {
      id: "handlinger.avbryt",
      type: "forklarendeTekst",
      description: `<a href="https://www.nav.no/minside">${t("handlinger.avbryt")}</a>`,
    },
    {
      id: "soknad.lenketekst",
      type: "forklarendeTekst",
      description: `<a href="/opprett-soknad">${t("soknad.lenketekst")}</a>`,
    },
  ];
}
