import { redirect, type LoaderFunctionArgs } from "@remix-run/node";

export async function loader({ params }: LoaderFunctionArgs) {
  // return redirect(`/13eaa299-ad5c-432c-a207-2c796274d309`);

  if (!params.soknadId) {
    return redirect("/error");
  }

  return {};
}
