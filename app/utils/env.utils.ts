declare global {
  interface Window {
    env: IEnv;
  }
}

export type IEnv = {
  USE_MSW: string;
  APP_ENV: string;
  NAIS_CLUSTER_NAME: string;
  IS_LOCALHOST: string;
  DEKORATOR_ENV: string;
  SANITY_DATASET: string;
  DP_SOKNAD_ORKESTRATOR_TOKEN: string;
  DP_SOKNAD_ORKESTRATOR_URL: string;
  DP_MELLOMLAGRING_TOKEN: string;
  DP_MELLOMLAGRING_URL: string;
  DP_MINE_DAGPENGER_URL: string;
  ARBEIDSSOKERREGISTERET_URL: string;
  ARBEIDSSOKERREGISTERET_TOKEN: string;
  FARO_URL: string;
};

export function getEnv(value: keyof IEnv) {
  const env = typeof window !== "undefined" ? window.env : process.env;

  return env[value] || "";
}
