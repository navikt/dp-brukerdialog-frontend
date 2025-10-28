import { Button, HStack } from "@navikt/ds-react";
import { FloppydiskIcon } from "@navikt/aksel-icons";
import { SlettSøknadSpørsmålModal } from "~/components/SlettSøknadSpørsmålModal";

interface SøknadFooterProps {
  soknadId: string;
}

export function SøknadFooter({ soknadId }: SøknadFooterProps) {
  return (
    <div className="innhold">
      <HStack>
        <Button
          variant="tertiary"
          size="small"
          icon={<FloppydiskIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fortsett senere
        </Button>
        <SlettSøknadSpørsmålModal søknadId={soknadId} />
      </HStack>
    </div>
  );
}
