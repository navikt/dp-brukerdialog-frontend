import type { TypedObject } from "@portabletext/types";

export type SanityInfoside = {
  textId: string;
  body: TypedObject | TypedObject[];
};

export type SanityData = {
  infosider: SanityInfoside[];
};
