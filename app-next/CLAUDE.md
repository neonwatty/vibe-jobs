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

## Secrets Management (Doppler)

This project uses [Doppler](https://doppler.com) for secrets management. No secrets are stored locally.

**Setup:**
```bash
# One-time setup (if not already configured)
doppler login
doppler setup --project vibe-jobs --config dev
```

**Environment Variables (managed in Doppler):**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key (public)
- `NEXT_PUBLIC_SITE_URL` - Site URL for OAuth redirects
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key (admin operations)

The Makefile commands automatically use `doppler run` to inject secrets.

## Test Accounts (E2E Testing)

These accounts are created via `supabase/seed.sql` for E2E testing:

| Role | Email | Password |
|------|-------|----------|
| Employer | test-employer@aistartup.com | password123 |
| Employee | alex.chen@example.com | password123 |

**Note:** Run `supabase db reset` to seed the database with test data.

## Notes

- OAuth providers: Google, GitHub (configured in Supabase)
- Protected routes: /dashboard/*, /company/*
- SSR enabled for job pages (SEO)
