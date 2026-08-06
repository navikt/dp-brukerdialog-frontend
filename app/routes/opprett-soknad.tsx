import { ArrowRightIcon } from "@navikt/aksel-icons";
import {
  Accordion,
  BodyLong,
  Box,
  Button,
  Checkbox,
  Detail,
  GuidePanel,
  Heading,
  HStack,
  LocalAlert,
  VStack,
} from "@navikt/ds-react";
import { useForm } from "@rvf/react-router";
import type { ReactNode } from "react";
import { Form, redirect, useActionData, useLoaderData, useNavigation } from "react-router";
import { z } from "zod";
import { KomponentType } from "~/components/Komponent.types";
import { ForklarendeTekst } from "~/components/informasjon-komponent/ForklarendeTekst";
import { HeadingTekst } from "~/components/informasjon-komponent/HeadingTekst";
import { SøknadIkon } from "~/components/SøknadIkon";
import { hentPersonalia } from "~/models/hent-personalia.server";
import { lagreSeksjon } from "~/models/lagre-seksjon.server";
import { opprettSoknad } from "~/models/opprett-soknad.server";
import { lagSeksjonPayload } from "~/utils/seksjon.utils";
import { Route } from "./+types/opprett-soknad";

const SEKSJON_ID = "startside";
const SEKSJON_NAVN = "Startside";
const NESTE_SEKSJON_ID = "personalia";
const BEKREFT_VILKÅR_TEKST = "Jeg bekrefter at jeg vil svare så riktig som jeg kan";
const DAGPENGER_LANDING_URL = "https://www.nav.no/dagpenger";

const VI_TRENGER_RIKTIGE_OPPLYSNINGER_TEKST =
  "Vi trenger riktige opplysninger for å vurdere om du har rett til dagpenger";

const BEKREFT_VILKÅR_KOMPONENT: KomponentType = {
  id: "bekreftVilkår",
  type: "envalg",
  label: BEKREFT_VILKÅR_TEKST,
  options: [
    { value: "ja", label: "Ja" },
    { value: "nei", label: "Nei" },
  ],
};

type AccordionItem = { id: string; type: "lesMer"; label: string; description: string };

const STARTSIDE_ACCORDION_ITEMS: AccordionItem[] = [
  {
    id: "informasjon-henter-og-deler",
    type: "lesMer",
    label: "Informasjonen vi henter og deler om deg",
    description:
      "<p>For å vurdere om du har rett til dagpenger etter folketrygdloven kapittel 4, må vi hente informasjon om deg.</p><p><strong>Vi henter informasjon fra</strong></p><ul><li>Folkeregisteret om bosted og familieforhold.</li><li>Skatteetaten om inntekt og skattekort.</li><li>Arbeidsgiver- og arbeidstakerregisteret om arbeidsforhold. Vi kan også hente informasjon om arbeidsforhold og trygdeperioder fra myndighetene i andre EØS-land.</li><li>Brønnøysundregistret om egen næring.</li></ul><p>Vi kan også hente inn opplysninger du har gitt oss tidligere, eller opplysninger du gir oss i andre sammenhenger, hvis det er relevant og nødvendig.</p>",
  },
  {
    id: "informasjon-behandler-personopplysninger",
    type: "lesMer",
    label: "Slik behandler vi personopplysningene dine",
    description:
      "<p>Vi deler informasjon om dagpenger med</p><ul><li>Skatteetaten</li><li>Statistisk sentralbyrå.</li><li>Statens lånekasse for utdanning.</li><li>Offentlige pensjonskasser.</li></ul><p>Vi kan også bruke opplysningene dine i andre sammenhenger i Nav hvis det er relevant og nødvendig.</p><p><a href=\"#TODO-personopplysninger\">Les mer om hvordan vi behandler personopplysninger.</a></p>",
  },
  {
    id: "informasjon-automatisk-saksbehandling",
    type: "lesMer",
    label: "Automatisk saksbehandling",
    description:
      "<p>Noen søknader blir behandlet automatisk. Det betyr at du får svar på søknaden uten at en saksbehandler ser på saken din. Hvis du er uening i svaret du får på søknaden, kan du klage. <a href=\"#TODO-automatisk-behandling\">Les mer om automatisk behandling og dine rettigheter.</a></p>",
  },
  {
    id: "informasjon-lagrer-svar",
    type: "lesMer",
    label: "Vi lagrer svar underveis",
    description:
      "<p>Her skal det stå informasjon om hvordan denne søknaden mellomlagrer informasjonen til søkeren og hvor lenge informasjonen lagres. Vi skal informere om mellomlagring ved både automatisk lagring og ved samtykke til lagring med lagre-knapp.</p>",
  },
];

