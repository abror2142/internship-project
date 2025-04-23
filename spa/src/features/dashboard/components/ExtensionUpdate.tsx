import CreatableExtension from "../../authentication/components/CreatableExtension";
import { useEffect, useState } from "react";
import { Extension } from "../../shared/types/fileTypes";
import { fetchExtensions } from "../../file/api/fileService";
import { updateExtensions } from "../api/dashboardService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
function ExtensionUpdate () {
    const [extensions, setExtensions] = useState<Extension[]>([]);
    const [current, setCurrent] = useState<number[]>([]);

    const fetchExtensionsData = async () => {
            try {
                const extensions = await fetchExtensions();
                setExtensions(extensions);
            } catch(e) {
                console.log(e);
            }
    };

    useEffect(() => {
        fetchExtensionsData();
    }, [])

    const handleExtensionsUpdate = async () => {
        const json = JSON.stringify(extensions);
        try {
            const response = await updateExtensions(json);
            console.log(response);
        } catch(e) {
            console.log(e);
        }
    }

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

    return (
        <div className="flex flex-col gap-2 dark:bg-dark-blue px-6 py-3 max-h-min">
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
                <div onClick={handleExtensionsUpdate} className="mt-2 ml-auto px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-sm max-w-min">
                    Save
                </div>
            </div>
        </div>
    )
}

export default ExtensionUpdate;