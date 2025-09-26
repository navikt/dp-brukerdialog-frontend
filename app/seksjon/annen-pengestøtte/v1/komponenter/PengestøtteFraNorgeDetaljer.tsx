import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import {
  ModalOperasjonEnum,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import {
  hvemUtbetalerPengestøtten,
  hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed,
  PengestøtteFraNorgeModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.spørsmål";

interface IProps {
  pengestøtteFraNorgeSvar: PengestøtteFraNorgeModalSvar;
  pengestøtteFraNorgeSvarIndex: number;
}

export function PengestøtteFraNorgeDetaljer({
  pengestøtteFraNorgeSvar,
  pengestøtteFraNorgeSvarIndex,
}: Readonly<IProps>) {
  const { pengestøtteFraNorge, setPengestøtteFraNorge, setPengestøtteFraNorgeModalData } =
    useAnnenPengestøtteContext();

  function fjernPengestøtteFraNorge() {
    setPengestøtteFraNorge(
      pengestøtteFraNorge.filter((_, i) => i !== pengestøtteFraNorgeSvarIndex)
    );
  }

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>
        {pengestøtteFraNorgeSvar[hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm]}
      </h3>
      <BodyShort spacing>
        {pengestøtteFraNorgeSvar[hvemUtbetalerPengestøtten] && (
          <>
            {pengestøtteFraNorgeSvar[hvemUtbetalerPengestøtten]}
            <br />
          </>
        )}
        <>
          Fra og med&nbsp;
          {
            pengestøtteFraNorgeSvar[
              iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed
            ]
          }
          {pengestøtteFraNorgeSvar[
            iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed
          ] && (
            <>
              , til og med&nbsp;
              {
                pengestøtteFraNorgeSvar[
                  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed
                ]
              }
            </>
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
            setPengestøtteFraNorgeModalData({
              operasjon: ModalOperasjonEnum.Rediger,
              pengestøtteFraNorgeSvarIndex: pengestøtteFraNorgeSvarIndex,
              pengestøtteFraNorgeSvar: pengestøtteFraNorgeSvar,
            });
          }}
        >
          Endre svar
        </Button>
        <Button
          variant="tertiary"
          size="small"
          onClick={fjernPengestøtteFraNorge}
          icon={<TrashIcon title="a11y-title" fontSize="1.5rem" />}
        >
          Fjern
        </Button>
      </HStack>
    </Box>
  );
}
