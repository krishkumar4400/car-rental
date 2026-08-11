# auth-forge

A full-stack authentication system built with Next.js (App Router) and MongoDB — credentials auth, OAuth (Google/GitHub), email verification, and password reset, built mostly from scratch instead of just wiring up a library and calling it done.

## Why this exists

Most auth tutorials wrap NextAuth around a database and call it a day, which is fine if you just want auth to work but doesn't teach you anything. I wanted to understand what's actually happening — password hashing, token lifecycle, session invalidation — without reinventing OAuth, since handling authorization codes and PKCE by hand teaches you a spec, not transferable engineering. So the split here is deliberate: Auth.js handles OAuth plumbing, everything else (credentials auth, verification, reset) is hand-rolled.

## Stack

- Next.js 14/15, App Router, Server Actions for mutations
- MongoDB (native driver, no ORM) with a cached-connection-promise singleton to survive Next.js hot reload in dev
- Auth.js v5 (`next-auth@beta`) — Credentials provider with custom logic + Google/GitHub OAuth providers
- bcryptjs for password hashing
- Resend for transactional email
- Zod for input validation

## Architecture decisions worth knowing about

**bcryptjs over bcrypt** — `bcrypt` needs native bindings compiled via node-gyp, which is a recurring source of broken builds across platforms and on Vercel. `bcryptjs` is pure JS, marginally slower, zero hassle. At this scale the perf difference is irrelevant.

**Caching the connection promise, not the client** — caching just the `MongoClient` instance in dev means two requests racing during a cold start can both call `.connect()` and spin up duplicate connections. Caching the in-flight promise means the second caller just awaits the same connection.

**Verification and reset tokens are hashed before storage** — same logic as passwords. If the DB ever leaks, the tokens in it should be useless. The raw token exists only in the email link, never in the database.

**Password reset invalidates the existing session** — changing a password should kill every session tied to the old credentials, not just update the password while old JWTs stay valid. Easy detail to miss, real vulnerability if missed.

## Setup

\`\`\`bash
git clone <https://github.com/><your-username>/auth-forge.git
cd auth-forge
npm install
cp .env.example .env.local
\`\`\`

Fill in `.env.local`:

| Variable | Where to get it |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `AUTH_SECRET` | `npx auth secret` |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google Cloud Console → OAuth credentials |
| `AUTH_GITHUB_ID` / `AUTH_GITHUB_SECRET` | GitHub → Developer settings → OAuth Apps |
| `RESEND_API_KEY` | Resend dashboard |

\`\`\`bash
npm run dev
\`\`\`

## Project structure

\`\`\`
/app
  /(auth)/login, /signup, /verify-email, /forgot-password, /reset-password
  /api/auth/[...nextauth]/route.ts
/lib
  db.ts        — MongoDB connection singleton
  auth.ts      — Auth.js config
  tokens.ts    — token generation/hashing/verification
  mail.ts      — Resend client + email templates
\`\`\`

## Known limitations

- No rate limiting on login/signup yet — needed before this sees real traffic
- No account lockout after repeated failed login attempts
- Email templates are plain text, not styled HTML
- No tests yet

## License

MIT
