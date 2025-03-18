import dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';

// Load .env file explicitly
const envFile = process.env.NODE_ENV === 'test' ? '../.env.test' : '../../.env';
dotenv.config({ path: path.resolve(__dirname, envFile) });

// Verify DB_SERVER is being loaded
console.log(`🔍 NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`🔍 Using DB_SERVER: ${process.env.DB_SERVER}`);

if (!process.env.DB_SERVER) {
    console.error('❌ ERROR: DB_SERVER is not defined! Check your .env or .env.test file.');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DB_SERVER,
    ssl: { rejectUnauthorized: false }, // Supabase requires SSL
});

// Test Connection
pool.connect()
    .then(() => console.log(`✅ Connected to Supabase ${process.env.NODE_ENV === 'test' ? 'Test' : 'Production'} Database`))
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
        process.exit(1);
    });

export { pool };
