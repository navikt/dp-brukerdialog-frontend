import { useState } from "react";
import { Alert, Button, HStack } from "@navikt/ds-react";
import { FloppydiskIcon } from "@navikt/aksel-icons";
import { SlettSøknadModal } from "~/components/SlettSøknadModal";

interface SøknadFooterProps {
  søknadId: string;
  className?: string;
  onFortsettSenere?: () => void;
}

export function SøknadFooter({ søknadId, className, onFortsettSenere }: SøknadFooterProps) {
  const [visMelding, setVisMelding] = useState(false);

  function handleClick() {
    if (onFortsettSenere) {
      onFortsettSenere();
    }

    setVisMelding(true);
  }

  return (
    <div className={className || undefined}>
      <div className="innhold">
        <HStack>
          <Button
            variant="tertiary"
            size="small"
            icon={<FloppydiskIcon title="a11y-title" fontSize="1.5rem" />}
            type="button"
            onClick={handleClick}
          >
            Fortsett senere
          </Button>
          <SlettSøknadModal søknadId={søknadId} />
        </HStack>
        {visMelding && (
          <Alert variant="success" className="mt-8">
            Vi har lagret søknaden din. Du kan lukke siden og fortsette senere. Søknaden blir
            automatisk slettet hvis du ikke gjør noe innen 7 dager.
          </Alert>
        )}
      </div>
    </div>
  );
}
