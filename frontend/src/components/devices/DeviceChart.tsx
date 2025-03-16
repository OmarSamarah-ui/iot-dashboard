import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const DeviceChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className='text-gray-500 text-center mt-4'>No data available for selected range.</p>;
    }

    const isDarkMode = document.documentElement.classList.contains('dark'); // ✅ Detect dark mode

    return (
        <ResponsiveContainer key={data.length} width='100%' height={300}>
            <LineChart data={data}>
                <XAxis
                    dataKey='timestamp'
                    tickFormatter={(tick) => format(new Date(tick), 'MMM dd, HH:mm')}
                    tick={{ fill: isDarkMode ? '#ffffff' : '#333333' }} // ✅ Adjust axis text color
                />
                <YAxis
                    tick={{ fill: isDarkMode ? '#ffffff' : '#333333' }} // ✅ Adjust axis text color
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', // ✅ Tooltip background
                        color: isDarkMode ? '#ffffff' : '#333333', // ✅ Tooltip text
                    }}
                />
                <Line
                    type='monotone'
                    dataKey='value'
                    stroke={isDarkMode ? '#A3BFFA' : '#8884d8'} // ✅ Adjust line color
                    dot={{ fill: isDarkMode ? '#A3BFFA' : '#8884d8' }} // ✅ Adjust dot color
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DeviceChart;
