import { KomponentType } from "~/components/spørsmål/spørsmål.types";
import {
  AnnenPengestøtteSvar,
  dagpengerEllerArbeidsledighetstrygd,
  foreldrepengerEllerSvangerskapspenger,
  harMottattPengestøtteFraAndreEØSLand,
  hvilkeUtenlandskeYtelserHarDuMottatt,
  pleiepengerOmsorgspengerEllerOpplæringspenger,
  sykepenger,
} from "~/seksjon-regelsett/annen-pengestøtte/annen-pengestøtte.spørsmål";

export const pengestøtteFraAndreEøsLand: KomponentType[] = [
  {
    id: harMottattPengestøtteFraAndreEØSLand,
    type: "envalg",
    label:
      "Har du de siste 36 måneder motatt trygdeytelser fra EØS-land, Sveits eller Storbritania som ligner på",
    description:
      "<ul><li>Sykepenger</li><li>Foreldrepenger eller svangerskapspenger</li><li>Dagpenger / arbeidsledighetstrygd</li><li>Pleiepenger, omsorgspenger eller opplæringspenger</li><li>TODO: Rendre med Aksel sin LIST i stedet?</li></ul>",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: "harMottattPengestøtteFraAndreEØSLandLesMer",
    type: "lesMer",
    label: "Grunnen til at vi spør om dette?",
    description:
      "Med utgangspunkt i en vedvarende agenda dokumenteres oppfølgingen som en følge av resultatoppnåelsen.",
  },
  {
    id: hvilkeUtenlandskeYtelserHarDuMottatt,
    type: "flervalg",
    label: "Hvilke av disse utenlandske trygdeytelsene har du mottatt?",
    description:
      "TODO: Høre med Chris/Kamile hvordan det skal hentes inn detaljer. En på ytelse (som med checkboxene under), eller en for alle (som i skissen).",
    options: [
      { value: sykepenger, label: "Sykepenger" },
      {
        value: foreldrepengerEllerSvangerskapspenger,
        label: "Foreldrepenger eller svangerskapspenger",
      },
      { value: dagpengerEllerArbeidsledighetstrygd, label: "Dagpenger / arbeidsledighetstrygd" },
      {
        value: pleiepengerOmsorgspengerEllerOpplæringspenger,
        label: "Pleiepenger, omsorgspenger eller opplæringspenger",
      },
    ],
    visHvis: (svar: AnnenPengestøtteSvar) => svar[harMottattPengestøtteFraAndreEØSLand] === "ja",
  },
];
