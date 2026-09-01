import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  basename: "/dagpenger/dialog/soknad",
  future: {
    v8_middleware: false,
    v8_splitRouteModules: false,
    v8_viteEnvironmentApi: false,
    v8_passThroughRequests: false,
    v8_trailingSlashAwareDataRequests: false,
  },
} satisfies Config;
