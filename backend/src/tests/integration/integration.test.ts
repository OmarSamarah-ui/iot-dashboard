import request from 'supertest';
import app from '../../app';
import { poolPromise, sql } from '../../db';

describe('Integration Tests for API', () => {
    let testDeviceId: number;

    beforeAll(async () => {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database connection failed');

        // Insert a test device
        const result = await pool
            .request()
            .input('name', sql.NVarChar, 'Test Sensor')
            .input('type', sql.NVarChar, 'Temperature Sensor')
            .input('location', sql.NVarChar, 'Lab')
            .input('status', sql.NVarChar, 'Active')
            .query('INSERT INTO devices (name, type, location, status) OUTPUT INSERTED.id VALUES (@name, @type, @location, @status)');

        testDeviceId = result.recordset[0].id;
        console.log(`✅ Test Device Created with ID: ${testDeviceId}`);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        let attempts = 5;
        let deviceExists = false;
        while (attempts > 0) {
            const checkResult = await pool.request().input('id', sql.Int, testDeviceId).query('SELECT * FROM devices WHERE id = @id');

            if (checkResult.recordset.length > 0) {
                deviceExists = true;
                console.log(`✅ Device with ID ${testDeviceId} is confirmed in the database.`);
                break;
            } else {
                console.warn(`⏳ Waiting for device ${testDeviceId} to commit... (${5 - attempts + 1}/5)`);
                await new Promise((resolve) => setTimeout(resolve, 500));
            }
            attempts--;
        }

        if (!deviceExists) {
            throw new Error(`❌ Device with ID ${testDeviceId} was NOT found in the database!`);
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
        const pool = await poolPromise;
        if (pool) {
            await pool.request().input('id', sql.Int, testDeviceId).query(`DELETE FROM devices WHERE id = @id`);
        }
    });
});
