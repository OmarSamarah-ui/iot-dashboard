import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const isTestEnv = process.env.NODE_ENV === 'test';

const TEST_DB_SERVER = 'postgresql://postgres.xnvjnaoidsgjcnsadnvj:SupaBaseTestPass01!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';
const DB_SERVER = 'postgresql://postgres.pbdodcjhafdkivnkctal:SupaBasePass01!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';

const pool = new Pool({
    connectionString: isTestEnv ? TEST_DB_SERVER : DB_SERVER,
    ssl: { rejectUnauthorized: false },
});
// Test Connection
pool.connect()
    .then(() => console.log('✅ Connected to Supabase PostgreSQL'))
    .catch((err) => console.error('❌ Database connection failed:', err));

export { pool };
