import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RangeDatePicker = ({ selectedDate, setSelectedDate, placeholder }: { selectedDate: Date | null; setSelectedDate: (date: Date | null) => void; placeholder?: string }) => {
    return <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat='yyyy-MM-dd' placeholderText={placeholder} className='border p-2 rounded-md shadow-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none' />;
};

export default RangeDatePicker;
