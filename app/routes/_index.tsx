import { redirect, type LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.soknadId) {
    return redirect("/error");
  }

  return {};
}
