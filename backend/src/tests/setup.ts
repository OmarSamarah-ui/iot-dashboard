import { Pool } from 'pg';

// ✅ Ensure we are using the test database
const TEST_DB_SERVER = 'postgresql://postgres.xnvjnaoidsgjcnsadnvj:SupaBaseTestPass01!@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';

console.log('🔍 Using DB_SERVER:', TEST_DB_SERVER);

const testPool = new Pool({
    connectionString: TEST_DB_SERVER,
    ssl: { rejectUnauthorized: false },
});

beforeAll(async () => {
    console.log('🚀 Connecting to the test database...');
    try {
        await testPool.connect();
        console.log('✅ Connected to Supabase Test Database');

        const client = await testPool.connect();
        try {
            console.log('🧹 Resetting test database...');

            // ✅ Delete from dependent tables first
            await client.query('DELETE FROM alerts');
            await client.query('DELETE FROM time_series_data');

            // ✅ Delete from devices last to prevent foreign key constraint issues
            await client.query('DELETE FROM devices');

            // ✅ Reset the auto-increment sequence for devices
            await client.query("SELECT setval('devices_id_seq', 1, false)");

            console.log('✅ Test database reset completed.');
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        process.exit(1);
    }
});

afterAll(async () => {
    console.log('🧹 Cleaning up test database connections...');
    try {
        const client = await testPool.connect();
        client.release(); // ✅ Release connection instead of closing the pool
        console.log('✅ Test database connections released.');
    } catch (error) {
        console.error('❌ Error releasing test database connection:', error);
    }
});
