export function useFokus<T extends HTMLElement | null = HTMLElement | null>() {
  function settFokus(ref: React.RefObject<T>) {
    ref.current?.focus({ preventScroll: true });
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  return { settFokus };
}
