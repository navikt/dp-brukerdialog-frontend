import { BodyLong, Button, HStack, Modal, VStack } from "@navikt/ds-react";

interface IProps {
  ref: React.RefObject<HTMLDialogElement | null>;
  setStengModalSelvOmDetErUlagredeEndringer: React.Dispatch<React.SetStateAction<boolean>>;
}

export function EndringerErIkkeLagretModal({
  ref,
  setStengModalSelvOmDetErUlagredeEndringer,
}: IProps) {
  return (
    <Modal ref={ref} header={{ heading: "Er du sikker på at du vil lukke vinduet?" }}>
      <Modal.Body>
        <VStack gap="6">
          <BodyLong>
            Du har gjort endringer som ikke er lagret. Vil du allikevel lukke dette vinduet?
          </BodyLong>
          <HStack gap="4">
            <Button
              variant="danger"
              type="button"
              onClick={() => setStengModalSelvOmDetErUlagredeEndringer(true)}
            >
              Ja, lukk vinduet
            </Button>
            <Button type="button" variant="tertiary" onClick={() => ref.current?.close()}>
              Nei, ikke lukk vinduet
            </Button>
          </HStack>
        </VStack>
      </Modal.Body>
    </Modal>
  );
}