const STARTSIDE_KOMPONENTER: KomponentType[] = [
  {
    id: "intro-guidepanel",
    type: "informasjonskort",
    variant: "informasjon",
    label: "Hei, Jenny Jensen!",
    description:
      `Dagpenger er en pengestøtte på veien tilbake til arbeid når du er arbeidsledig eller permittert. For å ha rett til dagpenger, må du fylle noen krav. ` +
      `<a href="${DAGPENGER_LANDING_URL}" target="_blank" rel="noreferrer">Her kan du lese om du har rett til dagpenger.</a>`,
  },
  {
    id: "for-du-soker-heading",
    type: "headingTekst",
    label: "Før du søker",
    størrelse: "medium",
    nivå: "2",
  },
  {
    id: "for-du-soker-tekst",
    type: "forklarendeTekst",
    description:
      "<ul><li>Du må være registrert som arbeidssøker og sende meldekort hver 14. dag fra du sender inn søknaden</li><li>Du må som hovedregel oppholde deg i Norge for å ha rett til dagpenger</li><li>Du kan tidligst få dagpenger fra den dagen du sender inn søknaden om dagpenger, og registrere deg som arbeidssøker</li><li>Noen av opplysningene du gir i søknaden må du dokumentere. Du får beskjed underveis i søknaden om hvilke dokumentasjon du må sende inn</li><li>Det tar omtrent 20-30 minutter å fylle ut søknaden</li><li>Søknadsfrister. Husk at du må søke om xx innen xx dager</li><li>Saksbehandlingstider og info om gyldighet, krav osv. Vi bruker ca. 6 uker på å behandle søknaden din. Husk at du må sende meldekort xx ofte selv om du ikke har fått svar på søknaden din om dagpenger ennå</li></ul>",
  },
  ...STARTSIDE_ACCORDION_ITEMS,
  {
    id: "riktige-opplysninger-heading",
    type: "headingTekst",
    label: "Vi trenger riktige opplysninger for å vurdere om du har rett til dagpenger",
    størrelse: "medium",
    nivå: "2",
  },
  {
    id: "riktige-opplysninger-tekst",
    type: "forklarendeTekst",
    description:
      "<p>Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din. <a href=\"#TODO-riktige-opplysninger\">Les mer om viktigheten av å gi riktige opplysninger.</a></p>",
  },
];

