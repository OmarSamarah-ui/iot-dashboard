import { poolPromise } from '../db';

afterAll(async () => {
    const pool = await poolPromise;
    if (pool) {
        await pool.close();
    }
});
