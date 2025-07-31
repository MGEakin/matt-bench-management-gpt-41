import { Database } from "sqlite";

export interface Location {
  id?: number;
  name: string;
}

export async function createLocationTable(db: Database) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);
}

export async function getAllLocations(db: Database): Promise<Location[]> {
  return db.all<Location[]>("SELECT * FROM locations");
}
