import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AddTimestampProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (timestamp: string, value: number) => void;
}

const AddTimestamp: React.FC<AddTimestampProps> = ({ isOpen, onClose, onAdd }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [value, setValue] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!selectedDate || value === '') return;

        const formattedTimestamp = selectedDate.toISOString();
        console.log('Submitting Timestamp:', formattedTimestamp, 'Value:', value); // Debugging line
        onAdd(formattedTimestamp, parseFloat(value));
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70'>
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
                <h2 className='text-lg font-semibold mb-4'>Add New Timestamp</h2>

                {/* Date & Time Picker */}
                <label className='block text-sm font-medium text-gray-700 mb-1'>Select Date & Time</label>
                <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} showTimeSelect dateFormat='yyyy-MM-dd HH:mm:ss' className='border p-2 rounded-md shadow-sm w-full bg-gray-100' />

                {/* Value Input */}
                <label className='block text-sm font-medium text-gray-700 mt-4 mb-1'>Enter Value</label>
                <input type='number' value={value} onChange={(e) => setValue(e.target.value)} className='border p-2 rounded-md shadow-sm w-full bg-gray-100' placeholder='Enter value' />

                {/* Buttons */}
                <div className='flex justify-end space-x-4 mt-6'>
                    <button className='px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-full' onClick={onClose}>
                        Cancel
                    </button>
                    <button className='px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-full' onClick={handleSubmit}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTimestamp;
