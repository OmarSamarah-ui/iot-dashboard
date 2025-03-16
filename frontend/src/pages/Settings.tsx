import { motion } from 'framer-motion';

const Settings = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <motion.div className='p-6' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <div className='text-2xl font-light tracking-wider flex items-center mb-6'>
                <div className='h-[0.1rem] w-[200px] bg-gray-400'></div>
                <h1 className='mx-3'>SETTINGS</h1> <div className='h-[0.1rem] w-[200px] bg-gray-400'></div>
            </div>

            <div className='flex items-center rounded-lg'>
                <span className='mr-4'>Dark Mode</span>
                {/* ✅ Sync Theme with App */}
                <button onClick={toggleTheme} className={`relative w-14 h-7 rounded-full p-1 transition-all duration-300 ${theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <span className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`}></span>
                </button>
            </div>
        </motion.div>
    );
};

export default Settings;
