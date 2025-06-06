// Example in Node.js with Express
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'perstat',
  password: 'Be@ringStr4it', // Replace with your PostgreSQL password
  port: 5432,
});

export const getRosterData = async () => {
  const result = await pool.query('SELECT * FROM members');
  return result.rows;
};

const app = express();
app.use(cors());

app.get('/api/roster', async (req, res) => {
  try {
    const data = await getRosterData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));