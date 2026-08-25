import { FloppydiskIcon } from "@navikt/aksel-icons";
import { Alert, Button, HStack } from "@navikt/ds-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SlettSøknadModal } from "~/components/SlettSøknadModal";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";

interface SøknadFooterProps {
  onFortsettSenere?: () => void;
}

export function SøknadFooter({ onFortsettSenere }: SøknadFooterProps) {
  const [visMelding, setVisMelding] = useState(false);
  const { t } = useTranslation("felles");
  const { søknadId } = useTypedRouteLoaderData("routes/$soknadId");

  function onClick() {
    if (onFortsettSenere) {
      onFortsettSenere();
    }

    setVisMelding(true);
  }

  return (
    <div className="footer">
      <div className="innhold">
        <HStack>
          <Button
            variant="tertiary"
            size="small"
            icon={<FloppydiskIcon aria-hidden />}
            type="button"
            onClick={onClick}
          >
            {t("footer.fortsettSenereKnapp")}
          </Button>
          <SlettSøknadModal søknadId={søknadId} />
        </HStack>
        {visMelding && (
          <Alert variant="success" className="mt-32">
            {t("footer.lagretMelding")}
          </Alert>
        )}
      </div>
    </div>
  );
}
