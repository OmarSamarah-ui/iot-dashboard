import { FaFileCsv, FaFileExcel, FaFileCode } from 'react-icons/fa';
import exportData from '../../utils/exportData';
import { OverviewData } from '../../types';

const ExportButton = ({ overviewData }: { overviewData: OverviewData }) => {
    return (
        <div className='flex items-center space-x-3 bg-gray-400  p-2 rounded-md shadow-md'>
            <button title='Export as JSON' onClick={() => exportData(overviewData, [], [], 'json')} className='p-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-all flex items-center space-x-2'>
                <FaFileCode size={20} />
            </button>

            <button title='Export as CSV' onClick={() => exportData(overviewData, [], [], 'csv')} className='p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 text-white transition-all flex items-center space-x-2'>
                <FaFileCsv size={20} />
            </button>

            <button title='Export as Excel' onClick={() => exportData(overviewData, [], [], 'excel')} className='p-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition-all flex items-center space-x-2'>
                <FaFileExcel size={20} />
            </button>
        </div>
    );
};

export default ExportButton;
