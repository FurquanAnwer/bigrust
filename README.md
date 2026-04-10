# Rust Practice App

A minimal full-stack web app for practicing Rust coding problems.

## Stack

- Frontend: Next.js (App Router), React, Tailwind CSS, Monaco Editor
- Backend: Node.js, Express
- Code execution: Judge0 API

## Project structure

```text
.
├── backend
│   ├── package.json
│   └── src
│       └── index.js
└── frontend
    ├── app
    ├── components
    ├── lib
    └── package.json
```

## Run locally

### 1. Install dependencies

```bash
cd backend
npm install
```

```bash
cd frontend
npm install
```

### 2. Configure environment variables

Backend:

```bash
cd backend
cp .env.example .env
```

Frontend:

```bash
cd frontend
cp .env.local.example .env.local
```

The defaults already point to a local backend and the public Judge0 CE API.

If you want to use RapidAPI-hosted Judge0 instead, set `JUDGE0_API_URL`, `JUDGE0_API_KEY`, and `JUDGE0_API_HOST` in `backend/.env`.

### 3. Start the backend

```bash
cd backend
npm run dev
```

Backend runs on `http://localhost:4000`.

### 4. Start the frontend

```bash
cd frontend
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Features

- Hardcoded Rust practice problems
- Problem list and detail pages
- Monaco editor with Rust mode
- Run button wired to the backend
- Console-style output for `stdout`, `stderr`, and compile errors
- Loading state and basic error handling

## Notes

- No authentication
- No database
- Problems are stored in `frontend/lib/problems.ts`
- The backend exposes `POST /run`

