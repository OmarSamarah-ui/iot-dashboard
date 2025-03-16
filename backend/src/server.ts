import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import deviceRoutes from './routes/devices';
import overviewRoutes from './routes/overview';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Ensure JSON body parsing

// Register API Routes
app.use('/devices', deviceRoutes);
app.use('/api', overviewRoutes);

app.get('/', (req, res) => {
    res.send('IoT Dashboard API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
