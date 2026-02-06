import { Button, HStack, VStack } from "@navikt/ds-react";
import { SistOppdatert } from "./SistOppdatert";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";

interface IProps {
  onForrigeSteg: () => void;
  onNesteSteg: () => void;
  lagrer: boolean;
}

export function SeksjonNavigasjon({ onForrigeSteg, onNesteSteg, lagrer }: IProps) {
  return (
    <VStack className="seksjon-navigasjon" gap="4">
      <SistOppdatert />
      <HStack gap="4">
        <Button
          variant="secondary"
          type="button"
          icon={<ArrowLeftIcon aria-hidden />}
          onClick={onForrigeSteg}
          disabled={lagrer}
        >
          Forrige steg
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={onNesteSteg}
          iconPosition="right"
          icon={<ArrowRightIcon aria-hidden />}
          disabled={lagrer}
        >
          Neste steg
        </Button>
      </HStack>
    </VStack>
  );
}
