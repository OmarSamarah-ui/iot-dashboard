import request from 'supertest';
import app from '../../src/app';
import { pool } from '../../src/db';

describe('Integration Tests for API with Supabase PostgreSQL', () => {
    let testDeviceId: number;

    beforeAll(async () => {
        const client = await pool.connect();
        try {
            // ✅ Delete existing test data to avoid conflicts
            await client.query('DELETE FROM alerts');
            await client.query('DELETE FROM time_series_data');
            await client.query('DELETE FROM devices');

            // ✅ Insert a test device
            const result = await client.query(
                `INSERT INTO devices (name, type, location, status) 
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                ['Integration Test Sensor', 'Temperature Sensor', 'Lab', 'Active']
            );
            testDeviceId = result.rows[0].id;
            console.log(`✅ Test Device Created with ID: ${testDeviceId}`);
        } finally {
            client.release();
        }
    });

    // 🟢 **Test 1: Fetch all devices**
    it('should fetch all devices via GET /devices', async () => {
        const res = await request(app).get('/devices');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // 🔵 **Test 2: Fetch time-series data for a device**
    it('should fetch time-series data via GET /devices/:id/data', async () => {
        const res = await request(app).get(`/devices/${testDeviceId}/data`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    afterAll(async () => {
        console.log('🧹 Cleaning up test database...');

        const client = await pool.connect();
        try {
            await client.query('DELETE FROM alerts');
            await client.query('DELETE FROM time_series_data');
            await client.query('DELETE FROM devices WHERE id = $1', [testDeviceId]);
            console.log('✅ Test database cleanup completed.');
        } finally {
            client.release();
        }
    });
});
