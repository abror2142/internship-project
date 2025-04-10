import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Extension from "../../assets/extension.png";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getSettings } from "../../utils/api";
import { Field, Form, Formik } from "formik";
import Select from 'react-select'
import CreatableExtension from "../../components/admin/CreatableExtension";
import { customStyles } from "../../components/user/home/Filters";
import { useTheme } from "../../hooks/useTheme";
import { byteFormat } from "../../utils/utils";

type Extension = {
    id: number;
    name: string;
    isEnabled: number;
    file_type_id: number;
    file_type: {
        id: number;
        name: string;
        image: string;
    }
}

type Option = {
    label: string;
    value: number;
}

const options = [
    { value: 'local', label: 'local' },
    { value: 'firebase', label: 'firebase' },
    { value: 'api', label: 'api' }
]

const sizeOptions = [
    {label: 'B', value: 1},
    {label: 'KB', value: 1024},
    {label: 'MB', value: 1024 * 1024},
    {label: 'GB', value:  1024 * 1024 * 1024},
    {label: 'TB', value: 1024 * 1024 * 1024 * 1024}
]


function Settings () {
    const [fileSize, setFileSize] = useState<number | null>(null);
    const [storageSize, setStorageSize] = useState<number | null>(null);
    const [storage, setStorage] = useState<number | null>(null);
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const [fileSizeOption, setFileSizeOption] = useState<Option>(sizeOptions[2]);
    const [storageSizeOption, setStorageSizeOption] = useState<Option>(sizeOptions[3]);
    const [current, setCurrent] = useState<number[]>([]);

    const { isDarkMode } = useTheme();

    const setData = (data) => {
        setStorage(data.settings.filter((setting) => setting?.storage)[0]?.storage);
        setExtensions(data?.extensions);
        setFileSize(data.settings.filter(setting => setting?.file_size_limit)[0]?.file_size_limit);
        setStorageSize(data.settings.filter(setting => setting?.storage_size_limit)[0]?.storage_size_limit);
    }

    const fetchSettings = async () => {
        try {
            const resp = await getSettings();
            setData(resp.data);
        } catch(e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []) 

    const toggleExtension  = (id: number) => {
        current.includes(id) 
            ? setCurrent(prev => prev.filter(item => item !== id)) 
            : setCurrent(prev => [...prev, id]);
    }

    const allow = () => {
        if(current){
            setExtensions(prev => prev.map(ext => current.includes(ext.id) ? ({ ...ext, isEnabled: 1 }) : ext));
            setCurrent([]);
        }
    }

    const limit = () => {
        if(current){
            setExtensions(prev => prev.map(ext => current.includes(ext.id) ? ({ ...ext, isEnabled: 0 }) : ext));
            setCurrent([]);
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <Formik
                initialValues={{
                    storageSize: "",
                    storage: storage,
                    fileSize: "",
                    extensions: extensions
                }}
                enableReinitialize={true}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                <Form className="flex flex-col gap-4 dark:text-dark-text">
                    <div className="dark:bg-dark-blue px-6 py-3 rounded-md">
                        <label htmlFor="storageSize">Storage Size</label>
                        <div className="flex gap-2 items-center justify-between">
                            <p>{fileSize && byteFormat(fileSize)}</p>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} />
                            <Field 
                                id="storageSize" 
                                name="storageSize" 
                                type="number" 
                                className="dark:bg-dark-bg px-2 py-1 outline-none max-w-32 rounded-sm"
                                placeholder="0"
                            />
                            <Select 
                                styles={customStyles(isDarkMode)}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                options={sizeOptions}
                                value={fileSizeOption}
                                onChange={(e) => e && setFileSizeOption(e)}
                            />
                        </div>
                    </div>
                    <div className="dark:bg-dark-blue px-6 py-3 rounded-md">
                        <label htmlFor="fileSize">Max. File Size</label>
                        <div className="flex gap-2 items-center justify-between">
                            <p>{storageSize && byteFormat(storageSize)}</p>
                            <FontAwesomeIcon icon={faArrowAltCircleRight} />
                            <Field 
                                name="fileSize" 
                                id="fileSize"  
                                type="number" 
                                className="dark:bg-dark-bg px-2 py-1 outline-none max-w-32 rounded-sm"
                                placeholder="0"
                            />
                            <Select 
                                styles={customStyles(isDarkMode)}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                options={sizeOptions}
                                value={storageSizeOption}
                                onChange={(e) => e && setStorageSizeOption(e)}
                            />
                        </div>
                    </div>
                    <div className="dark:bg-dark-blue px-6 py-3 rounded-md flex flex-col gap-2 ">
                        <p>Storage Type</p>
                        <Select 
                            options={options} 
                            value={{label: storage, value: storage}}
                            onChange={(e) => setStorage(e?.value || null)}
                            styles={customStyles(isDarkMode)}
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                    </div>
                </Form>
            </Formik>
            <div className="flex flex-col gap-2 dark:bg-dark-blue px-6 py-3">
                <p>Extension Settings</p>
                <CreatableExtension />
                <div>
                    <div className="flex justify-between items-center dark:bg-dark-card-light px-6 py-2">
                        <p>Not Allowed</p>
                        <p>Allowed</p>
                    </div>

                    <div className="flex justify-between w-full">
                        <div   
                            className="px-3 py-2 dark:bg-dark-card-light flex flex-col gap-0.5 max-h-50 overflow-auto grow-1
                                scrollbar-thin scrollbar-track-gray-300scrollbar-thumb-gray-500 
                                dark:scrollbar-track-transparent dark:scrollbar-thumb-blue-700"
                        >
                            {
                                extensions.map(extension => (
                                !extension.isEnabled 
                                ? <p 
                                className={`px-2 py-0.5 dark:hover:bg-dark-blue ${current.includes(extension.id) && "bg-dark-blue"}`}
                                    onClick={() => toggleExtension(extension.id)}
                                >{extension.name}</p> 
                                : null
                            ))}
                        </div>
                        <div className="flex flex-col justify-center items-center px-2 text-lg gap-4">
                            <FontAwesomeIcon 
                                icon={faArrowAltCircleRight} 
                                className="hover:text-indigo-500"
                                onClick={allow} 
                            />
                            <FontAwesomeIcon 
                                icon={faArrowAltCircleLeft} 
                                className="hover:text-red-500"
                                onClick={limit}
                            />
                        </div>
                        <div 
                            className="px-3 py-2 dark:bg-dark-card-light flex flex-col gap-0.5 max-h-50 overflow-auto grow-1
                                scrollbar-thin scrollbar-track-gray-300scrollbar-thumb-gray-500 
                                dark:scrollbar-track-transparent dark:scrollbar-thumb-blue-700"
                        >
                            {
                                extensions.map(extension => (
                                extension.isEnabled 
                                ? <p 
                                    className={`px-2 py-0.5 dark:hover:bg-dark-blue ${current.includes(extension.id) && "bg-dark-blue"}`}
                                    onClick={() => toggleExtension(extension.id)}    
                                >{extension.name}</p> 
                                : null
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;