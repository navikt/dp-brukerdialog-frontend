import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import {
  Arbeidsforhold,
  arbeidsforholdModalSpørsmål,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  navnetPåBedriften,
  varighetPåArbeidsforholdetFraOgMedDato,
  varighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.spørsmål";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";

interface IProps {
  arbeidsforhold: Arbeidsforhold;
  arbeidsforholdIndex: number;
}

export function ArbeidsforholdDetaljer({ arbeidsforhold, arbeidsforholdIndex }: Readonly<IProps>) {
  const { registrerteArbeidsforhold, setRegistrerteArbeidsforhold, setModalData } =
    useArbeidsforholdContext();

  function fjernArbeidsforhold() {
    setRegistrerteArbeidsforhold(
      registrerteArbeidsforhold.filter((_, i) => i !== arbeidsforholdIndex)
    );
  }

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>{arbeidsforhold[navnetPåBedriften]}</h3>
      <BodyShort spacing>
        <>
          Fra og med&nbsp;
          {formaterNorskDato(new Date(arbeidsforhold[varighetPåArbeidsforholdetFraOgMedDato]!))}
          {arbeidsforhold[varighetPåArbeidsforholdetTilOgMedDato] && (
            <>
              , til og med&nbsp;
              {formaterNorskDato(new Date(arbeidsforhold[varighetPåArbeidsforholdetTilOgMedDato]))}
            </>
          )}
          <br />
          <span>
            {finnOptionLabel(
              arbeidsforholdModalSpørsmål,
              hvordanHarDetteArbeidsforholdetEndretSeg,
              arbeidsforhold[hvordanHarDetteArbeidsforholdetEndretSeg]!
            )}
          </span>
        </>
      </BodyShort>
      <HStack gap="4">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={() => {
            setModalData({
              operasjon: ModalOperasjon.Rediger,
              arbeidsforhold,
              arbeidsforholdIndex,
            });
          }}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernArbeidsforhold}
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box>
  );
}
