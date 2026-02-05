import { BodyShort } from "@navikt/ds-react";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { formaterNorskDatoMedKlokkeslett } from "~/utils/formatering.utils";

export function SistOppdatert() {
  const { sistOppdatert } = useTypedRouteLoaderData("routes/$soknadId");

  if (!sistOppdatert) {
    return null;
  }

  return (
    <BodyShort textColor="subtle" size="small">
      {`Sist lagret: ${formaterNorskDatoMedKlokkeslett(sistOppdatert)}`}
    </BodyShort>
  );
}
