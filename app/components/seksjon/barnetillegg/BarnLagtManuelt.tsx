import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import { Barn } from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";
import { OppdatereBarnModal } from "./OppdatereBarnModal";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { findLandeNavn } from "~/constants";

interface IProps {
  barn: Barn;
  index: number;
  setBarnLagtManuelt: (barn: Barn[]) => void;
  barnLagtManuelt: Barn[];
}

export function BarnLagtManuelt({ barn, index, setBarnLagtManuelt, barnLagtManuelt }: IProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [showModal, setShowModal] = useState(false);

  function fjernBarn() {
    setBarnLagtManuelt(barnLagtManuelt.filter((_, i) => i !== index));
  }

  useEffect(() => {
    if (showModal) {
      modalRef.current?.showModal();
    }
  }, [showModal]);

  return (
    <>
      <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
        <Heading size="small" spacing>
          {barn.fornavnOgMellomnavn} {barn.etternavn}
        </Heading>
        {barn.fødselsdato && (
          <BodyShort size="medium" spacing>
            Født {formaterNorskDato(new Date(barn.fødselsdato))}
          </BodyShort>
        )}
        {barn.bostedsland && (
          <BodyShort size="small" spacing>
            BOR I {findLandeNavn(barn.bostedsland).toUpperCase()}
          </BodyShort>
        )}

        <HStack gap="4" paddingBlock="space-6">
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
            onClick={fjernBarn}
            icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
          >
            Fjern
          </Button>
        </HStack>
      </Box>
      {showModal && (
        <OppdatereBarnModal
          modalRef={modalRef}
          index={index}
          barn={barn}
          barnLagtManuelt={barnLagtManuelt}
          setBarnLagtManuelt={setBarnLagtManuelt}
        />
      )}
    </>
  );
}
