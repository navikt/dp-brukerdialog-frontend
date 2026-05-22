const GAMMEL_INGRESS_PREFIX = "/ny-dagpenger/dialog/soknad";
const URL_PREFIX = "/dagpenger/dialog/soknad";

export function isOutdatedBasePath(request: Request): boolean {
  const { pathname } = new URL(request.url);
  return pathname === GAMMEL_INGRESS_PREFIX || pathname.startsWith(`${GAMMEL_INGRESS_PREFIX}/`);
}

export function createUpdatedBasePath(pathname: string): string {
  return URL_PREFIX + pathname.slice(GAMMEL_INGRESS_PREFIX.length);
}

export function RedirectToUpdatedBasePath(url: URL): Response {
  return Response.redirect(
    new URL(createUpdatedBasePath(url.pathname) + url.search, url.origin).toString(),
    301
  );
}
