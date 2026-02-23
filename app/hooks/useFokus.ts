import { RefObject } from "react";
type settFokusRefTypes = RefObject<HTMLElement | HTMLFieldSetElement | null>;

export function useFokus() {
  function settFokus(ref: settFokusRefTypes | null) {
    if (ref && ref.current) {
      if (typeof ref.current.focus === "function") {
        ref.current.focus();
      }
      if (typeof ref.current.scrollIntoView === "function") {
        ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  return { settFokus };
}
