import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  basename: process.env.BASE_PATH || "/ny-dagpenger/dialog",
} satisfies Config;
