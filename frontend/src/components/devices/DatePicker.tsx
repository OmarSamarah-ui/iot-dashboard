import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const RangeDatePicker = ({ selectedDate, setSelectedDate, placeholder }) => {
    const isDarkMode = document.documentElement.classList.contains('dark'); // ✅ Detect Dark Mode

    return (
        <DatePicker
            selected={selectedDate ? new Date(selectedDate) : null} // Ensure it's a Date object
            onChange={(date) => setSelectedDate(format(date, 'yyyy-MM-dd'))} // Store formatted date
            dateFormat='yyyy-MM-dd'
            placeholderText={placeholder}
            className='border p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none'
            style={{
                backgroundColor: isDarkMode ? '#374151' : '#ffffff', // ✅ Background changes in dark mode
                color: isDarkMode ? '#f1f5f9' : '#1e293b', // ✅ Text color adjusts in dark mode
            }}
        />
    );
};

export default RangeDatePicker;
