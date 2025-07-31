# Backend - Employee Management API

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Create the SQLite database:
   ```sh
   sqlite3 ../database/employees.db < ../database/schema.sql
   ```
3. Start the server:
   ```sh
   npm run start:dev
   ```

## Scripts
- `npm run start:dev`: Start server with ts-node

## API Endpoints
- `GET /api/employees`: List all employees
- `POST /api/employees`: Add a new employee

## Environment
- Configure port in `.env` file

## Guidelines
- Follows expressjs-rest-apis.instructions.md for API design and implementation.
