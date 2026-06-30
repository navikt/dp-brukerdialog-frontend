import { useTranslation } from "react-i18next";
import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { ModalOperasjon, useEgenNæringContext } from "~/seksjon/egen-næring/v1/egen-næring.context";
import {
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  virksomhetensNavn,
} from "~/seksjon/egen-næring/v1/egen-næring.komponenter";
import type { Næringsvirksomhet } from "~/seksjon/egen-næring/v1/egen-næring.komponenter";

interface IProps {
  næringsvirksomhet: Næringsvirksomhet;
  næringsvirksomhetIndex: number;
}

export function NæringsvirksomhetDetaljer({ næringsvirksomhet, næringsvirksomhetIndex }: IProps) {
  const { t } = useTranslation("egen-naering");
  const { næringsvirksomheter, setNæringsvirksomheter, setNæringsvirksomhetModalData } =
    useEgenNæringContext();

  function fjernNæringsvirksomhet() {
    setNæringsvirksomheter(næringsvirksomheter.filter((_, i) => i !== næringsvirksomhetIndex));
  }

  return (
    <Box padding="space-16" background="sunken" borderRadius="16">
      <h3 style={{ marginTop: "0" }}>{næringsvirksomhet[virksomhetensNavn]}</h3>
      <BodyShort spacing>
        {t("naeringsvirksomhetDetaljer.timerForReduksjon", {
          timer: næringsvirksomhet[hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert],
        })}
        <br />
        {t("naeringsvirksomhetDetaljer.timerNa", {
          timer: næringsvirksomhet[hvorMangeTimerJobbetPerUkeNå],
        })}
      </BodyShort>
      <HStack gap="space-16">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon aria-hidden />}
          onClick={() => {
            setNæringsvirksomhetModalData({
              operasjon: ModalOperasjon.Rediger,
              næringsvirksomhet,
              næringsvirksomhetIndex,
            });
          }}
        >
          {t("felles.knapper.endreSvar")}
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernNæringsvirksomhet}
          icon={<TrashIcon aria-hidden />}
        >
          {t("felles.knapper.fjern")}
        </Button>
      </HStack>
    </Box>
  );
}
