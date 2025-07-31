import { Router } from "express";
import { openDb } from "../db";
import { getAllRegions } from "../models/region";

const router = Router();

router.get('/', async (req, res) => {
  const db = await openDb();
  const regions = await getAllRegions(db);
  res.json(regions);
});

export default router;
