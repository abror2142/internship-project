import {} from "react-select";
import Select from 'react-select';
import { useTheme } from "../../../hooks/useTheme";

const typeOptions = [
    {label: "Image", value: 'image'},
    {label: "Audio", value: 'audio'},
    {label: "Video", value: 'video'},
    {label: "Document", value: 'document'},
    {label: "Other", value: 'other'}
]
const storageOptions = [
    {label: "Local", value: 'local'},
    {label: "Firebase", value: 'firebase'},
    {label: "Api", value: 'api'}
]
const sizeOptions = [
    {label: "KB", value: 'KB'},
    {label: "MB", value: 'MB'},
    {label: "GB", value: 'GB'}
]

function Filters () {
    const { isDarkMode } = useTheme()

    const customStyles = {
        control: (provided) => ({
          ...provided,
          backgroundColor: isDarkMode ? '#1f2937' : '#fff',
          borderColor: isDarkMode ? '#374151' : '#e5e7eb',
          borderRadius: '0.375rem',
          boxShadow: 'none',
          '&:hover': {
            borderColor: isDarkMode ? '#4b5563' : '#d1d5db'
          },
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: isDarkMode ? '#1f2937' : '#fff',
          border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
          borderRadius: '0.375rem',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused 
            ? isDarkMode ? '#374151' : '#f3f4f6'
            : isDarkMode ? '#1f2937' : '#fff',
          color: isDarkMode ? '#fff' : '#111827',
          '&:active': {
            backgroundColor: isDarkMode ? '#4b5563' : '#e5e7eb'
          }
        }),
        singleValue: (provided) => ({
          ...provided,
          color: isDarkMode ? '#fff' : '#111827',
        }),
        input: (provided) => ({
          ...provided,
          color: isDarkMode ? '#fff' : '#111827',
        }),
        dropdownIndicator: (provided) => ({
          ...provided,
          color: isDarkMode ? '#9ca3af' : '#6b7280',
          '&:hover': {
            color: isDarkMode ? '#d1d5db' : '#374151'
          }
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
        }),
        placeholder: (provided) => ({
          ...provided,
          color: isDarkMode ? '#9ca3af' : '#6b7280',
        }),
    };

    return (
        <div className="flex gap-4 items-center dark:text-black">
            <Select
                styles={customStyles}
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable={true}
                name="color"
                options={typeOptions}
                placeholder="Type"
            />

            <Select
                styles={customStyles}
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable={true}
                name="color"
                options={storageOptions}
                placeholder="Storage"
            />

            <div className="dark:text-white text-sm flex gap-2 items-end">
                <div className="flex flex-col">
                    <p>Limit Size</p>
                    <div className="flex gap-2">
                        <input type="number" placeholder="min" className="dark:bg-dark-blue field-sizing-content min-w-8 outline-none px-2 py-1 "/>
                        <input type="number" placeholder="min" className="dark:bg-dark-blue field-sizing-content min-w-4 outline-none px-2 py-1"/>
                    </div>
                </div>
                <Select
                    styles={customStyles}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    classNames={{
                        control: () => '!min-h-[24px] !text-xs',
                        valueContainer: () => '!py-0 !h-6',
                        input: () => '!text-xs',
                        dropdownIndicator: () => '!p-1',
                        clearIndicator: () => '!p-1',
                        menu: () => '!text-xs',
                        option: () => '!py-1 !text-xs'
                    }}
                    options={sizeOptions}
                    defaultValue={sizeOptions[1]}
                />
            </div>
        </div>
    )
}

export default Filters;