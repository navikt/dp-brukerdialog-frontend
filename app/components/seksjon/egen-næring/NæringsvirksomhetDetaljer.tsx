import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import {
  hvorMangeTimerJobbetPerUkeFørArbeidstidenBleRedusert,
  hvorMangeTimerJobbetPerUkeNå,
  Næringsvirksomhet,
  organisasjonsnummer,
} from "~/seksjon-regelsett/egen-næring/egen-næring.spørsmål";
import { OppdaterNæringsvirksomhetModal } from "~/components/seksjon/egen-næring/OppdaterNæringsvirksomhetModal";

interface IProps {
  næringsvirksomhet: Næringsvirksomhet;
  index: number;
  setRegistrerteNæringsvirksomheter: (næringsvirksomheter: Næringsvirksomhet[]) => void;
  registrerteNæringsvirksomheter: Næringsvirksomhet[];
}

export function NæringsvirksomhetDetaljer({
  næringsvirksomhet,
  index,
  setRegistrerteNæringsvirksomheter,
  registrerteNæringsvirksomheter,
}: IProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [showModal, setShowModal] = useState(false);

  function fjernNæringsvirksomhet() {
    setRegistrerteNæringsvirksomheter(registrerteNæringsvirksomheter.filter((_, i) => i !== index));
  }

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
    }
  }, [showModal]);

  return (
    <>
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
            variant="secondary"
            size="small"
            icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
            onClick={() => {
              setShowModal(true);
              modalRef.current?.showModal();
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
      {showModal && (
        <OppdaterNæringsvirksomhetModal
          modalRef={modalRef}
          registrerteNæringsvirksomheter={registrerteNæringsvirksomheter}
          setRegistrerteNæringsvirksomheter={setRegistrerteNæringsvirksomheter}
          index={index}
          næringsvirksomhet={næringsvirksomhet}
        />
      )}
    </>
  );
}
