import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import Select from 'react-select'
import CreatableExtension from "../../authentication/components/CreatableExtension";
import { customStyles } from "../../file/components/Filters";
import { byteFormat } from "../../shared/utils/utils";
import { fetchSettings } from "../../file/api/fileService";
import { Extension, SettingsData } from "../../shared/types/fileTypes";
import { fetchExtensions } from "../../file/api/fileService";
import { updateExtensions, updateSettings } from "../api/dashboardService";

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
    const [fileSize, setFileSize] = useState<string | null>(null);
    const [storageSize, setStorageSize] = useState<string | null>(null);
    const [storage, setStorage] = useState<string | null>(null);
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const [fileSizeOption, setFileSizeOption] = useState<Option>(sizeOptions[2]);
    const [storageSizeOption, setStorageSizeOption] = useState<Option>(sizeOptions[3]);
    const [current, setCurrent] = useState<number[]>([]);

    const setData = (settings: SettingsData[]) => {
        setStorage(settings.find(setting => setting.key === 'storage')?.value || null);
        setFileSize(settings.find(setting => setting.key === 'file_size_limit')?.value || null);
        setStorageSize(settings.find(setting => setting.key === 'storage_size_limit')?.value || null);
    }

    const fetchSettingsData = async () => {
        try {
            const settings = await fetchSettings();
            setData(settings)
        } catch(e) {
            console.log(e);
        }
    };
    
    const fetchExtensionsData = async () => {
        try {
            const extensions = await fetchExtensions();
            setExtensions(extensions);
        } catch(e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchSettingsData();
        fetchExtensionsData();
    }, []) 

    const toggleExtension  = (id: number) => {
        current.includes(id) 
            ? setCurrent(prev => prev.filter(item => item !== id)) 
            : setCurrent(prev => [...prev, id]);
    }

    const allow = () => {
        if(current){
            setExtensions(prev => prev.map(ext => current.includes(ext.id) ? ({ ...ext, isEnabled: true }) : ext));
            setCurrent([]);
        }
    }

    const limit = () => {
        if(current){
            setExtensions(prev => prev.map(ext => current.includes(ext.id) ? ({ ...ext, isEnabled: false }) : ext));
            setCurrent([]);
        }
    }

    const handleSettingsUpdate = async () => {
        const json = JSON.stringify({
            file_size_limit: fileSize,
            storage: storage,
            storage_size_limit: storageSize
        })
        try {
            const response = await updateSettings(json);
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    }

    const handleExtensionsUpdate = async () => {
        const json = JSON.stringify(extensions);
        try {
            const response = await updateExtensions(json);
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    }

    const handleUpdate = async () => {
        handleExtensionsUpdate();
        handleSettingsUpdate();
    }

    return (
        <div className="flex flex-col gap-4 mx-auto mt-5">
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
                                styles={customStyles()}
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
                                styles={customStyles()}
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
                            styles={customStyles()}
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
                    <div className="mt-2 ml-auto px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-sm max-w-min">
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;