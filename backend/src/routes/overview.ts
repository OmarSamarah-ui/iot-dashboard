import { Router } from 'express';
import { sql, poolPromise } from '../db';

const router = Router();

/**
 * @route GET /api/overview-metrics
 * @desc Get summary metrics for the dashboard
 */
router.get('/overview-metrics', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT 
                (SELECT COUNT(*) FROM devices) AS total_devices,
                (SELECT COUNT(*) FROM devices WHERE status = 'Active') AS online_devices,
                (SELECT COUNT(*) FROM devices WHERE status = 'Inactive') AS offline_devices,
                (SELECT AVG(value) FROM time_series_data WHERE device_id IN (SELECT id FROM devices WHERE type = 'Temperature Sensor')) AS avg_temperature,
                (SELECT AVG(value) FROM time_series_data WHERE device_id IN (SELECT id FROM devices WHERE type = 'Humidity Sensor')) AS avg_humidity,
                (SELECT COUNT(*) FROM alerts WHERE timestamp >= DATEADD(DAY, -1, GETDATE())) AS alerts_last_24h
        `);

        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Error fetching overview metrics:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/device-activity
 * @desc Get device activity over time
 */
router.get('/device-activity', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT CAST(timestamp AS DATE) AS date, COUNT(DISTINCT device_id) AS active_devices
            FROM time_series_data
            WHERE timestamp >= DATEADD(DAY, -30, GETDATE())  -- Last 30 days
            GROUP BY CAST(timestamp AS DATE)
            ORDER BY date ASC
        `);

        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching device activity:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/device-types
 * @desc Get device type distribution
 */
router.get('/device-types', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT type, COUNT(*) AS count FROM devices GROUP BY type
        `);

        const response = result.recordset.reduce((acc, row) => {
            acc[row.type] = row.count;
            return acc;
        }, {});

        res.json(response);
    } catch (error) {
        console.error('Error fetching device types:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/sensor-alerts
 * @desc Get sensor alerts by type
 */
router.get('/sensor-alerts', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT alert_type, COUNT(*) AS count FROM alerts GROUP BY alert_type
        `);

        const response = result.recordset.reduce((acc, row) => {
            acc[row.alert_type] = row.count;
            return acc;
        }, {});

        res.json(response);
    } catch (error) {
        console.error('Error fetching sensor alerts:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/device-performance
 * @desc Get most and least active devices
 */
router.get('/device-performance', async (req, res) => {
    try {
        const pool = await poolPromise;

        // Get most active devices
        const mostActive = await pool.request().query(`
            SELECT TOP 5 d.id, d.name, COUNT(t.id) AS data_points
            FROM devices d
            JOIN time_series_data t ON d.id = t.device_id
            GROUP BY d.id, d.name
            ORDER BY data_points DESC
        `);

        // Get least active devices
        const leastActive = await pool.request().query(`
            SELECT TOP 5 d.id, d.name, COUNT(t.id) AS data_points
            FROM devices d
            LEFT JOIN time_series_data t ON d.id = t.device_id
            GROUP BY d.id, d.name
            ORDER BY data_points ASC
        `);

        res.json({
            most_active: mostActive.recordset,
            least_active: leastActive.recordset,
        });
    } catch (error) {
        console.error('Error fetching device performance:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

/**
 * @route GET /api/recent-events
 * @desc Get last 5 system events
 */
router.get('/recent-events', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT timestamp, event_message
            FROM events
            ORDER BY timestamp DESC
        `);

        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching recent events:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/most-frequent-alerts', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT TOP 5 alert_type, COUNT(*) as count
            FROM alerts
            GROUP BY alert_type
            ORDER BY count DESC
        `);

        res.json({
            alertTypes: result.recordset.map((row) => row.alert_type),
            alertCounts: result.recordset.map((row) => row.count),
        });
    } catch (error) {
        console.error('Error fetching most frequent alerts:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
