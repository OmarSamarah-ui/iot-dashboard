import { useEffect, useState } from 'react';

const RecentEventsTable = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/recent-events')
            .then((res) => res.json())
            .then((data) => setEvents(data))
            .catch((error) => console.error('Error fetching events:', error));
    }, []);

    return (
        <div className='bg-white p-4 shadow-md rounded-md'>
            <h2 className='text-lg font-semibold mb-2'>Recent Events</h2>
            <div className='max-h-[400px] overflow-y-auto'>
                <table className='w-full text-left'>
                    <thead className='sticky top-0 bg-white shadow-md'>
                        <tr>
                            <th className='border-b p-2'>Timestamp</th>
                            <th className='border-b p-2'>Event</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event, index) => (
                            <tr key={index}>
                                <td className='border-b p-2'>{event.timestamp}</td>
                                <td className='border-b p-2'>{event.event_message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentEventsTable;
