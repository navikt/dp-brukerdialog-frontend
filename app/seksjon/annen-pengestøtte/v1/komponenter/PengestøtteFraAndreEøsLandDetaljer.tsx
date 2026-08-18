import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, Heading, HStack } from "@navikt/ds-react";
import {
  fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte,
  fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato,
  lagPengestøtteFraAndreEøsLandModalKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-eøs.komponenter";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnLandnavnMedLocale } from "~/utils/land.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";
import { PengestøtteFraAndreEøsLand } from "./PengestøtteFraAndreEøsLandModal";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";

interface IProps {
  pengestøtteFraAndreEøsLand: PengestøtteFraAndreEøsLand;
}

export function PengestøtteFraAndreEøsLandDetaljer({
  pengestøtteFraAndreEøsLand: pengestøtteFraAndreEøsLandProps,
}: IProps) {
  const {
    pengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLandModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useAnnenPengestøtteContext();
  const { t } = useVersjonertTranslation("annen-pengestøtte", 1);
  const pengestøtteFraAndreEøsLandModalKomponenter =
    lagPengestøtteFraAndreEøsLandModalKomponenter(t);

  function fjernPengestøtteFraAndreEøsLand() {
    setPengestøtteFraAndreEøsLand(
      pengestøtteFraAndreEøsLand.filter(
        (støtte) => støtte.id !== pengestøtteFraAndreEøsLandProps.id
      )
    );

    setDokumentasjonskrav(
      dokumentasjonskrav.filter(
        (krav) => krav.id !== pengestøtteFraAndreEøsLandProps?.dokumentasjonskrav?.[0]
      )
    );
  }

  return (
    <Box padding="space-16" background="sunken" borderRadius="16">
      <Heading level="3" size="small" spacing>
        {finnOptionLabel(
          pengestøtteFraAndreEøsLandModalKomponenter,
          hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
          pengestøtteFraAndreEøsLandProps[hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]!
        )}
      </Heading>
      <BodyShort spacing>
        {finnLandnavnMedLocale(
          pengestøtteFraAndreEøsLandProps[fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]!
        ).toUpperCase()}
        <br />
        {pengestøtteFraAndreEøsLandProps[
          iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato
        ] &&
          pengestøtteFraAndreEøsLandProps[
            iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato
          ] && (
            <>
              {t("detaljer.mottattFraOgMed")}&nbsp;
              {formaterNorskDato(
                new Date(
                  pengestøtteFraAndreEøsLandProps[
                    iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraDato
                  ]
                )
              )}
              , {t("detaljer.tilOgMed")}&nbsp;
              {formaterNorskDato(
                new Date(
                  pengestøtteFraAndreEøsLandProps[
                    iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilDato
                  ]
                )
              )}
            </>
          )}
        {pengestøtteFraAndreEøsLandProps[fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato] && (
          <>
            {t("detaljer.motattFraOgMed")}{" "}
            {formaterNorskDato(
              new Date(
                pengestøtteFraAndreEøsLandProps[fraNårHarDuMottattPengestøtteFraAndreEøsLandFraDato]
              )
            )}
          </>
        )}
      </BodyShort>
      <HStack gap="space-16">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon aria-hidden />}
          onClick={() => {
            setPengestøtteFraAndreEøsLandModalData({
              operasjon: ModalOperasjon.Rediger,
              pengestøtteFraAndreEøsLand: pengestøtteFraAndreEøsLandProps,
            });
          }}
        >
          {t("detaljer.endreSvar")}
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernPengestøtteFraAndreEøsLand}
          icon={<TrashIcon aria-hidden />}
        >
          {t("detaljer.fjern")}
        </Button>
      </HStack>
    </Box>
  );
}
