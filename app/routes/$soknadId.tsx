import { Outlet } from "react-router";

export default function DinInntekt() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <Outlet />
    </main>
  );
}
