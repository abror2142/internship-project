import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Extension from "../../assets/extension.png";
import Size from "../../assets/size.png";
import Storage from "../../assets/storage.png";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../../utils/api";
import { v4 } from "uuid";


type SettingsData = {
   key: string;
   value: string
}

function Settings () {
    const [data, setData] = useState<SettingsData[] | []>([]);
    const [val, setVal] = useState("")
    const [extension, setExtension] = useState("");
    const [file, setFile] = useState("");
    const [storage, setStorage] = useState("");

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

    const parseExtensions = (ext: string) => {
        return ext.split(',');
    }

    const update = async (key: string) => {
        if(key) {
            const value = key == "file_extentions" ? extension : key == 'storage_size_limit' ? storage + 'GB' : file + 'MB';
            const json = JSON.stringify({
                key: key,
                value: value
            });
            try {
                const resp = await updateSettings(json);
                console.log(resp.data);
                fetchSettings();
            } catch(e) {
                console.log(e);
            }
        }
    }

    console.log(data)

    return (
        <div className="flex flex-col gap-4">
            <div className="mt-5 flex gap-4">
                <div className="bg-dark-blue-light flex flex-col text-black px-8 py-4 rounded-md">
                    <p className="text-2xl font-semibold text-center">Storage Limit</p>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <p className="text-sm max-w-[250px]">It is default storage limit assigned to every user during registration.</p>
                    </div>
                    <div className="flex rounded-md mt-4 gap-2">
                        <img src={Storage} className="w-18"/>
                        
                        <div className="flex flex-col gap-2">
                                <div className="flex gap-2">
                                    <p>
                                        Currently: 
                                    </p>
                                    {data.find(setting => setting.key == 'storage_size_limit')?.value}
                                </div>
                            <div className="flex items-center dark:bg-dark-blue max-w-min dark:text-dark-blue-light rounded-sm  py-1.5">
                                <input 
                                    className=" outline-none pl-3 pr-2 max-w-[150px]"
                                    type="number"
                                    value={storage}
                                    onChange={(e) => setStorage(e.target.value)}
                                    onBlur={() => setVal("")}
                                />
                                <p className="border-l dark:border-dark-blue-light px-2">
                                    GB
                                </p>
                            </div>
                            <button 
                                className="bg-green-600 text-white rounded-sm px-2 py-1 max-w-min self-end"
                                onClick={() => {
                                    update("storage_size_limit");
                                }}
                            >Apply</button>
                        </div>
                    </div>
                </div>

                <div className="bg-dark-blue-light flex flex-col text-black px-8 py-4 rounded-md">
                    <p className="text-2xl font-semibold text-center">File Limit</p>
                    <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <p className="text-sm max-w-[250px]">It is default size limit in MB per File.</p>
                    </div>
                    <div className="flex rounded-md mt-4 gap-2">
                        <img src={Size} className="w-18"/>
                        <div className="flex flex-col gap-2">
                            <div>
                                <div className="flex gap-2">
                                    <p>
                                        Currently: 
                                    </p>
                                    {data.find(setting => setting.key == 'file_size_limit')?.value}
                                </div>
                            </div>
                            <div className="flex items-center dark:bg-dark-blue max-w-min dark:text-dark-blue-light rounded-sm  py-1.5">
                                <input 
                                    className=" outline-none pl-3 pr-2 max-w-[150px]"
                                    type="number"
                                    value={file}
                                    onChange={(e) => setFile(e.target.value)}
                                    onBlur={() => setVal("")}
                                />
                                <p className="border-l dark:border-dark-blue-light px-2">
                                    MB
                                </p>
                            </div>
                            <button 
                                className="bg-green-600 text-white rounded-sm px-2 py-1 max-w-min self-end"
                                onClick={() => {
                                    update("file_size_limit");
                                }}
                            >Apply</button>
                        </div>
                    </div>
                </div>

            </div>

            <div className="bg-dark-blue-light flex flex-col text-black px-8 py-4 rounded-md ">
                <p className="text-2xl font-semibold text-center">File Extensions</p>
                <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faInfoCircle} />
                    <p className="text-sm">Allowed file extensions. This restricts user to upload only these type of files.</p>
                </div>
                <div className="flex gap-2">
                    {parseExtensions(data.find(setting => setting.key == 'file_extentions')?.value || "").map(ext => (
                        <p key={v4()} className="px-2 py-0.5 bg-amber-300 text-black  rounded-sm">{ext}</p>
                    ))}
                </div>
                <div className="flex rounded-md mt-4 gap-2">
                    <img src={Extension} className="w-18"/>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center dark:bg-dark-blue max-w-min dark:text-dark-blue-light rounded-sm  py-1.5">
                            <input 
                                className=" outline-none pl-3 pr-2 max-w-[150px]"
                                value={extension}
                                onChange={(e) => setExtension(e.target.value)}
                            />
                        </div>
                        <button 
                            className="bg-green-600 text-white rounded-sm px-2 py-1 max-w-min self-end"
                            onClick={() => {
                                update("file_extentions");
                            }}
                        >Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;