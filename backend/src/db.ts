import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_SERVER,
    ssl: { rejectUnauthorized: false },
});

// Test Connection
pool.connect()
    .then(() => console.log('✅ Connected to Supabase PostgreSQL'))
    .catch((err) => console.error('❌ Database connection failed:', err));

export { pool };
