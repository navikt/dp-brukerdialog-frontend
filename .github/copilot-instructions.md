# Copilot-instruksjoner for dp-brukerdialog-frontend

Dette er søknadsdialogen for dagpenger, inkludert dokumentasjon og ettersending. Les `AGENTS.md` for kommandoer, filstruktur og detaljerte arbeidsmønstre. Bruk `package.json` for deklarerte avhengighetskrav og `pnpm-lock.yaml` for låste versjoner.

## Mønstre i repoet

- React Router kjører med server-side rendering. Sider og API-ruter ligger i `app/routes/`, mens kall til backend ligger i `app/models/`. Hold serverkode på serversiden, blant annet i `*.server.ts`.
- Søknaden er delt i seksjoner under `app/seksjon/`. Følg eksisterende versjonering, komponentdefinisjoner og Zod-skjemaer; bevar oppførselen for tilbake, fortsett senere og innsending.
- Bruk auth-mønsteret i `app/utils/auth.utils.server.ts` for validering av ID-porten-token og TokenX OBO-kall til backend. Ikke flytt token eller personopplysninger til klienten eller vanlige logger.
- Bygg grensesnitt med Aksel og CSS Modules. Bruk eksisterende komponenter og Aksel-variabler før du legger til egne løsninger.
- Bruk i18next og eksisterende nøkkelstruktur for tekster. Oversettelser ligger i `app/i18n/locales/` og seksjonenes `locales/`-mapper for `nb`, `nn` og `en`.

## Avgrensning

Endre bare det oppgaven krever. Ikke gi nytt navn til variabler eller bygg om kode som allerede virker, uten at det trengs for endringen. Ikke rediger genererte filer i `.react-router/types/`.
