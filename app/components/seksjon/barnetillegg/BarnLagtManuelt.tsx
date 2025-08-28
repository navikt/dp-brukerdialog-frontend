import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { Box, Button, HStack } from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import { Barn } from "~/seksjon-regelsett/barnetillegg/barnetillegg.spørsmål";
import { OppdatereBarnModal } from "./OppdatereBarnModal";
import { formaterNorskDato } from "~/utils/formattering.utils";

interface IProps {
  barn: Barn;
  index: number;
  setBarnLagtManuelt: (barn: Barn[]) => void;
  barnLagtManuelt: Barn[];
}

export function BarnLagtManuelt({ barn, index, setBarnLagtManuelt, barnLagtManuelt }: IProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  function fjernBarn() {
    setBarnLagtManuelt(barnLagtManuelt.filter((_, i) => i !== index));
  }

  return (
    <>
      <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
        <h3>
          {barn.fornavnOgMellomnavn} {barn.etternavn}
        </h3>
        {barn.fødselsdato && <p>{formaterNorskDato(new Date(barn.fødselsdato))}</p>}
        <p>{barn.bostedsland}</p>

        <HStack gap="4">
          <Button
            variant="secondary"
            size="small"
            icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
            onClick={() => {
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
      <OppdatereBarnModal
        modalRef={modalRef}
        index={index}
        barn={barn}
        barnLagtManuelt={barnLagtManuelt}
        setBarnLagtManuelt={setBarnLagtManuelt}
      />
    </>
  );
}
