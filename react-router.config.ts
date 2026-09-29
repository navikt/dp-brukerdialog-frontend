import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  basename: "/dagpenger/dialog/soknad",
  routeDiscovery: { mode: "initial" },
} satisfies Config;
