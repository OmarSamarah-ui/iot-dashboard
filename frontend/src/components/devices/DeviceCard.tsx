import { IoAnalytics } from 'react-icons/io5';
import { MdOutlineDeleteOutline } from 'react-icons/md';

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
    return (
        <div className='p-4 border rounded-md shadow-md bg-white'>
            <h2 className='text-lg font-semibold'>{device.name}</h2>
            <p className='text-gray-600'>{device.type}</p>
            <p className='text-[0.8rem] text-gray-500'>{device.location}</p>
            <div className='flex justify-between items-center mt-4'>
                <span className={`inline-block px-3 py-1 text-sm rounded-full ${device.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>{device.status}</span>
                <div className='flex items-center space-x-2'>
                    <button className='w-7 h-7 rounded-full flex items-center justify-center text-white bg-red-600 hover:bg-red-700 transition-colors ease-in'>
                        <MdOutlineDeleteOutline onClick={onDelete} />
                    </button>
                    <button className='w-7 h-7 rounded-full flex items-center justify-center text-white bg-gray-600 hover:bg-gray-700 transition-colors ease-in'>
                        <IoAnalytics />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeviceCard;
