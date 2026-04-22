import { PåbegyntSøknadMedKilde } from "~/models/hent-søknader-for-ident";
import { BodyLong, Button, HStack, VStack } from "@navikt/ds-react";
import { Link } from "react-router";
import { getEnv } from "~/utils/env.utils";
import { formaterNorskDato } from "~/utils/formatering.utils";

interface FortsettEllerSlettKnapperProps {
  påbegyntSøknad: PåbegyntSøknadMedKilde;
}

export default function FortsettEllerSlettKnapper({
  påbegyntSøknad,
}: FortsettEllerSlettKnapperProps) {
  const dpSøknadUrl = getEnv("DP_SOKNAD_URL");

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
      window.location.href = `${getEnv("BASE_PATH")}/opprett-soknad`;
    }
  }

  return (
    <div>
      <VStack gap="4">
        <BodyLong>
          Du har en påbegynt søknad, sist endret{" "}
          {formaterNorskDato(new Date(påbegyntSøknad.sistEndretAvBruker!))}. Vil du fortsette på
          denne eller starte en ny?
        </BodyLong>
        <VStack gap="4">
          <Link
            to={
              påbegyntSøknad.erOrkestratorSøknad
                ? `/${påbegyntSøknad.soknadUuid}/personalia`
                : `${dpSøknadUrl}/soknad/${påbegyntSøknad.soknadUuid}?fortsett=true`
            }
          >
            <Button variant="primary" as="a">
              Fortsett påbegynt søknad
            </Button>
          </Link>
          <HStack gap="4">
            <Button variant="secondary" as="a" onClick={håndterSlettSøknad}>
              Slett og start ny søknad
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </div>
  );
}
