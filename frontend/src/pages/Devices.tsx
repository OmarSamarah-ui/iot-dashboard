import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import DeviceCard from '../components/devices/DeviceCard';
import RegisterNewDevice from '../components/modals/RegisterNewDevice';
import DeleteDevice from '../components/modals/DeleteDevice';

interface Device {
    id: number;
    name: string;
    type: string;
    location: string;
    status: 'Active' | 'Inactive';
}

const Devices = () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [showInactive, setShowInactive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deviceToDelete, setDeviceToDelete] = useState<number | null>(null);

    const handleRegisterDevice = async (newDevice) => {
        try {
            const response = await fetch('http://localhost:5000/devices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newDevice),
            });

            if (response.ok) {
                fetchDevices(); // Refresh the devices list after adding
            } else {
                console.error('Failed to add device');
            }
        } catch (error) {
            console.error('Error adding device:', error);
        }
    };

    const handleDeleteDevice = async () => {
        if (!deviceToDelete) return;
        try {
            const response = await fetch(`http://localhost:5000/devices/${deviceToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setDevices(devices.filter((device) => device.id !== deviceToDelete));
                setIsDeleteModalOpen(false);
                setDeviceToDelete(null);
            } else {
                console.error('Failed to delete device');
            }
        } catch (error) {
            console.error('Error deleting device:', error);
        }
    };

    const fetchDevices = async () => {
        try {
            const response = await fetch('http://localhost:5000/devices');
            const data = await response.json();
            setDevices(data); // Update the state with the new data
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <div className='p-6 pt-0'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold'>Devices</h1>
                <button className='fixed top-20 right-12 bg-blue-600 text-white px-4 py-2 rounded-full shadow-md cursor-pointer hover:bg-blue-700 transition-colors ease-in' onClick={() => setIsModalOpen(true)}>
                    + New
                </button>
            </div>

            {/* Active Devices */}
            <AnimatePresence>
                <motion.div className='grid grid-cols-3 gap-6 mb-4' initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                    {devices
                        .filter((device) => device.status === 'Active')
                        .map((device) => (
                            <DeviceCard
                                device={device}
                                onDelete={() => {
                                    setDeviceToDelete(device.id); // Set the device ID
                                    setIsDeleteModalOpen(true); // Open the modal
                                }}
                            />
                        ))}
                </motion.div>
            </AnimatePresence>

            {/* Inactive Devices Toggle */}
            <div className='mb-4 text-gray-500 cursor-pointer flex items-center hover:text-gray-700 transition' onClick={() => setShowInactive(!showInactive)}>
                <span className='mr-1'>Inactive</span> {showInactive ? <FiEyeOff /> : <FiEye />}
            </div>

            {/* Show inactive devices only when toggled */}
            {showInactive && (
                <AnimatePresence>
                    <motion.div className='grid grid-cols-3 gap-6' initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                        {devices
                            .filter((device) => device.status === 'Inactive') // Only Inactive devices
                            .map((device) => (
                                <DeviceCard
                                    device={device}
                                    onDelete={handleDeleteDevice}
                                    onDelete={() => {
                                        setDeviceToDelete(device.id); // Set the device ID
                                        setIsDeleteModalOpen(true); // Open the modal
                                    }}
                                />
                            ))}
                    </motion.div>
                </AnimatePresence>
            )}

            <RegisterNewDevice isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onRegister={handleRegisterDevice} />
            <DeleteDevice isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDeleteDevice} />
        </div>
    );
};

export default Devices;
