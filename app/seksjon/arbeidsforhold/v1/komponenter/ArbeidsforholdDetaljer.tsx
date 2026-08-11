import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { useMemo } from "react";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  Arbeidsforhold,
  lagArbeidsforholdModalKomponenter,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  navnetPåBedriften,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter";
import {
  arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert,
  arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.arbeidstidenErRedusert";
import {
  jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato,
  jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.avskjediget";
import { ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.ikkeEndret";
import {
  jegErOppsagtVarighetPåArbeidsforholdetFraDato,
  jegErOppsagtVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegErOppsagt";
import {
  jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato,
  jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.jegHarSagtOpp";
import {
  konkursVarighetPåArbeidsforholdetFraDato,
  konkursVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.konkurs";
import {
  kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato,
  kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.kontraktenErUtgått";
import {
  permittertHvorMangeProsentErDuPermittert,
  permittertNårErDuPermittertFraOgMedDato,
  permittertNårErDuPermittertTilOgMedDato,
  permittertVarighetPåArbeidsforholdetFraOgMedDato,
} from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.komponenter.permittert";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";

interface IProps {
  arbeidsforhold: Arbeidsforhold;
}

function ArbeidsforholdDetaljer({ arbeidsforhold }: IProps) {
  const { t } = useVersjonertTranslation("arbeidsforhold", 1);
  const arbeidsforholdModalKomponenter = useMemo(() => lagArbeidsforholdModalKomponenter(t), [t]);
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
    <Box padding="space-16" background="sunken" borderRadius="16">
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
          {arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetFraDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetFraDato])
              )}
          {arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetTilDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetTilDato])
              )}

          {arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato])
              )}
          {arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato])
              )}

          {arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato])
              )}
          {arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato])
              )}

          {arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(
                new Date(arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato])
              )}
          {arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato] &&
            " til " +
              formaterNorskDato(
                new Date(arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato])
              )}

          {arbeidsforhold[arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet] &&
            "Arbeidsforholdet startet " +
              formaterNorskDato(
                new Date(arbeidsforhold[arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet])
              )}
          {arbeidsforhold[arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert] && (
            <>
              Arbeidstiden ble redusert{" "}
              {formaterNorskDato(
                new Date(arbeidsforhold[arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert])
              )}
            </>
          )}

          {arbeidsforhold[konkursVarighetPåArbeidsforholdetFraDato] &&
            "Arbeidsforholdet varte fra " +
              formaterNorskDato(new Date(arbeidsforhold[konkursVarighetPåArbeidsforholdetFraDato]))}
          {arbeidsforhold[konkursVarighetPåArbeidsforholdetTilDato] &&
            " til " +
              formaterNorskDato(new Date(arbeidsforhold[konkursVarighetPåArbeidsforholdetTilDato]))}

          {arbeidsforhold[permittertVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet startet " +
              formaterNorskDato(
                new Date(arbeidsforhold[permittertVarighetPåArbeidsforholdetFraOgMedDato])
              )}
          {arbeidsforhold[permittertNårErDuPermittertFraOgMedDato] && (
            <>
              {arbeidsforhold[permittertHvorMangeProsentErDuPermittert]}% permittert fra{" "}
              {formaterNorskDato(new Date(arbeidsforhold[permittertNårErDuPermittertFraOgMedDato]))}{" "}
              {arbeidsforhold[permittertNårErDuPermittertTilOgMedDato] && (
                <>
                  til{" "}
                  {formaterNorskDato(
                    new Date(arbeidsforhold[permittertNårErDuPermittertTilOgMedDato])
                  )}
                </>
              )}
            </>
          )}

          {arbeidsforhold[ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato] &&
            "Arbeidsforholdet startet " +
              formaterNorskDato(
                new Date(arbeidsforhold[ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato])
              )}
        </>
      </BodyShort>
      <HStack gap="space-16">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon aria-hidden />}
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
          icon={<TrashIcon aria-hidden />}
        >
          Fjern
        </Button>
      </HStack>
    </Box>
  );
}

export default ArbeidsforholdDetaljer;
