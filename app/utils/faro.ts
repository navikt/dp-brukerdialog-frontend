import { type Faro, getWebInstrumentations, initializeFaro } from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";
import { getEnv } from "~/utils/env.utils";

let faro: Faro | null = null;

export function initFaro() {
  if (typeof document === "undefined" || faro !== null) {
    return;
  }

  return initializeFaro({
    paused: getEnv("IS_LOCALHOST") === "true",
    url: getEnv("FARO_URL"),
    app: {
      name: "dp-brukerdialog-frontend",
    },
    sessionTracking: {
      enabled: true,
      persistent: true,
    },
    instrumentations: [
      ...getWebInstrumentations({ captureConsole: true, captureConsoleDisabledLevels: [] }),

      new TracingInstrumentation({
        instrumentationOptions: {
          // Requests to these URLs have tracing headers attached.
          propagateTraceHeaderCorsUrls: [new RegExp(`${getEnv("DP_SOKNAD_ORKESTRATOR_URL")}/*`)],
        },
      }),
    ],
  });
}
