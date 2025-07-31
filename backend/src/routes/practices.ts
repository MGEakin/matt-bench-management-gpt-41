import express from 'express';
import { openDb } from '../db';
import { Practice } from '../models/practice';
import { Request, Response } from 'express';

const router = express.Router();

// GET all practices
router.get('/', async (req: Request, res: Response) => {
  const db = await openDb();
  const { name } = req.query;
  if (name) {
    const practices = await db.all<Practice[]>(
      'SELECT * FROM practices WHERE name = ?',
      [name]
    );
    res.json(practices);
  } else {
    const practices = await db.all<Practice[]>('SELECT * FROM practices');
    res.json(practices);
  }
});

export default router;
