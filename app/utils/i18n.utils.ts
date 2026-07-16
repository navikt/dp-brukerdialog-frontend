export function fallbackT(key: string): string {
  console.warn("Mangler oversettelse for nøkkelen:", key);
  return key;
}
