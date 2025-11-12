import { TrashIcon } from "@navikt/aksel-icons";
import { BodyLong, Box, Button, HStack, Link, Modal, VStack } from "@navikt/ds-react";
import { useRef } from "react";
import { useNavigate } from "react-router";

interface IProps {
  søknadId?: string;
}

export function SlettSøknadModal({ søknadId }: IProps) {
  const sletteSøknadSpørsmålModal = useRef<HTMLDialogElement>(null);
  const slettetSøknadBekreftelseModal = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();

  async function slettSøknad() {
    try {
      const response = await fetch(`/api/slett/${søknadId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Feil ved sletting av søknad");
      }
      sletteSøknadSpørsmålModal.current?.close();
      slettetSøknadBekreftelseModal.current?.showModal();
    } catch (error) {
      console.error("Feil ved sletting av søknad:", error);
    }
  }

  return (
    <Box>
      <Button
        variant="tertiary"
        size="small"
        icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        onClick={() => {
          sletteSøknadSpørsmålModal.current?.showModal();
        }}
      >
        Slett søknaden
      </Button>
      <Modal
        ref={sletteSøknadSpørsmålModal}
        header={{ heading: "Er du sikker på at du vil slette søknaden?" }}
      >
        <Modal.Body>
          <VStack gap="6">
            <BodyLong>
              Alle svarene dine blir slettet og du må begynne på nytt hvis du skal søke om
              dagpenger.
            </BodyLong>
            <HStack gap="8">
              <Button variant="danger" type="button" onClick={() => slettSøknad()}>
                Slett søknaden
              </Button>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => sletteSøknadSpørsmålModal.current?.close()}
              >
                Nei, ikke slett søknaden
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal>
      <Modal ref={slettetSøknadBekreftelseModal} header={{ heading: "Søknaden din er slettet" }}>
        <Modal.Body>
          <VStack gap="6">
            <BodyLong>Søknaden og alle svarene dine er slettet.</BodyLong>
            <HStack gap="8">
              <Link href="https://www.nav.no/arbeid/dagpenger/mine-dagpenger">
                <Button variant="primary" as="a">
                  Lukk
                </Button>
              </Link>
              <Button
                type="button"
                variant="tertiary"
                onClick={() => {
                  slettetSøknadBekreftelseModal.current?.close();
                  return navigate("/opprett-soknad");
                }}
              >
                Start ny søknad
              </Button>
            </HStack>
          </VStack>
        </Modal.Body>
      </Modal>
    </Box>
  );
}
