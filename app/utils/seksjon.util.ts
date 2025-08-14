// Hook for å hente standardverdier fra loaderData
// Returnerer et tomt objekt hvis loaderData er undefined
export function hentDefaultValues<T>(loaderData: unknown): T | {} {
  if (!loaderData) {
    return {};
  }

  if (typeof loaderData === "object") {
    return loaderData as T;
  }

  try {
    return JSON.parse(loaderData.toString()) as T;
  } catch {
    return {};
  }
}
