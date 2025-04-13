import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloud, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { byteFormat } from "../features/shared/utils/utils";
import { getStorageInfo } from "../features/shared/utils/api";
export interface StorageInfo {
    used: number;
    total: number;
}

function StorageIndicator () {
    const [storage, setStorage] = useState<StorageInfo | null>(null);

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
    }, [])

    return (
        <div className="flex items-center gap-2">
            <label className="z-10 w-full relative border py-0.5 min-w-[150px] border-blue-600 rounded-md max-w-[200px] flex justify-between items-center ">
              <div className="flex gap-1 items-center px-2 dark:text-white text-sm">
                {storage && byteFormat(storage.total)}
              </div>
              <div
                style={{
                  width: `${storage && ((storage?.used/storage?.total) * 100)?.toFixed(0) }%`,
                }}
                className={`absolute -z-1 bg-indigo-100 dark:bg-indigo-500 py-0.5 h-full rounded-md`}
              ></div>
              <p className="pr-2 dark:text-indigo-300">{storage && ((storage?.used/storage?.total) * 100).toFixed(0) || 0}%</p>
            </label>
            <div className="relative pr-3 py-1">
                <div>
                    <FontAwesomeIcon icon={faCloud} className="text-indigo-500 text-2xl" />
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
        </div>
    )
}

export default StorageIndicator;