function renderStartsideKomponenter(komponenter: KomponentType[], accordionItems: AccordionItem[]) {
  const elementer: ReactNode[] = [];
  let accordionRendert = false;

  for (const komponent of komponenter) {
    if (komponent.type === "lesMer") {
      if (!accordionRendert) {
        elementer.push(
          <Accordion key="accordion-informasjon">
            {accordionItems.map((item) => (
              <Accordion.Item key={item.id}>
                <Accordion.Header>{item.label}</Accordion.Header>
                <Accordion.Content>
                  <ForklarendeTekst props={item} />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>
        );
        accordionRendert = true;
      }
      continue;
    }

    switch (komponent.type) {
      case "informasjonskort":
        elementer.push(
          <GuidePanel key={komponent.id} illustration={<SøknadIkon />} poster>
            <VStack gap="space-8">
              <Heading size="medium" level="2">
                {komponent.label}
              </Heading>
              <ForklarendeTekst props={komponent} />
            </VStack>
          </GuidePanel>
        );
        break;
      case "headingTekst":
        elementer.push(<HeadingTekst key={komponent.id} props={komponent} />);
        break;
      case "forklarendeTekst":
        elementer.push(<ForklarendeTekst key={komponent.id} props={komponent} />);
        break;
      default:
        break;
    }
  }

  return elementer;
}

export async function loader({ request }: Route.LoaderArgs) {
  const personaliaResponse = await hentPersonalia(request);
  if (!personaliaResponse.ok) {
    return { fornavn: null };
  }
  const personalia = await personaliaResponse.json();
  const { fornavn, mellomnavn, etternavn } = personalia?.person ?? {};
  const navn = [fornavn, mellomnavn, etternavn].filter(Boolean).join(" ");
  return { navn: navn || null };
}

export async function action({ request }: Route.ActionArgs) {
  const opprettSøknadResponse = await opprettSoknad(request);

  if (!opprettSøknadResponse.ok) {
    return {
      error: "Feil ved opprettelse av søknad",
    };
  }

  const soknadId = await opprettSøknadResponse.text();
  const formData = await request.formData();
  const pdfGrunnlag = formData.get("pdfGrunnlag");

  const putSeksjonRequestBody = {
    seksjon: JSON.stringify({
      seksjonId: SEKSJON_ID,
      versjon: 1,
    }),
    pdfGrunnlag: pdfGrunnlag,
  };

  const lagreSeksjonResponse = await lagreSeksjon(
    request,
    soknadId,
    SEKSJON_ID,
    putSeksjonRequestBody
  );

  if (!lagreSeksjonResponse.ok) {
    console.error("Klarte ikke lagre pdfGrunnlag for startside. SøknadId:", soknadId);
  }

  return redirect(`/${soknadId}/${NESTE_SEKSJON_ID}`);
}

export default function OpprettSoknadSide() {
  const { navn } = useLoaderData<typeof loader>();
  const { state } = useNavigation();
  const actionData = useActionData<typeof action>();

  const form = useForm({
    method: "POST",
    submitSource: "state",
    schema: z.object({
      bekreftVilkår: z.boolean().refine((val) => val, {
        message: "Du må godta vilkårene",
      }),
      pdfGrunnlag: z.string().optional(),
    }),
    defaultValues: {
      bekreftVilkår: false,
    },
  });

  function opprettSøknad() {
    const pdfGrunnlag = {
      navn: SEKSJON_NAVN,
      spørsmål: [
        ...lagSeksjonPayload(startsideKomponenter, {}),
        ...lagSeksjonPayload([BEKREFT_VILKÅR_KOMPONENT], {
          bekreftVilkår: form.transient.value().bekreftVilkår ? "ja" : "nei",
        }),
      ],
    };

    form.setValue("pdfGrunnlag", JSON.stringify(pdfGrunnlag));
    form.submit();
  }
  const { formId, action: formAction } = form.formOptions;
  const bekreftVilkår = form.value().bekreftVilkår;
  const startsideKomponenter = STARTSIDE_KOMPONENTER.map((k) =>
    k.id === "intro-guidepanel" && navn ? { ...k, label: `Hei, ${navn}!` } : k
  );
  const startsideVisning = renderStartsideKomponenter(startsideKomponenter, STARTSIDE_ACCORDION_ITEMS);

  return (
    <main id="maincontent" tabIndex={-1}>
      <title>Søknad om dagpenger</title>
      <VStack gap="space-8" className="soknad-header">
        <Detail>NAV 10-07.03 (Om søknaden har ID)</Detail>
        <HStack gap="space-8" align="center">
          <SøknadIkon />
          <Heading size="large" level="1">
            Søknad om dagpenger
          </Heading>
        </HStack>
      </VStack>
      <div className="innhold">
        <VStack gap="space-32">
          {startsideVisning}
          <Form id={formId} method="post" action={formAction}>
            <VStack gap="space-24">
              <Checkbox
                name="bekreftVilkår"
                checked={bekreftVilkår}
                onChange={() => form.setValue("bekreftVilkår", !bekreftVilkår)}
              >
                {BEKREFT_VILKÅR_TEKST}
              </Checkbox>
              {actionData?.error && (
                <LocalAlert status="error">
                  <LocalAlert.Content>{actionData.error}</LocalAlert.Content>
                </LocalAlert>
              )}
              <Box>
                <Button
                  type="button"
                  icon={<ArrowRightIcon aria-hidden />}
                  iconPosition="right"
                  loading={state !== "idle"}
                  onClick={opprettSøknad}
                >
                  Start søknad
                </Button>
              </Box>
            </VStack>
          </Form>
        </VStack>
      </div>
    </main>
  );
}
