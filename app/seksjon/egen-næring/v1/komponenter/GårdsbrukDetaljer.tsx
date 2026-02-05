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

interface IProps {
  etGårdsbruk: Gårdsbruk;
  gårdsbrukIndex: number;
}

export function GårdsbrukDetaljer({ etGårdsbruk, gårdsbrukIndex }: IProps) {
  const { gårdsbruk, setGårdsbruk, setGårdsbrukModalData } = useEgenNæringContext();

  function fjernGårdsbruk() {
    setGårdsbruk(gårdsbruk.filter((_, i) => i !== gårdsbrukIndex));
  }

  return (
    <Box.New padding="space-16" background="sunken" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>{etGårdsbruk[gårdsbruketsNavn]}</h3>
      <BodyShort spacing>
        {etGårdsbruk[hvorMangeProsentAvInntektenGårTilDeg]}% av inntekten går til meg
        <br />
        {etGårdsbruk[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]}{" "}
        arbeidstimer brukt i{" "}
        {etGårdsbruk[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]}
      </BodyShort>
      <HStack gap="4">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={() => {
            setGårdsbrukModalData({
              operasjon: ModalOperasjon.Rediger,
              etGårdsbruk,
              gårdsbrukIndex,
            });
          }}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernGårdsbruk}
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box.New>
  );
}
