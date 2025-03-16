import { BsSun, BsMoon } from 'react-icons/bs';
import { FiMenu, FiX } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { MdOutlineAnalytics, MdOutlineSettingsInputComponent, MdOutlineSpaceDashboard } from 'react-icons/md';
import { DiHtml5DeviceAccess } from 'react-icons/di';

const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className='bg-gray-800 dark:bg-gray-900 w-full fixed top-0 left-0 text-white h-14 shadow-lg flex items-center px-6 z-50'>
            <div className='flex justify-between items-center w-full'>
                {/* Logo */}
                <h1 className='text-xl font-bold'>NxG</h1>

                {/* Desktop Links */}
                <ul className='hidden md:flex space-x-6'>
                    <li>
                        <Link to='/' className='hover:text-gray-300'>
                            Overview
                        </Link>
                    </li>
                    <li>
                        <Link to='/devices' className='hover:text-gray-300'>
                            Devices
                        </Link>
                    </li>
                    <li>
                        <Link to='/analytics' className='hover:text-gray-300'>
                            Analytics
                        </Link>
                    </li>
                    <li>
                        <Link to='/settings' className='hover:text-gray-300'>
                            Settings
                        </Link>
                    </li>
                    <li>
                        <button onClick={toggleTheme} className='hover:text-gray-300'>
                            {theme === 'dark' ? <BsSun size={20} /> : <BsMoon size={20} />}
                        </button>
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <button className='md:hidden' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <ul className='absolute top-14 left-0 w-full bg-gray-800 dark:bg-gray-900 p-4 flex flex-col items-center space-y-4 md:hidden'>
                    <li>
                        <Link to='/' className='flex items-center p-2 rounded-lg hover:bg-gray-700'>
                            <MdOutlineSpaceDashboard className='w-5 h-5' />
                            <span className='ml-3'>Overview</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/devices' className='flex items-center p-2 rounded-lg hover:bg-gray-700'>
                            <DiHtml5DeviceAccess className='w-5 h-5' />
                            <span className='ml-3'>Devices</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/analytics' className='flex items-center p-2 rounded-lg hover:bg-gray-700'>
                            <MdOutlineAnalytics className='w-5 h-5' />
                            <span className='ml-3'>Analytics</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/settings' className='flex items-center p-2 rounded-lg hover:bg-gray-700'>
                            <MdOutlineSettingsInputComponent className='w-5 h-5' />
                            <span className='ml-3'>Settings</span>
                        </Link>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
