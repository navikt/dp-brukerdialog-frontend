import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack } from "@navikt/ds-react";
import { useRef } from "react";
import { findLandeNavn } from "~/constants";
import { useBarnetilleggContext } from "~/seksjon/barnetillegg/barnetillegg.context";
import { Barn } from "~/seksjon/barnetillegg/barnetillegg.spørsmål";
import { formaterNorskDato } from "~/utils/formattering.utils";
import { OppdatereBarnModal } from "./OppdatereBarnModal";

interface IProps {
  barn: Barn;
  barnIndex: number;
}

export function BarnLagtManuelt({ barn, barnIndex }: IProps) {
  const { barnLagtManuelt, setBarnLagtManuelt } = useBarnetilleggContext();

  const modalRef = useRef<HTMLDialogElement>(null);

  function fjernBarn() {
    setBarnLagtManuelt(barnLagtManuelt.filter((_, i) => i !== barnIndex));
  }

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
      <OppdatereBarnModal modalRef={modalRef} barnIndex={barnIndex} barn={barn} />
    </>
  );
}
