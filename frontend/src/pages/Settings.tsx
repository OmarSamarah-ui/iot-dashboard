const Settings = ({ theme, setTheme }) => {
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    return (
        <div className='p-6 pt-0'>
            <h1 className='text-2xl font-bold mb-6'>Settings</h1>

            <div className='flex items-center rounded-lg'>
                <span className='mr-4'>Dark Mode</span>
                {/* ✅ Sync Theme with App */}
                <button onClick={toggleTheme} className={`relative w-14 h-7 rounded-full p-1 transition-all duration-300 ${theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'}`}>
                    <span className={`block w-5 h-5 rounded-full bg-white shadow-md transform duration-300 ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`}></span>
                </button>
            </div>
        </div>
    );
};

export default Settings;
