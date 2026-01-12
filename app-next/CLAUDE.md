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
| `make db-validate` | Validate migration files |

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

## Database Migrations

Database schema is managed via Supabase migrations in `supabase/migrations/`.

### Migration Files

Migrations are SQL files with timestamp prefixes:
```
supabase/migrations/
├── 20260109175336_initial_schema.sql
├── 20260109175700_add_users_table.sql
├── 20260109175757_add_saved_jobs_table.sql
├── 20260109181228_add_additional_fields.sql
└── 20260109181452_add_job_details_fields.sql
```

### Creating a New Migration

```bash
# Option 1: Use Supabase CLI (recommended)
supabase migration new add_feature_name

# Option 2: Manual - create file with timestamp
touch supabase/migrations/$(date +%Y%m%d%H%M%S)_add_feature_name.sql
```

### Migration Best Practices

1. **One change per migration**: Each migration should do one thing
2. **Use descriptive names**: `add_users_table`, `add_email_to_profiles`
3. **Include rollback comments**: Add commented `-- ROLLBACK:` section
4. **Test locally first**: Run `supabase db reset` to test migrations

### Applying Migrations

**Local Development:**
```bash
# Start local Supabase
supabase start

# Apply migrations
supabase db push

# Reset database (wipes data, applies all migrations + seed)
supabase db reset
```

**Production:**
Migrations are applied via Supabase Dashboard or CLI:
```bash
# Link to remote project
supabase link --project-ref <project-id>

# Push migrations to production
supabase db push
```

### Generating Types

After schema changes, regenerate TypeScript types:
```bash
supabase gen types typescript --local > lib/database.types.ts
# or from remote
supabase gen types typescript --project-id <project-id> > lib/database.types.ts
```

## Notes

- OAuth providers: Google, GitHub (configured in Supabase)
- Protected routes: /dashboard/*, /company/*
- SSR enabled for job pages (SEO)
