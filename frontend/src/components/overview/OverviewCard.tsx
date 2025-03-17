import { useTheme } from '../../context/ThemeContext';

interface OverviewCardProps {
    title: string;
    value: number | string;
    bg: string;
    darkBg: string;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, bg, darkBg }) => {
    const { theme } = useTheme() as { theme: string };

    return (
        <div
            className='p-4 shadow-lg rounded-lg transition-all duration-300'
            style={{
                backgroundColor: theme === 'dark' ? darkBg : bg,
                color: theme === 'dark' ? 'white' : 'black',
            }}>
            <h2 className='text-lg font-semibold mb-2'>{title}</h2>
            <p className='text-[3rem] font-bold'>{value}</p>
        </div>
    );
};

export default OverviewCard;
