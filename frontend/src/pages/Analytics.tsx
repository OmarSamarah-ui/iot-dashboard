import { useEffect, useState } from 'react';
import DeviceChart from '../components/devices/DeviceChart';
import DeviceDropdown from '../components/devices/DeviceDropdown';
import DatePicker from '../components/devices/DatePicker';
import { format } from 'date-fns';
import AddTimestamp from '../components/modals/AddTimestamp';

const Analytics = () => {
    const [devices, setDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState(() => (devices.length > 0 ? devices[0].id : null));
    const [chartData, setChartData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/devices')
            .then((res) => res.json())
            .then((data) => {
                setDevices(data);
                if (data.length > 0) {
                    setSelectedDeviceId(data[0].id); // Set the first device as default
                }
            });
    }, []);

    useEffect(() => {
        if (selectedDeviceId) {
            fetchDeviceData(selectedDeviceId, startDate, endDate);
        }
    }, [selectedDeviceId, startDate, endDate]);

    const fetchDeviceData = async (deviceId, startDate, endDate) => {
        if (!deviceId) return;

        // Only include start and end if they are valid
        const params = new URLSearchParams();
        if (startDate) params.append('start', startDate);
        if (endDate) params.append('end', endDate);

        try {
            const response = await fetch(`http://localhost:5000/devices/${deviceId}/data?${params.toString()}`);
            const data = await response.json();
            setChartData(data);
        } catch (error) {
            console.error('Error fetching device data:', error);
        }
    };

    const handleAddData = async (timestamp: string, value: number) => {
        if (!selectedDeviceId || !timestamp || isNaN(value)) {
            console.error('Invalid Data:', { selectedDeviceId, timestamp, value });
            return;
        }

        // Convert timestamp to avoid time zone issues
        const formattedTimestamp = new Date(timestamp).toISOString().replace('T', ' ').replace('Z', '');

        try {
            console.log('Sending Data:', { timestamp: formattedTimestamp, value }); // Debugging log
            const response = await fetch(`http://localhost:5000/devices/${selectedDeviceId}/data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ timestamp: formattedTimestamp, value }),
            });

            if (response.ok) {
                console.log('✅ Data Added Successfully!');
                fetchDeviceData(selectedDeviceId, startDate, endDate); // Refresh chart
            } else {
                console.error('❌ Failed to add data:', await response.text());
            }
        } catch (error) {
            console.error('❌ Error adding data:', error);
        }
    };

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-12'>Analytics</h1>
            <div className='w-[80%] mx-auto'>
                {/* Device Selection */}
                <div className='mb-8'>
                    <DeviceDropdown devices={devices} selectedDeviceId={selectedDeviceId} setSelectedDeviceId={setSelectedDeviceId} />
                </div>

                {/* Time Range Filter */}

                {/* Chart */}
                <div className='w-[100%] flex space-x-12 '>
                    {selectedDeviceId && <DeviceChart data={chartData} />}
                    <div className='flex flex-col space-y-4 bg-gray-200 rounded-md p-4'>
                        <h2 className='text-lg font-semibold'>Time Range</h2>
                        <DatePicker selectedDate={startDate} setSelectedDate={setStartDate} placeholder='Start Date' />
                        <DatePicker selectedDate={endDate} setSelectedDate={setEndDate} placeholder='End Date' />
                        <div className='mt-3'>
                            <button className='text-[1rem] bg-blue-500 hover:bg-blue-600 transition-colors ease-in w-full rounded-full py-1 text-white font-semibold' onClick={() => setIsModalOpen(true)}>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <AddTimestamp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddData} />
        </div>
    );
};

export default Analytics;
