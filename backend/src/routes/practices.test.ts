import request from 'supertest';
import express from 'express';
import practicesRouter from './practices';

const app = express();
app.use(express.json());
app.use('/practices', practicesRouter);

describe('Practices API', () => {
  it('GET /practices should return all practices', async () => {
    const res = await request(app).get('/practices');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(7);
    const names = res.body.map((p: any) => p.name);
    expect(names).toEqual(
      expect.arrayContaining([
        'Development',
        'Testing',
        'DevOps',
        'SRE',
        'Architecture',
        'Cloud',
        'Data',
      ])
    );
  });
});
