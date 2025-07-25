import { Outlet } from "react-router";
import { SoknadIkon } from "~/components/illustrasjon/soknadIkon";

export default function SoknadIdIndex() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="soknad-header">
        <SoknadIkon />
        <h1>Søknad om dagpenger </h1>
      </div>
      <Outlet />
    </main>
  );
}
