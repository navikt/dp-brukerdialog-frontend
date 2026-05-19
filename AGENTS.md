# AGENTS.md

Instructions for AI coding agents working in this repository.

## Commands

Package manager is **pnpm** (`pnpm@10.33.0`). Use `pnpm run` not `npm run`.

```bash
pnpm run build            # Production build (React Router SSR)
pnpm run dev              # Dev server with hot reload
pnpm run test             # Run tests once (vitest)
pnpm run coverage         # Tests with coverage report
pnpm run lint             # ESLint (cached)
pnpm run typecheck        # react-router typegen + tsc
```

**Pre-commit hook** (Husky) runs in full on every commit: `typecheck → test → build`.
`lint-staged` additionally runs `eslint --fix` on staged `.ts/.tsx` files.

## Stack

- **Framework:** React Router v7 (SSR-enabled, file-based routing)
- **Language:** TypeScript 5.9, strict mode
- **Bundler:** Vite 7
- **UI:** NAV Aksel design system (`@navikt/ds-react`, `@navikt/ds-css`, `@navikt/aksel-icons`)
- **Styling:** CSS Modules + Aksel CSS variables (no Tailwind)
- **Forms:** `@rvf/react-router` + `@rvf/zod` for validation
- **CMS:** Sanity (headless) for user-facing text content
- **Auth:** ID-porten + TokenX with OBO token exchange
- **Monitoring:** Grafana Faro (client), Pino (server logging)
- **Feature flags:** Unleash
- **Runtime:** Node.js 24

## Project structure

```
app/
├── routes/              # File-based React Router pages and API routes
├── components/          # Reusable UI components
│   └── spørsmål-komponent/  # Question-type components (Dato, Tall, Periode, etc.)
├── seksjon/             # Form sections (one dir per section)
│   ├── soknad.context.tsx   # React Context for form state
│   ├── personalia/
│   ├── din-situasjon/
│   ├── arbeidsforhold/
│   ├── barnetillegg/
│   └── ...              # 15 sections total
├── models/              # Server-side data loaders and actions (*.server.ts)
├── utils/               # Shared helpers (auth, env, validation, formatting)
├── hooks/               # Custom React hooks
├── sanity/              # Sanity CMS config, queries, and components
├── mocks/               # MSW mock server + mock data for local dev
├── root.tsx             # Root layout
├── routes.ts            # Route config (flatRoutes)
└── index.css            # Global styles (CSS variables)
```

### Routing conventions

File-based routing via `@react-router/fs-routes` with `flatRoutes()`:
- Pages: `$soknadId.tsx`, `$soknadId.[sectionName].tsx`
- API routes: `api.internal.isalive.ts`, `api.dokumentasjonskrav.$soknadId.*.tsx`
- Server data files: `*.server.ts` suffix — these only run on the server

### Path alias

`~/*` resolves to `./app/*`. Use it for imports:
```typescript
import { getEnv } from "~/utils/env.utils";
```

## Key patterns

### Seksjoner (form sections)

Each section lives in `app/seksjon/<name>/` and may be versioned (e.g. `v1/`, `v2/`).
A section typically contains:
- `*.komponenter.ts` — defines form fields as a `KomponentType[]` array
- `*.schema.ts` — Zod validation schema using `superRefine` + `valider()`
- Tests (`*.test.ts`)

#### Adding a new seksjon

1. Create `app/seksjon/<name>/v1/` directory
2. Create `<name>.komponenter.ts` — export field IDs as constants, a `Svar` type,
   and a `KomponentType[]` array. Also export `pdfGrunnlag` and `handling` constants.
3. Create `<name>.schema.ts` — Zod schema with `superRefine` that:
   - Skips validation for `Seksjonshandling.tilbakenavigering` and `fortsettSenere`
   - Iterates over components calling `valider(spørsmål, svar, synlig, context)`
4. Look at `verneplikt` as the simplest reference implementation

**Component types** (from `~/components/Komponent.types`):
- Questions: `envalg`, `flervalg`, `langTekst`, `kortTekst`, `dato`, `periodeFra`,
  `periodeTil`, `land`, `tall`, `nedtrekksliste`, `registeropplysning`
- Info: `informasjonskort`, `lesMer`, `dokumentasjonskravindikator`, `forklarendeTekst`

**Key utilities:**
- `valider()` from `~/utils/validering.utils` — validates individual components in the schema
- `Seksjonshandling` from `~/utils/Seksjonshandling` — enum for navigation actions
  (back/save-later skip validation)

### Loaders and actions (server-side)

Data fetching lives in `app/models/*.server.ts` using React Router loaders/actions.
These call backend services using OBO tokens:
```typescript
const onBehalfOfToken = await hentSoknadOrkestratorOboToken(request);
const response = await fetch(url, {
  headers: { Authorization: `Bearer ${onBehalfOfToken}` },
});
```

### State management

Minimal — uses React Context (`SoknadProvider`) for form submission tracking and focus
management. No Redux/Zustand. Data flows through React Router loaders/actions.

### Environment variables

Access via `getEnv("VAR_NAME")` from `~/utils/env.utils`. Works on both client
(`window.env`) and server (`process.env`). See `.env.example` for all available variables.

### Content from Sanity CMS

User-facing text comes from Sanity CMS — don't hardcode Norwegian text strings for UI
content that's managed there. Check `app/sanity/sanity.query.ts` for existing queries.

## Testing

- **Framework:** Vitest (`*.test.ts` files only)
- **Assertions:** Vitest built-in (`expect`, `toBe`, etc.)
- **Mocking:** Vitest (`vi.mock()`, `vi.mocked()`, `vi.clearAllMocks()`)
- **MSW:** Mock Service Worker for API mocking in development

Tests live alongside source files. Pattern:
```typescript
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("~/utils/env.utils");

describe("myFunction", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should do the thing", () => {
    vi.mocked(getEnv).mockReturnValue("test-value");
    expect(result).toBe(expected);
  });
});
```

## Code style

- **Formatting:** Prettier — double quotes, semicolons, trailing commas (es5), 100 char width
- **Linting:** ESLint with React, React Hooks, jsx-a11y, TypeScript, and import plugins
- **Naming:** Norwegian for domain concepts (søknad, seksjon, opplysning, barn, etc.),
  English for generic programming constructs
- **Components:** Use `@navikt/ds-react` components (Button, Modal, Alert, HStack, VStack,
  etc.) — don't use raw HTML for UI elements the design system covers
- **Icons:** Use `@navikt/aksel-icons`

## Boundaries

- **Never edit** files in `.react-router/types/` — they are auto-generated by `react-router typegen`
- **Never commit** secrets, tokens, or `.env` files
- **Do not modify** `.nais/` deployment configs without understanding the NAIS platform
- **Use Sanity CMS** for user-facing text content — don't hardcode translatable strings

## Deployment

- **Platform:** NAIS (NAV's Kubernetes on GCP)
- **Environments:** dev-gcp, prod-gcp
- **CI/CD:** GitHub Actions — merges to `main` auto-deploy to dev, then prod
- **CDN:** Static client files served from `cdn.nav.no/teamdagpenger/dp-brukerdialog-frontend/`
- **Port:** 3000

## Local development

```bash
cp .env.example .env       # Setup environment (or: pnpm run copy-env)
pnpm install
pnpm run token              # Generate local JWT token
pnpm run dev                # Start dev server
```

Set `USE_MSW=true` in `.env` to use Mock Service Worker instead of hitting real backends.
