import { PencilIcon, TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Box, Button, HStack } from "@navikt/ds-react";
import {
  hvemUtbetalerPengestøtten,
  hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed,
  iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed,
  pengestøtteFraNorgeModalKomponenter,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte-norge.komponenter";
import {
  ModalOperasjon,
  useAnnenPengestøtteContext,
} from "~/seksjon/annen-pengestøtte/v1/annen-pengestøtte.context";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { finnOptionLabel } from "~/utils/seksjon.utils";
import { PengestøtteFraNorge } from "./PengestøtteFraNorgeModal";

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

  function fjernPengestøtteFraNorge() {
    setPengestøtteFraNorge(
      pengestøtteFraNorge.filter((støtte) => støtte.id !== pengestøtteFraNorgeProps.id)
    );

    setDokumentasjonskrav(
      dokumentasjonskrav.filter(
        (krav) => krav.id !== pengestøtteFraNorgeProps?.dokumentasjonskrav?.[0]
      )
    );
  }

  return (
    <Box padding="space-16" background="surface-alt-3-subtle" borderRadius="xlarge">
      <h3 style={{ marginTop: "0" }}>
        {finnOptionLabel(
          pengestøtteFraNorgeModalKomponenter,
          hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm,
          pengestøtteFraNorgeProps[hvilkePengestøtteFraAndreEnnNavMottarDuEllerHarDuSøktOm]!
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
          Fra og med&nbsp;
          {formaterNorskDato(
            new Date(
              pengestøtteFraNorgeProps[
                iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeFraOgMed
              ]!
            )
          )}
          {pengestøtteFraNorgeProps[
            iHvilkenPeriodeMottarDuEllerHarDuSøktOmPengestøtteFraNorgeTilOgMed
          ] && (
            <>
              , til og med&nbsp;
              {formaterNorskDato(
                new Date(
                  pengestøtteFraNorgeProps[
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
              pengestøtteFraNorge: pengestøtteFraNorgeProps,
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
