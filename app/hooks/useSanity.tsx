import { useRouteLoaderData } from "react-router";
import { loader } from "~/root";
import { ISanityInfoside } from "~/sanity/sanity.types";

export function useSanity() {
  const data = useRouteLoaderData<typeof loader>("root");

  console.log(data?.sanityData);
  function hentInfosideTekst(textId: string): ISanityInfoside | undefined {
    return data?.sanityData?.infosider.find((side) => side.textId === textId);
  }

  return {
    hentInfosideTekst,
  };
}
