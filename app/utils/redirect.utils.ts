const UTDAGERT_INGRESS_PREFIX = "ny-dagpenger";
const GAMMEL_SØKNAD_INGRESS_PREFIX = "gammel-dagpenger";
export const GAMMEL_SØKNAD_REDIRECT_URL = "/dagpenger/dialog/soknad/info-side";

const NY_DAGPENGER_REGEX = new RegExp(`^/${UTDAGERT_INGRESS_PREFIX}(?:/|$)`);
const GAMMEL_DAGPENGER_REGEX = new RegExp(`^/${GAMMEL_SØKNAD_INGRESS_PREFIX}(?:/|$)`);

export function erUtdatertBasePath(request: Request): boolean {
  const { pathname } = new URL(request.url);
  return NY_DAGPENGER_REGEX.test(pathname);
}

export function erGammelSøknadBasePath(request: Request): boolean {
  const { pathname } = new URL(request.url);
  return GAMMEL_DAGPENGER_REGEX.test(pathname);
}

export function redirectTilOppdatertIngress(url: URL): Response {
  const erRotPath = /^\/ny-dagpenger\/?$/.test(url.pathname);
  const oppdatertBasePath = erRotPath
    ? "/dagpenger/dialog/soknad/"
    : url.pathname.replace(NY_DAGPENGER_REGEX, "/dagpenger/");
  return Response.redirect(new URL(oppdatertBasePath + url.search, url.origin).toString(), 301);
}

export function redirectTilInfoside(url: URL): Response {
  return Response.redirect(new URL(GAMMEL_SØKNAD_REDIRECT_URL, url.origin).toString(), 302);
}
