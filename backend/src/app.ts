import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import employeesRouter from './routes/employees';
import practicesRouter from './routes/practices';
import studiosRouter from './routes/studios';
import regionRoutes from './routes/regions';
import locationRoutes from './routes/locations';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/employees', employeesRouter);
app.use('/api/practices', practicesRouter);
app.use('/api/studios', studiosRouter);
app.use('/api/regions', regionRoutes);
app.use('/api/locations', locationRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Employee Management API');
});

export default app;
