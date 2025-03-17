import { Router } from 'express';
import { pool } from '../db';

const router = Router();

/**
 * Ensures that the database connection is available before querying.
 */
const getDatabaseConnection = async () => pool;

/**
 * @route GET /api/overview-metrics
 * @desc Get summary metrics for the dashboard
 */
router.get('/overview-metrics', async (req, res) => {
    try {
        const pool = await getDatabaseConnection();
        const result = await pool.query(`
            SELECT 
                (SELECT COUNT(*) FROM devices) AS total_devices,
                (SELECT COUNT(*) FROM devices WHERE status = 'Active') AS online_devices,
                (SELECT COUNT(*) FROM devices WHERE status = 'Inactive') AS offline_devices,
                (SELECT AVG(value) FROM time_series_data WHERE device_id IN (SELECT id FROM devices WHERE type = 'Temperature Sensor')) AS avg_temperature,
                (SELECT AVG(value) FROM time_series_data WHERE device_id IN (SELECT id FROM devices WHERE type = 'Humidity Sensor')) AS avg_humidity,
                (SELECT COUNT(*) FROM alerts WHERE timestamp >= NOW() - INTERVAL '1 day') AS alerts_last_24h
        `);

        res.json(result.rows[0]);
    } catch (error) {
        console.error('❌ Error fetching overview metrics:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/device-activity
 * @desc Get device activity over time
 */
router.get('/device-activity', async (req, res) => {
    try {
        const pool = await getDatabaseConnection();
        const result = await pool.query(`
            SELECT DATE(timestamp) AS date, COUNT(DISTINCT device_id) AS active_devices
            FROM time_series_data
            WHERE timestamp >= NOW() - INTERVAL '30 days'  
            GROUP BY date
            ORDER BY date ASC
        `);

        res.json(result.rows);
    } catch (error) {
        console.error('❌ Error fetching device activity:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/device-types
 * @desc Get device type distribution
 */
router.get('/device-types', async (req, res) => {
    try {
        const pool = await getDatabaseConnection();
        const result = await pool.query(`SELECT type, COUNT(*) AS count FROM devices GROUP BY type`);

        const response = result.rows.reduce((acc, row) => {
            acc[row.type] = row.count;
            return acc;
        }, {});

        res.json(response);
    } catch (error) {
        console.error('❌ Error fetching device types:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/sensor-alerts
 * @desc Get sensor alerts by type
 */
router.get('/sensor-alerts', async (req, res) => {
    try {
        const pool = await getDatabaseConnection();
        const result = await pool.query(`SELECT alert_type, COUNT(*) AS count FROM alerts GROUP BY alert_type`);

        const response = result.rows.reduce((acc, row) => {
            acc[row.alert_type] = row.count;
            return acc;
        }, {});

        res.json(response);
    } catch (error) {
        console.error('❌ Error fetching sensor alerts:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/recent-events
 * @desc Get last 5 system events
 */
router.get('/recent-events', async (req, res) => {
    try {
        const pool = await getDatabaseConnection();
        const result = await pool.query(`
            SELECT timestamp, event_message
            FROM events
            ORDER BY timestamp DESC
            LIMIT 15
        `);

        res.json(result.rows);
    } catch (error) {
        console.error('❌ Error fetching recent events:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/most-frequent-alerts
 * @desc Get the most frequent alerts
 */
router.get('/most-frequent-alerts', async (req, res) => {
    try {
        const pool = await getDatabaseConnection();
        const result = await pool.query(`
            SELECT alert_type, COUNT(*) as count
            FROM alerts
            GROUP BY alert_type
            ORDER BY count DESC
            LIMIT 5
        `);

        res.json({
            alertTypes: result.rows.map((row) => row.alert_type),
            alertCounts: result.rows.map((row) => row.count),
        });
    } catch (error) {
        console.error('❌ Error fetching most frequent alerts:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
