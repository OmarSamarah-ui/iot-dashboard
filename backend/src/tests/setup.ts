import { pool } from '../db';

const TEST_DB_SERVER = 'postgresql://postgres.xnvjnaoidsgjcnsadnvj:SupaBaseTestPass01!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';

// ✅ Ensure the test database is being used
if (!TEST_DB_SERVER.includes('test')) {
    throw new Error('❌ ERROR: Not using test database. Aborting tests to prevent accidental deletion!');
}

beforeAll(async () => {
    console.log('🚀 Connecting to the test database...');
    try {
        await pool.connect();
        console.log('✅ Connected to Supabase Test Database');
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
});

// Clean up after tests
afterAll(async () => {
    console.log('🧹 Cleaning up test database...');
    try {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM alerts');
            await client.query('DELETE FROM time_series_data');
            await client.query('DELETE FROM devices');

            console.log('✅ Test database cleanup completed.');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('❌ Cleanup failed:', error);
    }

    await pool.end();
});
