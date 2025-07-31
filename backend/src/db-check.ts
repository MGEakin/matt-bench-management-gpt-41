import { openDb } from './db';

async function checkDb() {
  const db = await openDb();
  const studios = await db.all('SELECT * FROM studios');
  const practices = await db.all('SELECT * FROM practices');
  const employees = await db.all('SELECT * FROM employees');

  console.log('Studios:', studios);
  console.log('Practices:', practices);
  console.log('Employees:', employees);
}

checkDb().then(() => process.exit(0)).catch(err => { console.error(err); process.exit(1); });
