import { BodyLong, Button, HStack, VStack } from "@navikt/ds-react";
import { Link } from "react-router";
import { EksterneLenke } from "~/components/EksterneLenke";
import { PåbegyntSøknadMedKilde } from "~/models/hent-søknader-for-ident";
import { getEnv } from "~/utils/env.utils";
import { formaterNorskDato } from "~/utils/formatering.utils";

interface FortsettEllerSlettKnapperProps {
  påbegyntSøknad: PåbegyntSøknadMedKilde;
}

export default function FortsettEllerSlettKnapper({
  påbegyntSøknad,
}: FortsettEllerSlettKnapperProps) {
  async function håndterSlettSøknad() {
    const subPath = påbegyntSøknad.erOrkestratorSøknad
      ? `/api/slett/${påbegyntSøknad.soknadUuid}`
      : `/api/slett/quiz/${påbegyntSøknad.soknadUuid}`;

    const response = await fetch(`${getEnv("BASE_PATH")}${subPath}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      alert("Noe gikk galt med å slette søknaden! Prøv igjen senere.");
      throw new Error("Feil ved sletting av søknad");
    } else {
      window.location.href = `${getEnv("BASE_PATH")}/arbeidssoker`;
    }
  }

  return (
    <div>
      <VStack gap="space-16">
        <BodyLong>
          Du har en påbegynt søknad, sist endret{" "}
          {formaterNorskDato(new Date(påbegyntSøknad.sistEndretAvBruker!))}. Vil du fortsette på
          denne eller starte en ny?
        </BodyLong>
        <VStack gap="space-16">
          {påbegyntSøknad.erOrkestratorSøknad ? (
            <Link to={`/${påbegyntSøknad.soknadUuid}/personalia`}>
              <Button variant="primary">Fortsett påbegynt søknad</Button>
            </Link>
          ) : (
            <EksterneLenke
              href={`${getEnv("DP_SOKNADSDIALOG_URL")}/soknad/${påbegyntSøknad.soknadUuid}?fortsett=true`}
              tekst="Fortsett påbegynt søknad"
              variant="primary"
              asButton
            />
          )}
          <HStack gap="space-16">
            <Button variant="secondary" onClick={håndterSlettSøknad}>
              Slett og start ny søknad
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
