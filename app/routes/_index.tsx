import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getEnv } from "~/utils/env.utils";

export async function loader({ params }: LoaderFunctionArgs) {
  const prod = getEnv("APP_ENV") === "prod";

  if (prod) {
    return redirect("/prepod");
  }

  return redirect(`/13eaa299-ad5c-432c-a207-2c796274d309`);
  // if (!params.soknadId) {
  //   return redirect("/error");
  // }

  // return {};
}
