import { DiHtml5DeviceAccess } from 'react-icons/di';
import { MdOutlineAnalytics, MdOutlineSettingsInputComponent, MdOutlineSpaceDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className='h-screen w-64 bg-gray-800 text-white p-5 shadow-lg'>
            <h2 className='text-2xl font-semibold mb-5 pl-2'>NxG</h2>
            <ul className='space-y-2 font-medium'>
                <li>
                    <Link to='/' className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                        <MdOutlineSpaceDashboard className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                        <span className='ms-3'>Overview</span>
                    </Link>
                </li>
                <li>
                    <Link to='/devices' className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                        <DiHtml5DeviceAccess className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                        <span className='ms-3'>Devices</span>
                    </Link>
                </li>
                <li>
                    <Link to='/analytics' className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                        <MdOutlineAnalytics className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                        <span className='ms-3'>Analytics</span>
                    </Link>
                </li>
                <li>
                    <Link to='/settings' className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                        <MdOutlineSettingsInputComponent className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                        <span className='ms-3'>Settings</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
