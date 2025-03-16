import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const AlertsChart = () => {
    const [chartData, setChartData] = useState<any>(null);
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
        fetch('http://localhost:5000/api/sensor-alerts')
            .then((res) => res.json())
            .then((data) => {
                if (data && Object.keys(data).length > 0) {
                    const alertTypes = Object.keys(data);
                    const alertCounts = Object.values(data);

                    const lightThemeColors = ['#A4C3B2', '#779CAB', '#E4C1F9', '#F6BD60', '#A9DEF9', '#B7E4C7', '#D8A7B1', '#F2E9E4', '#C8B6A6', '#9CAFAA'];

                    const darkThemeColors = ['#3E6259', '#556E7F', '#7D5BA6', '#B7791F', '#2563EB', '#3B82F6', '#9D174D', '#4B5563', '#6B7280', '#374151'];

                    setChartData({
                        labels: alertTypes,
                        datasets: [
                            {
                                label: 'Alert Types',
                                data: alertCounts,
                                backgroundColor: isDarkMode ? darkThemeColors : lightThemeColors,
                            },
                        ],
                    });
                } else {
                    console.error('❌ Invalid API Data:', data);
                }
            })
            .catch((error) => console.error('❌ Error fetching alerts data:', error));
    }, [isDarkMode]);

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
        layout: {
            padding: 10,
        },
        backgroundColor: isDarkMode ? 'transparent' : 'white',
    };

    if (!chartData) {
        return <p className='text-black dark:text-white'>Loading chart...</p>;
    }

    return (
        <div className='bg-white p-4 shadow-lg rounded-lg'>
            <h2 className='text-lg font-semibold mb-2'>Sensor Alerts Breakdown</h2>
            <div style={{ width: '100%', height: '400px', backgroundColor: isDarkMode ? 'transparent' : 'white' }} className='flex items-center justify-center'>
                <Pie data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default AlertsChart;
