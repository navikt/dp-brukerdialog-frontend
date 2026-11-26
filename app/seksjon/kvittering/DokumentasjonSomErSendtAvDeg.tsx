import { LinkCard } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { getEnv } from "~/utils/env.utils";
import { formaterNorskDato } from "~/utils/formatering.utils";
import { Dokumentasjonskrav } from "../dokumentasjon/dokumentasjon.types";

interface IProps {
  dokumentasjonskrav: Dokumentasjonskrav;
}

export function DokumentasjonskravSomErSendtAvDeg({ dokumentasjonskrav }: IProps) {
  const { t } = useTranslation("kvittering");
  return (
    <LinkCard>
      <LinkCard.Title>
        {dokumentasjonskrav.bundle?.filsti ? (
          <LinkCard.Anchor
            href={`${getEnv("BASE_PATH")}/api/dokumentasjonskrav/vis-fil?${new URLSearchParams({
              filsti: dokumentasjonskrav.bundle.filsti,
            })}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dokumentasjonskrav.tittel}
          </LinkCard.Anchor>
        ) : (
          dokumentasjonskrav.tittel
        )}
      </LinkCard.Title>
      <LinkCard.Description>
        {dokumentasjonskrav.bundle?.tidspunkt &&
          t("dokumenter.sendtAvDeg", {
            dato: formaterNorskDato(new Date(dokumentasjonskrav.bundle.tidspunkt)),
          })}
      </LinkCard.Description>
    </LinkCard>
  );
}
