import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const tarUtdanningEllerOpplæring = "tar-utdanning-eller-opplæring";
export const avsluttetUtdanningSiste6Måneder = "avsluttet-utdanning-siste-6-måneder";
export const dokumenterAvsluttetUtdanningSiste6MånederNå =
  "dokumenter-avsluttet-utdanning-siste-6-måneder-nå";
export const lasteOppSenereBegrunnelse = "laste-opp-senere-begrunnelse";
export const naarSendtDokumentasjonTidligere = "naar-sendt-dokumentasjon-tidligere";
export const senderIkkeDokumentasjonBegrunnelse = "sender-ikke-dokumentasjon-begrunnelse";
export const planleggerÅStarteEllerFullføreStudierSamtidig =
  "planlegger-åstarte-eller-fullføre-studier-samtidig";

export type UtdanningSvar = {
  [tarUtdanningEllerOpplæring]?: "ja" | "nei";
  [avsluttetUtdanningSiste6Måneder]?: "ja" | "nei";
  [dokumenterAvsluttetUtdanningSiste6MånederNå]?: string;
  [lasteOppSenereBegrunnelse]?: string;
  [naarSendtDokumentasjonTidligere]?: string;
  [senderIkkeDokumentasjonBegrunnelse]?: string;
  [planleggerÅStarteEllerFullføreStudierSamtidig]?: "ja" | "nei";
};

export const utdanningSpørsmål: KomponentType[] = [
  {
    id: tarUtdanningEllerOpplæring,
    type: "envalg",
    label: "Tar du utdanning eller opplæring?",
    description:
      "Som hovedregel har du ikke rett til dagpenger når du er under utdanning eller opplæring",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: avsluttetUtdanningSiste6Måneder,
    type: "envalg",
    label: "Avsluttet du utdanning i løpet av de siste 6 månedene?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: UtdanningSvar) => svar[tarUtdanningEllerOpplæring] === "nei",
  },
  { id: "avsluttetUtdanningSiste6MånederVarselmelding",
    type: "varselmelding",
    variant: "info",
    label: "",
    description: "Du må dokumentere sluttdatoen. Du kan legge ved bekreftelse på når du avla siste avsluttende eksamen eller aktivitet. Hvis du har avbrutt skolegangen, kan du legge ved bekreftelse fra skolen på dette.",
    visHvis: (svar: UtdanningSvar) => svar[avsluttetUtdanningSiste6Måneder] === "ja",
  },
  { id: "avsluttetUtdanningSiste6MånederDokumentkravindikator",
    type: "dokumentasjonskravindikator",
    label: "Dokumentasjon av sluttdato for utdanning",
    visHvis: (svar: UtdanningSvar) => svar[avsluttetUtdanningSiste6Måneder] === "ja",
  },
  {
    id: planleggerÅStarteEllerFullføreStudierSamtidig,
    type: "envalg",
    label:
      "Planlegger du å starte eller fullføre utdanning eller opplæring samtidig som du mottar dagpenger?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: UtdanningSvar) => svar[tarUtdanningEllerOpplæring] === "nei",
  },
  {
    id: "måSendeInnSøknadNav04-06.05Varselmelding",
    type: "varselmelding",
    variant: "warning",
    label: "",
    description:
      'For å få innvilget dagpenger mens du tar utdanning eller opplæring, må du sende inn <a href="https://www.nav.no/fyllut/nav040605">Søknad om å beholde dagpengene mens du tar utdanning eller opplæring - NAV 04-06.05</a>, i tillegg til å sende inn denne søknaden om dagpenger.' +
      "<br /><br />Hvis du ikke sender søknaden om å beholde dagpengene mens du tar utdanning eller opplæring, kan vi avslå søknaden din om dagpenger.",
    visHvis: (svar: UtdanningSvar) =>
      svar[tarUtdanningEllerOpplæring] === "ja" ||
      svar[planleggerÅStarteEllerFullføreStudierSamtidig] === "ja",
  },
];
