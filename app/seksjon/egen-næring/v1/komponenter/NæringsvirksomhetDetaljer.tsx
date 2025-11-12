import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { ModalOperasjon, useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  Næringsvirksomhet,
  organisasjonsnummer,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";

interface IProps {
  næringsvirksomhet: Næringsvirksomhet;
  næringsvirksomhetIndex: number;
}

export function NæringsvirksomhetDetaljer({ næringsvirksomhet, næringsvirksomhetIndex }: IProps) {
  const { næringsvirksomheter, setNæringsvirksomheter, setNæringsvirksomhetModalData } =
    useEgenNæringContext();

  function fjernNæringsvirksomhet() {
    setNæringsvirksomheter(næringsvirksomheter.filter((_, i) => i !== næringsvirksomhetIndex));
  }

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>{næringsvirksomhet[organisasjonsnummer]}</h3>
      <BodyShort spacing>
        {næringsvirksomhet[hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]} timer arbeidstid
        pr. uke før reduksjon
        <br />
        {næringsvirksomhet[hvorMangeTimerJobbetPerUkeNå]} timer arbeidstid pr. uke nå
      </BodyShort>
      <HStack gap="4">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={() => {
            setNæringsvirksomhetModalData({
              operasjon: ModalOperasjon.Rediger,
              næringsvirksomhet,
              næringsvirksomhetIndex,
            });
          }}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernNæringsvirksomhet}
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box>
  );
}
