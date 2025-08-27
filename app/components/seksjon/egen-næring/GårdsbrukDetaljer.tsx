import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import {
  Gårdsbruk,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer,
  hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr,
  hvorMangeProsentAvInntektenGårTilDeg,
  organisasjonsnummer,
} from "~/seksjon-regelsett/egen-næring/egen-næring.spørsmål";

interface IProps {
  gårdsbruk: Gårdsbruk;
  index: number;
  setRegistrerteGårdsbruk: (gårdsbruk: Gårdsbruk[]) => void;
  registrerteGårdsbruk: Gårdsbruk[];
}

export function GårdsbrukDetaljer({ gårdsbruk, index, setRegistrerteGårdsbruk, registrerteGårdsbruk }: IProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [showModal, setShowModal] = useState(false);

  function fjernGårdsbruk() {
    setRegistrerteGårdsbruk(registrerteGårdsbruk.filter((_, i) => i !== index));
  }

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
    }
  }, [showModal]);

  return (
    <>
      <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
        <h3 style={{ marginTop: "0" }}>{gårdsbruk[organisasjonsnummer]}</h3>
        <BodyShort spacing>
          {gårdsbruk[hvorMangeProsentAvInntektenGårTilDeg]}% av inntekten går til meg pr. uke før
          reduksjon
          <br />
          {gårdsbruk[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrAntallTimer]}{" "}
          arbeidstimer brukt i{" "}
          {gårdsbruk[hvorMangeArbeidstimerBlirBruktPåGårdsbruketTotaltILøpetAvEtÅrValgtÅr]}
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
            onClick={fjernGårdsbruk}
            icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
          >
            Fjern
          </Button>
        </HStack>
      </Box>
      {showModal && alert("Modal, værsågod!")}
    </>
  );
}