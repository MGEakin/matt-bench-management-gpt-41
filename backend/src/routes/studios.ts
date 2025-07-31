import express from 'express';
import { openDb } from '../db';
import { Studio } from '../models/studio';
import { Request, Response } from 'express';

const router = express.Router();

// GET all studios
router.get('/', async (req: Request, res: Response) => {
  const db = await openDb();
  const studios = await db.all<Studio[]>('SELECT * FROM studios');
  res.json(studios);
});

// GET studio by name
router.get('/:name', async (req: Request, res: Response) => {
  const db = await openDb();
  const studioName = decodeURIComponent(req.params.name);
  const studio = await db.get<Studio>('SELECT * FROM studios WHERE name = ?', [studioName]);
  if (!studio) return res.status(404).json({ error: 'Studio not found' });
  res.json(studio);
});

export default router;
