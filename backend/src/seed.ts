import { openDb } from './db';

async function seed() {
  const db = await openDb();

  // Drop and recreate tables to ensure schema is correct
  await db.exec(`
    DROP TABLE IF EXISTS employees;
    DROP TABLE IF EXISTS practices;
    DROP TABLE IF EXISTS studios;
    DROP TABLE IF EXISTS regions;
    DROP TABLE IF EXISTS locations;
    CREATE TABLE studios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );
    CREATE TABLE practices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      studio TEXT NOT NULL
    );
    CREATE TABLE regions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );
    CREATE TABLE locations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    );
    CREATE TABLE employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      studio TEXT NOT NULL,
      practice TEXT NOT NULL,
      region TEXT NOT NULL,
      location TEXT NOT NULL,
      skill_level TEXT NOT NULL,
      current_assignment TEXT
    );
  `);
  // Seed Studios
  const studios = [
    { name: "Modern Software Development" },
    { name: "Cloud" },
    { name: "Data" },
  ];
  for (const studio of studios) {
    await db.run(
      "INSERT OR IGNORE INTO studios (name) VALUES (?)",
      studio.name
    );
  }

  // Seed Practices
  const practices = [
    { name: "Development", studio: "Modern Software Development" },
    { name: "Testing", studio: "Modern Software Development" },
    { name: "DevOps", studio: "Modern Software Development" },
    { name: "SRE", studio: "Modern Software Development" },
    { name: "Architecture", studio: "Modern Software Development" },
    { name: "Cloud", studio: "Cloud" },
    { name: "Data", studio: "Data" },
  ];
  for (const practice of practices) {
    await db.run(
      "INSERT OR IGNORE INTO practices (name, studio) VALUES (?, ?)",
      practice.name,
      practice.studio
    );
  }

  // Seed Employees: ensure at least one consultant in each Studio-Practice combination
  const regions = ["Global", "North America", "Europe", "Asia"];
  const locations = ["Remote", "New York", "London", "Tokyo"];
  for (const region of regions) {
    await db.run("INSERT OR IGNORE INTO regions (name) VALUES (?)", region);
  }
  for (const location of locations) {
    await db.run("INSERT OR IGNORE INTO locations (name) VALUES (?)", location);
  }
  for (const [i, practice] of practices.entries()) {
    const count = await db.get(
      "SELECT COUNT(*) as cnt FROM employees WHERE studio = ? AND practice = ?",
      practice.studio,
      practice.name
    );
    if (count.cnt === 0) {
      // Assign region/location in round-robin for demo
      const region = regions[i % regions.length];
      const location = locations[i % locations.length];
      await db.run(
        "INSERT INTO employees (name, title, studio, practice, region, location, skill_level, current_assignment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        "Consultant for " + practice.studio + " - " + practice.name,
        "Consultant",
        practice.studio,
        practice.name,
        region,
        location,
        "Mid",
        "Assigned to " + practice.name
      );
    }
  }
}

seed().then(() => {
  console.log("Database seeded successfully.");
  process.exit(0);
}).catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
