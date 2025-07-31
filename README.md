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
   ```sh
   cd frontend
   npm install
   ```
2. Start the frontend server:
   ```sh
   npm run dev
   ```

## Guidelines
- Next.js development: see nextjs-tailwind-instructions.md
- ExpressJS API: see expressjs-rest-apis.instructions.md

## Features
- Landing page: Table of all employees (Name, Title, Studio, Practice, Region, Location, Skill Level, Current Assignment)
- REST API: CRUD for employees
- SQLite database
