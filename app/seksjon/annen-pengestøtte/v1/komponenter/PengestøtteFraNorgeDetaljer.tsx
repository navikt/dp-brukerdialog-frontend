import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import {
  hvemUtbetalerPengestøtten,
  hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed,
  pengestøtteFraNorgeModalSpørsmål,
  PengestøtteFraNorgeModalSvar,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";

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
        {finnOptionLabel(
          pengestøtteFraNorgeModalSpørsmål,
          hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm,
          pengestøtteFraNorgeSvar[hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm]!
        )}
      </h3>
      <BodyShort spacing>
        {pengestøtteFraNorgeSvar[hvemUtbetalerPengestøtten] && (
          <>
            {pengestøtteFraNorgeSvar[hvemUtbetalerPengestøtten]?.toUpperCase()}
            <br />
          </>
        )}
        <>
          Fra og med&nbsp;
          {formaterNorskDato(
            new Date(
              pengestøtteFraNorgeSvar[
                iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed
              ]!
            )
          )}
          {pengestøtteFraNorgeSvar[
            iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed
          ] && (
            <>
              , til og med&nbsp;
              {formaterNorskDato(
                new Date(
                  pengestøtteFraNorgeSvar[
                    iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed
                  ]
                )
              )}
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
              operasjon: ModalOperasjon.Rediger,
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
