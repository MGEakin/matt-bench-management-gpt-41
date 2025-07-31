import express from 'express';
import { body, validationResult } from 'express-validator';
import { openDb } from '../db';
import { Employee } from '../models/employee';

const router = express.Router();

// GET all employees
import { Request, Response } from 'express';


// GET all employees with optional filtering
router.get('/', async (req: Request, res: Response) => {
  const db = await openDb();
  const { name, title, studio, practice, region, location, skill_level, current_assignment } = req.query;
  let query = 'SELECT * FROM employees WHERE 1=1';
  const params: any[] = [];
  if (name) { query += ' AND name LIKE ?'; params.push(`%${name}%`); }
  if (title) { query += ' AND title LIKE ?'; params.push(`%${title}%`); }
  if (studio) { query += ' AND studio LIKE ?'; params.push(`%${studio}%`); }
  if (practice) { query += ' AND practice LIKE ?'; params.push(`%${practice}%`); }
  if (region) { query += ' AND region LIKE ?'; params.push(`%${region}%`); }
  if (location) { query += ' AND location LIKE ?'; params.push(`%${location}%`); }
  if (skill_level) { query += ' AND skill_level LIKE ?'; params.push(`%${skill_level}%`); }
  if (current_assignment) { query += ' AND current_assignment LIKE ?'; params.push(`%${current_assignment}%`); }
  const employees = await db.all<Employee[]>(query, params);
  res.json(employees);
});

// GET employee by id
router.get('/:id', async (req: Request, res: Response) => {
  const db = await openDb();
  const employee = await db.get<Employee>('SELECT * FROM employees WHERE id = ?', [req.params.id]);
  if (!employee) return res.status(404).json({ error: 'Employee not found' });
  res.json(employee);
});

// PUT update employee
router.put('/:id', async (req: Request, res: Response) => {
  const db = await openDb();
  const { name, title, studio, practice, region, location, skill_level, current_assignment } = req.body;
  const result = await db.run(
    'UPDATE employees SET name = ?, title = ?, studio = ?, practice = ?, region = ?, location = ?, skill_level = ?, current_assignment = ? WHERE id = ?',
    [name, title, studio, practice, region, location, skill_level, current_assignment, req.params.id]
  );
  if (result.changes === 0) return res.status(404).json({ error: 'Employee not found' });
  res.json({ updated: true });
});

// DELETE employee
router.delete('/:id', async (req: Request, res: Response) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM employees WHERE id = ?', [req.params.id]);
  if (result.changes === 0) return res.status(404).json({ error: 'Employee not found' });
  res.json({ deleted: true });
});

// POST create employee
router.post(
  '/',
  [
    body('name').notEmpty(),
    body('title').notEmpty(),
    body('studio').notEmpty(),
    body('practice').notEmpty(),
    body('region').notEmpty(),
    body('location').notEmpty(),
    body('skill_level').notEmpty(),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const db = await openDb();
    const { name, title, studio, practice, region, location, skill_level, current_assignment } = req.body;
    const result = await db.run(
      'INSERT INTO employees (name, title, studio, practice, region, location, skill_level, current_assignment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [name, title, studio, practice, region, location, skill_level, current_assignment]
    );
    res.status(201).json({ id: result.lastID });
  }
);

export default router;
