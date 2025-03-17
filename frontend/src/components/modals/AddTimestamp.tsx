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

    const isDarkMode = document.documentElement.classList.contains('dark');

    const handleSubmit = () => {
        if (!selectedDate || value === '') return;

        const formattedTimestamp = selectedDate.toISOString();
        console.log('Submitting Timestamp:', formattedTimestamp, 'Value:', value);
        onAdd(formattedTimestamp, parseFloat(value));
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70'>
            <div
                className={`p-6 rounded-lg shadow-lg w-96 
        ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
                <h2 className='text-lg font-semibold mb-4'>Add New Timestamp</h2>

                {/* Date & Time Picker */}
                <label className='block text-sm font-medium mb-1'>Select Date & Time</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    dateFormat='yyyy-MM-dd HH:mm:ss'
                    className={`border p-2 rounded-md shadow-sm w-full 
        ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                />

                {/* Value Input */}
                <label className='block text-sm font-medium mt-4 mb-1'>Enter Value</label>
                <input
                    type='number'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={`border p-2 rounded-md shadow-sm w-full 
        ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                    placeholder='Enter value'
                />

                {/* Buttons */}
                <div className='flex justify-end space-x-4 mt-6'>
                    <button
                        className={`px-4 py-2 rounded-full transition-colors ease-in 
        ${isDarkMode ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-300 text-black hover:bg-gray-400'} `}
                        onClick={onClose}>
                        Cancel
                    </button>

                    <button className={`px-4 py-2 rounded-full transition-colors ease-in bg-blue-600 hover:bg-blue-700 text-white`} onClick={handleSubmit}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTimestamp;
