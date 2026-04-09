import { toHTML } from "@portabletext/to-html";
import { TypedObject } from "@portabletext/types";
import { KomponentType } from "~/components/Komponent.types";
import { IReadMoreProps } from "~/sanity/components/SanityReadMore";

export function portableTextToKomponenter(body: TypedObject | TypedObject[]): KomponentType[] {
  const blocks = Array.isArray(body) ? body : [body];

  return blocks.flatMap((block): KomponentType[] => {
    const id = block._key ?? crypto.randomUUID();

    if (block._type === "readMore") {
      const { title, body: readMoreBody } = block as unknown as IReadMoreProps;
      return [
        {
          id,
          type: "lesMer",
          label: title,
          description: toHTML(readMoreBody as Parameters<typeof toHTML>[0]),
        },
      ];
    }

    const html = toHTML([block]);
    if (html === "<p></p>") {
      return [];
    }

    const headingMatch = html.match(/^<h([1-6])[^>]*>([\s\S]*?)<\/h[1-6]>$/);
    if (headingMatch) {
      return [
        {
          id,
          type: "headingTekst",
          label: headingMatch[2].replace(/<[^>]+>/g, ""),
          size: "medium",
          nivå: headingMatch[1] as "1" | "2" | "3",
        },
      ];
    }

    return [{ id, type: "forklarendeTekst", label: html }];
  });
}
