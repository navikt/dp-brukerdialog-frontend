import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { ModalOperasjon, useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  Næringsvirksomhet,
  virksomhetensNavn,
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
    <Box.New padding="space-16" background="sunken" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>{næringsvirksomhet[virksomhetensNavn]}</h3>
      <BodyShort spacing>
        {næringsvirksomhet[hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert]} timer arbeidstid
        per uke før reduksjon
        <br />
        {næringsvirksomhet[hvorMangeTimerJobbetPerUkeNå]} timer arbeidstid per uke nå
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
    </Box.New>
  );
}
