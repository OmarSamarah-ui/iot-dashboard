import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import deviceRoutes from './routes/devices';
import overviewRoutes from './routes/overview';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Register API Routes
app.use('/devices', deviceRoutes);
app.use('/api', overviewRoutes);

app.get('/', (req, res) => {
    res.send('IoT Dashboard API is running...');
});

export default app;
