import request from 'supertest';
import app from '../../app';
import { pool } from '../../db';

describe('Integration Tests for API with Supabase PostgreSQL', () => {
    let testDeviceId: number;

    beforeAll(async () => {
        const client = await pool.connect();
        try {
            // Clear test data before running tests
            await client.query('DELETE FROM devices WHERE name = $1', ['Test Sensor']);

            // Insert a test device
            const result = await client.query(
                `INSERT INTO devices (name, type, location, status) 
             VALUES ($1, $2, $3, $4) RETURNING id`,
                ['Test Sensor', 'Temperature Sensor', 'Lab', 'Active']
            );

            testDeviceId = result.rows[0].id;
            console.log(`✅ Test Device Created with ID: ${testDeviceId}`);
        } finally {
            client.release();
        }
    });

    // Fetch all devices
    it('should return all devices via GET /devices', async () => {
        const res = await request(app).get('/devices');
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Fetch time-series data for a device
    it('should return time-series data for a device via GET /devices/:id/data', async () => {
        const res = await request(app).get(`/devices/${testDeviceId}/data`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // Fetch device activity trends
    it('should return device activity via GET /api/device-activity', async () => {
        const res = await request(app).get('/api/device-activity');
        expect(res.status).toBe(200);
    });

    // Fetch device type distribution
    it('should return device type distribution via GET /api/device-types', async () => {
        const res = await request(app).get('/api/device-types');
        expect(res.status).toBe(200);
    });

    // Fetch sensor alerts by type
    it('should return sensor alerts via GET /api/sensor-alerts', async () => {
        const res = await request(app).get('/api/sensor-alerts');
        expect(res.status).toBe(200);
    });

    // Fetch most and least active devices
    it('should return device performance via GET /api/device-performance', async () => {
        const res = await request(app).get('/api/device-performance');
        expect(res.status).toBe(200);
    });

    // Fetch recent events
    it('should return recent events via GET /api/recent-events', async () => {
        const res = await request(app).get('/api/recent-events');
        expect(res.status).toBe(200);
    });

    // Delete the test device
    it('should delete the created device via DELETE /devices/:id', async () => {
        const res = await request(app).delete(`/devices/${testDeviceId}`);
        expect(res.status).toBe(200);
    });

    afterAll(async () => {
        const client = await pool.connect();
        try {
            await client.query('DELETE FROM devices WHERE id = $1', [testDeviceId]);
        } finally {
            client.release();
        }
    });
});
