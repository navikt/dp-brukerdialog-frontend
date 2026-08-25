import { Button, HStack, VStack } from "@navikt/ds-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@navikt/aksel-icons";
import { useTranslation } from "react-i18next";
import { SistOppdatert } from "./SistOppdatert";

interface IProps {
  onForrigeSteg?: () => void;
  onNesteSteg: () => void;
  lagrer: boolean;
}

export function SeksjonNavigasjon({ onForrigeSteg, onNesteSteg, lagrer }: IProps) {
  const { t } = useTranslation("felles");

  return (
    <VStack className="seksjon-navigasjon" gap="space-16">
      <SistOppdatert />
      <HStack gap="space-16">
        {onForrigeSteg && (
          <Button
            variant="secondary"
            type="button"
            icon={<ArrowLeftIcon aria-hidden />}
            onClick={onForrigeSteg}
            disabled={lagrer}
          >
            {t("navigasjon.forrigeSteg")}
          </Button>
        )}

        <Button
          variant="primary"
          type="button"
          onClick={onNesteSteg}
          iconPosition="right"
          icon={<ArrowRightIcon aria-hidden />}
          disabled={lagrer}
        >
          {t("navigasjon.nesteSteg")}
        </Button>
      </HStack>
    </VStack>
  );
}
