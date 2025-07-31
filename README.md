<<<<<<< HEAD
# Employee Management Web Application

## Structure
- `frontend/`: Next.js (React, TypeScript, Tailwind CSS)
- `backend/`: ExpressJS REST API (TypeScript, SQLite)
- `database/`: SQLite schema and database file
- `.github/copilot-instructions.md`: Workspace instructions

## Setup

### Database
1. Create the database:
   ```sh
   sqlite3 database/employees.db < database/schema.sql
   ```

### Backend
1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
2. Start the backend server:
   ```sh
   npm run start:dev
   ```

### Frontend
1. Install dependencies:
   cd frontend
   ```
2. Start the frontend server:
   ```sh
   npm run dev
   ```

- Landing page displays a table of all employees with columns:
  - Name, Title, Studio, Practice, Region, Location, Skill Level, Current Assignment
- Uses React, TypeScript, Tailwind CSS, and Next.js App Router

## Guidelines

- Follows nextjs-tailwind-instructions.md for UI and component development.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
## Guidelines
- Next.js development: see nextjs-tailwind-instructions.md
- ExpressJS API: see expressjs-rest-apis.instructions.md

## Features
- Landing page: Table of all employees (Name, Title, Studio, Practice, Region, Location, Skill Level, Current Assignment)
- REST API: CRUD for employees
- SQLite database
=======
# matt-bench-management-gpt-41
>>>>>>> 127d71e138ef1c8faf60d3e8b5b1aef4e49c489a
