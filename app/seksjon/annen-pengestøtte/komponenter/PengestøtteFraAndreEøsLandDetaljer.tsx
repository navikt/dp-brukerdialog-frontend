import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import {
  fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte, fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed,
  hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed,
  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed,
  PengestøtteFraAndreEøsLandModalSvar,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte-eøs.spørsmål";
import {
  ModalOperasjonEnum,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/annen-pengestøtte.context";

interface IProps {
  pengestøtteFraAndreEøsLandSvar: PengestøtteFraAndreEøsLandModalSvar;
  pengestøtteFraAndreEøsLandSvarIndex: number;
}

export function PengestøtteFraAndreEøsLandDetaljer({
  pengestøtteFraAndreEøsLandSvar,
  pengestøtteFraAndreEøsLandSvarIndex,
}: Readonly<IProps>) {
  const {
    pengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLand,
    setPengestøtteFraAndreEøsLandModalData,
  } = useAnnenPengestøtteContext();

  function fjernPengestøtteFraAndreEøsLand() {
    setPengestøtteFraAndreEøsLand(
      pengestøtteFraAndreEøsLand.filter((_, i) => i !== pengestøtteFraAndreEøsLandSvarIndex)
    );
  }

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>
        {pengestøtteFraAndreEøsLandSvar[hvilkenPengestøtteHarDuMottattEllerSøktOmFraAndreEøsLand]}
      </h3>
      <BodyShort spacing>
        {pengestøtteFraAndreEøsLandSvar[fraHvilketEøsLandHarDuMottattEllerSøktOmPengestøtte]}
        <br />
        {pengestøtteFraAndreEøsLandSvar[
          iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed
        ] &&
          pengestøtteFraAndreEøsLandSvar[
            iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed
          ] && (
            <>
              Mottatt fra og med&nbsp;
              {
                pengestøtteFraAndreEøsLandSvar[
                  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandFraOgMed
                ]
              }
              , til og med&nbsp;
              {
                pengestøtteFraAndreEøsLandSvar[
                  iHvilkenPeriodeHarDuMottattEllerSøktOmPengestøtteFraAndreEøsLandTilOgMed
                ]
              }
            </>
          )}
        {pengestøtteFraAndreEøsLandSvar[fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed] && (
          <>
          Motatt fra og med {pengestøtteFraAndreEøsLandSvar[fraNårHarDuMottattPengestøtteFraAndreEøsLandFraOgMed]}
          </>
        )}
      </BodyShort>
      <HStack gap="4">
        <Button
          type="button"
          variant="secondary"
          size="small"
          icon={<PencilIcon title="a11y-title" fontSize="1.5rem" />}
          onClick={() => {
            setPengestøtteFraAndreEøsLandModalData({
              operasjon: ModalOperasjonEnum.Rediger,
              pengestøtteFraAndreEøsLandSvarIndex: pengestøtteFraAndreEøsLandSvarIndex,
              pengestøtteFraAndreEøsLandSvar: pengestøtteFraAndreEøsLandSvar,
            });
          }}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernPengestøtteFraAndreEøsLand}
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box>
  );
}
