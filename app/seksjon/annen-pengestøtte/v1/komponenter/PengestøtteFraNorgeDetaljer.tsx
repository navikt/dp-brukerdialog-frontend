import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import {
  hvemUtbetalerPengestøtten,
  hvilkenPengestøtteFraAndreEnnNavMottarDu,
  iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato,
  iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato,
  lagPengestøtteFraNorgeModalKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";
import { PengestøtteFraNorge } from "./PengestøtteFraNorgeModal";
import { useVersjonertTranslation } from "~/hooks/useVersjonertTranslation";

interface IProps {
  pengestøtteFraNorge: PengestøtteFraNorge;
}

export function PengestøtteFraNorgeDetaljer({
  pengestøtteFraNorge: pengestøtteFraNorgeProps,
}: IProps) {
  const {
    pengestøtteFraNorge,
    setPengestøtteFraNorge,
    setPengestøtteFraNorgeModalData,
    dokumentasjonskrav,
    setDokumentasjonskrav,
  } = useAnnenPengestøtteContext();
  const { t } = useVersjonertTranslation("annen-pengestøtte", 1);
  const pengestøtteFraNorgeModalKomponenter = lagPengestøtteFraNorgeModalKomponenter(t);

  function fjernPengestøtteFraNorge() {
    setPengestøtteFraNorge(
      pengestøtteFraNorge.filter((støtte) => støtte.id !== pengestøtteFraNorgeProps.id)
    );

    setDokumentasjonskrav(
      dokumentasjonskrav.filter(
        (krav) => !pengestøtteFraNorgeProps.dokumentasjonskrav?.includes(krav.id)
      )
    );
  }

  return (
    <Box padding="space-16" background="sunken" borderRadius="16">
      <h3 style={{ marginTop: "0" }}>
        {finnOptionLabel(
          pengestøtteFraNorgeModalKomponenter,
          hvilkenPengestøtteFraAndreEnnNavMottarDu,
          pengestøtteFraNorgeProps[hvilkenPengestøtteFraAndreEnnNavMottarDu]!
        )}
      </h3>
      <BodyShort spacing>
        {pengestøtteFraNorgeProps[hvemUtbetalerPengestøtten] && (
          <>
            {pengestøtteFraNorgeProps[hvemUtbetalerPengestøtten]?.toUpperCase()}
            <br />
          </>
        )}
        <>
          {t("detaljer.fraOgMed")}&nbsp;
          {formaterNorskDato(
            new Date(
              pengestøtteFraNorgeProps[iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavFraDato]!
            )
          )}
          {pengestøtteFraNorgeProps[
            iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato
          ] && (
            <>
              , {t("detaljer.tilOgMed")}&nbsp;
              {formaterNorskDato(
                new Date(
                  pengestøtteFraNorgeProps[
                    iHvilkenPeriodeHarDuMottattPengestøtteFraAndreEnnNavTilDato
                  ]
                )
              )}
            </>
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
            setPengestøtteFraNorgeModalData({
              operasjon: ModalOperasjon.Rediger,
              pengestøtteFraNorge: pengestøtteFraNorgeProps,
            });
          }}
        >
          {t("detaljer.endreSvar")}
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernPengestøtteFraNorge}
          icon={<TrashIcon aria-hidden />}
        >
          {t("detaljer.fjern")}
        </Button>
      </HStack>
    </Box>
  );
}
