import Select, { StylesConfig, SingleValue } from 'react-select';

type Device = {
    id: number;
    name: string;
};

type DeviceOption = {
    value: number;
    label: string;
};

type DeviceDropdownProps = {
    devices: Device[];
    selectedDeviceId: number | null;
    setSelectedDeviceId: (id: number | null) => void;
};

const DeviceDropdown = ({ devices, selectedDeviceId, setSelectedDeviceId }: DeviceDropdownProps) => {
    const options: DeviceOption[] = devices.map((device) => ({
        value: device.id,
        label: device.name,
    }));

    const customStyles: StylesConfig<DeviceOption, false> = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#f3f4f6',
            borderColor: state.isFocused ? '#2563eb' : '#d1d5db',
            boxShadow: state.isFocused ? '0 0 0 2px rgba(37, 99, 235, 0.3)' : 'none',
            '&:hover': {
                borderColor: '#2563eb',
            },
            padding: '5px',
            cursor: 'pointer',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#2563eb' : '#fff',
            color: state.isFocused ? '#fff' : '#374151',
            padding: '10px',
            cursor: 'pointer',
        }),
    };

    return (
        <Select
            options={options}
            value={options.find((option) => option.value === selectedDeviceId)}
            onChange={(selectedOption: SingleValue<DeviceOption>) => setSelectedDeviceId(selectedOption?.value ?? null)}
            placeholder='Select a Device...'
            styles={customStyles}
        />
    );
};

export default DeviceDropdown;
