import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { ResponsiveContainer } from 'recharts';

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
            },
            y: {
                ticks: {
                    color: isDarkMode ? 'white' : 'black',
                },
            },
        },
    };

    return (
        <div className='bg-white  p-4 shadow-md rounded-md'>
            <h2 className='text-lg font-semibold mb-2 '>Most Frequent Alerts</h2>
            <ResponsiveContainer width='100%' height={400}>
                <Bar data={chartData} options={chartOptions} />
            </ResponsiveContainer>
        </div>
    );
};

export default MostFrequentAlerts;
