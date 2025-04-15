import Select, { CSSObjectWithLabel } from 'react-select';
import { useTheme } from '../../shared/hooks/useTheme';
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserTags } from '../../shared/utils/api';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { fetchAllFiles } from '../api/fileService';
import { File } from '../../shared/types/fileTypes';
import { Option } from '../../shared/types/select';

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

const metricOptions = [
    {label: "B", value: 'b'},
    {label: "KB", value: 'kb'},
    {label: "MB", value: 'mb'},
    {label: "GB", value: 'gb'}
]

export const customStyles = () => {
  const { isDarkMode } = useTheme();

  return {
    control: (provided: CSSObjectWithLabel) => ({
      ...provided,
      margin: 0,
      padding: 0,
      backgroundColor:  isDarkMode ? '#1f2937' : '#fff',
      borderColor:  isDarkMode ? '#374151' : '#e5e7eb',
      borderRadius: '0.375rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor:  isDarkMode ? '#4b5563' : '#d1d5db'
      },
    }),
    menu: (provided: CSSObjectWithLabel) => ({
      ...provided,
      backgroundColor:  isDarkMode ? '#1f2937' : '#fff',
      border: `1px solid ${ isDarkMode ? '#374151' : '#e5e7eb'}`,
      borderRadius: '0.375rem',
    }),
    option: (provided: CSSObjectWithLabel, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused 
        ?  isDarkMode ? '#374151' : '#f3f4f6'
        :  isDarkMode ? '#1f2937' : '#fff',
      color:  isDarkMode ? '#fff' : '#111827',
      '&:active': {
        backgroundColor:  isDarkMode ? '#4b5563' : '#e5e7eb'
      }
    }),
    singleValue: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color:  isDarkMode ? '#fff' : '#111827',
    }),
    input: (provided: CSSObjectWithLabel) => ({
      ...provided,
      margin: 0,   // remove extra margin that may affect height
      padding: 0,  // remove extra padding if necessary
      color:  isDarkMode ? '#fff' : '#111827',
    }),
    dropdownIndicator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color:  isDarkMode ? '#9ca3af' : '#6b7280',
      '&:hover': {
        color:  isDarkMode ? '#d1d5db' : '#374151'
      }
    }),
    indicatorSeparator: (provided: CSSObjectWithLabel) => ({
      ...provided,
      backgroundColor:  isDarkMode ? '#374151' : '#e5e7eb',
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
      ...provided,
      color:  isDarkMode ? '#9ca3af' : '#6b7280',
    }),
  }
};

function Filters ({setFiles}: {setFiles: React.Dispatch<React.SetStateAction<File[]>>}) {
  const {  } = useTheme()
  const [searchParams, setSearchParams] = useSearchParams();
  const [tags, setTags] = useState<Option[]>([]);
  const [tag, setTag] = useState(searchParams.has('tag') && {label: searchParams.get('tag'), value: searchParams.get('tag')});
  const [type, setType] = useState(searchParams.has('type') ? typeOptions.filter((type) => type.value === searchParams.get('type'))[0] : null);
  const [storage, setStorage] = useState(searchParams.has('storage') ? storageOptions.filter((type) => type.value === searchParams.get('storage')) : null);
  const [metric, setMetric] = useState(searchParams.has('metric') ? metricOptions.filter((type) => type.value === searchParams.get('metric')) : metricOptions[2]);
  const [min, setMin] = useState<string | null>(searchParams.has('min') ? searchParams.get('min') : null);
  const [max, setMax] = useState<string | null>(searchParams.has('max') ? searchParams.get('max') : null);

  const handleFilter = (e: any, paramName: string, set: any) => {
    const params = new URLSearchParams(searchParams);
    if(e === null) {
      params.delete(paramName); 
      set(null)
    }
    else{
      params.set(paramName, e.value);
      set(e)
    }
    setSearchParams(params);
  }

  const handleReset = () => {
    handleFilter(null, 'storage', setStorage);
    handleFilter(null, 'type', setType);
    handleFilter(null, 'tag', setTag);
    handleFilter(metricOptions[2], 'metric', setMetric);
    setMin(null);
    setMax(null);
    setSearchParams([]);
  }

  const fetchUserTags = async () => {
    try {
      const resp = await getUserTags();
      const options = resp.data.map((tag: string) => ({label: tag, value: tag}));
      setTags(options);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUserTags();
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if(min)
      params.set('min', min);
    else
      params.delete('min');
    setSearchParams(params);
  }, [min])

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if(max)
      params.set('max', max);
    else
      params.delete('max');
    setSearchParams(params);
  }, [max])

  const fetchFiles = async () => {
    try {
      const files = await fetchAllFiles();
      console.log(files);
      setFiles(files);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if(searchParams) {
      fetchFiles();
    }
  }, [searchParams])

    return (
        <div className="flex gap-4 items-center dark:text-black">
            <Select
                styles={customStyles()}
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable={true}
                options={typeOptions}
                value={type}
                onChange={(e) => handleFilter(e, 'type', setType)}
                placeholder="Type"
            />

            <Select
                styles={customStyles()}
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable={true}
                options={storageOptions}
                value={storage}
                onChange={(e) => handleFilter(e, 'storage', setStorage)}
                placeholder="Storage"
            />

            <Select
                styles={customStyles()}
                className="react-select-container"
                classNamePrefix="react-select"
                isClearable={true}
                options={tags}
                value={tag}
                onChange={(e) => handleFilter(e, 'tag', setTag)}
                placeholder="Tag"
            />

            <div className="dark:text-white text-sm flex gap-2 items-end">
                <div className="flex flex-col">
                    <p>Limit Size</p>
                    <div className="flex gap-2">
                        <input 
                          type="number" 
                          placeholder="min" 
                          className="dark:bg-dark-blue field-sizing-content min-w-8 outline-none px-2 py-1 "
                          onChange={(e) => setMin(e.target.value)}
                          value={min ? min : 0}
                        />
                        <input 
                          type="number" 
                          placeholder="max" 
                          className="dark:bg-dark-blue field-sizing-content min-w-4 outline-none px-2 py-1"
                          onChange={(e) =>setMax(e.target.value)}
                          value={min ? min : 0}
                        />
                    </div>
                </div>
                <Select
                    styles={customStyles()}
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
                    value={metric}
                    options={metricOptions}
                    onChange={(e) => handleFilter(e, 'metric', setMetric)}
                />
                {
                  searchParams.size > 0
                  && <div 
                      className="flex gap-2 items-center dark:text-indigo-500 px-3 py-2 rounded-md dark:bg-dark-blue dark:hover:bg-blue-950"
                      onClick={() => handleReset()}
                  >
                    <FontAwesomeIcon icon={faCircleMinus} />
                    <p>Reset</p>
                  </div>
                } 
            </div>
        </div>
    )
}

export default Filters;