# Vibe Jobs - AI-Native Job Board

A job board for AI-native professionals. Built with Next.js 15, Supabase, and Tailwind CSS 4.

## Features

- 🤖 **AI Tool Matching** - Match candidates with jobs based on AI tools proficiency
- ✅ **Verified Employers** - Domain-verified company badges
- 🧪 **Transparent Testing** - Every job shows "How You'll Be Tested"
- 🔐 **OAuth Authentication** - Sign in with Google or GitHub
- 📱 **Responsive Design** - Works on all devices

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth with OAuth
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest + Testing Library
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local
```

### Environment Variables

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Database Setup

1. Go to your Supabase project's SQL Editor
2. Run the schema from `../app/supabase/schema.sql`

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |
| `npm run validate` | Run lint, typecheck, and tests |

## CI/CD

This project uses GitHub Actions for CI/CD:

- **CI** (`ci.yml`): Runs on all PRs and pushes to main
  - Lint, Type check, Tests, Build

- **Deploy** (`deploy.yml`): Deploys to Vercel on main branch

- **Preview** (`preview.yml`): Creates preview deployments for PRs

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `VERCEL_TOKEN` | Vercel API token |
| `VERCEL_ORG_ID` | Vercel organization ID |
| `VERCEL_PROJECT_ID` | Vercel project ID |

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
├── contexts/              # React contexts
├── hooks/                 # Custom hooks
├── lib/                   # Utilities and Supabase clients
├── __tests__/            # Test files
└── .github/workflows/    # CI/CD workflows
```

## License

MIT
