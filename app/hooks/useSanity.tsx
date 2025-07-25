import type { TypedObject } from "@portabletext/types";
import { useRouteLoaderData } from "react-router";
import type {
  ISanityAppText,
  ISanityLink,
  ISanityRichText,
  ISanitySetting,
} from "~/sanity/sanity.types";

export function useSanity() {
  const { sanityData } = useRouteLoaderData("root");

  function getAppText(textId: string): string {
    return (
      sanityData?.appTexts.find((appTexts: ISanityAppText) => appTexts.textId === textId)
        ?.valueText || textId
    );
  }

  function getRichText(textId: string): TypedObject | TypedObject[] {
    const richText = sanityData?.richTexts?.find((richText: ISanityRichText) => {
      return richText.textId === textId;
    });

    return richText?.body as TypedObject | TypedObject[];
  }

  function getLink(linkId: string): ISanityLink {
    const link = sanityData?.links?.find((link: ISanityLink) => link.linkId === linkId) || {
      linkId: linkId,
      linkText: linkId,
      linkUrl: "",
      linkDescription: undefined,
    };

    return link as ISanityLink;
  }

  function getSetting(settingId: string): string | undefined {
    return sanityData?.settings?.find((setting: ISanitySetting) => setting.settingId === settingId)
      ?.settingValue;
  }

  return {
    getAppText,
    getRichText,
    getLink,
    getSetting,
  };
}
