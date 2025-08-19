import { useRouteLoaderData } from "react-router";
import { loader } from "~/root";
import { SanityInfoside } from "~/sanity/sanity.types";

export function useSanity() {
  const data = useRouteLoaderData<typeof loader>("root");

  console.log(data?.sanityData);
  function hentInfosideTekst(textId: string): SanityInfoside | undefined {
    return data?.sanityData?.infosider.find((side) => side.textId === textId);
  }

  return {
    hentInfosideTekst,
  };
}
