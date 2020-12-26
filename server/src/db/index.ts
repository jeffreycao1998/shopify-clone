import { Pool } from 'pg';

// Database
const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'shopify-clone',
  password: 'postgres',
  port: 5432,
});

export default db;