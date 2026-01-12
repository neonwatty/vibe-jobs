# Vibe Jobs - AI-Native Job Board

## Looper Configuration

- **App URL:** `http://localhost:3000`

## Standard Commands (via Makefile)

| Command | What It Does |
|---------|--------------|
| `make dev` | Start dev server |
| `make build` | Build for production |
| `make test` | Run unit tests |
| `make test-e2e` | Run Playwright E2E tests |
| `make test-e2e-ui` | Run E2E tests with Playwright UI |
| `make test-e2e-headed` | Run E2E tests in headed browser |
| `make lint` | Run ESLint |
| `make knip` | Find dead code/unused exports |
| `make typecheck` | TypeScript check |
| `make check` | All checks (lint, knip, typecheck, test, build) |
| `make validate` | Run all checks (alias for check) |

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth with OAuth
- **Testing:** Vitest + Playwright
- **Dead Code:** knip

## Project Structure

```
app-next/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── auth/              # Auth callback route
│   ├── dashboard/         # Employee dashboard
│   ├── company/           # Employer dashboard
│   ├── jobs/              # Job listings and details
│   └── layout.tsx         # Root layout
├── components/            # React components
├── contexts/              # React contexts (AuthContext)
├── hooks/                 # Custom hooks
├── lib/                   # Utilities and Supabase clients
│   └── supabase/          # client.ts, server.ts
├── __tests__/             # Test files
├── e2e/                   # Playwright E2E tests
└── .github/workflows/     # CI/CD workflows
```

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Test Accounts (E2E Testing)

These accounts are created in Supabase for E2E testing:

| Role | Email | Password |
|------|-------|----------|
| Employer | test-employer@aistartup.com | password123 |
| Employee | test-employee@example.com | password123 |

**Note:** These are test accounts for the production Supabase instance. Do not use for real data.

## Secrets Management (Doppler)

This project uses [Doppler](https://doppler.com) for secrets management.

### Local Development

```bash
# Run commands with Doppler-injected secrets
doppler run -- npm run dev
doppler run -- npm run test:e2e
```

### CI/CD Integration

E2E tests run in GitHub Actions using Doppler to inject secrets.

**Required GitHub Secrets:**
- `DOPPLER_TOKEN` - Service token for CI (create with `doppler configs tokens create ci-token --config dev`)

**Setup Steps:**
1. Create a Doppler service token: `doppler configs tokens create ci-token --config dev`
2. Add `DOPPLER_TOKEN` to GitHub repo secrets (Settings → Secrets → Actions)
3. E2E tests will automatically run on PRs when the token is available

## Notes

- OAuth providers: Google, GitHub (configured in Supabase)
- Protected routes: /dashboard/*, /company/*
- SSR enabled for job pages (SEO)
