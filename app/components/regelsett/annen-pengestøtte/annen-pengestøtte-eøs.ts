import { Sporsmal } from "../../sporsmal/sporsmal.types";
import {
  AnnenPengestøtteSvar,
  harMottattPengestøtteFraAndreEØSLand,
  hvilkeUtenlandskeYtelserHarDuMottatt,
} from "~/components/regelsett/annen-pengestøtte/annen-pengestøtte-svar";

export const pengestøtteFraAndreEøsLand: Sporsmal[] = [
  {
    id: harMottattPengestøtteFraAndreEØSLand,
    type: "envalg",
    label:
      "Har du de siste 36 måneder motatt trygdeytelser fra EØS-land, Sveits eller Storbritania som ligner på",
    description:
      "<ul><li>Sykepenger</li><li>Foreldrepenger eller svangerskapspenger</li><li>Dagpenger / arbeidsledighetstrygd</li><li>Pleiepenger, omsorgspenger eller opplæringspenger</li><li>TODO: Rendre med Aksel sin LIST i stedet?</li></ul>",
    grunnenTilAtViSpør:
      "Med utgangspunkt i en vedvarende agenda dokumenteres oppfølgingen som en følge av resultatoppnåelsen.",
    options: [
      { value: "ja", label: "Ja" },
      { value: "nei", label: "Nei" },
    ],
  },
  {
    id: hvilkeUtenlandskeYtelserHarDuMottatt,
    type: "flervalg",
    label: "Hvilke av disse utenlandske trygdeytelsene har du mottatt?",
    description: "TODO: Høre med Chris/Kamile hvordan det skal hentes inn detaljer. En på ytelse (som med checkboxene under), eller en for alle (som i skissen).",
    options: [
      { value: "sykepenger", label: "Sykepenger" },
      {
        value: "foreldrepengerEllerSvangerskapspenger",
        label: "Foreldrepenger eller svangerskapspenger",
      },
      { value: "dagpengerEllerArbeidsledighetstrygd", label: "Dagpenger / arbeidsledighetstrygd" },
      {
        value: "pleiepengerOmsorgspengerEllerOpplæringspenger",
        label: "Pleiepenger, omsorgspenger eller opplæringspenger",
      },
    ],
    visHvis: (svar: AnnenPengestøtteSvar) => svar.harMottattPengestøtteFraAndreEØSLand === "ja",
  },
];
