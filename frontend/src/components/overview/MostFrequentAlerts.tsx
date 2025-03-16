import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

const MostFrequentAlerts = () => {
    const [chartData, setChartData] = useState<{
        labels: string[];
        datasets: { label: string; data: number[]; backgroundColor: string }[];
    }>({
        labels: [],
        datasets: [],
    });

    const [isDarkMode, setIsDarkMode] = useState(false);

    Chart.register(...registerables);

    // Detect dark mode
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
        fetch('http://localhost:5000/api/most-frequent-alerts')
            .then((res) => res.json())
            .then((data) => {
                console.log('🚀 API Response:', data);
                if (data.alertTypes && data.alertCounts) {
                    setChartData({
                        labels: data.alertTypes,
                        datasets: [
                            {
                                label: 'Alerts',
                                data: data.alertCounts,
                                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            },
                        ],
                    });
                }
            })
            .catch((error) => console.error('Error fetching chart data:', error));
    }, []);

    // Chart options that change only text labels & ticks
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: isDarkMode ? 'white' : 'black', // ✅ Fixes legend text color
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: isDarkMode ? 'white' : 'black', // ✅ Fixes x-axis text color
                },
            },
            y: {
                ticks: {
                    color: isDarkMode ? 'white' : 'black', // ✅ Fixes y-axis text color
                },
            },
        },
    };

    return (
        <div className='bg-white  p-4 shadow-md rounded-md'>
            <h2 className='text-lg font-semibold mb-2 '>Most Frequent Alerts</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default MostFrequentAlerts;
