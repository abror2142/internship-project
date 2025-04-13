import { useState, useEffect } from "react";
import { getStorageInfo } from "../../shared/utils/api";
import { byteFormat } from "../../shared/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { StorageInfoType } from "../../shared/types/fileTypes";

function StorageInfoFull () {
    const [storage, setStorage] = useState<StorageInfoType | null>(null);

    const fetchStorageInfo = async () => {
        try {   
            const resp = await getStorageInfo();
            setStorage(resp.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchStorageInfo();
    }, []);

    return (
       <div className="flex flex-col items-center gap-2">
            <div className="relative pr-3 py-1">
                <div className="flex gap-2 items-center">   
                    <FontAwesomeIcon icon={faCloud} className="text-indigo-500 text-xl" />
                    <div className="pr-2 dark:text-indigo-300 flex gap-1 items-center">
                        Storage 
                        <span className="text-sm">
                            ({storage && ((storage?.used/storage?.total) * 100).toFixed(0) || 0}% full)
                        </span>
                        </div>
                </div>
                <div className="absolute text-sm text-blue-400 top-0 right-0 hover:text-blue-700">
                    <div className="group relative" >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        <div className="hidden group-hover:block absolute -bottom-4 left-4 bg-dark-bg text-dark-text px-2 py-0.1 text-nowrap">
                            Get more storage
                        </div>
                    </div>
                </div>
            </div>

            <label className="z-10 w-full relative border py-0.5 min-w-[150px] border-blue-600 rounded-md max-w-[200px] flex justify-between items-center ">
                <div className="flex gap-1 items-center py-0.5 dark:text-white text-sm">
                </div>
                <div
                style={{
                    width: `${storage && ((storage?.used/storage?.total) * 100).toFixed(0) }%`,
                }}
                className={`absolute -z-1 bg-indigo-100 dark:bg-indigo-500 py-0.5 h-full rounded-md`}
                ></div>
            </label>

            {
                storage 
                && storage.used
                && storage.total
                && <div className="text-sm">
                    <p>{byteFormat(storage?.used)} of {byteFormat(storage?.total)} used</p>
                </div>
            }
        </div>
    )
}

export default StorageInfoFull;