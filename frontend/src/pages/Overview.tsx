import { useEffect, useState } from 'react';
import OverviewCard from '../components/overview/OverviewCard';
import DeviceActivityChart from '../components/overview/DeviceActivityChart';
import AlertsChart from '../components/overview/AlertsChart';
import RecentEventsTable from '../components/overview/RecentEventsTable';
import MostFrequentAlerts from '../components/overview/MostFrequentAlerts';

const Overview = () => {
    const [overviewData, setOverviewData] = useState({
        totalDevices: 0,
        activeDevices: 0,
        inactiveDevices: 0,
        avgTemperature: 0,
        avgHumidity: 0,
        recentAlerts: 0,
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/overview-metrics')
            .then((res) => res.json())
            .then((data) => {
                console.log('🚀 Overview API Response:', data); // Debugging log

                setOverviewData({
                    totalDevices: data.total_devices || 0,
                    activeDevices: data.online_devices || 0,
                    inactiveDevices: data.offline_devices || 0,
                    avgTemperature: data.avg_temperature || 0,
                    avgHumidity: data.avg_humidity || 0,
                    recentAlerts: data.alerts_last_24h || 0,
                });
            })
            .catch((error) => console.error('❌ Error fetching dashboard overview:', error));
    }, []);

    return (
        <div className='p-6 pt-0'>
            <h1 className='text-2xl font-bold mb-6'>Overview</h1>

            {/* Overview Cards */}
            <div className='grid grid-cols-4 gap-4 mb-8'>
                <OverviewCard title='Total devices' value={overviewData.totalDevices} bg='#D1D5DB' darkBg='#4B5563' />
                <OverviewCard title='Active devices' value={overviewData.activeDevices} bg='#86EFAC' darkBg='#15803D' />
                <OverviewCard title='Inactive devices' value={overviewData.inactiveDevices} bg='#F87171' darkBg='#7F1D1D' />
                <OverviewCard title='Recent alerts (24h)' value={overviewData.recentAlerts} bg='#FCD34D' darkBg='#B45309' />
            </div>

            {/* Charts and Tables */}
            <div className='grid grid-cols-2 gap-6'>
                <DeviceActivityChart />
                <AlertsChart />
            </div>

            <div className='grid grid-cols-2 gap-6 mt-6'>
                <RecentEventsTable />
                <MostFrequentAlerts />
            </div>
        </div>
    );
};

export default Overview;
