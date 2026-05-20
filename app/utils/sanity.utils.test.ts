import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import type { TypedObject } from "@portabletext/types";
import { toHTML } from "@portabletext/to-html";
import { portableTextToKomponenter } from "./sanity.utils";

vi.mock("@portabletext/to-html", () => ({
  toHTML: vi.fn(),
}));

const mockedToHTML = vi.mocked(toHTML);

describe("sanity.utils", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("portableTextToKomponenter", () => {
    it("skal konvertere readMore til lesMer-komponent", () => {
      const readMoreBody = [
        {
          _type: "block",
          _key: "body1",
        },
      ] as TypedObject[];

      const block = {
        _type: "readMore",
        _key: "readMore1",
        title: "Les mer om dette",
        body: readMoreBody,
      } as unknown as TypedObject;

      mockedToHTML.mockReturnValue("<p>Dette er mer informasjon</p>");

      const komponenter = portableTextToKomponenter(block);

      expect(komponenter).toEqual([
        {
          id: "readMore1",
          type: "lesMer",
          label: "Les mer om dette",
          description: "<p>Dette er mer informasjon</p>",
        },
      ]);

      expect(mockedToHTML).toHaveBeenCalledWith(readMoreBody);
    });

    it("skal returnere tom liste dersom html er tom paragraf", () => {
      const block = {
        _type: "block",
        _key: "tom1",
      } as TypedObject;

      mockedToHTML.mockReturnValue("<p></p>");

      const komponenter = portableTextToKomponenter(block);

      expect(komponenter).toEqual([]);
    });

    it("skal konvertere heading til headingTekst", () => {
      const block = {
        _type: "block",
        _key: "heading1",
      } as TypedObject;

      mockedToHTML.mockReturnValue("<h2>Min overskrift</h2>");

      const komponenter = portableTextToKomponenter(block);

      expect(komponenter).toEqual([
        {
          id: "heading1",
          type: "headingTekst",
          label: "Min overskrift",
          størrelse: "medium",
          nivå: "2",
        },
      ]);
    });

    it("skal fjerne html-tags fra heading-label", () => {
      const block = {
        _type: "block",
        _key: "heading1",
      } as TypedObject;

      mockedToHTML.mockReturnValue("<h2><strong>Min overskrift</strong></h2>");

      const komponenter = portableTextToKomponenter(block);

      expect(komponenter[0]).toMatchObject({
        id: "heading1",
        type: "headingTekst",
        label: "Min overskrift",
      });
    });

    it("skal konvertere vanlig tekst til forklarendeTekst", () => {
      const block = {
        _type: "block",
        _key: "tekst1",
      } as TypedObject;

      mockedToHTML.mockReturnValue("<p>Dette er en forklarende tekst</p>");

      const komponenter = portableTextToKomponenter(block);

      expect(komponenter).toEqual([
        {
          id: "tekst1",
          type: "forklarendeTekst",
          label: "<p>Dette er en forklarende tekst</p>",
        },
      ]);

      expect(mockedToHTML).toHaveBeenCalledWith([block]);
    });

    it("skal konvertere ol til ul", () => {
      const block = {
        _type: "block",
        _key: "liste1",
      } as TypedObject;

      mockedToHTML.mockReturnValue("<ol><li>Punkt 1</li></ol>");

      const komponenter = portableTextToKomponenter(block);

      expect(komponenter).toEqual([
        {
          id: "liste1",
          type: "forklarendeTekst",
          label: "<ul><li>Punkt 1</li></ul>",
        },
      ]);
    });

    it("skal håndtere flere blokker", () => {
      const blocks = [
        {
          _type: "block",
          _key: "tekst1",
        },
        {
          _type: "block",
          _key: "tekst2",
        },
      ] as TypedObject[];

      mockedToHTML
        .mockReturnValueOnce("<p>Første tekst</p>")
        .mockReturnValueOnce("<p>Andre tekst</p>");

      const komponenter = portableTextToKomponenter(blocks);

      expect(komponenter).toEqual([
        {
          id: "tekst1",
          type: "forklarendeTekst",
          label: "<p>Første tekst</p>",
        },
        {
          id: "tekst2",
          type: "forklarendeTekst",
          label: "<p>Andre tekst</p>",
        },
      ]);
    });

    it("skal bruke crypto.randomUUID dersom block mangler _key", () => {
      vi.stubGlobal("crypto", {
        randomUUID: vi.fn().mockReturnValue("random-id"),
      });

      const block = {
        _type: "block",
      } as TypedObject;

      mockedToHTML.mockReturnValue("<p>Tekst uten key</p>");

      const komponenter = portableTextToKomponenter(block);

      expect(komponenter[0]).toMatchObject({
        id: "random-id",
        type: "forklarendeTekst",
        label: "<p>Tekst uten key</p>",
      });
    });
  });
});
