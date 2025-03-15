import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

const RangeDatePicker = ({ selectedDate, setSelectedDate, placeholder }) => {
    return (
        <DatePicker
            selected={selectedDate ? new Date(selectedDate) : null} // Ensure it's a Date object
            onChange={(date) => setSelectedDate(format(date, 'yyyy-MM-dd'))} // Store formatted date
            dateFormat='yyyy-MM-dd'
            placeholderText={placeholder}
            className='border p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none bg-gray-100'
        />
    );
};

export default RangeDatePicker;
