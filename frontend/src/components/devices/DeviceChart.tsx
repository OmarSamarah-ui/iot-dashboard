import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

type DataPoint = {
    timestamp: string;
    value: number;
};

const DeviceChart = ({ data }: { data: DataPoint[] }) => {
    if (!data || data.length === 0) {
        return <p className='text-gray-500 text-center mt-4'>No data available for selected range.</p>;
    }

    const isDarkMode = document.documentElement.classList.contains('dark');

    return (
        <ResponsiveContainer key={data.length} width='100%' height={300}>
            <LineChart data={data}>
                <XAxis dataKey='timestamp' tickFormatter={(tick) => format(new Date(tick), 'MMM dd, HH:mm')} tick={{ fill: isDarkMode ? '#ffffff' : '#333333' }} />
                <YAxis tick={{ fill: isDarkMode ? '#ffffff' : '#333333' }} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                        color: isDarkMode ? '#ffffff' : '#333333',
                    }}
                />
                <Line type='monotone' dataKey='value' stroke={isDarkMode ? '#A3BFFA' : '#8884d8'} dot={{ fill: isDarkMode ? '#A3BFFA' : '#8884d8' }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DeviceChart;
