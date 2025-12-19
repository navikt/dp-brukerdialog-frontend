import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack } from "@navikt/ds-react";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { PengestøtteFraTidligereArbeidsgiver } from "./PengestøtteFraTidligereArbeidsgiverModal";
import {
  hvaFårEllerBeholderDu,
  hvemMottarDuUtbetalingerEllerGoderFra,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-fra-tidligere-arbeidsgiver.komponenter";

interface IProps {
  pengestøtteFraTidligereArbeidsgiver: PengestøtteFraTidligereArbeidsgiver;
}

export function PengestøtteFraTidligereArbeidsgiverDetaljer({
  pengestøtteFraTidligereArbeidsgiver: pengestøtteFraTidligereArbeidsgiverProps,
}: IProps) {
  const {
    pengestøtteFraTidligereArbeidsgiver,
    setPengestøtteFraTidligereArbeidsgiver,
    setPengestøtteFraTidligereArbeidsgiverModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useAnnenPengestøtteContext();

  function fjernPengestøtteFraTidligereArbeidsgiver() {
    setPengestøtteFraTidligereArbeidsgiver(
      pengestøtteFraTidligereArbeidsgiver.filter(
        (støtte) => støtte.id !== pengestøtteFraTidligereArbeidsgiverProps.id
      )
    );

    setDokumentasjonskrav(
      dokumentasjonskrav.filter(
        (krav) => krav.id !== pengestøtteFraTidligereArbeidsgiverProps?.dokumentasjonskrav?.[0]
      )
    );
  }

  return (
    <Box.New padding="space-16" background="sunken" borderRadius="xlarge">
      <Heading level="3" size="small" spacing>
        {pengestøtteFraTidligereArbeidsgiverProps[hvemMottarDuUtbetalingerEllerGoderFra]}
      </Heading>
      <BodyShort spacing={true}>
        {pengestøtteFraTidligereArbeidsgiverProps[hvaFårEllerBeholderDu]}
      </BodyShort>
      <HStack gap="4">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={() => {
            setPengestøtteFraTidligereArbeidsgiverModalData({
              operasjon: ModalOperasjon.Rediger,
              pengestøtteFraTidligereArbeidsgiver: pengestøtteFraTidligereArbeidsgiverProps,
            });
          }}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernPengestøtteFraTidligereArbeidsgiver}
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box.New>
  );
}
