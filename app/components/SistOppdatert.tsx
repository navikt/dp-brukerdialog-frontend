import { BodyShort } from "@navikt/ds-react";
import { useTranslation } from "react-i18next";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { formaterNorskDatoMedKlokkeslett } from "~/utils/formatering.utils";

export function SistOppdatert() {
  const { sistOppdatert } = useTypedRouteLoaderData("routes/$soknadId");
  const { t } = useTranslation("common");

  if (!sistOppdatert) {
    return null;
  }

  return (
    <BodyShort textColor="subtle" size="small">
      {t("sistOppdatert", { dato: formaterNorskDatoMedKlokkeslett(sistOppdatert) })}
    </BodyShort>
  );
}
