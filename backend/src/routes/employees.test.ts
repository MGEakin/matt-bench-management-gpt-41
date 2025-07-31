import request from 'supertest';
import express from 'express';
import employeesRouter from './employees';
import { openDb } from '../db';

const app = express();
app.use(express.json());
app.use('/employees', employeesRouter);

beforeAll(async () => {
  // Optionally, seed the test DB or use an in-memory DB
});

afterAll(async () => {
  // Optionally, clean up DB
});

describe('Employees API', () => {
  it('GET /employees should return a list of employees', async () => {
    const res = await request(app).get('/employees');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /employees should validate required fields', async () => {
    const res = await request(app)
      .post('/employees')
      .send({ name: '', title: '', studio: '', practice: '', region: '', location: '', skill_level: '' });
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('POST /employees should create a new employee', async () => {
    const employee = {
      name: 'Test User',
      title: 'Consultant',
      studio: 'NY',
      practice: 'Tech',
      region: 'US',
      location: 'Remote',
      skill_level: 'Senior',
      current_assignment: 'Project X',
    };
    const res = await request(app).post('/employees').send(employee);
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });

  it('GET /employees/:id should return an employee or 404', async () => {
    // Create employee first
    const employee = {
      name: 'Test User2',
      title: 'Consultant',
      studio: 'NY',
      practice: 'Tech',
      region: 'US',
      location: 'Remote',
      skill_level: 'Senior',
      current_assignment: 'Project Y',
    };
    const createRes = await request(app).post('/employees').send(employee);
    const id = createRes.body.id;
    const res = await request(app).get(`/employees/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(employee.name);

    const res404 = await request(app).get('/employees/999999');
    expect(res404.status).toBe(404);
  });

  it('PUT /employees/:id should update an employee', async () => {
    const employee = {
      name: 'Test User3',
      title: 'Consultant',
      studio: 'NY',
      practice: 'Tech',
      region: 'US',
      location: 'Remote',
      skill_level: 'Senior',
      current_assignment: 'Project Z',
    };
    const createRes = await request(app).post('/employees').send(employee);
    const id = createRes.body.id;
    const updated = { ...employee, name: 'Updated User' };
    const res = await request(app).put(`/employees/${id}`).send(updated);
    expect(res.status).toBe(200);
    expect(res.body.updated).toBe(true);
  });

  it('DELETE /employees/:id should delete an employee', async () => {
    const employee = {
      name: 'Test User4',
      title: 'Consultant',
      studio: 'NY',
      practice: 'Tech',
      region: 'US',
      location: 'Remote',
      skill_level: 'Senior',
      current_assignment: 'Project ZZ',
    };
    const createRes = await request(app).post('/employees').send(employee);
    const id = createRes.body.id;
    const res = await request(app).delete(`/employees/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);
  });

  it('GET /employees with filters should return filtered employees', async () => {
    // Create two employees with different studios
    const emp1 = {
      name: 'Alice',
      title: 'Consultant',
      studio: 'NY',
      practice: 'Tech',
      region: 'US',
      location: 'Remote',
      skill_level: 'Senior',
      current_assignment: 'Project A',
    };
    const emp2 = {
      name: 'Bob',
      title: 'Consultant',
      studio: 'SF',
      practice: 'Tech',
      region: 'US',
      location: 'Remote',
      skill_level: 'Junior',
      current_assignment: 'Project B',
    };
    await request(app).post('/employees').send(emp1);
    await request(app).post('/employees').send(emp2);
    const res = await request(app).get('/employees?studio=NY');
    expect(res.status).toBe(200);
    expect(res.body.some((e: any) => e.studio === 'NY')).toBe(true);
    expect(res.body.some((e: any) => e.studio === 'SF')).toBe(false);
  });

  it('POST /employees should return detailed validation errors', async () => {
    const res = await request(app)
      .post('/employees')
      .send({}); // Send empty body
    expect(res.status).toBe(400);
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.length).toBeGreaterThan(0);
    expect(res.body.errors[0]).toHaveProperty('msg');
  });

  it('PUT /employees/:id with invalid id should return 404', async () => {
    const employee = {
      name: 'Ghost',
      title: 'Consultant',
      studio: 'LA',
      practice: 'Tech',
      region: 'US',
      location: 'Remote',
      skill_level: 'Senior',
      current_assignment: 'Project G',
    };
    const res = await request(app).put('/employees/999999').send(employee);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('DELETE /employees/:id with invalid id should return 404', async () => {
    const res = await request(app).delete('/employees/999999');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Employee not found');
  });

  it('Performance: create 50 employees quickly', async () => {
    const start = Date.now();
    for (let i = 0; i < 50; i++) {
      const employee = {
        name: `PerfUser${i}`,
        title: 'Consultant',
        studio: 'NY',
        practice: 'Tech',
        region: 'US',
        location: 'Remote',
        skill_level: 'Senior',
        current_assignment: `Project${i}`,
      };
      const res = await request(app).post('/employees').send(employee);
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
    }
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(3000); // Should complete in under 3 seconds
  });

  it('Stress: GET /employees with large dataset', async () => {
    // Insert 100 employees
    for (let i = 0; i < 100; i++) {
      await request(app).post('/employees').send({
        name: `StressUser${i}`,
        title: 'Consultant',
        studio: 'NY',
        practice: 'Tech',
        region: 'US',
        location: 'Remote',
        skill_level: 'Senior',
        current_assignment: `Project${i}`,
      });
    }
    const res = await request(app).get('/employees');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(100);
  });
});
