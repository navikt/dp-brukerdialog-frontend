export function useFokus() {
  function settFokus(ref: any) {
    ref.current?.focus({ preventScroll: true });
    ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return { settFokus };
}
