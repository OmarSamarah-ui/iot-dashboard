import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

const DeviceActivityChart = () => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; backgroundColor: string }[];
    }>({
        labels: [],
        datasets: [],
    });
    Chart.register(...registerables);

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const checkDarkMode = () => {
            setIsDarkMode(document.documentElement.classList.contains('dark'));
        };

        checkDarkMode(); // Run on mount

        // Listen for class changes on <html>
        const observer = new MutationObserver(checkDarkMode);
        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/api/device-activity')
            .then((res) => res.json())
            .then((data) => {
                console.log('🚀 Device Activity API Response:', data); // Debugging

                if (!data || data.length === 0) {
                    console.warn('⚠ No activity data available.');
                    return;
                }

                setChartData({
                    labels: data.map((entry) => new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })), // Formats as "Mar 13"
                    datasets: [
                        {
                            label: 'Active Devices',
                            data: data.map((entry) => entry.active_devices),
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
                    color: isDarkMode ? 'white' : 'black', // Change legend text color
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDarkMode ? 'white' : 'black', // Change x-axis text color
                },
                grid: {
                    color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', // Change x-axis grid color
                },
            },
            y: {
                ticks: {
                    color: isDarkMode ? 'white' : 'black', // Change y-axis text color
                },
                grid: {
                    color: isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', // Change y-axis grid color
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
