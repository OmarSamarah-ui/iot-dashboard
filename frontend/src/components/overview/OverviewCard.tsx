import { useTheme } from '../../context/ThemeContext';

const OverviewCard = ({ title, value, bg, darkBg }) => {
    const { theme } = useTheme();

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
