import { poolPromise } from '../src/db';

afterAll(async () => {
    const pool = await poolPromise;
    if (pool) {
        await pool.close(); // Close the database connection
    }
});
