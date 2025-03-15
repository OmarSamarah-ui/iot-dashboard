import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='bg-gray-800 w-1/2 rounded-full fixed top-3 left-1/2 transform -translate-x-1/2 text-white h-10 shadow-lg flex items-center px-10'>
            <div className='flex justify-between items-center w-full px-4'>
                {/* Logo */}
                <h1 className='text-xl font-bold'>NxG</h1>

                {/* Desktop Links */}
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
                </ul>

                {/* Mobile Menu Button */}
                <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <ul className='md:hidden mt-2 space-y-2 bg-blue-700 p-4 rounded'>
                    <li>
                        <a href='#' className='block py-2 hover:text-gray-300'>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href='#' className='block py-2 hover:text-gray-300'>
                            Devices
                        </a>
                    </li>
                    <li>
                        <a href='#' className='block py-2 hover:text-gray-300'>
                            Analytics
                        </a>
                    </li>
                    <li>
                        <a href='#' className='block py-2 hover:text-gray-300'>
                            Settings
                        </a>
                    </li>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
