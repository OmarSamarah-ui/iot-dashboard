import request from 'supertest';
import app from '../../app';
import { pool } from '../../db';

describe('API Endpoints with Supabase PostgreSQL', () => {
    let testDeviceId: number;

    beforeAll(async () => {
        const client = await pool.connect();
        try {
            // Insert a test device
            const result = await client.query(
                `INSERT INTO devices (name, type, location, status) 
                 VALUES ($1, $2, $3, $4) RETURNING id`,
                ['API Test Sensor', 'Temperature Sensor', 'Lab', 'Active']
            );
            testDeviceId = result.rows[0].id;
        } finally {
            client.release();
        }
    });

    // Test adding time-series data
    it('should add time-series data via POST /devices/:id/data', async () => {
        const res = await request(app).post(`/devices/${testDeviceId}/data`).send({
            timestamp: new Date().toISOString(),
            value: 25.5,
        });
        expect(res.statusCode).toBe(201);
    });

    // Test fetching time-series data
    it('should fetch time-series data via GET /devices/:id/data', async () => {
        const res = await request(app).get(`/devices/${testDeviceId}/data`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Test deleting a device
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
