import { utils, writeFile } from 'xlsx';

interface OverviewData {
    [key: string]: unknown;
}

interface ChartData {
    message: string;
}

interface TableData {
    message: string;
}

type ExportFormat = 'json' | 'csv' | 'excel';

const exportData = (overviewData: OverviewData | OverviewData[], chartData: ChartData[] = [], tableData: TableData[] = [], format: ExportFormat) => {
    const formattedOverviewData = Array.isArray(overviewData) ? [...overviewData] : [overviewData];

    const formattedChartData = chartData.length ? chartData : [{ message: 'No chart data available' }];
    const formattedTableData = tableData.length ? tableData : [{ message: 'No table data available' }];

    const dataToExport = {
        Overview: formattedOverviewData,
        Charts: formattedChartData,
        Tables: formattedTableData,
    };

    console.log('📌 Final Data to Export:', dataToExport);

    if (format === 'json') {
        const jsonString = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'overview_data.json';
        link.click();
    } else if (format === 'csv' || format === 'excel') {
        const workbook = utils.book_new();
        (Object.keys(dataToExport) as (keyof typeof dataToExport)[]).forEach((sheetName) => {
            const worksheet = utils.json_to_sheet(Array.isArray(dataToExport[sheetName]) ? dataToExport[sheetName] : []);
            utils.book_append_sheet(workbook, worksheet, sheetName);
        });
        writeFile(workbook, `overview_data.${format === 'csv' ? 'csv' : 'xlsx'}`);
    }
};

export default exportData;
