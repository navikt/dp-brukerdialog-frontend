import type { TFunction } from "i18next";

type Span = {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
};

type MarkDef = {
  _type: "link";
  _key: string;
  href: string;
};

type Block = {
  _type: "block";
  _key: string;
  style: string;
  markDefs: MarkDef[];
  children: Span[];
  listItem?: "number" | "bullet";
  level?: number;
};

function span(key: string, text: string, marks: string[] = []): Span {
  return {
    _type: "span",
    _key: key,
    text,
    marks,
  };
}

function block(
  key: string,
  children: Span[],
  options?: {
    style?: string;
    listItem?: "number" | "bullet";
    markDefs?: MarkDef[];
  }
): Block {
  return {
    _type: "block",
    _key: key,
    style: options?.style ?? "normal",
    markDefs: options?.markDefs ?? [],
    children,
    ...(options?.listItem
      ? {
          listItem: options.listItem,
          level: 1,
        }
      : {}),
  };
}

export function lagPdfInnhold(t: TFunction<"opprett-soknad">) {
  return [
    block(
      "intro",
      [
        span("intro-text", `${t("intro.tekst")} `),
        span("intro-link", t("intro.lenke"), ["dagpenger-link"]),
      ],
      {
        markDefs: [
          {
            _type: "link",
            _key: "dagpenger-link",
            href: "https://www.nav.no/dagpenger",
          },
        ],
      }
    ),

    block("krav-overskrift", [span("krav-overskrift-span", t("krav.overskrift"))], { style: "h2" }),

    block(
      "krav-arbeidssoker",
      [
        span("krav-arbeidssoker-tittel", t("krav.registrertArbeidssoker.tittel"), ["strong"]),
        span(
          "krav-arbeidssoker-tekst",
          `\n${t("krav.registrertArbeidssoker.avsnitt1")}\n\n${t(
            "krav.registrertArbeidssoker.avsnitt2"
          )}`
        ),
      ],
      { listItem: "number" }
    ),

    block(
      "krav-endret-situasjon",
      [
        span("krav-endret-situasjon-tittel", t("krav.endretSituasjon.tittel"), ["strong"]),
        span("krav-endret-situasjon-tekst", `\n${t("krav.endretSituasjon.tekst")}`),
      ],
      { listItem: "number" }
    ),

    block(
      "krav-reell-jobbsoker",
      [
        span("krav-reell-jobbsoker-tittel", t("krav.reellJobbsoker.tittel"), ["strong"]),
        span("krav-reell-jobbsoker-tekst", `\n${t("krav.reellJobbsoker.tekst")}`),
      ],
      { listItem: "number" }
    ),

    block(
      "slik-soker-du-overskrift",
      [span("slik-soker-du-overskrift-span", t("slikSokerDu.overskrift"))],
      { style: "h2" }
    ),

    block("slik-soker-du-avsnitt-1", [
      span("slik-soker-du-avsnitt-1-span", t("slikSokerDu.avsnitt1")),
    ]),

    block("slik-soker-du-avsnitt-2", [
      span("slik-soker-du-avsnitt-2-span", t("slikSokerDu.avsnitt2")),
    ]),

    block("slik-soker-du-avsnitt-3", [
      span("slik-soker-du-avsnitt-3-span", t("slikSokerDu.avsnitt3")),
    ]),

    block(
      "informasjon-om-deg-overskrift",
      [span("informasjon-om-deg-overskrift-span", t("informasjonOmDeg.overskrift"))],
      { style: "h2" }
    ),

    block("informasjon-om-deg-intro", [
      span("informasjon-om-deg-intro-span", t("informasjonOmDeg.intro")),
    ]),

    block("informasjon-les-mer-tittel", [
      span("informasjon-les-mer-tittel-span", t("informasjonOmDeg.lesMer.tittel"), ["strong"]),
    ]),

    block("informasjon-les-mer-intro", [
      span("informasjon-les-mer-intro-span", t("informasjonOmDeg.lesMer.intro")),
    ]),

    block("informasjon-henter-overskrift", [
      span("informasjon-henter-overskrift-span", t("informasjonOmDeg.lesMer.henterOverskrift"), [
        "strong",
      ]),
    ]),

    block(
      "informasjon-henter-person",
      [
        span(
          "informasjon-henter-person-span",
          t("informasjonOmDeg.lesMer.henter.personinformasjon")
        ),
      ],
      { listItem: "bullet" }
    ),

    block(
      "informasjon-henter-inntekt",
      [span("informasjon-henter-inntekt-span", t("informasjonOmDeg.lesMer.henter.inntekt"))],
      { listItem: "bullet" }
    ),

    block(
      "informasjon-henter-arbeidsforhold",
      [
        span(
          "informasjon-henter-arbeidsforhold-span",
          t("informasjonOmDeg.lesMer.henter.arbeidsforhold")
        ),
      ],
      { listItem: "bullet" }
    ),

    block(
      "informasjon-henter-naering",
      [span("informasjon-henter-naering-span", t("informasjonOmDeg.lesMer.henter.egenNaring"))],
      { listItem: "bullet" }
    ),

    block("informasjon-andre-opplysninger", [
      span("informasjon-andre-opplysninger-span", t("informasjonOmDeg.lesMer.andreOpplysninger")),
    ]),

    block("informasjon-deler-overskrift", [
      span("informasjon-deler-overskrift-span", t("informasjonOmDeg.lesMer.delerOverskrift"), [
        "strong",
      ]),
    ]),

    block(
      "informasjon-deler-dagpenger",
      [span("informasjon-deler-dagpenger-span", t("informasjonOmDeg.lesMer.deler.dagpenger"))],
      { listItem: "bullet" }
    ),

    block(
      "informasjon-deler-lanekassen",
      [span("informasjon-deler-lanekassen-span", t("informasjonOmDeg.lesMer.deler.lanekassen"))],
      { listItem: "bullet" }
    ),

    block(
      "informasjon-deler-pensjonskasser",
      [
        span(
          "informasjon-deler-pensjonskasser-span",
          t("informasjonOmDeg.lesMer.deler.pensjonskasser")
        ),
      ],
      { listItem: "bullet" }
    ),

    block("informasjon-annen-bruk", [
      span("informasjon-annen-bruk-span", t("informasjonOmDeg.lesMer.annenBruk")),
    ]),

    block(
      "personvern-lenke",
      [
        span("personvern-lenke-span", t("informasjonOmDeg.lesMer.personvernLenke"), [
          "personvern-link",
        ]),
      ],
      {
        markDefs: [
          {
            _type: "link",
            _key: "personvern-link",
            href: "https://www.nav.no/personvernerklaering",
          },
        ],
      }
    ),

    block(
      "automatisk-behandling-overskrift",
      [span("automatisk-behandling-overskrift-span", t("automatiskBehandling.overskrift"))],
      { style: "h2" }
    ),

    block(
      "automatisk-behandling-tekst",
      [
        span("automatisk-behandling-tekst-span", `${t("automatiskBehandling.tekst")} `),
        span("automatisk-behandling-lenke-span", t("automatiskBehandling.rettigheterLenke"), [
          "rettigheter-link",
        ]),
      ],
      {
        markDefs: [
          {
            _type: "link",
            _key: "rettigheter-link",
            href: "https://www.nav.no/personvernerklaering#dine-rettigheter",
          },
        ],
      }
    ),

    block("automatisk-behandling-inntekt", [
      span("automatisk-behandling-inntekt-span", t("automatiskBehandling.inntekt")),
    ]),

    block(
      "riktige-opplysninger-overskrift",
      [span("riktige-opplysninger-overskrift-span", t("riktigeOpplysninger.overskrift"))],
      { style: "h2" }
    ),

    block(
      "riktige-opplysninger-tekst",
      [
        span("riktige-opplysninger-tekst-span", `${t("riktigeOpplysninger.tekst")} `),
        span("riktige-opplysninger-lenke-span", t("riktigeOpplysninger.lenke"), ["endringer-link"]),
      ],
      {
        markDefs: [
          {
            _type: "link",
            _key: "endringer-link",
            href: "https://www.nav.no/endringer",
          },
        ],
      }
    ),
  ];
}
