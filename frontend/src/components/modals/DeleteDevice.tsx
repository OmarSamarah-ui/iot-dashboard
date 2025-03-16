interface DeleteDeviceProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteDevice: React.FC<DeleteDeviceProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <h2 className='text-lg font-semibold mb-4'>Confirm Deletion</h2>
                <p className=''>Are you sure you want to delete this device? This action cannot be undone.</p>
                <div className='flex justify-end space-x-4 mt-6'>
                    <button className='px-4 py-2 text-white rounded-full bg-gray-600 hover:bg-gray-700 transition-colors ease-in0' onClick={onClose}>
                        Cancel
                    </button>
                    <button className='px-4 py-2 text-white rounded-full bg-red-600 hover:bg-red-700 transition-colors ease-in' onClick={onConfirm}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDevice;
