import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import {
  Arbeidsforhold,
  arbeidsforholdModalKomponenter,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  navnetPåBedriften,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";
import {
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import {
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  jegErOppsagtVarighetPåArbeidsforholdetFraOgMedDato,
  jegErOppsagtVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import {
  jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import {
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
import {
  konkursVarighetPåArbeidsforholdetFraOgMedDato,
  konkursVarighetPåArbeidsforholdetTilOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import {
  permittertHvorMangeProsentErDuPermittert,
  permittertNårErDuPermittertFraOgMedDato,
  permittertNårErDuPermittertTilOgMedDato,
  permittertVarighetPåArbeidsforholdetFraOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import {
  ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";

interface IProps {
  arbeidsforhold: Arbeidsforhold;
}

function ArbeidsforholdDetaljer({ arbeidsforhold }: IProps) {
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
    <Box.New padding="space-16" background="sunken" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>{arbeidsforhold[navnetPåBedriften]}</h3>
      <BodyShort spacing>
        <>
          <span>
            {finnOptionLabel(
              arbeidsforholdModalKomponenter,
              hvordanHarDetteArbeidsforholdetEndretSeg,
              arbeidsforhold[hvordanHarDetteArbeidsforholdetEndretSeg]!
            )}
          </span>
          <br />
          {arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetFraOgMedDato])
              )}
          {arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetTilOgMedDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetTilOgMedDato])
              )}

          {arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetFraOgMedDato])
              )}
          {arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetTilOgMedDato])
              )}

          {arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetFraOgMedDato])
              )}
          {arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetTilOgMedDato])
              )}

          {arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetFraOgMedDato])
              )}
          {arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetTilOgMedDato])
              )}

          {arbeidsforhold[arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet] &&
            "Arbeidsforholdet startet " +
              formaterNorskDato(
                new Date(arbeidsforhold[arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet])
              )}
          {arbeidsforhold[arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert] && (
            <div>
              Arbeidstiden ble redusert{" "}
              {formaterNorskDato(
                new Date(arbeidsforhold[arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert])
              )}
            </div>
          )}

          {arbeidsforhold[konkursVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[konkursVarighetPåArbeidsforholdetFraOgMedDato])
              )}
          {arbeidsforhold[konkursVarighetPåArbeidsforholdetTilOgMedDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[konkursVarighetPåArbeidsforholdetTilOgMedDato])
              )}

          {arbeidsforhold[permittertVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet startet " +
              formaterNorskDato(
                new Date(arbeidsforhold[permittertVarighetPåArbeidsforholdetFraOgMedDato])
              )}
          {arbeidsforhold[permittertNårErDuPermittertFraOgMedDato] && (
            <div>
              {arbeidsforhold[permittertHvorMangeProsentErDuPermittert]}% permittert fra{" "}
              {formaterNorskDato(new Date(arbeidsforhold[permittertNårErDuPermittertFraOgMedDato]))}{" "}
              til{" "}
              {formaterNorskDato(
                new Date(arbeidsforhold[permittertNårErDuPermittertTilOgMedDato]!)
              )}
            </div>
          )}

          {arbeidsforhold[ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet startet " +
              formaterNorskDato(
                new Date(arbeidsforhold[ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato])
              )}
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
    </Box.New>
  );
}

export default ArbeidsforholdDetaljer
