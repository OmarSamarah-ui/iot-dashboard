import request from 'supertest';
import app from '../../src/app';
import { poolPromise, sql } from '../../src/db';

describe('API Endpoints', () => {
    let testDeviceId: number;

    beforeAll(async () => {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database connection failed');

        // ✅ Insert a test device
        const result = await pool
            .request()
            .input('name', sql.NVarChar, 'API Test Sensor')
            .input('type', sql.NVarChar, 'Temperature Sensor')
            .input('location', sql.NVarChar, 'Lab')
            .input('status', sql.NVarChar, 'Active')
            .query('INSERT INTO devices (name, type, location, status) OUTPUT INSERTED.id VALUES (@name, @type, @location, @status)');

        testDeviceId = result.recordset[0].id;
    });

    // ✅ Test adding time-series data
    it('should add time-series data via POST /devices/:id/data', async () => {
        const res = await request(app).post(`/devices/${testDeviceId}/data`).send({
            timestamp: new Date().toISOString(),
            value: 25.5,
        });
        expect(res.statusCode).toBe(201);
    });

    // ✅ Test fetching time-series data
    it('should fetch time-series data via GET /devices/:id/data', async () => {
        const res = await request(app).get(`/devices/${testDeviceId}/data`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    // ✅ Test deleting a device
    it('should delete a device via DELETE /devices/:id', async () => {
        const res = await request(app).delete(`/devices/${testDeviceId}`);
        expect(res.statusCode).toBe(200);
    });

    afterAll(async () => {
        const pool = await poolPromise;
        if (pool) {
            await pool.request().query(`DELETE FROM devices WHERE id = ${testDeviceId}`);
        }
    });
});
