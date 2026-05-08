import { redirect } from "react-router";

export async function loader() {
  // Det kan hende at /start-soknad fortsatt finnes på nav.no eller andre steder.
  // Videresend brukeren til opprett-søknad.
  return redirect("/opprett-soknad");
}
