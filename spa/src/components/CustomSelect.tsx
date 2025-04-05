import {} from "react-select";
import Select from 'react-select';
import { useTheme } from "../../../hooks/useTheme";





function Filters ({options}) {
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
                options={options}
            />
        </div>
    )
}

export default Filters;