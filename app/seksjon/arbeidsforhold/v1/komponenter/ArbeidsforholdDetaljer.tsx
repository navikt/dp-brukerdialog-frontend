import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import {
  Arbeidsforhold,
  arbeidsforholdModalKomponenter,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  navnetPåBedriften,
  varighetPåArbeidsforholdetFraOgMedDato,
  varighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";

interface IProps {
  arbeidsforhold: Arbeidsforhold;
}

export function ArbeidsforholdDetaljer({ arbeidsforhold }: IProps) {
  const {
    registrerteArbeidsforhold,
    setRegistrerteArbeidsforhold,
    setModalData,
    setDokumentasjonskrav,
    dokumentasjonskrav,
  } = useArbeidsforholdContext();

  function fjernArbeidsforhold() {
    setRegistrerteArbeidsforhold(
      registrerteArbeidsforhold.filter((forhold) => forhold.id !== arbeidsforhold.id)
    );

    setDokumentasjonskrav(
      dokumentasjonskrav.filter((krav) => !arbeidsforhold?.dokumentasjonskrav?.includes(krav.id))
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
              arbeidsforholdModalKomponenter,
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
