import { getEnv } from "~/utils/env.utils";
import { createClient } from "@sanity/client";

const sanityConfig = {
  dataset: getEnv("SANITY_DATASET"),
  projectId: "rt6o382n",
  useCdn: true,
  token: "",
  apiVersion: "2022-03-07",
};

export const sanityClient = createClient(sanityConfig);
