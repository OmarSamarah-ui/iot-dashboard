import { useEffect, useState } from 'react';
import DeviceChart from '../components/devices/DeviceChart';
import DeviceDropdown from '../components/devices/DeviceDropdown';
import DatePicker from '../components/devices/DatePicker';
import { useSearchParams } from 'react-router-dom';
import AddTimestamp from '../components/modals/AddTimestamp';
import { motion } from 'framer-motion';
import { baseUrl } from '../utils/baseUrl';

const Analytics = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [chartData, setChartData] = useState([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchParams] = useSearchParams();
    const urlDeviceId = searchParams.get('deviceId');

    const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(urlDeviceId ? parseInt(urlDeviceId) : null);

    interface Device {
        id: number;
        name: string;
        type: string;
        location: string;
        status: string;
    }

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await fetch(`${baseUrl}/devices`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data: Device[] = await response.json();
                setDevices(data);

                if (data.length > 0) {
                    const validDeviceId = urlDeviceId && data.some((device: Device) => device.id === parseInt(urlDeviceId));
                    setSelectedDeviceId(validDeviceId ? parseInt(urlDeviceId) : data[0].id);
                }
            } catch (error) {
                console.error('❌ Error fetching devices:', error);
            }
        };

        fetchDevices();
    }, [urlDeviceId]);

    useEffect(() => {
        if (selectedDeviceId) {
            fetchDeviceData(selectedDeviceId, startDate ? startDate.toISOString().split('T')[0] : undefined, endDate ? endDate.toISOString().split('T')[0] : undefined);
        }
    }, [selectedDeviceId, startDate, endDate]);

    const fetchDeviceData = async (deviceId: number, startDate?: string, endDate?: string) => {
        if (!deviceId) return;

        const params = new URLSearchParams();
        if (startDate) params.append('start', startDate);
        if (endDate) params.append('end', endDate);

        try {
            const response = await fetch(`${baseUrl}/devices/${deviceId}/data?${params.toString()}`);
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

        const formattedTimestamp = new Date(timestamp).toISOString().replace('T', ' ').replace('Z', '');

        try {
            const response = await fetch(`${baseUrl}/devices/${selectedDeviceId}/data`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ timestamp: formattedTimestamp, value }),
            });

            if (response.ok) {
                console.log('✅ Data Added Successfully!');
                fetchDeviceData(selectedDeviceId, startDate ? startDate.toISOString().split('T')[0] : undefined, endDate ? endDate.toISOString().split('T')[0] : undefined);
            } else {
                console.error('❌ Failed to add data:', await response.text());
            }
        } catch (error) {
            console.error('❌ Error adding data:', error);
        }
    };

    const resetTimeRange = () => {
        setStartDate(null);
        setEndDate(null);
        fetchDeviceData(selectedDeviceId ?? 0, '', '');
    };

    return (
        <motion.div className='p-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <div className='text-2xl font-light tracking-wider flex items-center mb-10'>
                <div className='h-[0.1rem] w-[200px] bg-gray-400'></div>
                <h1 className='mx-3'>ANALYTICS</h1> <div className='h-[0.1rem] w-[200px] bg-gray-400'></div>
            </div>
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
                            backgroundColor: document.documentElement.classList.contains('dark') ? '#1e293b' : '#e5e7eb',
                            color: document.documentElement.classList.contains('dark') ? '#f1f5f9' : '#1e293b',
                        }}>
                        <h2 className='text-lg font-semibold text-center sm:text-start'>Time Range</h2>
                        <div className='flex flex-col space-y-3 items-center justify-between lg:flex-col lg:space-y-4 space-x-1 sm:flex-row'>
                            <DatePicker selectedDate={startDate} setSelectedDate={setStartDate} placeholder='Start Date' />
                            <DatePicker selectedDate={endDate} setSelectedDate={setEndDate} placeholder='End Date' />
                            <div className='flex lg:flex-col items-center lg:mt-3 w-[50%] sm:w-[40%] lg:w-full gap-2'>
                                <button
                                    title='Reset time range'
                                    onClick={resetTimeRange}
                                    className='text-[1rem] w-full rounded-full py-1 font-semibold lg:mb-3 mb-0'
                                    style={{
                                        backgroundColor: document.documentElement.classList.contains('dark') ? '#6b7280' : '#9ca3af',
                                        color: '#ffffff',
                                    }}>
                                    Reset
                                </button>
                                <button
                                    title='Add new timestamp'
                                    className='text-[1rem] w-full rounded-full py-1 font-semibold'
                                    onClick={() => setIsModalOpen(true)}
                                    style={{
                                        backgroundColor: document.documentElement.classList.contains('dark') ? '#2563eb' : '#3b82f6',
                                        color: '#ffffff',
                                    }}>
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
