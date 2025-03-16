import { useEffect, useState } from 'react';
import DeviceChart from '../components/devices/DeviceChart';
import DeviceDropdown from '../components/devices/DeviceDropdown';
import DatePicker from '../components/devices/DatePicker';
import { useSearchParams } from 'react-router-dom';
import AddTimestamp from '../components/modals/AddTimestamp';
import { motion } from 'framer-motion';

const Analytics = () => {
    const [devices, setDevices] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchParams] = useSearchParams();
    const urlDeviceId = searchParams.get('deviceId');

    const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(urlDeviceId ? parseInt(urlDeviceId) : null);

    useEffect(() => {
        fetch('http://localhost:5000/devices')
            .then((res) => res.json())
            .then((data) => {
                setDevices(data);
                if (data.length > 0) {
                    // If URL deviceId exists & is valid, set it; otherwise, set first device
                    const validDeviceId = urlDeviceId && data.some((device) => device.id === parseInt(urlDeviceId));
                    setSelectedDeviceId(validDeviceId ? parseInt(urlDeviceId) : data[0].id);
                }
            });
    }, [urlDeviceId]);

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

    const resetTimeRange = () => {
        setStartDate('');
        setEndDate('');
        fetchDeviceData(selectedDeviceId, '', ''); // Refetch data without filters
    };

    return (
        <motion.div className='p-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <h1 className='text-2xl font-bold mb-12'>Analytics</h1>
            <div className='mx-auto sm-[100%] lg:w-[90%] xl:w-[80%]'>
                {/* Device Selection */}
                <div className='mb-8'>
                    <DeviceDropdown devices={devices} selectedDeviceId={selectedDeviceId} setSelectedDeviceId={setSelectedDeviceId} />
                </div>

                {/* Time Range Filter */}

                {/* Chart */}
                <div className='w-[100%] flex space-x-12 flex-col lg:flex-row'>
                    {selectedDeviceId && <DeviceChart data={chartData} />}
                    <div
                        className='flex flex-col space-y-4 p-4 rounded-md mt-3 lg:mt-0'
                        style={{
                            backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#e5e7eb', // ✅ Dark mode background
                            color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b', // ✅ Dark mode text
                        }}>
                        <h2 className='text-lg font-semibold text-center sm:text-start'>Time Range</h2>
                        <div className='flex flex-col space-y-3 items-center justify-between lg:flex-col lg:space-y-4 space-x-1 sm:flex-row'>
                            <DatePicker
                                selectedDate={startDate}
                                setSelectedDate={setStartDate}
                                placeholder='Start Date'
                                inputStyle={{
                                    backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
                                    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b',
                                    borderColor: document.documentElement.classList.contains('dark') ? '#4b5563' : '#d1d5db',
                                }} // ✅ Fix input styling in dark mode
                            />
                            <DatePicker
                                selectedDate={endDate}
                                setSelectedDate={setEndDate}
                                placeholder='End Date'
                                inputStyle={{
                                    backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#ffffff',
                                    color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b',
                                    borderColor: document.documentElement.classList.contains('dark') ? '#4b5563' : '#d1d5db',
                                }} // ✅ Fix input styling in dark mode
                            />
                            <div className='flex lg:flex-col items-center lg:mt-3 w-[50%] sm:w-[40%] lg:w-full gap-2'>
                                <button
                                    onClick={resetTimeRange}
                                    className='text-[1rem] w-full rounded-full py-1 font-semibold lg:mb-3 mb-0'
                                    style={{
                                        backgroundColor: document.documentElement.classList.contains('dark') ? '#6b7280' : '#9ca3af',
                                        color: '#ffffff',
                                    }} // ✅ Fix button color in dark mode
                                >
                                    Reset
                                </button>
                                <button
                                    className='text-[1rem] w-full rounded-full py-1 font-semibold'
                                    onClick={() => setIsModalOpen(true)}
                                    style={{
                                        backgroundColor: document.documentElement.classList.contains('dark') ? '#2563eb' : '#3b82f6',
                                        color: '#ffffff',
                                    }} // ✅ Fix button color in dark mode
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddTimestamp isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddData} />
        </motion.div>
    );
};

export default Analytics;
