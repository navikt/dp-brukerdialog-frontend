import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation("egen-næring/v1");

  function fjernNæringsvirksomhet() {
    setNæringsvirksomheter(næringsvirksomheter.filter((_, i) => i !== næringsvirksomhetIndex));
  }

  return (
    <Box padding="space-16" background="sunken" borderRadius="16">
      <h3 style={{ marginTop: "0" }}>{næringsvirksomhet[virksomhetensNavn]}</h3>
      <BodyShort spacing>
        {t("næringsvirksomhet.detaljer.timerFør", {
          timer: næringsvirksomhet[hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert],
        })}
        <br />
        {t("næringsvirksomhet.detaljer.timerNå", {
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
          {t("detaljer.endreSvar")}
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernNæringsvirksomhet}
          icon={<TrashIcon aria-hidden />}
        >
          {t("detaljer.fjern")}
        </Button>
      </HStack>
    </Box>
  );
}
