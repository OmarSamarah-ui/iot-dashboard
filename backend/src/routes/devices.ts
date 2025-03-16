import { Router, Request, Response } from 'express';
import { sql, poolPromise } from '../db';

const router = Router();

/**
 * Ensures that the database connection is available before querying.
 */
const getDatabaseConnection = async () => {
    const pool = await poolPromise;
    if (!pool) {
        throw new Error('Database connection is not available');
    }
    return pool;
};

/**
 * @route POST /devices
 * @desc Add a new IoT device
 */
router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { name, type, location, status = 'Active' } = req.body;

    if (!name || !type || !location) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const pool = await getDatabaseConnection();
        await pool
            .request()
            .input('name', sql.NVarChar, name)
            .input('type', sql.NVarChar, type)
            .input('location', sql.NVarChar, location)
            .input('status', sql.NVarChar, status)
            .query('INSERT INTO devices (name, type, location, status) VALUES (@name, @type, @location, @status)');

        res.status(201).json({ message: 'Device added successfully' });
    } catch (error) {
        console.error('Error adding device:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /devices
 * @desc Get all IoT devices
 */
router.get('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const pool = await getDatabaseConnection();
        const result = await pool.request().query('SELECT * FROM devices');
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching devices:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route POST /devices/:id/data
 * @desc Add time-series data for a device
 */
router.post('/:id/data', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { timestamp, value } = req.body;

    if (!timestamp || !value) {
        res.status(400).json({ error: 'Timestamp and value are required' });
        return;
    }

    try {
        const pool = await getDatabaseConnection();
        await pool
            .request()
            .input('device_id', sql.Int, id)
            .input('timestamp', sql.DateTime, new Date(timestamp))
            .input('value', sql.Float, value)
            .query('INSERT INTO time_series_data (device_id, timestamp, value) VALUES (@device_id, @timestamp, @value)');

        res.status(201).json({ message: 'Sensor data recorded successfully' });
    } catch (error) {
        console.error('Error adding sensor data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /devices/:id/data
 * @desc Retrieve time-series data for a device
 */
router.get('/:id/data', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { start, end } = req.query;

    try {
        const pool = await getDatabaseConnection();
        let query = `SELECT * FROM time_series_data WHERE device_id = @device_id`;

        const request = pool.request().input('device_id', sql.Int, id);

        if (typeof start === 'string' && start.trim() !== '') {
            request.input('start', sql.DateTime, new Date(start));
            query += ` AND timestamp >= @start`;
        }

        if (typeof end === 'string' && end.trim() !== '') {
            request.input('end', sql.DateTime, new Date(end));
            query += ` AND timestamp <= @end`;
        }

        query += ` ORDER BY timestamp DESC`;

        const result = await request.query(query);
        res.status(200).json(result.recordset);
    } catch (error) {
        console.error('Error fetching sensor data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route DELETE /devices/:id
 * @desc Delete a device by ID
 */
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        if (!pool) {
            throw new Error('Database connection is not available');
        }

        await pool.request().input('id', sql.Int, id).query('DELETE FROM alerts WHERE device_id = @id');

        const result = await pool.request().input('id', sql.Int, id).query('DELETE FROM devices WHERE id = @id');

        if (result.rowsAffected[0] === 0) {
            res.status(404).json({ error: 'Device not found' });
        } else {
            res.status(200).json({ message: 'Device deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting device:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
