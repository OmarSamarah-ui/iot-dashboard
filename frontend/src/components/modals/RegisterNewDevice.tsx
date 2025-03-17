import { useForm, SubmitHandler } from 'react-hook-form';
import { motion } from 'framer-motion';

export interface Device {
    id: number;
    name: string;
    type: string;
    location: string;
    status: 'Active' | 'Inactive';
}

interface RegisterNewDeviceProps {
    isOpen: boolean;
    onClose: () => void;
    onRegister: (device: Device) => Promise<void>;
}

const RegisterNewDevice: React.FC<RegisterNewDeviceProps> = ({ isOpen, onClose, onRegister }) => {
    const { register, handleSubmit, reset } = useForm<Omit<Device, 'id' | 'status'>>();

    const onSubmit: SubmitHandler<Omit<Device, 'id' | 'status'>> = (data) => {
        onRegister({
            id: Date.now(),
            status: 'Active',
            ...data,
        });
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70 z-50'>
            <motion.div className='bg-white p-6 rounded-lg shadow-lg w-96' initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}>
                <h2 className='text-xl font-semibold mb-4'>Register New Device</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Device Name</label>
                        <input {...register('name', { required: true })} className='w-full px-3 py-2 border rounded-md' placeholder='Enter device name' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Type</label>
                        <input {...register('type', { required: true })} className='w-full px-3 py-2 border rounded-md' placeholder='Enter device type' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Location</label>
                        <input {...register('location', { required: true })} className='w-full px-3 py-2 border rounded-md' placeholder='Enter location' />
                    </div>

                    <div className='flex justify-end space-x-2 mt-7'>
                        <button type='button' className='px-4 py-2 text-gray-600 bg-gray-200 rounded-full ' onClick={onClose}>
                            Cancel
                        </button>
                        <button type='submit' className='px-4 py-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors ease-in'>
                            Register
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default RegisterNewDevice;
