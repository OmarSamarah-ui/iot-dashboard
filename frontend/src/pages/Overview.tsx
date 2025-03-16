import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // ✅ Import Framer Motion
import OverviewCard from '../components/overview/OverviewCard';
import DeviceActivityChart from '../components/overview/DeviceActivityChart';
import AlertsChart from '../components/overview/AlertsChart';
import RecentEventsTable from '../components/overview/RecentEventsTable';
import MostFrequentAlerts from '../components/overview/MostFrequentAlerts';
import ExportButton from '../components/overview/ExportButton';

const Overview = () => {
    interface OverviewData {
        totalDevices: number;
        activeDevices: number;
        inactiveDevices: number;
        avgTemperature: number;
        avgHumidity: number;
        recentAlerts: number;
    }

    const [overviewData, setOverviewData] = useState<OverviewData>({
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
                console.log('🚀 Overview API Response:', data);

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='p-6'>
            {/* Animated Title */}
            <motion.div className='mb-6 flex flex-col items-center justify-between sm:flex-row' initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
                <div className='text-2xl font-light tracking-wider flex items-center mb-4 sm:mb-0'>
                    <div className='h-[0.1rem] lg:w-[200px] w-[100px] bg-gray-400'></div>
                    <h1 className='mx-3'>OVERVIEW</h1>
                    <div className='h-[0.1rem] lg:w-[200px] w-[100px] bg-gray-400'></div>
                </div>
                <div className='flex justify-end mb-4'>
                    <ExportButton overviewData={overviewData} />
                </div>
            </motion.div>

            {/* Animated Overview Cards */}
            <motion.div
                className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8'
                initial='hidden'
                animate='visible'
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 },
                    },
                }}>
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <OverviewCard title='Total devices' value={overviewData.totalDevices} bg='#D1D5DB' darkBg='#4B5563' />
                </motion.div>
                <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <OverviewCard title='Active devices' value={overviewData.activeDevices} bg='#86EFAC' darkBg='#15803D' />
                </motion.div>
                <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <OverviewCard title='Inactive devices' value={overviewData.inactiveDevices} bg='#F87171' darkBg='#7F1D1D' />
                </motion.div>
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                    <OverviewCard title='Recent alerts (24h)' value={overviewData.recentAlerts} bg='#FCD34D' darkBg='#B45309' />
                </motion.div>
            </motion.div>

            {/* Animated Charts */}
            <motion.div className='grid grid-cols-1 lg:grid-cols-2 gap-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}>
                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                    <DeviceActivityChart />
                </motion.div>
                <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                    <AlertsChart />
                </motion.div>
            </motion.div>

            {/* Animated Tables */}
            <motion.div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }}>
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                    <RecentEventsTable />
                </motion.div>
                <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}>
                    <MostFrequentAlerts />
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Overview;
