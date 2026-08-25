import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import {
  Gårdsbruk,
  gårdsbruketsNavn,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import { ModalOperasjon, useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import { useTranslation } from "react-i18next";

interface IProps {
  etGårdsbruk: Gårdsbruk;
  gårdsbrukIndex: number;
}

export function GårdsbrukDetaljer({ etGårdsbruk, gårdsbrukIndex }: IProps) {
  const { gårdsbruk, setGårdsbruk, setGårdsbrukModalData } = useEgenNæringContext();
  const { t } = useTranslation("egen-næring/v1");

  function fjernGårdsbruk() {
    setGårdsbruk(gårdsbruk.filter((_, i) => i !== gårdsbrukIndex));
  }

  return (
    <Box padding="space-16" background="sunken" borderRadius="16">
      <h3 style={{ marginTop: "0" }}>{etGårdsbruk[gårdsbruketsNavn]}</h3>
      <BodyShort spacing>
        {t("gårdsbruk.detaljer.prosentTilMeg", {
          prosent: etGårdsbruk[hvorMangeProsentAvInntektenGårTilDeg],
        })}
        <br />
        {t("gårdsbruk.detaljer.arbeidstimer", {
          antall:
            etGårdsbruk[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer],
          år: etGårdsbruk[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr],
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
          {t("detaljer.endreSvar")}
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernGårdsbruk}
          icon={<TrashIcon aria-hidden />}
        >
          {t("detaljer.fjern")}
        </Button>
      </HStack>
    </Box>
  );
}
