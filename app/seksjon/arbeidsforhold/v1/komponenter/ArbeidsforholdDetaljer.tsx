import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  Arbeidsforhold,
  arbeidsforholdModalKomponenter,
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
          {arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {"Arbeidsforholdet varte fra " +
                formaterNorskDato(
                  new Date(arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetFraDato])
                )}
            </span>
          )}
          {arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {" til " +
                formaterNorskDato(
                  new Date(arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetTilDato])
                )}
            </span>
          )}

          {arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {"Arbeidsforholdet varte fra " +
                formaterNorskDato(
                  new Date(arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato])
                )}
            </span>
          )}
          {arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {" til " +
                formaterNorskDato(
                  new Date(arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato])
                )}
            </span>
          )}

          {arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {"Arbeidsforholdet varte fra " +
                formaterNorskDato(
                  new Date(arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato])
                )}
            </span>
          )}
          {arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {" til " +
                formaterNorskDato(
                  new Date(arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato])
                )}
            </span>
          )}

          {arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {"Arbeidsforholdet varte fra " +
                formaterNorskDato(
                  new Date(arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato])
                )}
            </span>
          )}
          {arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {" til " +
                formaterNorskDato(
                  new Date(arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato])
                )}
            </span>
          )}

          {arbeidsforhold[arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet] && (
            <span>
              {"Arbeidsforholdet startet " +
                formaterNorskDato(
                  new Date(arbeidsforhold[arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet])
                )}
            </span>
          )}
          {arbeidsforhold[arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert] && (
            <>
              Arbeidstiden ble redusert{" "}
              {formaterNorskDato(
                new Date(arbeidsforhold[arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert])
              )}
            </>
          )}

          {arbeidsforhold[konkursVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {"Arbeidsforholdet varte fra " +
                formaterNorskDato(
                  new Date(arbeidsforhold[konkursVarighetPåArbeidsforholdetFraDato])
                )}
            </span>
          )}
          {arbeidsforhold[konkursVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {" til " +
                formaterNorskDato(
                  new Date(arbeidsforhold[konkursVarighetPåArbeidsforholdetTilDato])
                )}
            </span>
          )}

          {arbeidsforhold[permittertVarighetPåArbeidsforholdetFraOgMedDato] && (
            <span>
              {"Arbeidsforholdet startet " +
                formaterNorskDato(
                  new Date(arbeidsforhold[permittertVarighetPåArbeidsforholdetFraOgMedDato])
                )}
            </span>
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

          {arbeidsforhold[ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato] && (
            <span>
              {"Arbeidsforholdet startet " +
                formaterNorskDato(
                  new Date(arbeidsforhold[ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato])
                )}
            </span>
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
