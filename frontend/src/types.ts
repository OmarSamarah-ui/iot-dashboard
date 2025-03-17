export interface OverviewData {
    totalDevices: number;
    activeDevices: number;
    inactiveDevices: number;
    avgTemperature: number;
    avgHumidity: number;
    recentAlerts: number;
    [key: string]: number;
}
