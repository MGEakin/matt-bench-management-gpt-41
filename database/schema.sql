-- SQLite schema for employees table
CREATE TABLE IF NOT EXISTS employees (
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
