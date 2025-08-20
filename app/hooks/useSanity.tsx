import { useRouteLoaderData } from "react-router";
import { loader } from "~/root";
import { SanityInfoside } from "~/sanity/sanity.types";

export function useSanity() {
  const data = useRouteLoaderData<typeof loader>("root");

  if (!data?.sanityData) {
    console.error("useSanity", "Sanity data er ikke tilgjengelig");
  }

  function hentInfosideTekst(textId: string): SanityInfoside | undefined {
    return data?.sanityData?.infosider.find((side) => side.textId === textId);
  }

  return {
    hentInfosideTekst,
  };
}
