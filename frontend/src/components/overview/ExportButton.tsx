import { FaFileCsv, FaFileExcel, FaFileCode } from 'react-icons/fa';
import exportData from '../../utils/exportData';

const ExportButton = ({ overviewData }) => {
    return (
        <div className='flex items-center space-x-3 bg-gray-400  p-2 rounded-md shadow-md'>
            <button onClick={() => exportData(overviewData, [], [], 'json')} className='p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-all flex items-center space-x-2'>
                <FaFileCode size={20} />
            </button>

            <button onClick={() => exportData(overviewData, [], [], 'csv')} className='p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition-all flex items-center space-x-2'>
                <FaFileCsv size={20} />
            </button>

            <button onClick={() => exportData(overviewData, [], [], 'excel')} className='p-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition-all flex items-center space-x-2'>
                <FaFileExcel size={20} />
            </button>
        </div>
    );
};

export default ExportButton;
