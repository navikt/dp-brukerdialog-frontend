import type { TypedObject } from "@portabletext/types";

export interface ISanityInfoside {
  textId: string;
  body: TypedObject | TypedObject[];
}

export interface ISanityData {
  infosider: ISanityInfoside[];
}
