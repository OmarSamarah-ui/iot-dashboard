import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface DeviceActivityEntry {
    date: string;
    active_devices: number;
}

const DeviceActivityChart = () => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; backgroundColor: string; borderColor: string; fill: boolean; tension: number }[];
    }>({
        labels: [],
        datasets: [],
    });

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        checkDarkMode();

        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/api/device-activity')
            .then((res) => res.json())
            .then((data: DeviceActivityEntry[]) => {
                console.log('🚀 Device Activity API Response:', data);

                if (!data || data.length === 0) {
                    console.warn('⚠ No activity data available.');
                    return;
                }

                setChartData({
                    labels: data.map((entry: DeviceActivityEntry) => new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
                    datasets: [
                        {
                            label: 'Active Devices',
                            data: data.map((entry: DeviceActivityEntry) => entry.active_devices),
                            borderColor: 'blue',
                            backgroundColor: 'rgba(0, 123, 255, 0.2)',
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });
            })
            .catch((error) => console.error('❌ Error fetching device activity:', error));
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: isDarkMode ? 'white' : 'black',
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDarkMode ? 'white' : 'black',
                },
                grid: {
                    color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                },
            },
            y: {
                ticks: {
                    color: isDarkMode ? 'white' : 'black',
                },
                grid: {
                    color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
                },
            },
        },
    };

    return (
        <div className='bg-white p-4 shadow-lg rounded-lg'>
            <h2 className='text-lg font-semibold mb-2'>Device Activity (Last 7 Days)</h2>

            {chartData.labels.length > 0 ? (
                <div style={{ width: '100%', height: '400px' }} className='flex items-center justify-center'>
                    <Line data={chartData} options={chartOptions} />
                </div>
            ) : (
                <p className='text-gray-500'>No activity data available.</p>
            )}
        </div>
    );
};

export default DeviceActivityChart;
