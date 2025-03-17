import { Router, Request, Response } from 'express';
import { pool } from '../db';

const router = Router();

/**
 * Ensures that the database connection is available before querying.
 */
const getDatabaseConnection = async () => pool;

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
        await pool.query('INSERT INTO devices (name, type, location, status) VALUES ($1, $2, $3, $4)', [name, type, location, status]);
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
        const result = await pool.query('SELECT * FROM devices');
        res.status(200).json(result.rows);
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
        await pool;
        await pool.query('INSERT INTO time_series_data (device_id, timestamp, value) VALUES ($1, $2, $3)', [id, new Date(timestamp), value]);

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
        let query = `SELECT * FROM time_series_data WHERE device_id = $1`;
        const values: any[] = [id];

        if (typeof start === 'string' && start.trim() !== '') {
            values.push(new Date(start));
            query += ` AND timestamp >= $${values.length}`;
        }

        if (typeof end === 'string' && end.trim() !== '') {
            values.push(new Date(end));
            query += ` AND timestamp <= $${values.length}`;
        }

        query += ` ORDER BY timestamp DESC`;

        const result = await pool.query(query, values);
        res.status(200).json(result.rows);
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
        const pool = await getDatabaseConnection();

        // Delete related alerts first (if applicable)
        await pool.query('DELETE FROM alerts WHERE device_id = $1', [id]);

        // Delete the device
        const result = await pool.query('DELETE FROM devices WHERE id = $1', [id]);

        if (result.rowCount === 0) {
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
