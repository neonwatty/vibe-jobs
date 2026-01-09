# Vibe Jobs - AI-Native Job Board

## Looper Configuration

- **App URL:** `http://localhost:3000`

## Standard Commands (via Makefile)

| Command | What It Does |
|---------|--------------|
| `make dev` | Start dev server |
| `make build` | Build for production |
| `make test` | Run unit tests |
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

## Notes

- OAuth providers: Google, GitHub (configured in Supabase)
- Protected routes: /dashboard/*, /company/*
- SSR enabled for job pages (SEO)
