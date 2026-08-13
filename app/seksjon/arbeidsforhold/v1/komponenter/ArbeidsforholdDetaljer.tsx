import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";
import { ModalOperasjon } from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { useArbeidsforholdContext } from "~/seksjon/arbeidsforhold/v1/arbeidsforhold.context";
import {
  Arbeidsforhold,
  hvordanHarDetteArbeidsforholdetEndretSeg,
  lagArbeidsforholdModalKomponenter,
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
  const { t } = useVersjonertTranslation("arbeidsforhold", 1);
  const arbeidsforholdModalKomponenter = lagArbeidsforholdModalKomponenter(t);
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
              {t("detaljer.varteFra", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetFraDato])
                ),
              })}
            </span>
          )}
          {arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {t("detaljer.til", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[jegErOppsagtVarighetPåArbeidsforholdetTilDato])
                ),
              })}
            </span>
          )}

          {arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {t("detaljer.varteFra", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetFraDato])
                ),
              })}
            </span>
          )}
          {arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {t("detaljer.til", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[jegHarSagtOppSelvVarighetPåArbeidsforholdetTilDato])
                ),
              })}
            </span>
          )}

          {arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {t("detaljer.varteFra", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetFraDato])
                ),
              })}
            </span>
          )}
          {arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {t("detaljer.til", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[jegHarFåttAvskjedVarighetPåArbeidsforholdetTilDato])
                ),
              })}
            </span>
          )}

          {arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {t("detaljer.varteFra", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetFraDato])
                ),
              })}
            </span>
          )}
          {arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {t("detaljer.til", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[kontraktenErUtgåttVarighetPåArbeidsforholdetTilDato])
                ),
              })}
            </span>
          )}

          {arbeidsforhold[arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet] && (
            <span>
              {t("detaljer.startet", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[arbeidstidenErRedusertHvilkenDatoStartetArbeidsforholdet])
                ),
              })}
            </span>
          )}
          {arbeidsforhold[arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert] && (
            <span>
              {t("detaljer.arbeidstidenBleRedusert", {
                dato: formaterNorskDato(
                  new Date(
                    arbeidsforhold[arbeidstidenErRedusertFraHvilkenDatoErArbeidstidenRedusert]
                  )
                ),
              })}
            </span>
          )}

          {arbeidsforhold[konkursVarighetPåArbeidsforholdetFraDato] && (
            <span>
              {t("detaljer.varteFra", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[konkursVarighetPåArbeidsforholdetFraDato])
                ),
              })}
            </span>
          )}
          {arbeidsforhold[konkursVarighetPåArbeidsforholdetTilDato] && (
            <span>
              {t("detaljer.til", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[konkursVarighetPåArbeidsforholdetTilDato])
                ),
              })}
            </span>
          )}

          {arbeidsforhold[permittertVarighetPåArbeidsforholdetFraOgMedDato] && (
            <span>
              {t("detaljer.startet", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[permittertVarighetPåArbeidsforholdetFraOgMedDato])
                ),
              })}
            </span>
          )}
          {arbeidsforhold[permittertNårErDuPermittertFraOgMedDato] && (
            <>
              {t("detaljer.permittertFra", {
                prosent: arbeidsforhold[permittertHvorMangeProsentErDuPermittert],
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[permittertNårErDuPermittertFraOgMedDato])
                ),
              })}{" "}
              {arbeidsforhold[permittertNårErDuPermittertTilOgMedDato] && (
                <>
                  {t("detaljer.permittertTil", {
                    dato: formaterNorskDato(
                      new Date(arbeidsforhold[permittertNårErDuPermittertTilOgMedDato])
                    ),
                  })}
                </>
              )}
            </>
          )}

          {arbeidsforhold[ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato] && (
            <span>
              {t("detaljer.startet", {
                dato: formaterNorskDato(
                  new Date(arbeidsforhold[ikkeEndretVarighetPåArbeidsforholdetFraOgMedDato])
                ),
              })}
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
          {t("navigasjon.endreSvar")}
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernArbeidsforhold}
          icon={<TrashIcon aria-hidden />}
        >
          {t("navigasjon.fjern")}
        </Button>
      </HStack>
    </Box>
  );
}
