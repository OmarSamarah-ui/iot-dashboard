import { IoAnalytics } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Device {
    id: number;
    name: string;
    type: string;
    location: string;
    status: 'Active' | 'Inactive';
}

interface DeviceCardProps {
    device: Device;
    onDelete: (id: number) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onDelete }) => {
    const navigate = useNavigate();
    const isDarkMode = document.documentElement.classList.contains('dark');

    const handleAnalyticsClick = () => {
        navigate(`/analytics?deviceId=${device.id}`);
    };

    return (
        <div
            className='p-4 border rounded-md shadow-md'
            style={{
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                color: isDarkMode ? '#f1f5f9' : '#1e293b',
            }}>
            <h2>{device.name}</h2>
            <p style={{ color: isDarkMode ? '#cbd5e1' : '#4b5563' }}>{device.type}</p>
            <p style={{ color: isDarkMode ? '#94a3b8' : '#6b7280' }}>{device.location}</p>
            <div className='flex justify-between items-center mt-4'>
                <span
                    className='inline-block px-3 py-1 text-sm rounded-full'
                    style={{
                        backgroundColor: device.status === 'Active' ? (isDarkMode ? '#16a34a' : '#bbf7d0') : isDarkMode ? '#dc2626' : '#fecaca',
                        color: isDarkMode ? '#ffffff' : '#1e293b',
                    }}>
                    {device.status}
                </span>
                <div className='flex items-center space-x-2'>
                    <button title='Delete device' className='w-7 h-7 rounded-full flex items-center justify-center text-white bg-red-600 hover:bg-red-700 transition-colors ease-in' onClick={() => onDelete(device.id)}>
                        <MdOutlineDeleteOutline />
                    </button>
                    <button title='Check device chart' className='w-7 h-7 rounded-full flex items-center justify-center text-white bg-gray-600 hover:bg-gray-700 transition-colors ease-in' onClick={handleAnalyticsClick}>
                        <IoAnalytics />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeviceCard;
