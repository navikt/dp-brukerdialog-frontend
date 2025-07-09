import type { SetupServerApi } from "msw/node";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";

export const server = setupServer(...handlers);
export const setup = () => setupServer(...handlers) as SetupServerApi;

export async function startMockServer() {
  const server = setupServer(...handlers);
  server.listen({ onUnhandledRequest: "bypass" });

  process.once("SIGINT", () => server.close());
  process.once("SIGTERM", () => server.close());
  console.info("🔶 Mock server running");
}