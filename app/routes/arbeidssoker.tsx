import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTypedRouteLoaderData } from "~/hooks/useTypedRouteLoaderData";
import { ArbeidssøkerView } from "~/seksjon/arbeidssøker/ArbeidssøkerView";

export default function ArbeidssokerSide() {
  const navigate = useNavigate();
  const { arbeidssøkerStatus } = useTypedRouteLoaderData("root");

  useEffect(() => {
    if (arbeidssøkerStatus === "REGISTRERT") {
      navigate("/opprett-soknad", { replace: true });
    }
  }, [arbeidssøkerStatus, navigate]);

  return (
    <main id="maincontent" tabIndex={-1}>
      <ArbeidssøkerView />
    </main>
  );
}
