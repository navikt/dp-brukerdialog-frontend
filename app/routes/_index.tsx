import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Brukerdialog" }, { name: "description", content: "Brukerdialog" }];
};

export default function Index() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <div className="brukerdialog">
        <h1>Brukerdialog</h1>
      </div>
    </main>
  );
}
