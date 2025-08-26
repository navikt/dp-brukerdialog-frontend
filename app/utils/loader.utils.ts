// Hook for å hente standardverdier fra loaderData
// Returnerer et tomt objekt hvis loaderData er undefined
export function parseLoaderData<T>(loaderData: T | undefined): T | undefined {
  if (!loaderData) {
    return undefined;
  }

  if (typeof loaderData === "string") {
    try {
      return JSON.parse(loaderData) as T;
    } catch {
      return undefined;
    }
  }

  return loaderData as T;
}
