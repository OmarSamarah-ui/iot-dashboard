import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const DeviceChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className='text-gray-500 text-center mt-4'>No data available for selected range.</p>;
    }

    return (
        <ResponsiveContainer key={data.length} width='100%' height={300}>
            <LineChart data={data}>
                <XAxis dataKey='timestamp' tickFormatter={(tick) => format(new Date(tick), 'MMM dd, HH:mm')} />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='value' stroke='#8884d8' />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default DeviceChart;
