import type { TFunction } from "i18next";
import type { KomponentType } from "~/components/Komponent.types";

export const pdfGrunnlag = "pdfGrunnlag";
export const bekreftVilkår = "bekreftVilkår";

export function lagOpprettSoknadKomponenter(t: TFunction): KomponentType[] {
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
        `<li><strong>${t("krav.registrertArbeidssoker.tittel")}</strong>` +
        `<p>${t("krav.registrertArbeidssoker.avsnitt1")}</p>` +
        `<p>${t("krav.registrertArbeidssoker.avsnitt2")}</p>` +
        "</li>" +
        `<li><strong>${t("krav.endretSituasjon.tittel")}</strong>` +
        `<p>${t("krav.endretSituasjon.tekst")}</p>` +
        "</li>" +
        `<li><strong>${t("krav.reellJobbsoker.tittel")}</strong>` +
        `<p>${t("krav.reellJobbsoker.tekst")}</p>` +
        "</li>" +
        "</ol>",
    },
    {
      id: "slikSokerDuOverskrift",
      type: "headingTekst",
      label: t("slikSokerDu.overskrift"),
      størrelse: "medium",
      nivå: "2",
    },
    {
      id: "slikSokerDu",
      type: "forklarendeTekst",
      description:
        `<p>${t("slikSokerDu.avsnitt1")}</p>` +
        `<p>${t("slikSokerDu.avsnitt2")}</p>` +
        `<p>${t("slikSokerDu.avsnitt3")}</p>`,
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
        `<li>${t("informasjonOmDeg.lesMer.henter.egenNaring")}</li>` +
        "</ul>" +
        `<p>${t("informasjonOmDeg.lesMer.andreOpplysninger")}</p>` +
        `<p>${t("informasjonOmDeg.lesMer.delerOverskrift")}</p>` +
        "<ul>" +
        `<li>${t("informasjonOmDeg.lesMer.deler.dagpenger")}</li>` +
        `<li>${t("informasjonOmDeg.lesMer.deler.lanekassen")}</li>` +
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
      label: t("vilkar.bekreftelse"),
      options: [
        { value: "ja", label: t("vilkar.ja") },
        { value: "nei", label: t("vilkar.nei") },
      ],
    },
  ];
}
