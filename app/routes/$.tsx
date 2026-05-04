// $.tsx er React Router sin splat-rute som fanger alle URL-er som ikke matcher noen annen rute,
// og kaster 404, som root ErrorBoundary håndterer som en ikke-funnet-feil.
export function loader() {
  throw new Response("Siden du leter etter finnes ikke.", {
    status: 404,
    statusText: "Beklager, vi fant ikke siden",
  });
}

export default function CatchAll() {
  return null;
}
