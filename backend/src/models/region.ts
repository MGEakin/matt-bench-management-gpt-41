import { Database } from "sqlite";

export interface Region {
  id?: number;
  name: string;
}

export async function createRegionTable(db: Database) {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS regions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);
}

export async function getAllRegions(db: Database): Promise<Region[]> {
  return db.all<Region[]>("SELECT * FROM regions");
}
