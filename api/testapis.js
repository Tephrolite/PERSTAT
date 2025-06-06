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
app.use(express.json());

app.get('/api/roster', async (req, res) => {
  try {
    const data = await getRosterData();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/roster', async (req, res) => {
  try {
    const updates = req.body; // Array of updated members
    const client = await pool.connect();

    // Update each member in the database
    for (const member of updates) {
      await client.query(
        'UPDATE members SET first_name = $1, last_name = $2, rank = $3, gender = $4, unit = $5, status = $6, sec_clearance = $7, adjudication_date = $8 WHERE dodid = $9',
        [
          member.first_name,
          member.last_name,
          member.rank,
          member.gender,
          member.unit,
          member.status,
          member.sec_clearance,
          member.adjudication_date,
          member.dodid,
        ]
      );
    }

    client.release();
    res.status(200).send('Updates saved successfully');
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));