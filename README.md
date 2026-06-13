# Rust Practice App

A single Next.js full-stack learning app for practicing Rust problems and MCQs.

## Stack

- Frontend + backend: Next.js App Router
- Auth: Google OAuth with NextAuth
- Database: PostgreSQL with Prisma
- Code execution: Judge0 API
- Question data: `bigrust/interviewQuestions.json`

## Project structure

The active app is inside `bigrust/bigrust/`.

```text
.
└── bigrust/
    ├── app/
    │   └── api/
    │       ├── auth/[...nextauth]/route.ts
    │       ├── run/route.ts
    │       ├── health/route.ts
    │       ├── problems/[id]/route.ts
    │       └── topics/
    │           ├── question-counts/route.ts
    │           └── [topic]/
    │               ├── mcqs/route.ts
    │               └── problems/route.ts
    ├── components/
    ├── lib/
    ├── prisma/
    ├── interviewQuestions.json
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    └── .env.local.example
```

## Run locally

From the repo root:

```bash
cd bigrust/bigrust
npm install
```

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Start the app:

```bash
npm run dev
```

The app runs on `http://localhost:3000`.

## Database setup

From `bigrust/bigrust`:

```bash
npm run db:generate
npm run db:migrate
```

## Environment variables

Update `bigrust/bigrust/.env.local` with at least:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

For Google OAuth, add this redirect URI in Google Cloud Console:

```text
http://localhost:3000/api/auth/callback/google
```

## Features

- Single Next.js app with integrated API routes
- Google sign-in via NextAuth
- PostgreSQL-backed Prisma user/session storage
- Rust problem and MCQ practice
- Monaco editor with Rust coding experience
- Code execution through Judge0 API
- API routes under `app/api/`

## Notes

- The backend is now fully integrated into Next.js, so there is no separate Express backend.
- Question data is stored in `bigrust/bigrust/interviewQuestions.json`.
- The runner endpoint is `app/api/run/route.ts`.
