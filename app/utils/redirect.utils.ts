const UTDATERT_INGRESS_REGEX = /^\/ny-dagpenger(?:\/|$)/;
const GAMMEL_DAGPENGER_INGRESS_REGEX = /^\/gammel-dagpenger(?:\/|$)/;

export function erUtdatertIngress(request: Request): boolean {
  const { pathname } = new URL(request.url);
  return UTDATERT_INGRESS_REGEX.test(pathname);
}

export function erGammelSøknadIngress(request: Request): boolean {
  const { pathname } = new URL(request.url);
  return GAMMEL_DAGPENGER_INGRESS_REGEX.test(pathname);
}

export function redirectTilOppdatertIngress(url: URL): Response {
  const oppdatertBasePath = url.pathname.replace(UTDATERT_INGRESS_REGEX, "/dagpenger/");
  return Response.redirect(new URL(oppdatertBasePath + url.search, url.origin).toString(), 301);
}

export function redirectTilInfoside(url: URL): Response {
  return Response.redirect(
    new URL("/dagpenger/dialog/soknad/info-side", url.origin).toString(),
    302
  );
}
