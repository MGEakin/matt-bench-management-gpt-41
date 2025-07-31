import { Router } from "express";
import { openDb } from "../db";
import { getAllLocations } from "../models/location";

const router = Router();

router.get('/', async (req, res) => {
  const db = await openDb();
  const locations = await getAllLocations(db);
  res.json(locations);
});

export default router;
