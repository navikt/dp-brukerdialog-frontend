import { useTranslation } from "react-i18next";
import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import {
  gårdsbruketsNavn,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import type { Gårdsbruk } from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { ModalOperasjon, useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";

interface IProps {
  etGårdsbruk: Gårdsbruk;
  gårdsbrukIndex: number;
}

export function GårdsbrukDetaljer({ etGårdsbruk, gårdsbrukIndex }: IProps) {
  const { t } = useTranslation("egen-naering");
  const { gårdsbruk, setGårdsbruk, setGårdsbrukModalData } = useEgenNæringContext();

  function fjernGårdsbruk() {
    setGårdsbruk(gårdsbruk.filter((_, i) => i !== gårdsbrukIndex));
  }

  return (
    <Box padding="space-16" background="sunken" borderRadius="16">
      <h3 style={{ marginTop: "0" }}>{etGårdsbruk[gårdsbruketsNavn]}</h3>
      <BodyShort spacing>
        {t("gardsbrukDetaljer.prosentAvInntektenGarTilMeg", {
          prosent: etGårdsbruk[hvorMangeProsentAvInntektenGårTilDeg],
        })}
        <br />
        {t("gardsbrukDetaljer.arbeidstimerBruktIAr", {
          timer:
            etGårdsbruk[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer],
          ar: etGårdsbruk[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr],
        })}
      </BodyShort>
      <HStack gap="space-16">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon aria-hidden />}
          onClick={() => {
            setGårdsbrukModalData({
              operasjon: ModalOperasjon.Rediger,
              etGårdsbruk,
              gårdsbrukIndex,
            });
          }}
        >
          {t("felles.knapper.endreSvar")}
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernGårdsbruk}
          icon={<TrashIcon aria-hidden />}
        >
          {t("felles.knapper.fjern")}
        </Button>
      </HStack>
    </Box>
  );
}
