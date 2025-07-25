import type { TypedObject } from "@portabletext/types";

export interface ISanityHelpText {
  title?: string;
  body: TypedObject | TypedObject[];
}

export interface ISanityAppText {
  textId: string;
  valueText: string;
}

export interface ISanityRichText {
  textId: string;
  body: TypedObject | TypedObject[];
}

export interface ISanityLink {
  linkId: string;
  linkText: string;
  linkUrl: string;
  linkDescription: string;
}

export interface ISanitySetting {
  settingId: string;
  settingValue: string;
}

export interface ISanityData {
  appTexts: ISanityAppText[];
  richTexts: ISanityRichText[];
  links: ISanityLink[];
  settings: ISanitySetting[];
}
