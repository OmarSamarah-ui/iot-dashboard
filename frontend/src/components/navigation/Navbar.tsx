import { FiMenu, FiX } from 'react-icons/fi';
import { BsSun, BsMoon } from 'react-icons/bs';
import { useTheme } from '../../context/ThemeContext'; // ✅ Import Theme Context

const Navbar = () => {
    const { theme, setTheme } = useTheme(); // ✅ Get theme from context

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className='bg-gray-800 dark:bg-gray-900 w-1/2 rounded-full fixed top-3 left-1/2 transform -translate-x-1/2 text-white h-10 shadow-lg flex items-center px-10'>
            <div className='flex justify-between items-center w-full px-4'>
                <h1 className='text-xl font-bold'>NxG</h1>
                <ul className='hidden md:flex space-x-6'>
                    <li>
                        <a href='#' className='hover:text-gray-300'>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href='#' className='hover:text-gray-300'>
                            Devices
                        </a>
                    </li>
                    <li>
                        <a href='#' className='hover:text-gray-300'>
                            Analytics
                        </a>
                    </li>
                    <li>
                        <a href='#' className='hover:text-gray-300'>
                            Settings
                        </a>
                    </li>
                    <li>
                        <button onClick={toggleTheme} className='hover:text-gray-300'>
                            {theme === 'dark' ? <BsSun size={20} /> : <BsMoon size={20} />}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
