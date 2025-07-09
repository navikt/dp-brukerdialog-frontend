import { redirect, type LoaderFunctionArgs } from "react-router";
import { getEnv } from "~/utils/env.utils";

export async function loader({ params }: LoaderFunctionArgs) {
  const prod = getEnv("APP_ENV") === "prod";

  if (prod) {
    return redirect("/prepod");
  }

  return redirect(`/opprett-soknad`);
  // if (!params.soknadId) {
  //   return redirect("/error");
  // }

  // return {};
}
