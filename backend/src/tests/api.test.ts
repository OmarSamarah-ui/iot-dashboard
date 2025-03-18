import request from 'supertest';
import app from '../../src/app';
import { pool } from '../../src/db';

describe('API Endpoints with Supabase PostgreSQL', () => {
    let testDeviceId: number;

    beforeAll(async () => {
        const client = await pool.connect();
        try {
            // ✅ Delete any existing test data to prevent conflicts
            await client.query('DELETE FROM alerts');
            await client.query('DELETE FROM time_series_data');
            await client.query('DELETE FROM devices WHERE name = $1', ['API Test Sensor']);

            // ✅ Insert a test device
            const result = await client.query(
                `INSERT INTO devices (name, type, location, status) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
                ['API Test Sensor', 'Temperature Sensor', 'Lab', 'Active']
            );
            testDeviceId = result.rows[0].id;
            console.log(`✅ Test Device Created with ID: ${testDeviceId}`);
        } finally {
            client.release();
        }
    });

    it('should fetch all devices via GET /devices', async () => {
        const res = await request(app).get('/devices');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should delete a device via DELETE /devices/:id', async () => {
        const res = await request(app).delete(`/devices/${testDeviceId}`);
        expect(res.statusCode).toBe(200);
    });

    afterAll(async () => {
        const client = await pool.connect();
        try {
            await client.query(`DELETE FROM devices WHERE id = $1`, [testDeviceId]);
        } finally {
            client.release();
        }
    });
});
