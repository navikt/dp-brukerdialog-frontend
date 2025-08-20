import { KomponentType } from "~/components/spørsmål/spørsmål.types";

export const tarUtdanningEllerOpplæring = "tarUtdanningEllerOpplæring";
export const avsluttetUtdanningSiste6Måneder = "avsluttetUtdanningSiste6Måneder";
export const dokumenterAvsluttetUtdanningSiste6MånederNå =
  "dokumenterAvsluttetUtdanningSiste6MånederNå";
export const lasteOppSenereBegrunnelse = "lasteOppSenereBegrunnelse";
export const naarSendtDokumentasjonTidligere = "naarSendtDokumentasjonTidligere";
export const senderIkkeDokumentasjonBegrunnelse = "senderIkkeDokumentasjonBegrunnelse";
export const planleggerÅStarteEllerFullføreStudierSamtidig =
  "planleggerÅStarteEllerFullføreStudierSamtidig";

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
    visHvis: (svar: UtdanningSvar) => svar.tarUtdanningEllerOpplæring === "nei",
  },
  {
    id: dokumenterAvsluttetUtdanningSiste6MånederNå,
    type: "envalg",
    label: "Ønsker du å dokumentere dette nå?",
    description:
      "Du må dokumentere sluttdatoen. Du kan legge ved bekreftelse på når du avla siste " +
      "avsluttende eksamen eller aktivitet. Hvis du har avbrutt skolegangen, " +
      "kan du legge ved bekreftelse fra skolen på dette.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "etterkant", label: "Nei, jeg ønsker å sende dette inn i etterkant" },
      { value: "tidligere", label: "Jeg har sendt dette i en tidligere søknad om dagpenger" },
      { value: "nei", label: "Jeg sender det ikke" },
    ],
    visHvis: (svar: UtdanningSvar) => svar.avsluttetUtdanningSiste6Måneder === "ja",
  },
  {
    id: lasteOppSenereBegrunnelse,
    type: "kortTekst",
    label: "Hva er grunnen til at du sender dokumenetet senere?",
    visHvis: (svar: UtdanningSvar) =>
      svar.dokumenterAvsluttetUtdanningSiste6MånederNå === "etterkant",
  },
  {
    id: naarSendtDokumentasjonTidligere,
    type: "kortTekst",
    label: "Når sendte du dokumentasjon?",
    description:
      "Er du usikker på om du har sendt dokumentet i en tidligere søknad om dagpenger, bør du sende det på nytt.",
    visHvis: (svar: UtdanningSvar) =>
      svar.dokumenterAvsluttetUtdanningSiste6MånederNå === "tidligere",
  },
  {
    id: senderIkkeDokumentasjonBegrunnelse,
    type: "kortTekst",
    label: "Hva er grunnen til at du ikke sender inn dokumentet?",
    description:
      "Du vil mest sannsynlig få avslag på søknaden din hvis du ikke sender inn dokumentene vi trenger for å behandle saken din. Ta kontakt med NAV hvis du ikke får tak i dokumentet.",
    visHvis: (svar: UtdanningSvar) => svar.dokumenterAvsluttetUtdanningSiste6MånederNå === "nei",
  },
  {
    id: "planleggerÅStarteEllerFullføreStudierSamtidig",
    type: "envalg",
    label:
      "Planlegger du å starte eller fullføre utdanning eller opplæring samtidig som du mottar dagpenger?",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
    visHvis: (svar: UtdanningSvar) => svar.tarUtdanningEllerOpplæring === "nei",
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
