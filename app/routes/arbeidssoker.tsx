import { redirect } from "react-router";
import {
  hentArbeidssøkerperioder,
  IArbeidssokerperioder,
} from "~/models/hent-arbeidssøkerperioder.server";
import { Arbeidssøker } from "~/seksjon/arbeidssøker/Arbeidssøker";
import { Route } from "./+types/arbeidssoker";

type LoaderData = {
  status: "UNREGISTERED" | "ERROR";
};

export const SEKSJON_TITTEL = "Søknad om dagpenger: Arbeidssøker";

export async function loader({ request }: Route.LoaderArgs): Promise<LoaderData | Response> {
  const response = await hentArbeidssøkerperioder(request);

  if (!response.ok) {
    return { status: "ERROR" };
  }

  const perioder: IArbeidssokerperioder[] = await response.json();
  const erRegistrert = perioder.some((periode) => periode.avsluttet === null);

  if (erRegistrert) {
    return redirect("/opprett-soknad");
  }

  return { status: "UNREGISTERED" };
}

export default function ArbeidssokerSide() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <Arbeidssøker />
    </main>
  );
}
