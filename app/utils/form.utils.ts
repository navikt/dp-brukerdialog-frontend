// Hook for å hente standardverdier fra loaderData
// Returnerer et tomt objekt hvis loaderData er undefined
export function hentFormDefaultValues<T>(loaderData: T | undefined): T | {} {
  if (!loaderData) {
    return {};
  }

  if (typeof loaderData === "string") {
    try {
      return JSON.parse(loaderData) as T;
    } catch {
      return {};
    }
  }

  return loaderData as T;
}
