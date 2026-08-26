import { redirect } from "react-router";
import {
  ArbeidssøkerStatus,
  hentArbeidssøkerStatus,
} from "~/models/hent-arbeidssøkerStatus.server";
import { ArbeidssøkerView } from "~/seksjon/arbeidssøker/ArbeidssøkerView";
import { Route } from "./+types/arbeidssoker";

type LoaderData = {
  arbeidssøkerStatus: ArbeidssøkerStatus;
};

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderData | Response> {
  const arbeidssøkerStatus = await hentArbeidssøkerStatus(request);

  if (arbeidssøkerStatus === "REGISTRERT") {
    return redirect("/opprett-soknad");
  }

  return { arbeidssøkerStatus };
}

export default function ArbeidssokerSide() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <ArbeidssøkerView />
    </main>
  );
}
