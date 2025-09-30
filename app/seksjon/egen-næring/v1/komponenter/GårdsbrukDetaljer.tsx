import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import {
  Gårdsbruk,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
  organisasjonsnummer,
} from "~/seksjon/egen-næring/v1/egen-næring.spørsmål";
import {
  ModalOperasjonEnum,
  useEgenNæringContext,
} from "~/seksjon/egen-næring/v1/egen-næring.context";

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
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>{etGårdsbruk[organisasjonsnummer]}</h3>
      <BodyShort spacing>
        {etGårdsbruk[hvorMangeProsentAvInntektenGårTilDeg]}% av inntekten går til meg pr. uke før
        reduksjon
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
              operasjon: ModalOperasjonEnum.Rediger,
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
    </Box>
  );
}
