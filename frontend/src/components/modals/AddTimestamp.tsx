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

    const isDarkMode = document.documentElement.classList.contains('dark'); // ✅ Detect Dark Mode

    const handleSubmit = () => {
        if (!selectedDate || value === '') return;

        const formattedTimestamp = selectedDate.toISOString();
        console.log('Submitting Timestamp:', formattedTimestamp, 'Value:', value); // Debugging line
        onAdd(formattedTimestamp, parseFloat(value));
        onClose();
    };

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-black/70'>
            <div
                className='p-6 rounded-lg shadow-lg w-96'
                style={{
                    backgroundColor: isDarkMode ? '#1e293b' : '#ffffff', // ✅ Adjust modal background
                    color: isDarkMode ? '#f1f5f9' : '#1e293b', // ✅ Adjust text color
                }}>
                <h2 className='text-lg font-semibold mb-4'>Add New Timestamp</h2>

                {/* Date & Time Picker */}
                <label className='block text-sm font-medium mb-1'>Select Date & Time</label>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    showTimeSelect
                    dateFormat='yyyy-MM-dd HH:mm:ss'
                    className='border p-2 rounded-md shadow-sm w-full'
                    style={{
                        backgroundColor: isDarkMode ? '#374151' : '#f3f4f6', // ✅ Adjust input background
                        color: isDarkMode ? '#f1f5f9' : '#1e293b', // ✅ Adjust text color
                        borderColor: isDarkMode ? '#4b5563' : '#d1d5db', // ✅ Adjust border
                    }}
                />

                {/* Value Input */}
                <label className='block text-sm font-medium mt-4 mb-1'>Enter Value</label>
                <input
                    type='number'
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className='border p-2 rounded-md shadow-sm w-full'
                    placeholder='Enter value'
                    style={{
                        backgroundColor: isDarkMode ? '#374151' : '#f3f4f6', // ✅ Adjust input background
                        color: isDarkMode ? '#f1f5f9' : '#1e293b', // ✅ Adjust text color
                        borderColor: isDarkMode ? '#4b5563' : '#d1d5db', // ✅ Adjust border
                    }}
                />

                {/* Buttons */}
                <div className='flex justify-end space-x-4 mt-6'>
                    <button
                        className='px-4 py-2 rounded-full transition-colors ease-in'
                        style={{
                            backgroundColor: isDarkMode ? '#6b7280' : '#d1d5db', // ✅ Adjust button color
                            color: '#ffffff',
                        }}
                        onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        className='px-4 py-2 rounded-full transition-colors ease-in'
                        style={{
                            backgroundColor: isDarkMode ? '#2563eb' : '#3b82f6', // ✅ Adjust button color
                            color: '#ffffff',
                        }}
                        onClick={handleSubmit}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTimestamp;
