import { DiHtml5DeviceAccess } from 'react-icons/di';
import { MdOutlineAnalytics, MdOutlineSettingsInputComponent, MdOutlineSpaceDashboard } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className='hidden lg:block h-screen w-64 bg-gray-800 text-white p-5 shadow-lg'>
            <h2 className='text-2xl font-semibold mb-5 pl-2'>NxG</h2>

            <ul className='space-y-2 font-medium'>
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
        </aside>
    );
};

export default Sidebar;
