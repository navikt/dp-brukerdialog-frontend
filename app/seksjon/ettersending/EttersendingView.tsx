import { BodyLong, BodyShort, Button, HStack, Link, ReadMore, VStack } from "@navikt/ds-react";
import { useLoaderData } from "react-router";
import { loader } from "~/routes/$soknadId.ettersending";
import { Dokumentasjonskrav } from "../dokumentasjon/DokumentasjonskravKomponent";
import { EttersendingDokumentOpplasting } from "./EttersendingDokumentOpplasting";

export function EttersendingView() {
  const loaderData = useLoaderData<typeof loader>();
  const dokumentasjonskrav = loaderData?.dokumentasjonskrav || [];

  return (
    <div className="innhold">
      <h2>Ettersending</h2>

      <VStack gap="4">
        <BodyShort weight="semibold">
          Frist for innsendinger er 14 dager etter at du sendte søknaden.
        </BodyShort>
        <BodyLong>
          Vi trenger dokumentasjonen for å vurdere om du har rett til dagpenger. Du er ansvarlig for
          at dokumentasjonen sendes til oss. Hvis du ikke sender alle dokumentene innen fristen kan
          du få avslag på søknaden, fordi NAV mangler viktige opplysninger i saken din. Ta kontakt
          hvis du ikke rekker å ettersende alle dokumentene.
        </BodyLong>

        <ReadMore header="Har du fått brev om manglende opplysninger?">
          <BodyLong>
            Hvis du har fått brev om manglende opplysninger vil det stå i brevet hva som skal sendes
            inn og frist for å sende inn. Brev du har fått ligger i{" "}
            <Link href="https://www.nav.no/arbeid/dagpenger/mine-dagpenger#dokumentliste">
              dokumentlisten på Mine dagpenger
            </Link>
            . Når du har dokumentene klare kan du{" "}
            <Link href="https://www.nav.no/dagpenger/dialog/generell-innsending/">
              sende dem inn her.
            </Link>
            Dette kan forlenge tiden det tar å behandle søknaden din.
          </BodyLong>
        </ReadMore>
      </VStack>

      <VStack gap="4" className="mt-8">
        {dokumentasjonskrav.map((dokumentasjonskrav: Dokumentasjonskrav) => (
          <EttersendingDokumentOpplasting dokumentasjonskrav={dokumentasjonskrav} />
        ))}
      </VStack>

      <HStack gap="4" className="mt-14">
        <Button type="button">Send inn dokumenter</Button>
        <Button variant="secondary" type="button" iconPosition="right">
          Avbryt
        </Button>
      </HStack>
    </div>
  );
}
