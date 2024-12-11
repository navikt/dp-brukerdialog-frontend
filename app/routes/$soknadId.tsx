import { Outlet } from "@remix-run/react";

export default function DinInntekt() {
  return (
    <main id="maincontent" tabIndex={-1}>
      <Outlet />
    </main>
  );
}
