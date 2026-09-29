import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  basename: "/dagpenger/dialog/soknad",
  allowedActionOrigins: ["**.nav.no", "arbeid.intern.dev.nav.no", "arbeid.ansatt.dev.nav.no"],
} satisfies Config;
