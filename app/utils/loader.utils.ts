// Funksjon for å parse loaderData
// Returnerer et tomt objekt hvis loaderData er undefined
// Dette får å ungå loader retunerer tilbake json til client
export function parseLoaderData<T>(loaderData: T | undefined): T | undefined {
  if (!loaderData) {
    return undefined;
  }

  if (typeof loaderData === "string") {
    try {
      return JSON.parse(loaderData) as T;
    } catch {
      console.error("Klarte ikke parse loaderData");

      return undefined;
    }
  }

  return loaderData as T;
}
